import { useMemo } from "react";
import { motion } from "framer-motion";
import { WizardData } from "./types";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { useMasterData } from "@/api/master";
import { wizardFieldLabelClass, wizardStepCardClass } from "./wizard-styles";

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
}

export function Step1CareerIdentity({ data, updateData }: Props) {
  const { 
    useSectors, 
    useDepartments, 
    useFunctionalDomains, 
    useSpecializations, 
    useJobTitles,
    prefetchDepartments,
    prefetchFunctionalDomains,
    prefetchSpecializations,
    prefetchJobTitles
  } = useMasterData();

  // Queries
  const { data: sectors = [], isLoading: loadingSectors } = useSectors();
  const { data: departments = [], isLoading: loadingDepartments } = useDepartments(data.sector_id);
  const { data: functionalDomains = [], isLoading: loadingFunctionalDomains } = useFunctionalDomains(data.department_id);
  const { data: specializations = [], isLoading: loadingSpecializations } = useSpecializations(data.functional_domain_id);
  const { data: jobTitles = [], isLoading: loadingJobTitles } = useJobTitles(data.specialization_id);

  // Mappers for Combobox
  const sectorOptions = useMemo(() => sectors.map((s: any) => ({ value: s.id, label: s.name })), [sectors]);
  const departmentOptions = useMemo(() => departments.map((s: any) => ({ value: s.id, label: s.name })), [departments]);
  const functionalDomainOptions = useMemo(() => functionalDomains.map((s: any) => ({ value: s.id, label: s.name })), [functionalDomains]);
  const specializationOptions = useMemo(() => specializations.map((s: any) => ({ value: s.id, label: s.name })), [specializations]);
  const jobTitleOptions = useMemo(() => jobTitles.map((s: any) => ({ value: s.id, label: s.job_title })), [jobTitles]);

  // Handlers
  const handleSectorChange = (idOrCustom: string) => {
    const selected = sectors.find((s: any) => s.id === idOrCustom);
    updateData({
      industry: selected ? selected.name : idOrCustom,
      sector_id: selected ? selected.id : undefined,
      businessFunction: "",
      department_id: undefined,
      domain: "",
      functional_domain_id: undefined,
      specialization: "",
      specialization_id: undefined,
      jobTitle: "",
      job_title_id: undefined
    });
    if (selected) prefetchDepartments(selected.id);
  };

  const handleDepartmentChange = (idOrCustom: string) => {
    const selected = departments.find((s: any) => s.id === idOrCustom);
    updateData({
      businessFunction: selected ? selected.name : idOrCustom,
      department_id: selected ? selected.id : undefined,
      domain: "",
      functional_domain_id: undefined,
      specialization: "",
      specialization_id: undefined,
      jobTitle: "",
      job_title_id: undefined
    });
    if (selected) prefetchFunctionalDomains(selected.id);
  };

  const handleFunctionalDomainChange = (idOrCustom: string) => {
    const selected = functionalDomains.find((s: any) => s.id === idOrCustom);
    updateData({
      domain: selected ? selected.name : idOrCustom,
      functional_domain_id: selected ? selected.id : undefined,
      specialization: "",
      specialization_id: undefined,
      jobTitle: "",
      job_title_id: undefined
    });
    if (selected) prefetchSpecializations(selected.id);
  };

  const handleSpecializationChange = (idOrCustom: string) => {
    const selected = specializations.find((s: any) => s.id === idOrCustom);
    updateData({
      specialization: selected ? selected.name : idOrCustom,
      specialization_id: selected ? selected.id : undefined,
      jobTitle: "",
      job_title_id: undefined
    });
    if (selected) prefetchJobTitles(selected.id);
  };

  const handleJobTitleChange = (idOrCustom: string) => {
    const selected = jobTitles.find((s: any) => s.id === idOrCustom);
    updateData({
      jobTitle: selected ? selected.job_title : idOrCustom,
      job_title_id: selected ? selected.id : undefined,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={wizardStepCardClass}>
        <CardHeader className="px-4 pt-5 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl">Current Career Identity</CardTitle>
          <CardDescription className="text-foreground/70">Tell us about your current professional role.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-4 pb-5 sm:space-y-6 sm:px-6 sm:pb-6">
          
          <div className="space-y-2">
            <Label className={wizardFieldLabelClass}>Industry *</Label>
            <Combobox
              options={sectorOptions}
              value={data.sector_id || data.industry}
              onChange={handleSectorChange}
              placeholder="Select your industry"
              searchPlaceholder="Search industries..."
              loading={loadingSectors}
            />
          </div>

          <div className="space-y-2">
            <Label className={wizardFieldLabelClass}>Department / Business Function *</Label>
            <Combobox
              options={departmentOptions}
              value={data.department_id || data.businessFunction}
              onChange={handleDepartmentChange}
              placeholder="Select your business function"
              searchPlaceholder="Search departments..."
              disabled={!data.sector_id && !data.industry}
              loading={loadingDepartments}
            />
          </div>

          <div className="space-y-2">
            <Label className={wizardFieldLabelClass}>Functional Domain *</Label>
            <Combobox
              options={functionalDomainOptions}
              value={data.functional_domain_id || data.domain}
              onChange={handleFunctionalDomainChange}
              placeholder="Select your functional domain"
              searchPlaceholder="Search domains..."
              disabled={!data.department_id && !data.businessFunction}
              loading={loadingFunctionalDomains}
            />
          </div>

          <div className="space-y-2">
            <Label className={wizardFieldLabelClass}>Specialization *</Label>
            <Combobox
              options={specializationOptions}
              value={data.specialization_id || data.specialization}
              onChange={handleSpecializationChange}
              placeholder="Select your specialization"
              searchPlaceholder="Search specializations..."
              disabled={!data.functional_domain_id && !data.domain}
              loading={loadingSpecializations}
            />
          </div>

          <div className="space-y-2">
            <Label className={wizardFieldLabelClass}>Current Job Title *</Label>
            <Combobox
              options={jobTitleOptions}
              value={data.job_title_id || data.jobTitle}
              onChange={handleJobTitleChange}
              placeholder="Select your job title"
              searchPlaceholder="Search job titles..."
              disabled={!data.specialization_id && !data.specialization}
              loading={loadingJobTitles}
            />
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}
