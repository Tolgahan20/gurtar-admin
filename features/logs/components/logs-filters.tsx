"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LogsFiltersProps {
  onSearch: (search: string) => void
  onActionTypeFilter: (actionType: string) => void
  onTargetTypeFilter: (targetType: string) => void
}

const ACTION_TYPES = [
  { value: "ban", label: "Ban" },
  { value: "unban", label: "Unban" },
  { value: "verify", label: "Verify" },
  { value: "unverify", label: "Unverify" },
  { value: "activate", label: "Activate" },
  { value: "deactivate", label: "Deactivate" },
  { value: "resolve", label: "Resolve" },
] as const

const TARGET_TYPES = [
  { value: "user", label: "User" },
  { value: "business", label: "Business" },
  { value: "contact", label: "Contact" },
] as const

export function LogsFilters({
  onSearch,
  onActionTypeFilter,
  onTargetTypeFilter,
}: LogsFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div className="flex-1 relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
        <Input
          placeholder="Search logs..."
          className="pl-9 border-gray-200 bg-white shadow-none focus-visible:ring-1"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Select onValueChange={onActionTypeFilter}>
          <SelectTrigger className="w-full sm:w-[160px] border-gray-200 bg-white shadow-none">
            <SelectValue placeholder="Action Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            {ACTION_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={onTargetTypeFilter}>
          <SelectTrigger className="w-full sm:w-[160px] border-gray-200 bg-white shadow-none">
            <SelectValue placeholder="Target Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Targets</SelectItem>
            {TARGET_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
} 