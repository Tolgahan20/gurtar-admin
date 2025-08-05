"use client"

import { useLogs } from "@/features/logs/hooks/useLogs"
import { LogsTable } from "@/features/logs/components/logs-table"
import { LogsFilters } from "@/features/logs/components/logs-filters"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Toaster } from "@/components/ui/sonner"

export default function LogsPage() {
  const {
    logs,
    meta,
    isLoading,
    error,
    filters,
    handlePageChange,
    handleLimitChange,
    handleActionTypeFilter,
    handleTargetTypeFilter,
    handleSearch,
    handleSort,
  } = useLogs()

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Card className="p-6">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p>Error loading logs. Please try again later.</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto py-10 space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">Admin Action Logs</h1>
          <LogsFilters
            onSearch={handleSearch}
            onActionTypeFilter={handleActionTypeFilter}
            onTargetTypeFilter={handleTargetTypeFilter}
          />
        </div>

        <LogsTable
          logs={logs}
          meta={meta}
          isLoading={isLoading}
          filters={filters}
          onPageChange={handlePageChange}
          onPageSizeChange={handleLimitChange}
          onSort={handleSort}
        />
      </div>
      <Toaster />
    </>
  )
} 