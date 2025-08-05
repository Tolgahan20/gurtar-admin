"use client"

import { useState } from "react"
import { useBusinessOrders } from "@/features/businesses/hooks/useBusinessOrders"
import { BusinessOrdersTable } from "@/features/businesses/components/business-orders-table"
import { BusinessOrdersFilters } from "@/features/businesses/components/business-orders-filters"
import type { BusinessOrdersFilters as Filters } from "@/features/businesses/types"

interface BusinessOrdersContentProps {
  businessId: string
}

export function BusinessOrdersContent({ businessId }: BusinessOrdersContentProps) {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 10,
  })

  const { data, isLoading } = useBusinessOrders(businessId, filters)

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  const handlePageSizeChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }))
  }

  const handleSort = (field: Filters["sort"]) => {
    setFilters((prev) => ({
      ...prev,
      sort: field,
      order: prev.sort === field && prev.order === "ASC" ? "DESC" : "ASC",
    }))
  }

  return (
    <div className="space-y-4">
      <BusinessOrdersFilters
        filters={filters}
        onChange={setFilters}
      />
      <BusinessOrdersTable
        orders={data?.data ?? []}
        isLoading={isLoading}
        meta={data?.meta}
        filters={filters}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSort={handleSort}
      />
    </div>
  )
} 