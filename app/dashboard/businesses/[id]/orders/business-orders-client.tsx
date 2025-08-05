"use client"

import { BusinessOrdersContent } from "@/features/businesses/components/business-orders-content"

interface BusinessOrdersClientProps {
  businessId: string
}

export function BusinessOrdersClient({ businessId }: BusinessOrdersClientProps) {
  return <BusinessOrdersContent businessId={businessId} />
} 