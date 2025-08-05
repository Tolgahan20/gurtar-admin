"use client"

import { useState } from "react"
import { Business, SortField } from "../types"
import { User } from "@/features/users/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { UserDetailsModal } from "@/features/users/components/user-details-modal"
import { 
  CheckCircle, 
  XCircle,
  ShieldCheck,
  ShieldAlert,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Building2,
  Loader2,
  Power,
  PowerOff,
  ChevronDown,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  Globe,
  UserIcon,
  Package,
} from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { VerifyConfirmationDialog } from "./verify-confirmation-dialog"
import { StatusConfirmationDialog } from "./status-confirmation-dialog"
import React from "react"
import { useRouter } from "next/navigation"

interface BusinessesTableProps {
  businesses: Business[]
  isLoading: boolean
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  filters: {
    sort?: SortField
    order?: "ASC" | "DESC"
  }
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  onVerifyClick: (business: Business, reason: string) => Promise<void>
  onToggleStatus: (business: Business, reason: string) => Promise<void>
  onSort: (field: SortField) => void
}

interface SortableColumnProps {
  field: SortField
  currentSort?: SortField
  currentOrder?: "ASC" | "DESC"
  onSort: (field: SortField) => void
  children: React.ReactNode
}

function SortableColumn({ field, currentSort, currentOrder, onSort, children }: SortableColumnProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 hover:bg-transparent"
      onClick={() => onSort(field)}
    >
      <span>{children}</span>
      {currentSort === field ? (
        currentOrder === "ASC" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
}

export function BusinessesTable({
  businesses,
  isLoading,
  meta,
  filters,
  onPageChange,
  onPageSizeChange,
  onVerifyClick,
  onToggleStatus,
  onSort,
}: BusinessesTableProps) {
  const router = useRouter()
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [showVerifyDialog, setShowVerifyDialog] = useState(false)
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const toggleRow = (businessId: string) => {
    const newExpandedRows = new Set(expandedRows)
    if (newExpandedRows.has(businessId)) {
      newExpandedRows.delete(businessId)
    } else {
      newExpandedRows.add(businessId)
    }
    setExpandedRows(newExpandedRows)
  }

  const handleVerifyClick = (business: Business) => {
    setSelectedBusiness(business)
    setShowVerifyDialog(true)
  }

  const handleStatusClick = (business: Business) => {
    setSelectedBusiness(business)
    setShowStatusDialog(true)
  }

  const handleConfirmVerify = async (business: Business, reason: string) => {
    setLoadingAction(`verify-${business.id}`)
    try {
      await onVerifyClick(business, reason)
    } finally {
      setLoadingAction(null)
    }
  }

  const handleConfirmStatus = async (business: Business, reason: string) => {
    setLoadingAction(`status-${business.id}`)
    try {
      await onToggleStatus(business, reason)
    } finally {
      setLoadingAction(null)
    }
  }

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const handleViewOrders = (businessId: string) => {
    router.push(`/dashboard/businesses/${businessId}/orders`)
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <div className="h-96 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      </Card>
    )
  }

  if (!businesses?.length) {
    return (
      <EmptyState
        icon={Building2}
        title="No businesses found"
        description="Try adjusting your search filters or add new businesses to get started."
      />
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>
                <SortableColumn
                  field="name"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Business Name
                </SortableColumn>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>
                <SortableColumn
                  field="city"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Location
                </SortableColumn>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <SortableColumn
                  field="is_verified"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Verification
                </SortableColumn>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businesses.map((business) => (
              <React.Fragment key={business.id}>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleRow(business.id)}
                    >
                      {expandedRows.has(business.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{business.name}</TableCell>
                  <TableCell>{business.email}</TableCell>
                  <TableCell>{business.city}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "inline-flex items-center gap-1 text-sm",
                      business.is_active ? "text-green-600" : "text-red-600"
                    )}>
                      {business.is_active ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {business.is_active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "inline-flex items-center gap-1 text-sm",
                      business.is_verified ? "text-green-600" : "text-gray-600"
                    )}>
                      {business.is_verified ? (
                        <ShieldCheck className="w-3 h-3" />
                      ) : (
                        <ShieldAlert className="w-3 h-3" />
                      )}
                      {business.is_verified ? "Verified" : "Unverified"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-8 w-8",
                          business.is_verified 
                            ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                            : "text-green-600 hover:text-green-700 hover:bg-green-50"
                        )}
                        onClick={() => handleVerifyClick(business)}
                        disabled={loadingAction === `verify-${business.id}`}
                      >
                        {loadingAction === `verify-${business.id}` ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : business.is_verified ? (
                          <ShieldAlert className="h-4 w-4" />
                        ) : (
                          <ShieldCheck className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-8 w-8",
                          business.is_active 
                            ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                            : "text-green-600 hover:text-green-700 hover:bg-green-50"
                        )}
                        onClick={() => handleStatusClick(business)}
                        disabled={loadingAction === `status-${business.id}`}
                      >
                        {loadingAction === `status-${business.id}` ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : business.is_active ? (
                          <PowerOff className="h-4 w-4" />
                        ) : (
                          <Power className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRows.has(business.id) && (
                  <TableRow className="bg-gray-50/50">
                    <TableCell colSpan={7}>
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Contact Information</div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <span>{business.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-gray-500" />
                                <span>{business.phone_number}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Globe className="h-4 w-4 text-gray-500" />
                                <span>{business.website || "Not provided"}</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Location</div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span>{business.address}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span>{`${business.city}, ${business.country} ${business.postal_code}`}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Owner Information</div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              onClick={() => handleUserClick(business.owner)}
                            >
                              <UserIcon className="h-4 w-4 mr-2" />
                              {business.owner.full_name}
                            </Button>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8"
                            onClick={() => handleViewOrders(business.id)}
                          >
                            <Package className="h-4 w-4 mr-2" />
                            View Orders
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Card>
      {meta && (
        <div className="flex justify-end">
          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            pageSize={meta.limit}
            totalItems={meta.total}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      )}
      <VerifyConfirmationDialog
        business={selectedBusiness}
        open={showVerifyDialog}
        onOpenChange={setShowVerifyDialog}
        onConfirm={handleConfirmVerify}
      />
      <StatusConfirmationDialog
        business={selectedBusiness}
        open={showStatusDialog}
        onOpenChange={setShowStatusDialog}
        onConfirm={handleConfirmStatus}
      />
      <UserDetailsModal
        user={selectedUser}
        open={showUserModal}
        onOpenChange={setShowUserModal}
      />
    </div>
  )
} 