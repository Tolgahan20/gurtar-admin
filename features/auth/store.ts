import { create } from "zustand"
import { AuthState, User } from "./types"
import { storage } from "@/lib/utils/storage"

interface AuthStore extends AuthState {
  isInitialized: boolean
  initialize: () => void
  setUser: (user: User | null) => void
  setIsAuthenticated: (value: boolean) => void
  setError: (error: string | null) => void
  setIsInitialized: (value: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  error: null,

  initialize: () => {
    const user = storage.getUser()
    const accessToken = storage.getAccessToken()

    if (user && accessToken) {
      set({
        user,
        isAuthenticated: true,
        isInitialized: true,
      })
    } else {
      set({
        user: null,
        isAuthenticated: false,
        isInitialized: true,
      })
    }
  },

  setUser: (user) => {
    if (user) {
      storage.setUser(user)
    } else {
      storage.clearAuth()
    }
    set({ user })
  },

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  
  setError: (error) => set({ error }),
  
  clearError: () => set({ error: null }),

  setIsInitialized: (value) => set({ isInitialized: value }),
})) 