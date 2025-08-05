"use client"

import { useEffect } from "react"
import { useAuth } from "@/features/auth/hooks/useAuth"

export default function RootPage() {
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        window.location.href = "/dashboard"
      } else {
        window.location.href = "/login"
      }
    }
  }, [isLoading, isAuthenticated])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return null
}
