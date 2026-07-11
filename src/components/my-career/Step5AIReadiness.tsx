import { motion } from "framer-motion";
import { WizardData } from "./types";
import { AI_FREQUENCY, AI_TOOLS } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
}

export function Step5AIReadiness({ data, updateData }: Props) {
  
  const toggleTool = (tool: string) => {
    const current = data.aiTools;
    const newTools = current.includes(tool)
      ? current.filter(t => t !== tool)
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
              value={data.aiFrequency} 
              onValueChange={(val) => updateData({ aiFrequency: val })}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {AI_FREQUENCY.map(freq => (
                <div key={freq} className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={freq} id={`freq-${freq}`} />
                  <Label htmlFor={`freq-${freq}`} className="cursor-pointer flex-1">{freq}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-base">Which AI tools do you use?</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {AI_TOOLS.map(tool => {
                const isSelected = data.aiTools.includes(tool);
                return (
                  <div 
                    key={tool}
                    className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
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
                )
              })}
            </div>
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
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}
