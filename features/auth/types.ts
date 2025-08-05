export interface User {
  id: string
  email: string
  role: "admin"
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  expires_in: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  error: string | null
  clearError: () => void
} 