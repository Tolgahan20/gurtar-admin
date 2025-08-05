import axiosInstance from "@/lib/axios"
import { ENDPOINTS } from "@/constants/endpoints"
import { AdminLogsFilters, AdminLogsResponse } from "./types"

interface AdminLogsApi {
  getLogs: (filters: AdminLogsFilters) => Promise<AdminLogsResponse>
}

export const adminLogsApi: AdminLogsApi = {
  getLogs: async (filters: AdminLogsFilters): Promise<AdminLogsResponse> => {
    const params = new URLSearchParams()
    
    if (filters.page) params.append("page", filters.page.toString())
    if (filters.limit) params.append("limit", filters.limit.toString())
    if (filters.action_type) params.append("action_type", filters.action_type)
    if (filters.target_type) params.append("target_type", filters.target_type)
    if (filters.search) params.append("search", filters.search)
    if (filters.sort) params.append("sort", filters.sort)
    if (filters.order) params.append("order", filters.order)

    const response = await axiosInstance.get<AdminLogsResponse>(
      `${ENDPOINTS.ADMIN.LOGS}?${params.toString()}`
    )
    return response.data
  },
} 