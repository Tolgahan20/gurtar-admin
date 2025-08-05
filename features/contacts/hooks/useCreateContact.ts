import { useMutation } from "@tanstack/react-query"
import { createContactMessage } from "../api"
import type { CreateContactMessageDto } from "../types"
import { toast } from "sonner"
import { MESSAGES } from "@/constants/messages"

export const useCreateContact = () => {
  return useMutation({
    mutationFn: (dto: CreateContactMessageDto) => createContactMessage(dto),
    onSuccess: () => {
      toast.success(MESSAGES.CONTACTS.CREATE_SUCCESS)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
} 