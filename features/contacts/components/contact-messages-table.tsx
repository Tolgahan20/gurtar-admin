"use client"

import { useState } from "react"
import { ContactMessage, SortField } from "../types"
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
  MessageSquare,
  CheckCircle,
  XCircle,
  Mail,
  User,
  Loader2,
} from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ResolveConfirmationDialog } from "./resolve-confirmation-dialog"

interface ContactMessagesTableProps {
  messages: ContactMessage[]
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
  onResolve: (message: ContactMessage) => void
  isResolving: boolean
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

export function ContactMessagesTable({
  messages,
  isLoading,
  meta,
  filters,
  onPageChange,
  onPageSizeChange,
  onSort,
  onResolve,
  isResolving,
}: ContactMessagesTableProps) {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [showMessageDialog, setShowMessageDialog] = useState(false)
  const [showResolveDialog, setShowResolveDialog] = useState(false)

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message)
    setShowMessageDialog(true)
  }

  const handleResolveClick = (message: ContactMessage) => {
    setSelectedMessage(message)
    setShowResolveDialog(true)
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

  if (!messages?.length) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No messages found"
        description="There are no contact messages matching your filters."
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
              <TableHead>
                <SortableColumn
                  field="name"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Name
                </SortableColumn>
              </TableHead>
              <TableHead>
                <SortableColumn
                  field="email"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Email
                </SortableColumn>
              </TableHead>
              <TableHead>
                <SortableColumn
                  field="subject"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Subject
                </SortableColumn>
              </TableHead>
              <TableHead>Message</TableHead>
              <TableHead>
                <SortableColumn
                  field="is_resolved"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Status
                </SortableColumn>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(message.createdAt), "PPp")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    {message.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    {message.email}
                  </div>
                </TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleMessageClick(message)}
                  >
                    {message.message.length > 50
                      ? `${message.message.slice(0, 50)}...`
                      : message.message}
                  </Button>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      message.is_resolved
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    )}
                  >
                    {message.is_resolved ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <XCircle className="h-3 w-3 mr-1" />
                    )}
                    {message.is_resolved ? "Resolved" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      message.is_resolved
                        ? "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                        : "text-green-600 hover:text-green-700 hover:bg-green-50"
                    )}
                    onClick={() => handleResolveClick(message)}
                    disabled={isResolving}
                  >
                    {isResolving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : message.is_resolved ? (
                      <XCircle className="h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </Button>
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
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500">From</div>
              <div className="mt-1">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  {selectedMessage?.name}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-gray-500" />
                  {selectedMessage?.email}
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Subject</div>
              <div className="mt-1">{selectedMessage?.subject}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Message</div>
              <div className="mt-1 whitespace-pre-wrap">{selectedMessage?.message}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <ResolveConfirmationDialog
        message={selectedMessage}
        open={showResolveDialog}
        onOpenChange={setShowResolveDialog}
        onConfirm={(message) => {
          onResolve(message)
          setShowResolveDialog(false)
        }}
        isLoading={isResolving}
      />
    </div>
  )
} 