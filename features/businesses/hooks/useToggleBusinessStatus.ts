import { useMutation, useQueryClient } from "@tanstack/react-query"
import { businessesApi } from "../api"
import { Business } from "../types"
import { toast } from "sonner"
import { MESSAGES } from "@/constants/messages"

export function useToggleBusinessStatus() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ businessId, reason }: { businessId: string; reason: string }) => {
      if (!reason?.trim()) {
        throw new Error("Reason is required")
      }

      return businessesApi.toggleBusinessStatus(businessId, { reason: reason.trim() })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] })
      toast.success(MESSAGES.BUSINESSES.STATUS_UPDATED)
    },
    onError: (error: Error) => {
      if (error.message === "Reason is required") {
        toast.error(MESSAGES.COMMON.VALIDATION_ERROR)
      } else {
        toast.error(MESSAGES.COMMON.SERVER_ERROR)
      }
      console.error("Toggle business status error:", error)
    },
  })

  const handleToggleStatus = (business: Business, reason: string): Promise<void> => {
    if (!reason?.trim()) {
      toast.error(MESSAGES.COMMON.VALIDATION_ERROR)
      return Promise.reject(new Error("Reason is required"))
    }

    return mutation.mutateAsync({
      businessId: business.id,
      reason,
    })
  }

  return {
    handleToggleStatus,
    isLoading: mutation.isPending,
  }
} 