"use client"

import { useBusinesses } from "@/features/businesses/hooks/useBusinesses"
import { useVerifyBusiness } from "@/features/businesses/hooks/useVerifyBusiness"
import { useToggleBusinessStatus } from "@/features/businesses/hooks/useToggleBusinessStatus"
import { BusinessesTable } from "@/features/businesses/components/businesses-table"
import { BusinessesFilters } from "@/features/businesses/components/businesses-filters"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Toaster } from "@/components/ui/sonner"

export default function BusinessesPage() {
  const {
    businesses,
    isLoading,
    error,
    filters,
    handlePageChange,
    handleLimitChange,
    handleVerificationFilter,
    handleActiveFilter,
    handleSearch,
    handleSort,
  } = useBusinesses()

  const { handleVerifyBusiness, isLoading: isVerifying } = useVerifyBusiness()
  const { handleToggleStatus, isLoading: isTogglingStatus } = useToggleBusinessStatus()

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Card className="p-6">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p>Error loading businesses. Please try again later.</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto py-10 space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">Businesses Management</h1>
          <BusinessesFilters
            onSearch={handleSearch}
            onVerificationFilter={handleVerificationFilter}
            onActiveFilter={handleActiveFilter}
          />
        </div>

        <BusinessesTable
          businesses={businesses}
          isLoading={isLoading || isVerifying || isTogglingStatus}
          filters={filters}
          onPageChange={handlePageChange}
          onPageSizeChange={handleLimitChange}
          onVerifyClick={handleVerifyBusiness}
          onToggleStatus={handleToggleStatus}
          onSort={handleSort}
        />
      </div>
      <Toaster />
    </>
  )
} 