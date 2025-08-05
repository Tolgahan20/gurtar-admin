"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/features/auth/store"
import { Loading } from "@/components/ui/loading"

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { initialize, isInitialized } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (!isInitialized) {
    return <Loading fullScreen />
  }

  return <>{children}</>
} 