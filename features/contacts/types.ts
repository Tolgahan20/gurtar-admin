export interface ContactMessage {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  name: string
  email: string
  subject: string
  message: string
  is_resolved: boolean
}

export interface ContactMessagesResponse {
  data: ContactMessage[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export type SortField = 'createdAt' | 'name' | 'email' | 'subject' | 'is_resolved'
export type SortOrder = 'ASC' | 'DESC'

export interface ContactMessagesFilters {
  page?: number
  limit?: number
  is_resolved?: boolean
  search?: string
  sort?: SortField
  order?: SortOrder
}

export interface UpdateContactStatusDto {
  is_resolved: boolean
}

export interface CreateContactMessageDto {
  name: string
  email: string
  subject: string
  message: string
}