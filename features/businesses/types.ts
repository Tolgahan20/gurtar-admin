import { User } from "@/features/users/types"

export interface Package {
  id: string
  name: string
  description: string
  image_url: string
  original_price: number
  price: number
  estimated_weight: number
  quantity_available: number
  pickup_start_time: Date
  pickup_end_time: Date
  allergens: string[]
  is_active: boolean
  business: Business
  category: {
    id: string
    name: string
  }
  subcategory?: {
    id: string
    name: string
  }
}

export interface BusinessOrder {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  quantity: number
  total_price: string
  money_saved: string
  co2_saved_kg: string
  status: 'pending' | 'confirmed' | 'picked_up' | 'cancelled'
  user: User
  package: Package
  picked_up_by_worker?: User
}

export interface BusinessOrdersResponse {
  data: BusinessOrder[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export type OrderSortField = 'createdAt' | 'status' | 'total_price' | 'quantity'
export type OrderSortOrder = 'ASC' | 'DESC'

export interface BusinessOrdersFilters {
  page?: number
  limit?: number
  status?: BusinessOrder['status']
  sort?: OrderSortField
  order?: OrderSortOrder
}

export interface Business {
  id: string
  name: string
  description: string
  phone_number: string
  email: string
  address: string
  city: string
  country: string
  postal_code: string
  category_id: string
  logo_url: string
  cover_image_url: string
  website?: string
  is_verified: boolean
  is_active: boolean
  owner: User
  created_at: string
  updated_at: string
}

export interface VerifyBusinessDto {
  reason: string
}

export interface ToggleStatusDto {
  reason: string
}

export interface BusinessesResponse {
  data: Business[]
  meta: {
    total: number
    totalPages: number
  }
}

export type SortField = 'created_at' | 'name' | 'city' | 'is_verified'
export type SortOrder = 'ASC' | 'DESC'

export interface BusinessesFilters {
  page?: number
  limit?: number
  is_verified?: boolean
  is_active?: boolean
  city?: string
  search?: string
  sort?: SortField
  order?: SortOrder
} 