"use client"

import type { BusinessOrder, BusinessOrdersFilters } from "../types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Package } from "lucide-react"

interface BusinessOrdersFiltersProps {
  filters: BusinessOrdersFilters
  onChange: (filters: BusinessOrdersFilters) => void
}

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "picked_up", label: "Picked Up" },
  { value: "cancelled", label: "Cancelled" },
] as const

export function BusinessOrdersFilters({ filters, onChange }: BusinessOrdersFiltersProps) {
  const handleStatusChange = (value: string) => {
    onChange({
      ...filters,
      status: value === "all" ? undefined : (value as BusinessOrder["status"]),
    })
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Status</span>
        </div>
        <Select
          value={filters.status || "all"}
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
      </div>
    </Card>
  )
} 