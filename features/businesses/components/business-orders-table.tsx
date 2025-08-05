"use client"

import { BusinessOrder, OrderSortField } from "../types"
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
import { format } from "date-fns"
import { 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Package,
  UserIcon,
} from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { UserDetailsModal } from "@/features/users/components/user-details-modal"
import { useState } from "react"
import { User } from "@/features/users/types"

interface BusinessOrdersTableProps {
  orders: BusinessOrder[]
  isLoading: boolean
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  filters: {
    sort?: OrderSortField
    order?: "ASC" | "DESC"
  }
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  onSort: (field: OrderSortField) => void
}

interface SortableColumnProps {
  field: OrderSortField
  currentSort?: OrderSortField
  currentOrder?: "ASC" | "DESC"
  onSort: (field: OrderSortField) => void
  children: React.ReactNode
}

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  picked_up: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
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

const formatPrice = (price: string | number): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price
  return `€${numericPrice.toFixed(2)}`
}

export function BusinessOrdersTable({
  orders,
  isLoading,
  meta,
  filters,
  onPageChange,
  onPageSizeChange,
  onSort,
}: BusinessOrdersTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
    setShowUserModal(true)
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

  if (!orders?.length) {
    return (
      <EmptyState
        icon={Package}
        title="No orders found"
        description="This business has no orders yet."
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
                  Date
                </SortableColumn>
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>
                <SortableColumn
                  field="quantity"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Quantity
                </SortableColumn>
              </TableHead>
              <TableHead>
                <SortableColumn
                  field="total_price"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Total Price
                </SortableColumn>
              </TableHead>
              <TableHead>
                <SortableColumn
                  field="status"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Status
                </SortableColumn>
              </TableHead>
              <TableHead>Picked Up By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(order.createdAt), "PPp")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => handleUserClick(order.user)}
                  >
                    <UserIcon className="h-4 w-4 mr-2" />
                    {order.user.full_name}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{order.package.name}</span>
                    <span className="text-sm text-gray-500">{order.package.description}</span>
                  </div>
                </TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{formatPrice(order.total_price)}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn("capitalize", STATUS_COLORS[order.status])}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {order.picked_up_by_worker ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => handleUserClick(order.picked_up_by_worker!)}
                    >
                      <UserIcon className="h-4 w-4 mr-2" />
                      {order.picked_up_by_worker.full_name}
                    </Button>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
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
      <UserDetailsModal
        user={selectedUser}
        open={showUserModal}
        onOpenChange={setShowUserModal}
      />
    </div>
  )
} 