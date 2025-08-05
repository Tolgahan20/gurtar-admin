import { Suspense } from 'react'
import { BusinessOrdersClient } from "./business-orders-client"
import type { Metadata, ResolvingMetadata } from 'next'

// In Next.js 15, route params are now passed as a Promise.
type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // We must await the params promise to access its values.
  const { id } = await params
  const parentData = await parent
  const previousImages = parentData.openGraph?.images || []

  return {
    title: `Orders for Business ${id}`,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default async function Page({ params }: Props) {
  // We must await the params promise to access its values.
  const { id } = await params

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BusinessOrdersClient businessId={id} />
    </Suspense>
  )
} 