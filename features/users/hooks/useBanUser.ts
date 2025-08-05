import { useMutation, useQueryClient } from "@tanstack/react-query"
import { usersApi } from "../api"
import { User } from "../types"
import { toast } from "sonner"
import { MESSAGES } from "@/constants/messages"
import { BAN_REASONS, UNBAN_REASONS } from "../constants"

export function useBanUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ userId, reason, isBanned }: { userId: string; reason: string; isBanned: boolean }) => {
      if (!reason?.trim()) {
        throw new Error("Reason is required")
      }
      
      // Get the appropriate reasons list based on the action
      const reasonsList = isBanned ? BAN_REASONS : UNBAN_REASONS
      // If it's a predefined reason, use the label instead of the value
      const predefinedReason = reasonsList.find(r => r.value === reason)
      const finalReason = predefinedReason ? predefinedReason.label : reason.trim()

      if (isBanned) {
        return usersApi.banUser(userId, { reason: finalReason })
      } else {
        return usersApi.unbanUser(userId, { reason: finalReason })
      }
    },
    onSuccess: (_, { isBanned }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success(isBanned ? MESSAGES.USERS.BAN_SUCCESS : MESSAGES.USERS.UNBAN_SUCCESS)
    },
    onError: (error: Error) => {
      if (error.message === "Reason is required") {
        toast.error(MESSAGES.COMMON.VALIDATION_ERROR)
      } else {
        toast.error(MESSAGES.COMMON.SERVER_ERROR)
      }
      console.error("Ban/unban user error:", error)
    },
  })

  const handleBanUser = (user: User, reason: string): Promise<void> => {
    if (!reason?.trim()) {
      toast.error(MESSAGES.COMMON.VALIDATION_ERROR)
      return Promise.reject(new Error("Reason is required"))
    }

    return mutation.mutateAsync({
      userId: user.id,
      reason,
      isBanned: !user.is_banned,
    })
  }

  return {
    handleBanUser,
    isLoading: mutation.isPending,
  }
} 