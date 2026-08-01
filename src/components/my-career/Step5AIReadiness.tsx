import { useState } from "react";
import { motion } from "framer-motion";
import { WizardData } from "./types";
import { AI_FREQUENCY, AI_TOOLS } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
}

export function Step5AIReadiness({ data, updateData }: Props) {
  const [showOtherFreq, setShowOtherFreq] = useState(false);
  const [showOtherTool, setShowOtherTool] = useState(false);
  const [customToolInput, setCustomToolInput] = useState("");

  const handleFreqChange = (val: string) => {
    if (val === "Other") {
      setShowOtherFreq(true);
      updateData({ aiFrequency: "" });
    } else {
      setShowOtherFreq(false);
      updateData({ aiFrequency: val });
    }
  };
  const isFreqCustom = showOtherFreq || (data.aiFrequency ? !AI_FREQUENCY.includes(data.aiFrequency) : false);

  const currentAiTools = data.suggestedAiTools && data.suggestedAiTools.length > 0 ? data.suggestedAiTools : AI_TOOLS;

  const customTools = data.aiTools.filter(t => !currentAiTools.includes(t));
  const hasCustomTool = customTools.length > 0;
  const isOtherToolChecked = showOtherTool || hasCustomTool;

  const toggleOtherTool = () => {
    const isNowChecked = !isOtherToolChecked;
    setShowOtherTool(isNowChecked);
    if (!isNowChecked) {
      const standardTools = data.aiTools.filter(t => currentAiTools.includes(t));
      updateData({ aiTools: standardTools });
    }
  };

  const handleAddCustomTool = () => {
    if (customToolInput.trim()) {
      const newTool = customToolInput.trim();
      if (!data.aiTools.includes(newTool)) {
        updateData({ aiTools: [...data.aiTools, newTool] });
      }
      setCustomToolInput("");
    }
  };

  const handleRemoveCustomTool = (toolToRemove: string) => {
    updateData({ aiTools: data.aiTools.filter((t) => t !== toolToRemove) });
  };

  const handleToolKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomTool();
    }
  };

  const toggleTool = (tool: string) => {
    const current = data.aiTools;
    const newTools = current.includes(tool)
      ? current.filter((t) => t !== tool)
      : [...current, tool];

    updateData({ aiTools: newTools });
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
          <CardTitle className="text-2xl">AI Readiness</CardTitle>
          <CardDescription>How are you leveraging AI in your career?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <Label className="text-base">How often do you use AI?</Label>
            <RadioGroup
              value={isFreqCustom ? "Other" : data.aiFrequency}
              onValueChange={handleFreqChange}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {AI_FREQUENCY.map((freq) => (
                <div
                  key={freq}
                  className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={freq} id={`freq-${freq}`} />
                  <Label htmlFor={`freq-${freq}`} className="cursor-pointer flex-1">
                    {freq}
                  </Label>
                </div>
              ))}
              <div
                className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value="Other" id="freq-other" />
                <Label htmlFor="freq-other" className="cursor-pointer flex-1">
                  Other
                </Label>
              </div>
            </RadioGroup>
            {isFreqCustom && (
              <Input
                placeholder="Please specify how often you use AI"
                value={data.aiFrequency}
                onChange={(e) => updateData({ aiFrequency: e.target.value })}
              />
            )}
          </div>

          <div className="space-y-4">
            <Label className="text-base">Which AI tools do you use?</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {currentAiTools.map((tool) => {
                const isSelected = data.aiTools.includes(tool);
                return (
                  <div
                    key={tool}
                    className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer transition-colors ${isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                    onClick={() => toggleTool(tool)}
                  >
                    <Checkbox
                      id={`tool-${tool}`}
                      checked={isSelected}
                      onCheckedChange={() => toggleTool(tool)}
                    />
                    <label
                      htmlFor={`tool-${tool}`}
                      className="text-sm font-medium leading-none cursor-pointer flex-1 truncate"
                    >
                      {tool}
                    </label>
                  </div>
                );
              })}
              <div
                className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer transition-colors ${isOtherToolChecked ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                onClick={toggleOtherTool}
              >
                <Checkbox
                  id="tool-other"
                  checked={isOtherToolChecked}
                  onCheckedChange={toggleOtherTool}
                />
                <label
                  htmlFor="tool-other"
                  className="text-sm font-medium leading-none cursor-pointer flex-1 truncate"
                >
                  Other
                </label>
              </div>
            </div>
            {isOtherToolChecked && (
              <div className="mt-4 space-y-3">
                {customTools.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {customTools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="px-2 py-1 text-sm">
                        {tool}
                        <button
                          onClick={() => handleRemoveCustomTool(tool)}
                          className="ml-2 hover:bg-muted rounded-full p-0.5 inline-flex items-center justify-center"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    placeholder="Type an AI tool and press Enter"
                    value={customToolInput}
                    onChange={(e) => setCustomToolInput(e.target.value)}
                    onKeyDown={handleToolKeyDown}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAddCustomTool}
                    disabled={!customToolInput.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex justify-between items-center">
              <Label className="text-base">How comfortable are you using AI?</Label>
              <span className="font-bold text-lg text-primary">{data.aiComfortLevel}/10</span>
            </div>
            <Slider
              value={[data.aiComfortLevel]}
              min={1}
              max={10}
              step={1}
              onValueChange={(val) => updateData({ aiComfortLevel: val[0] })}
              className="py-4"
            />
            <div className="text-center text-sm font-medium text-foreground mt-2">
              {
                {
                  1: "Beginner (Never Used AI)",
                  2: "Basic Awareness",
                  3: "Limited Practical Experience",
                  4: "Occasional User",
                  5: "Average User",
                  6: "Comfortable User",
                  7: "Advanced User",
                  8: "Power User",
                  9: "AI Champion",
                  10: "AI Expert / Mentor"
                }[data.aiComfortLevel]
              }
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
