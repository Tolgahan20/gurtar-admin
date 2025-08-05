import { User } from "@/features/users/types"

export type AdminActionType = 
  | 'VERIFY_BUSINESS'
  | 'SUSPEND_BUSINESS'
  | 'BAN_USER'
  | 'UNBAN_USER'
  | 'ACTIVATE_BUSINESS'
  | 'DEACTIVATE_BUSINESS'
  | string

export type AdminTargetType = 'USER' | 'BUSINESS' | string

export interface AdminLog {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  admin: User
  action_type: AdminActionType
  target_type: AdminTargetType
  target_id: string
  description: string
}

export interface AdminLogsResponse {
  data: AdminLog[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export type SortField = 'createdAt' | 'action_type' | 'target_type'
export type SortOrder = 'ASC' | 'DESC'

export interface AdminLogsFilters {
  page?: number
  limit?: number
  action_type?: AdminActionType
  target_type?: AdminTargetType
  search?: string
  sort?: SortField
  order?: SortOrder
} 