"use client"

import { useUsers } from "@/features/users/hooks/useUsers"
import { useBanUser } from "@/features/users/hooks/useBanUser"
import { UsersTable } from "@/features/users/components/users-table"
import { UsersFilters } from "@/features/users/components/users-filters"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Toaster } from "@/components/ui/sonner"

export default function UsersPage() {
  const {
    users,
    meta,
    isLoading,
    error,
    filters,
    handlePageChange,
    handleLimitChange,
    handleRoleFilter,
    handleSearch,
    handleBanStatusFilter,
    handleSort,
  } = useUsers()

  const { handleBanUser, isLoading: isBanActionLoading } = useBanUser()

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Card className="p-6">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p>Error loading users. Please try again later.</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto py-10 space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">Users Management</h1>
          <UsersFilters
            onSearch={handleSearch}
            onRoleFilter={handleRoleFilter}
            onStatusFilter={handleBanStatusFilter}
          />
        </div>

        <UsersTable
          users={users}
          meta={meta}
          isLoading={isLoading || isBanActionLoading}
          filters={filters}
          onPageChange={handlePageChange}
          onPageSizeChange={handleLimitChange}
          onBanClick={handleBanUser}
          onSort={handleSort}
        />
      </div>
      <Toaster />
    </>
  )
} 