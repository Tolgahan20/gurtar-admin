import axiosInstance from "@/lib/axios"
import { ENDPOINTS } from "@/constants/endpoints"
import { BusinessesFilters, BusinessesResponse, VerifyBusinessDto, ToggleStatusDto, BusinessOrdersResponse, BusinessOrdersFilters } from "./types"

interface BusinessesApi {
  getBusinesses: (filters: BusinessesFilters) => Promise<BusinessesResponse>
  verifyBusiness: (businessId: string, data: VerifyBusinessDto) => Promise<void>
  toggleBusinessStatus: (businessId: string, data: ToggleStatusDto) => Promise<void>
}

export const businessesApi: BusinessesApi = {
  getBusinesses: async (filters: BusinessesFilters): Promise<BusinessesResponse> => {
    const params = new URLSearchParams()
    
    if (filters.page) params.append("page", filters.page.toString())
    if (filters.limit) params.append("limit", filters.limit.toString())
    if (filters.is_verified !== undefined) params.append("is_verified", filters.is_verified.toString())
    if (filters.is_active !== undefined) params.append("is_active", filters.is_active.toString())
    if (filters.city) params.append("city", filters.city)
    if (filters.search) params.append("search", filters.search)
    if (filters.sort) params.append("sort", filters.sort)
    if (filters.order) params.append("order", filters.order)

    const response = await axiosInstance.get<BusinessesResponse>(
      `${ENDPOINTS.BUSINESSES.LIST}?${params.toString()}`
    )
    return response.data
  },

  verifyBusiness: async (businessId: string, data: VerifyBusinessDto): Promise<void> => {
    await axiosInstance.patch(`${ENDPOINTS.ADMIN.BUSINESSES}/${businessId}/verify`, data)
  },

  toggleBusinessStatus: async (businessId: string, data: ToggleStatusDto): Promise<void> => {
    await axiosInstance.patch(`${ENDPOINTS.ADMIN.BUSINESSES}/${businessId}/toggle-status`, data)
  },
}

export const getBusinessOrders = async (
  businessId: string,
  filters: BusinessOrdersFilters
): Promise<BusinessOrdersResponse> => {
  const { data } = await axiosInstance.get(ENDPOINTS.BUSINESSES.ORDERS(businessId), {
    params: filters,
  })
  return data
} 