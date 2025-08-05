"use client"

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"
import type { CategoriesFilters } from "../types"

interface CategoriesFiltersProps {
  filters: CategoriesFilters
  onChange: (filters: CategoriesFilters) => void
}

export function CategoriesFilters({ filters, onChange }: CategoriesFiltersProps) {
  const handleSearchChange = (value: string) => {
    onChange({
      ...filters,
      search: value || undefined,
      page: 1, // Reset page when searching
    })
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 flex-1">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search categories..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>
    </Card>
  )
} 