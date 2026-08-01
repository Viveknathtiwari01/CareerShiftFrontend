import { useQuery, useQueryClient } from "@tanstack/react-query";

const API_BASE = "http://localhost:8000/api/v1/master";

async function fetchSectors() {
  const res = await fetch(`${API_BASE}/sectors`);
  if (!res.ok) throw new Error("Failed to fetch sectors");
  return res.json();
}

async function fetchDepartments(sectorId: string) {
  const res = await fetch(`${API_BASE}/sectors/${sectorId}/departments`);
  if (!res.ok) throw new Error("Failed to fetch departments");
  return res.json();
}

async function fetchFunctionalDomains(departmentId: string) {
  const res = await fetch(`${API_BASE}/departments/${departmentId}/functional-domains`);
  if (!res.ok) throw new Error("Failed to fetch functional domains");
  return res.json();
}

async function fetchSpecializations(functionalDomainId: string) {
  const res = await fetch(`${API_BASE}/functional-domains/${functionalDomainId}/specializations`);
  if (!res.ok) throw new Error("Failed to fetch specializations");
  return res.json();
}

async function fetchJobTitles(specializationId: string) {
  const res = await fetch(`${API_BASE}/specializations/${specializationId}/job-titles`);
  if (!res.ok) throw new Error("Failed to fetch job titles");
  return res.json();
}

export function useMasterData() {
  const queryClient = useQueryClient();

  const useSectors = () => useQuery({
    queryKey: ["master", "sectors"],
    queryFn: fetchSectors,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const useDepartments = (sectorId?: string) => {
    return useQuery({
      queryKey: ["master", "departments", sectorId],
      queryFn: () => fetchDepartments(sectorId!),
      enabled: !!sectorId,
      staleTime: 1000 * 60 * 60,
    });
  };

  const useFunctionalDomains = (departmentId?: string) => {
    return useQuery({
      queryKey: ["master", "functional-domains", departmentId],
      queryFn: () => fetchFunctionalDomains(departmentId!),
      enabled: !!departmentId,
      staleTime: 1000 * 60 * 60,
    });
  };

  const useSpecializations = (functionalDomainId?: string) => {
    return useQuery({
      queryKey: ["master", "specializations", functionalDomainId],
      queryFn: () => fetchSpecializations(functionalDomainId!),
      enabled: !!functionalDomainId,
      staleTime: 1000 * 60 * 60,
    });
  };

  const useJobTitles = (specializationId?: string) => {
    return useQuery({
      queryKey: ["master", "job-titles", specializationId],
      queryFn: () => fetchJobTitles(specializationId!),
      enabled: !!specializationId,
      staleTime: 1000 * 60 * 60,
    });
  };

  // Prefetch functions
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
    prefetchJobTitles
  };
}
