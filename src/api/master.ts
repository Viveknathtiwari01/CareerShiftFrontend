import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";

async function fetchSectors() {
  const res = await fetchApi("/master/sectors");
  return res.data ?? res;
}

async function fetchDepartments(sectorId: string) {
  const res = await fetchApi(`/master/sectors/${sectorId}/departments`);
  return res.data ?? res;
}

async function fetchFunctionalDomains(departmentId: string) {
  const res = await fetchApi(`/master/departments/${departmentId}/functional-domains`);
  return res.data ?? res;
}

async function fetchSpecializations(functionalDomainId: string) {
  const res = await fetchApi(`/master/functional-domains/${functionalDomainId}/specializations`);
  return res.data ?? res;
}

async function fetchJobTitles(specializationId: string) {
  const res = await fetchApi(`/master/specializations/${specializationId}/job-titles`);
  return res.data ?? res;
}

export function useMasterData() {
  const queryClient = useQueryClient();

  const useSectors = () =>
    useQuery({
      queryKey: ["master", "sectors"],
      queryFn: fetchSectors,
      staleTime: 1000 * 60 * 60,
    });

  const useDepartments = (sectorId?: string) =>
    useQuery({
      queryKey: ["master", "departments", sectorId],
      queryFn: () => fetchDepartments(sectorId!),
      enabled: !!sectorId,
      staleTime: 1000 * 60 * 60,
    });

  const useFunctionalDomains = (departmentId?: string) =>
    useQuery({
      queryKey: ["master", "functional-domains", departmentId],
      queryFn: () => fetchFunctionalDomains(departmentId!),
      enabled: !!departmentId,
      staleTime: 1000 * 60 * 60,
    });

  const useSpecializations = (functionalDomainId?: string) =>
    useQuery({
      queryKey: ["master", "specializations", functionalDomainId],
      queryFn: () => fetchSpecializations(functionalDomainId!),
      enabled: !!functionalDomainId,
      staleTime: 1000 * 60 * 60,
    });

  const useJobTitles = (specializationId?: string) =>
    useQuery({
      queryKey: ["master", "job-titles", specializationId],
      queryFn: () => fetchJobTitles(specializationId!),
      enabled: !!specializationId,
      staleTime: 1000 * 60 * 60,
    });

  const prefetchDepartments = (sectorId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["master", "departments", sectorId],
      queryFn: () => fetchDepartments(sectorId),
      staleTime: 1000 * 60 * 60,
    });
  };

  const prefetchFunctionalDomains = (departmentId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["master", "functional-domains", departmentId],
      queryFn: () => fetchFunctionalDomains(departmentId),
      staleTime: 1000 * 60 * 60,
    });
  };

  const prefetchSpecializations = (functionalDomainId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["master", "specializations", functionalDomainId],
      queryFn: () => fetchSpecializations(functionalDomainId),
      staleTime: 1000 * 60 * 60,
    });
  };

  const prefetchJobTitles = (specializationId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["master", "job-titles", specializationId],
      queryFn: () => fetchJobTitles(specializationId),
      staleTime: 1000 * 60 * 60,
    });
  };

  return {
    useSectors,
    useDepartments,
    useFunctionalDomains,
    useSpecializations,
    useJobTitles,
    prefetchDepartments,
    prefetchFunctionalDomains,
    prefetchSpecializations,
    prefetchJobTitles,
  };
}
