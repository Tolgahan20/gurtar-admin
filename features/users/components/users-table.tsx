"use client"

import { useState } from "react"
import { User, SortField } from "../types"
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
import { 
  Ban, 
  CheckCircle, 
  ChevronDown, 
  ChevronRight, 
  ShieldAlert, 
  ShieldCheck,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Users2,
  Loader2,
} from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { BanConfirmationDialog } from "./ban-confirmation-dialog"

interface UsersTableProps {
  users: User[]
  isLoading: boolean
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  filters: {
    sortBy?: SortField
    sortOrder?: "asc" | "desc"
  }
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  onBanClick: (user: User, reason: string) => Promise<void>
  onSort: (field: SortField) => void
}

interface SortableColumnProps {
  field: SortField
  currentSort?: SortField
  currentOrder?: "asc" | "desc"
  onSort: (field: SortField) => void
  children: React.ReactNode
}

function SortableColumn({ field, currentSort, currentOrder, onSort, children }: SortableColumnProps) {
  const isActive = currentSort === field

  return (
    <div
      className="flex items-center gap-1 cursor-pointer hover:text-gray-700"
      onClick={() => onSort(field)}
    >
      <span>{children}</span>
      {isActive ? (
        currentOrder === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="h-4 w-4 text-gray-400" />
      )}
    </div>
  )
}

export function UsersTable({
  users,
  isLoading,
  meta,
  filters,
  onPageChange,
  onPageSizeChange,
  onBanClick,
  onSort,
}: UsersTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const toggleRow = (userId: string) => {
    const newExpandedRows = new Set(expandedRows)
    if (newExpandedRows.has(userId)) {
      newExpandedRows.delete(userId)
    } else {
      newExpandedRows.add(userId)
    }
    setExpandedRows(newExpandedRows)
  }

  const handleBanClick = (user: User) => {
    setSelectedUser(user)
    setShowConfirmDialog(true)
  }

  const handleConfirmBan = async (user: User, reason: string) => {
    setLoadingAction(user.id)
    try {
      await onBanClick(user, reason)
    } finally {
      setLoadingAction(null)
    }
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

  if (!users?.length) {
    return (
      <EmptyState
        icon={Users2}
        title="No users found"
        description="Try adjusting your search filters or add new users to get started."
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
                  field="full_name"
                  currentSort={filters.sortBy}
                  currentOrder={filters.sortOrder}
                  onSort={onSort}
                >
                  Name
                </SortableColumn>
              </TableHead>
              <TableHead>
                <SortableColumn
                  field="email"
                  currentSort={filters.sortBy}
                  currentOrder={filters.sortOrder}
                  onSort={onSort}
                >
                  Email
                </SortableColumn>
              </TableHead>
              <TableHead>
                <SortableColumn
                  field="role"
                  currentSort={filters.sortBy}
                  currentOrder={filters.sortOrder}
                  onSort={onSort}
                >
                  Role
                </SortableColumn>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <SortableColumn
                  field="eco_score"
                  currentSort={filters.sortBy}
                  currentOrder={filters.sortOrder}
                  onSort={onSort}
                >
                  Eco Score
                </SortableColumn>
              </TableHead>
              <TableHead>
                <SortableColumn
                  field="total_orders"
                  currentSort={filters.sortBy}
                  currentOrder={filters.sortOrder}
                  onSort={onSort}
                >
                  Total Orders
                </SortableColumn>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <>
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="w-8">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleRow(user.id)}
                    >
                      {expandedRows.has(user.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                        {user.full_name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium">{user.full_name}</p>
                        <p className="text-sm text-gray-500">{user.phone_number}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role.replace("_", " ")}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "inline-flex items-center gap-1 text-sm",
                      user.is_banned ? "text-red-600" : "text-green-600"
                    )}>
                      {user.is_banned ? (
                        <Ban className="w-3 h-3" />
                      ) : (
                        <CheckCircle className="w-3 h-3" />
                      )}
                      {user.is_banned ? "Banned" : "Active"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{user.eco_score}</span>
                      <span className="text-sm text-gray-500 capitalize">{user.eco_level}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.total_orders}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-8 w-8",
                        user.is_banned 
                          ? "text-green-600 hover:text-green-700 hover:bg-green-50"
                          : "text-red-600 hover:text-red-700 hover:bg-red-50"
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleBanClick(user)
                      }}
                      disabled={loadingAction === user.id}
                    >
                      {loadingAction === user.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : user.is_banned ? (
                        <ShieldCheck className="h-4 w-4" />
                      ) : (
                        <ShieldAlert className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedRows.has(user.id) && (
                  <TableRow>
                    <TableCell colSpan={8} className="px-4 py-2">
                      <div className="grid grid-cols-3 gap-x-12">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-4">Personal Information</h4>
                          <div className="grid gap-y-4">
                            <div>
                              <div className="text-sm text-gray-500">Gender</div>
                              <div className="text-sm font-medium">{user.gender || "Not specified"}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Birthday</div>
                              <div className="text-sm font-medium">{user.birthday || "Not specified"}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Premium</div>
                              <div className="text-sm font-medium">{user.is_premium ? "Yes" : "No"}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-4">Account Details</h4>
                          <div className="grid gap-y-4">
                            <div>
                              <div className="text-sm text-gray-500">Created</div>
                              <div className="text-sm font-medium">{new Date(user.created_at).toLocaleDateString()}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Last Updated</div>
                              <div className="text-sm font-medium">{new Date(user.updated_at).toLocaleDateString()}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Google Account</div>
                              <div className="text-sm font-medium">{user.google_id ? "Yes" : "No"}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-4">Statistics</h4>
                          <div className="grid gap-y-4">
                            <div>
                              <div className="text-sm text-gray-500">Money Saved</div>
                              <div className="text-sm font-medium">€{user.total_money_saved}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">CO2 Saved</div>
                              <div className="text-sm font-medium">{user.total_co2_saved}kg</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
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
      <BanConfirmationDialog
        user={selectedUser}
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirmBan}
      />
    </div>
  )
} 