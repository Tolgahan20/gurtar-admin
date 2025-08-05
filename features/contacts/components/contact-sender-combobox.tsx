"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useContactSenders } from "../hooks/useContactSenders"

interface ContactSenderComboboxProps {
  value?: { name: string; email: string }
  onSelect: (value: { name: string; email: string } | undefined) => void
}

export function ContactSenderCombobox({
  value,
  onSelect,
}: ContactSenderComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const { senders, isLoading } = useContactSenders()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={isLoading}
        >
          {value
            ? `${value.name} (${value.email})`
            : "Select an existing sender..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search senders..." />
          <CommandEmpty>No sender found.</CommandEmpty>
          <CommandGroup>
            {senders.map((sender) => (
              <CommandItem
                key={sender.email}
                value={`${sender.name} ${sender.email}`}
                onSelect={() => {
                  onSelect(sender)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value?.email === sender.email ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span>{sender.name}</span>
                  <span className="text-sm text-gray-500">{sender.email}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 