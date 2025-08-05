export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1"

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    VERIFY: "/auth/verify",
  },
  USERS: {
    LIST: "/admin/users",
    BAN: (id: string) => `/admin/users/${id}/ban`,
    DETAILS: (id: string) => `/admin/users/${id}`,
  },
  BUSINESSES: {
    LIST: "/admin/businesses",
    VERIFY: (id: string) => `/admin/businesses/${id}/verify`,
    DETAILS: (id: string) => `/admin/businesses/${id}`,
    ORDERS: (id: string) => `/admin/businesses/${id}/orders`,
    TOGGLE_STATUS: (id: string) => `/admin/businesses/${id}/toggle-status`,
  },
  CATEGORIES: {
    LIST: "/categories",
    CREATE: "/categories",
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,
    SUBCATEGORIES: (id: string) => `/categories/${id}/subcategories`,
  },
  ADMIN: {
    USERS: "/admin/users",
    BUSINESSES: "/admin/businesses",
    LOGS: "/admin/logs",
  },
  CONTACTS: {
    LIST: "/contact/admin",
    RESOLVE: (id: string) => `/contact/admin/${id}/resolve`,
    CREATE: "/contact",
  },
} as const 