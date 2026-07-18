import { useState } from "react";
import { motion } from "framer-motion";
import { WizardData } from "./types";
import {
  JOB_TITLES,
  INDUSTRIES,
  BUSINESS_FUNCTIONS,
  DOMAINS,
  SPECIALIZATIONS,
} from "@/lib/mock-data";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
}

export function Step1CareerIdentity({ data, updateData }: Props) {
  const [showOther, setShowOther] = useState<Record<string, boolean>>({});

  const handleSelectChange = (field: keyof WizardData, val: string) => {
    if (val === "Other") {
      setShowOther((prev) => ({ ...prev, [field]: true }));
      updateData({ [field]: "" });
    } else {
      setShowOther((prev) => ({ ...prev, [field]: false }));
      updateData({ [field]: val });
    }
  };

  const isCustom = (field: string, val: string, list: string[]) => {
    return showOther[field] || (val ? !list.includes(val) : false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Current Career Identity</CardTitle>
          <CardDescription>Tell us about your current professional role.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Current Job Title *</Label>
            <Select 
              value={isCustom("jobTitle", data.jobTitle, JOB_TITLES) ? "Other" : data.jobTitle} 
              onValueChange={(val) => handleSelectChange("jobTitle", val)}
            >
              <SelectTrigger id="jobTitle">
                <SelectValue placeholder="Select your job title" />
              </SelectTrigger>
              <SelectContent>
                {JOB_TITLES.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {isCustom("jobTitle", data.jobTitle, JOB_TITLES) && (
              <Input
                placeholder="Please specify your job title"
                value={data.jobTitle}
                onChange={(e) => updateData({ jobTitle: e.target.value })}
                className="mt-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Current Company/Industry *</Label>
            <Select 
              value={isCustom("industry", data.industry, INDUSTRIES) ? "Other" : data.industry} 
              onValueChange={(val) => handleSelectChange("industry", val)}
            >
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((ind) => (
                  <SelectItem key={ind} value={ind}>
                    {ind}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {isCustom("industry", data.industry, INDUSTRIES) && (
              <Input
                placeholder="Please specify your industry"
                value={data.industry}
                onChange={(e) => updateData({ industry: e.target.value })}
                className="mt-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessFunction">Department / Business Function *</Label>
            <Select
              value={isCustom("businessFunction", data.businessFunction, BUSINESS_FUNCTIONS) ? "Other" : data.businessFunction}
              onValueChange={(val) => handleSelectChange("businessFunction", val)}
            >
              <SelectTrigger id="businessFunction">
                <SelectValue placeholder="Select your business function" />
              </SelectTrigger>
              <SelectContent>
                {BUSINESS_FUNCTIONS.map((bf) => (
                  <SelectItem key={bf} value={bf}>
                    {bf}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {isCustom("businessFunction", data.businessFunction, BUSINESS_FUNCTIONS) && (
              <Input
                placeholder="Please specify your business function"
                value={data.businessFunction}
                onChange={(e) => updateData({ businessFunction: e.target.value })}
                className="mt-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Functional Domain *</Label>
            <Select 
              value={isCustom("domain", data.domain, DOMAINS) ? "Other" : data.domain} 
              onValueChange={(val) => handleSelectChange("domain", val)}
            >
              <SelectTrigger id="domain">
                <SelectValue placeholder="Select your domain" />
              </SelectTrigger>
              <SelectContent>
                {DOMAINS.map((domain) => (
                  <SelectItem key={domain} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {isCustom("domain", data.domain, DOMAINS) && (
              <Input
                placeholder="Please specify your domain"
                value={data.domain}
                onChange={(e) => updateData({ domain: e.target.value })}
                className="mt-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization *</Label>
            <Select
              value={isCustom("specialization", data.specialization, SPECIALIZATIONS) ? "Other" : data.specialization}
              onValueChange={(val) => handleSelectChange("specialization", val)}
            >
              <SelectTrigger id="specialization">
                <SelectValue placeholder="Select your specialization" />
              </SelectTrigger>
              <SelectContent>
                {SPECIALIZATIONS.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {isCustom("specialization", data.specialization, SPECIALIZATIONS) && (
              <Input
                placeholder="Please specify your specialization"
                value={data.specialization}
                onChange={(e) => updateData({ specialization: e.target.value })}
                className="mt-2"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
