import axiosInstance from "@/lib/axios"
import { ENDPOINTS } from "@/constants/endpoints"
import { AuthResponse, LoginCredentials, User } from "./types"
import { storage } from "@/lib/utils/storage"
import { extractUserFromToken } from "@/lib/utils/jwt"

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<{ user: User } & AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials)
    const { access_token, refresh_token, expires_in } = response.data
    
    // Extract user from token and store auth data
    const user = extractUserFromToken(access_token)
    if (!user) {
      throw new Error("Invalid token received")
    }

    // Store auth data
    storage.setAccessToken(access_token)
    storage.setRefreshToken(refresh_token)
    storage.setUser(user)

    return {
      access_token,
      refresh_token,
      expires_in,
      user,
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT)
    } finally {
      storage.clearAuth()
    }
  },

  refresh: async (): Promise<AuthResponse> => {
    const refreshToken = storage.getRefreshToken()
    const response = await axiosInstance.post<AuthResponse>(ENDPOINTS.AUTH.REFRESH, {
      refresh_token: refreshToken
    })
    
    const { access_token } = response.data
    if (access_token) {
      storage.setAccessToken(access_token)
      
      // Update user data from new token
      const user = extractUserFromToken(access_token)
      if (user) {
        storage.setUser(user)
      }
    }
    
    return response.data
  },
} 