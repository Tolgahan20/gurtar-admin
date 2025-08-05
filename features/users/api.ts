import axiosInstance from "@/lib/axios"
import { ENDPOINTS } from "@/constants/endpoints"
import { BanUserDto, UsersFilters, UsersResponse } from "./types"

interface UsersApi {
  getUsers: (filters: UsersFilters) => Promise<UsersResponse>
  banUser: (userId: string, data: BanUserDto) => Promise<void>
  unbanUser: (userId: string, data: BanUserDto) => Promise<void>
}

export const usersApi: UsersApi = {
  getUsers: async (filters: UsersFilters): Promise<UsersResponse> => {
    const params = new URLSearchParams()
    
    if (filters.page) params.append("page", filters.page.toString())
    if (filters.limit) params.append("limit", filters.limit.toString())
    if (filters.role) params.append("role", filters.role)
    if (filters.is_banned !== undefined) params.append("is_banned", filters.is_banned.toString())
    if (filters.search) params.append("search", filters.search)
    if (filters.sort) params.append("sort", filters.sort)
    if (filters.order) params.append("order", filters.order)

    const response = await axiosInstance.get<UsersResponse>(
      `${ENDPOINTS.ADMIN.USERS}?${params.toString()}`
    )
    return response.data
  },

  banUser: async (userId: string, data: BanUserDto): Promise<void> => {
    await axiosInstance.patch(`${ENDPOINTS.ADMIN.USERS}/${userId}/ban`, data)
  },

  unbanUser: async (userId: string, data: BanUserDto): Promise<void> => {
    await axiosInstance.patch(`${ENDPOINTS.ADMIN.USERS}/${userId}/ban`, data)
  },
} 