import axios from "axios"
import { API_BASE_URL } from "@/constants/endpoints"
import { MESSAGES } from "@/constants/messages"
import { storage } from "@/lib/utils/storage"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      // Clear Authorization header if no token exists
      delete config.headers.Authorization
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle network errors
    if (!error.response) {
      return Promise.reject(new Error(MESSAGES.COMMON.NETWORK_ERROR))
    }

    // Handle unauthorized errors and token refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = storage.getRefreshToken()
        if (!refreshToken) {
          throw new Error("No refresh token available")
        }

        const response = await axiosInstance.post("/auth/refresh", {
          refresh_token: refreshToken
        })
        const { access_token } = response.data

        storage.setAccessToken(access_token)
        originalRequest.headers.Authorization = `Bearer ${access_token}`

        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.debug("Refresh error:", refreshError)
        // Clear all auth data on refresh failure
        storage.clearAuth()
        delete axiosInstance.defaults.headers.common["Authorization"]
        
        // Clear cookies
        document.cookie.split(";").forEach((cookie) => {
          const [name] = cookie.split("=")
          document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        })

        window.location.href = "/login"
        return Promise.reject(new Error(MESSAGES.AUTH.SESSION_EXPIRED))
      }
    }

    // Return the original error response for API errors
    if (error.response?.data) {
      return Promise.reject(error.response.data)
    }

    // Handle other common errors
    return Promise.reject(new Error(MESSAGES.COMMON.UNKNOWN_ERROR))
  }
)

export default axiosInstance 