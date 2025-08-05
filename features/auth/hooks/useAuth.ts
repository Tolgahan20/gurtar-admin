import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../store"
import { authApi } from "../api"
import { LoginCredentials } from "../types"
import { MESSAGES } from "@/constants/messages"
import { storage } from "@/lib/utils/storage"
import { useLoading } from "@/providers/loading-provider"

export const useAuth = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { showLoading, hideLoading } = useLoading()
  const {
    user,
    isAuthenticated,
    isInitialized,
    error,
    clearError,
    setUser,
    setIsAuthenticated,
    setError,
  } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.user)
      setIsAuthenticated(true)
      setError(null)
      router.push("/dashboard")
    },
    onError: (error: Error) => {
      setError(error.message || MESSAGES.AUTH.LOGIN_ERROR)
      setIsAuthenticated(false)
      setUser(null)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setUser(null)
      setIsAuthenticated(false)
      setError(null)
      queryClient.clear()
      router.push("/login")
    },
  })

  const login = async (credentials: LoginCredentials) => {
    showLoading()
    try {
      await loginMutation.mutateAsync(credentials)
    } finally {
      hideLoading()
    }
  }

  const logout = async () => {
    showLoading()
    try {
      await logoutMutation.mutateAsync()
    } finally {
      hideLoading()
    }
  }

  const requireAuth = () => {
    if (isInitialized && !isAuthenticated) {
      router.replace("/login")
    }
  }

  const requireGuest = () => {
    if (isInitialized && isAuthenticated) {
      router.replace("/dashboard")
    }
  }

  return {
    user,
    isAuthenticated,
    isInitialized,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
    error,
    login,
    logout,
    clearError,
    requireAuth,
    requireGuest,
  }
} 