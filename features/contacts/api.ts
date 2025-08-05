import axiosInstance from "@/lib/axios"
import { ENDPOINTS } from "@/constants/endpoints"
import { ContactMessagesResponse, ContactMessagesFilters, UpdateContactStatusDto, CreateContactMessageDto } from "./types"



export const getContactMessages = async (
  filters: ContactMessagesFilters
): Promise<ContactMessagesResponse> => {
  const { data } = await axiosInstance.get(ENDPOINTS.CONTACTS.LIST, {
    params: filters,
  })
  return data
}

export const resolveContactMessage = async (
  id: string,
  dto: UpdateContactStatusDto
): Promise<void> => {
  await axiosInstance.patch(ENDPOINTS.CONTACTS.RESOLVE(id), dto)
}

export const createContactMessage = async (
  dto: CreateContactMessageDto
): Promise<void> => {
  await axiosInstance.post(ENDPOINTS.CONTACTS.CREATE, dto)
} 