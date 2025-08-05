import { useQuery } from "@tanstack/react-query"
import { BusinessOrdersFilters } from "../types"
import { getBusinessOrders } from "../api"

export const useBusinessOrders = (businessId: string, filters: BusinessOrdersFilters) => {
  return useQuery({
    queryKey: ["business-orders", businessId, filters],
    queryFn: () => getBusinessOrders(businessId, filters),
    enabled: !!businessId,
  })
} 