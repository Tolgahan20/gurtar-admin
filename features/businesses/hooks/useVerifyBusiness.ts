import { useMutation, useQueryClient } from "@tanstack/react-query"
import { businessesApi } from "../api"
import { Business } from "../types"
import { toast } from "sonner"
import { MESSAGES } from "@/constants/messages"
import { VERIFY_REASONS, UNVERIFY_REASONS } from "../constants"

export function useVerifyBusiness() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ businessId, reason, isVerifying }: { businessId: string; reason: string; isVerifying: boolean }) => {
      if (!reason?.trim()) {
        throw new Error("Reason is required")
      }
      
      // Get the appropriate reasons list based on the action
      const reasonsList = isVerifying ? VERIFY_REASONS : UNVERIFY_REASONS
      // If it's a predefined reason, use the label instead of the value
      const predefinedReason = reasonsList.find(r => r.value === reason)
      const finalReason = predefinedReason ? predefinedReason.label : reason.trim()

      return businessesApi.verifyBusiness(businessId, { reason: finalReason })
    },
    onSuccess: (_, { isVerifying }) => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] })
      toast.success(isVerifying ? MESSAGES.BUSINESSES.VERIFY_SUCCESS : MESSAGES.BUSINESSES.UNVERIFY_SUCCESS)
    },
    onError: (error: Error) => {
      if (error.message === "Reason is required") {
        toast.error(MESSAGES.COMMON.VALIDATION_ERROR)
      } else {
        toast.error(MESSAGES.COMMON.SERVER_ERROR)
      }
      console.error("Verify business error:", error)
    },
  })

  const handleVerifyBusiness = (business: Business, reason: string): Promise<void> => {
    if (!reason?.trim()) {
      toast.error(MESSAGES.COMMON.VALIDATION_ERROR)
      return Promise.reject(new Error("Reason is required"))
    }

    return mutation.mutateAsync({
      businessId: business.id,
      reason,
      isVerifying: !business.is_verified,
    })
  }

  return {
    handleVerifyBusiness,
    isLoading: mutation.isPending,
  }
} 