"use client"

import { useState } from "react"
import { useContacts } from "@/features/contacts/hooks/useContacts"
import { ContactMessagesTable } from "@/features/contacts/components/contact-messages-table"
import { ContactMessagesFilters } from "@/features/contacts/components/contact-messages-filters"
import { ContactFormDialog } from "@/features/contacts/components/contact-form-dialog"
import type { ContactMessagesFilters as Filters, ContactMessage } from "@/features/contacts/types"
import { Button } from "@/components/ui/button"
import { MessageSquarePlus } from "lucide-react"

export default function ContactMessagesPage() {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 10,
  })
  const [showContactForm, setShowContactForm] = useState(false)

  const { data, isLoading, toggleResolved, isResolving } = useContacts(filters)

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

  const handleResolve = (message: ContactMessage) => {
    toggleResolved({
      id: message.id,
      dto: { is_resolved: !message.is_resolved },
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Contact Messages</h1>
        <Button onClick={() => setShowContactForm(true)}>
          <MessageSquarePlus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>
      <ContactMessagesFilters
        filters={filters}
        onChange={setFilters}
      />
      <ContactMessagesTable
        messages={data?.data ?? []}
        isLoading={isLoading}
        meta={data?.meta}
        filters={filters}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSort={handleSort}
        onResolve={handleResolve}
        isResolving={isResolving}
      />
      <ContactFormDialog
        open={showContactForm}
        onOpenChange={setShowContactForm}
      />
    </div>
  )
} 