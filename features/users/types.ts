export interface User {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  email: string
  password_hash: string
  google_id: string | null
  full_name: string
  phone_number: string
  profile_image_url: string
  birthday: string | null
  gender: 'male' | 'female' | 'other' | null
  role: 'user' | 'business_owner' | 'worker' | 'admin'
  is_premium: boolean
  is_banned: boolean
  eco_score: number
  eco_level: 'beginner' | 'saver' | 'champion' | 'eco_hero'
  total_co2_saved: number
  total_money_saved: number
  total_orders: number
}

export interface BanUserDto {
  reason: string
}

export interface UsersResponse {
  data: User[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export type SortField = 'created_at' | 'email' | 'full_name' | 'role' | 'eco_score' | 'total_orders'
export type SortOrder = 'ASC' | 'DESC'

export interface UsersFilters {
  page?: number
  limit?: number
  role?: User['role']
  is_banned?: boolean
  search?: string
  sort?: SortField
  order?: SortOrder
} 