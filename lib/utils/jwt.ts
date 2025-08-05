import { User } from "@/features/auth/types"

export function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
  } catch (e) {
    console.debug("Error parsing JWT:", e)
    return null
  }
}

export function extractUserFromToken(token: string): User | null {
  const payload = parseJwt(token)
  if (!payload) return null

  return {
    id: payload.sub,
    email: payload.email,
    role: payload.role,
  }
} 