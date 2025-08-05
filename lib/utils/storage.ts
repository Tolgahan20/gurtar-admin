import { User } from "@/features/auth/types"

const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
} as const

export const storage = {
  getAccessToken: () => {
    if (typeof window === "undefined") return null
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  },

  setAccessToken: (token: string) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token)
  },

  getRefreshToken: () => {
    if (typeof window === "undefined") return null
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
  },

  setRefreshToken: (token: string) => {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token)
  },

  getUser: (): User | null => {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem(STORAGE_KEYS.USER)
    return user ? JSON.parse(user) : null
  },

  setUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  },

  clearAuth: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
  },
} 