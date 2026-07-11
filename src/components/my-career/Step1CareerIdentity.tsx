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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
}

export function Step1CareerIdentity({ data, updateData }: Props) {
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
            <Select value={data.jobTitle} onValueChange={(val) => updateData({ jobTitle: val })}>
              <SelectTrigger id="jobTitle">
                <SelectValue placeholder="Select your job title" />
              </SelectTrigger>
              <SelectContent>
                {JOB_TITLES.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Current Company/Industry *</Label>
            <Select value={data.industry} onValueChange={(val) => updateData({ industry: val })}>
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((ind) => (
                  <SelectItem key={ind} value={ind}>
                    {ind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessFunction">Department / Business Function *</Label>
            <Select
              value={data.businessFunction}
              onValueChange={(val) => updateData({ businessFunction: val })}
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
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Functional Domain *</Label>
            <Select value={data.domain} onValueChange={(val) => updateData({ domain: val })}>
              <SelectTrigger id="domain">
                <SelectValue placeholder="Select your domain" />
              </SelectTrigger>
              <SelectContent>
                {DOMAINS.map((domain) => (
                  <SelectItem key={domain} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization *</Label>
            <Select
              value={data.specialization}
              onValueChange={(val) => updateData({ specialization: val })}
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
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
