"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type ComboboxOption = {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  loading?: boolean
  className?: string
  // For backend search integration
  onSearchChange?: (search: string) => void
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyText = "No matching results found.",
  disabled = false,
  loading = false,
  className,
  onSearchChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  // Find the selected option to display its label
  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value),
    [value, options]
  )

  const handleSearchChange = (val: string) => {
    setSearchValue(val)
    onSearchChange?.(val)
  }

  const exactMatch = options.find((opt) => opt.label.toLowerCase() === searchValue.trim().toLowerCase())

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled || loading}
          className={cn("w-full justify-between font-normal", className, !value && "text-muted-foreground")}
        >
          {loading ? (
            <div className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          ) : selectedOption ? (
            selectedOption.label
          ) : value ? (
            value
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[var(--radix-popover-trigger-width)] p-0", className)} align="start">
        <Command shouldFilter={!onSearchChange}>
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={handleSearchChange}
            value={searchValue}
          />
          <CommandList>
            <CommandEmpty>
              {loading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </div>
              ) : searchValue ? (
                <button 
                  className="text-primary w-full text-left hover:underline text-sm px-2 py-1"
                  onClick={() => {
                    onChange(searchValue)
                    setOpen(false)
                    setSearchValue("")
                  }}
                >
                  Use "{searchValue}"
                </button>
              ) : (
                emptyText
              )}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label} // CommandItem filters by textContent by default, so value should match label or be explicitly filtered
                  onSelect={() => {
                    onChange(option.value === value ? "" : option.value)
                    setOpen(false)
                    setSearchValue("")
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
            {searchValue && !exactMatch && (
              <CommandGroup heading="Custom Option">
                <CommandItem
                  value={searchValue}
                  onSelect={() => {
                    onChange(searchValue)
                    setOpen(false)
                    setSearchValue("")
                  }}
                >
                  <Check className="mr-2 h-4 w-4 opacity-0" />
                  Use "{searchValue}"
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
