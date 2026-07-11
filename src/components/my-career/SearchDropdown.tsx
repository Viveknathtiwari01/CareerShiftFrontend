import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface SearchDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
}

export function SearchDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
}: SearchDropdownProps) {
  const [open, setOpen] = useState(false);
  
  const isOtherSelected = value === "Other";
  const [customValue, setCustomValue] = useState(options.includes(value) ? "" : value);
  const displayValue = isOtherSelected ? "Other" : (options.includes(value) ? value : "Other");

  // If a value is provided that isn't in options, we treat it as 'Other' internally for the dropdown but set customValue.

  return (
    <div className="w-full space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-14 text-base font-normal bg-card hover:bg-card/90 hover:text-foreground"
          >
            {value && options.includes(value) ? value : value && !options.includes(value) ? "Other" : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={(currentValue) => {
                      const selected = options.find((o) => o.toLowerCase() === currentValue.toLowerCase());
                      if (selected) {
                        onChange(selected);
                        if (selected !== "Other") {
                          setCustomValue("");
                        }
                      }
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        (value === option || (option === "Other" && value && !options.includes(value))) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <AnimatePresence>
        {(isOtherSelected || (value && !options.includes(value))) && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Input
              value={customValue}
              onChange={(e) => {
                setCustomValue(e.target.value);
                onChange(e.target.value);
              }}
              placeholder="Enter your job title..."
              className="h-14 text-base bg-card"
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
