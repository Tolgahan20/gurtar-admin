"use client"

import { useEffect } from "react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { useRouter, usePathname } from "next/navigation"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && isAuthenticated && pathname === "/login") {
      router.replace("/dashboard")
    }
  }, [isAuthenticated, isLoading, router, pathname])

  return <>{children}</>
} 