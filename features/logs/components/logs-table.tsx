"use client"

import { AdminLog, SortField } from "../types"
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
import { format, isValid } from "date-fns"
import { 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ClipboardList,
  UserIcon,
  Ban,
  ShieldCheck,
  Power,
  MessageSquare,
  Building2,
} from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface LogsTableProps {
  logs: AdminLog[]
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
  onSort: (field: SortField) => void
}

interface SortableColumnProps {
  field: SortField
  currentSort?: SortField
  currentOrder?: "ASC" | "DESC"
  onSort: (field: SortField) => void
  children: React.ReactNode
}

const ACTION_ICONS = {
  ban: Ban,
  unban: Ban,
  verify: ShieldCheck,
  unverify: ShieldCheck,
  activate: Power,
  deactivate: Power,
  resolve: MessageSquare,
} as const

const TARGET_ICONS = {
  user: UserIcon,
  business: Building2,
  contact: MessageSquare,
} as const

const ACTION_COLORS = {
  ban: "bg-red-100 text-red-700",
  unban: "bg-green-100 text-green-700",
  verify: "bg-blue-100 text-blue-700",
  unverify: "bg-gray-100 text-gray-700",
  activate: "bg-green-100 text-green-700",
  deactivate: "bg-red-100 text-red-700",
  resolve: "bg-blue-100 text-blue-700",
} as const

const TARGET_COLORS = {
  user: "bg-purple-100 text-purple-700",
  business: "bg-indigo-100 text-indigo-700",
  contact: "bg-blue-100 text-blue-700",
} as const

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

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    if (!isValid(date)) {
      console.warn('Invalid date:', dateString)
      return "Invalid date"
    }
    return format(date, "PPp")
  } catch (error) {
    console.error('Error formatting date:', error)
    return "Invalid date"
  }
}

export function LogsTable({
  logs,
  isLoading,
  meta,
  filters,
  onPageChange,
  onPageSizeChange,
  onSort,
}: LogsTableProps) {
  const [selectedAdmin, setSelectedAdmin] = useState<User | null>(null)
  const [showAdminModal, setShowAdminModal] = useState(false)

  const handleAdminClick = (admin: User) => {
    setSelectedAdmin(admin)
    setShowAdminModal(true)
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

  if (!logs?.length) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No logs found"
        description="Try adjusting your search filters to find what you're looking for."
      />
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <SortableColumn
                  field="createdAt"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Timestamp
                </SortableColumn>
              </TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>
                <SortableColumn
                  field="action_type"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Action
                </SortableColumn>
              </TableHead>
              <TableHead>
                <SortableColumn
                  field="target_type"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Target
                </SortableColumn>
              </TableHead>
              <TableHead className="w-full">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => {
              const ActionIcon = ACTION_ICONS[log.action_type as keyof typeof ACTION_ICONS] || ClipboardList
              const TargetIcon = TARGET_ICONS[log.target_type as keyof typeof TARGET_ICONS] || ClipboardList
              const actionColor = ACTION_COLORS[log.action_type as keyof typeof ACTION_COLORS] || "bg-gray-100 text-gray-700"
              const targetColor = TARGET_COLORS[log.target_type as keyof typeof TARGET_COLORS] || "bg-gray-100 text-gray-700"

              return (
                <TableRow key={log.id}>
                  <TableCell className="whitespace-nowrap">
                    {formatDate(log.createdAt)}
                  </TableCell>
                  <TableCell>
                    {log.admin ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => handleAdminClick(log.admin)}
                      >
                        <UserIcon className="h-4 w-4 mr-2" />
                        {log.admin.full_name || 'Unknown Admin'}
                      </Button>
                    ) : (
                      <span className="text-gray-500 text-sm flex items-center">
                        <UserIcon className="h-4 w-4 mr-2" />
                        System
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("capitalize", actionColor)}>
                      <ActionIcon className="h-3 w-3 mr-1" />
                      {log.action_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("capitalize", targetColor)}>
                      <TargetIcon className="h-3 w-3 mr-1" />
                      {log.target_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {log.description}
                  </TableCell>
                </TableRow>
              )
            })}
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
      <UserDetailsModal
        user={selectedAdmin}
        open={showAdminModal}
        onOpenChange={setShowAdminModal}
      />
    </div>
  )
} 