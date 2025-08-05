import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getContactMessages, resolveContactMessage } from "../api"
import type { ContactMessagesFilters, UpdateContactStatusDto } from "../types"
import { toast } from "sonner"
import { MESSAGES } from "@/constants/messages"

export const useContacts = (filters: ContactMessagesFilters) => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["contacts", filters],
    queryFn: () => getContactMessages(filters),
  })

  const { mutate: toggleResolved, isPending: isResolving } = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateContactStatusDto }) =>
      resolveContactMessage(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] })
      toast.success(MESSAGES.CONTACTS.RESOLVE_SUCCESS)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    data,
    isLoading,
    toggleResolved,
    isResolving,
  }
} 