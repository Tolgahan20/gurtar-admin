"use client"

import type { ContactMessagesFilters } from "../types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Search } from "lucide-react"

interface ContactMessagesFiltersProps {
  filters: ContactMessagesFilters
  onChange: (filters: ContactMessagesFilters) => void
}

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "resolved", label: "Resolved" },
  { value: "unresolved", label: "Unresolved" },
] as const

export function ContactMessagesFilters({ filters, onChange }: ContactMessagesFiltersProps) {
  const handleStatusChange = (value: string) => {
    onChange({
      ...filters,
      is_resolved: value === "all" ? undefined : value === "resolved",
    })
  }

  const handleSearchChange = (value: string) => {
    onChange({
      ...filters,
      search: value || undefined,
    })
  }

  const getStatusValue = () => {
    if (filters.is_resolved === undefined) return "all"
    return filters.is_resolved ? "resolved" : "unresolved"
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Status</span>
        </div>
        <Select
          value={getStatusValue()}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Search</span>
        </div>
        <Input
          placeholder="Search in messages..."
          value={filters.search || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="max-w-xs"
        />
      </div>
    </Card>
  )
} 