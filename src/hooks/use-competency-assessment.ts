import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAssessment,
  getCurrentAssessment,
  retryAssessment,
  startAssessment,
  type AssessmentResponse,
  type AssessmentStartResponse,
  type AssessmentStatus,
} from "@/api/assessment";

const STORAGE_KEY = "careershift.assessment.active";
const LEGACY_FORCE_KEY = "careershift.assessment.forceOnce";

const PIPELINE_STAGES = [
  "role_understanding",
  "competency_discovery",
  "competency_structuring",
  "competency_validation",
  "competency_explanation",
] as const;

function isInProgress(status: AssessmentStatus | undefined): boolean {
  return status === "PENDING" || status === "PROCESSING";
}

export function getPipelineProgress(engineMetrics?: Record<string, number>) {
  if (!engineMetrics) return { completed: 0, total: PIPELINE_STAGES.length, currentStage: null as string | null };
  const completed = PIPELINE_STAGES.filter((stage) => engineMetrics[stage] != null).length;
  const currentStage =
    PIPELINE_STAGES.find((stage) => engineMetrics[stage] == null) ?? null;
  return { completed, total: PIPELINE_STAGES.length, currentStage };
}

/** Dedupe sync across React Strict Mode double-mount. */
let syncPromise: Promise<AssessmentStartResponse> | null = null;

async function resolveAssessmentSession(
  prefetched: AssessmentStartResponse | null,
): Promise<AssessmentStartResponse> {
  if (prefetched) {
    return prefetched;
  }

  if (syncPromise) {
    return syncPromise;
  }

  syncPromise = (async () => {
    const current = await getCurrentAssessment();

    if (
      current.assessment_id &&
      current.reused_existing &&
      !current.needs_sync &&
      current.pipeline_run_id &&
      current.status
    ) {
      return {
        assessment_id: current.assessment_id,
        pipeline_run_id: current.pipeline_run_id,
        status: current.status,
        already_running: true,
        reused_existing: true,
        profile_stale: current.profile_stale,
      };
    }

    return startAssessment({ force: false });
  })();

  try {
    return await syncPromise;
  } finally {
    syncPromise = null;
  }
}

type Options = {
  /** Set when user explicitly chose "Start New Assessment" — already POSTed with force. */
  prefetchedSession?: AssessmentStartResponse | null;
};

export function useCompetencyAssessment(options: Options = {}) {
  const prefetchedRef = useRef(options.prefetchedSession ?? null);
  const queryClient = useQueryClient();
  const syncRequestedRef = useRef(false);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [syncDone, setSyncDone] = useState(false);
  const [reusedExisting, setReusedExisting] = useState(false);
  const [profileStale, setProfileStale] = useState(false);

  const assessmentQuery = useQuery({
    queryKey: ["assessment", assessmentId],
    queryFn: () => getAssessment(assessmentId!),
    enabled: !!assessmentId && syncDone,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return isInProgress(status) ? 3000 : false;
    },
    retry: 2,
  });

  const startMutation = useMutation({
    mutationFn: () => resolveAssessmentSession(prefetchedRef.current),
    retry: false,
    onSuccess: (data) => {
      prefetchedRef.current = null;
      setAssessmentId(data.assessment_id);
      setReusedExisting(!!data.reused_existing);
      setProfileStale(!!data.profile_stale);
      sessionStorage.setItem(STORAGE_KEY, data.assessment_id);

      const resolvedStatus = (
        data.status === "PENDING" && !data.reused_existing ? "PROCESSING" : data.status
      ) as AssessmentStatus;

      queryClient.setQueryData<AssessmentResponse>(["assessment", data.assessment_id], (prev) => ({
        assessment_id: data.assessment_id,
        status: resolvedStatus,
        competency_mapping: prev?.competency_mapping ?? null,
        metadata: {
          pipeline_run_id: data.pipeline_run_id,
          pipeline_version: prev?.metadata.pipeline_version ?? "",
          model_name: prev?.metadata.model_name ?? "",
          engine_metrics: prev?.metadata.engine_metrics ?? {},
        },
        error: null,
      }));

      queryClient.invalidateQueries({ queryKey: ["assessment", data.assessment_id] });
    },
    onSettled: () => {
      setSyncDone(true);
    },
  });

  const retryMutation = useMutation({
    mutationFn: (id: string) => retryAssessment(id),
    onSuccess: (data) => {
      setAssessmentId(data.assessment_id);
      setReusedExisting(false);
      setProfileStale(false);
      sessionStorage.setItem(STORAGE_KEY, data.assessment_id);
      queryClient.invalidateQueries({ queryKey: ["assessment", data.assessment_id] });
    },
  });

  useEffect(() => {
    sessionStorage.removeItem(LEGACY_FORCE_KEY);
    if (syncRequestedRef.current || startMutation.isPending) return;
    syncRequestedRef.current = true;
    startMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- one-shot sync on mount
  }, []);

  const status = assessmentQuery.data?.status;
  const engineMetrics = assessmentQuery.data?.metadata?.engine_metrics;
  const pipelineProgress = getPipelineProgress(engineMetrics);
  const isComplete = status === "COMPLETED";
  const isFailed = status === "FAILED";
  const isProcessing =
    !isComplete &&
    !isFailed &&
    (!syncDone ||
      startMutation.isPending ||
      !assessmentId ||
      isInProgress(status) ||
      (assessmentQuery.isLoading && !assessmentQuery.data));

  return {
    assessmentId,
    assessment: assessmentQuery.data,
    competencyMapping: assessmentQuery.data?.competency_mapping ?? null,
    status,
    pipelineProgress,
    reusedExisting,
    profileStale,
    error: assessmentQuery.error ?? startMutation.error ?? null,
    pipelineError: assessmentQuery.data?.error ?? null,
    isProcessing,
    isComplete,
    isFailed,
    isStarting: startMutation.isPending,
    isLoading: assessmentQuery.isLoading && !!assessmentId,
    retry: () => {
      if (assessmentId) retryMutation.mutate(assessmentId);
    },
    isRetrying: retryMutation.isPending,
    resetSession: () => {
      sessionStorage.removeItem(STORAGE_KEY);
      setAssessmentId(null);
      setSyncDone(false);
      syncRequestedRef.current = false;
      startMutation.reset();
    },
  };
}
