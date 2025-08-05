export interface Category {
  id: string
  name: string
  description: string
  parent_id: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  subcategories?: Category[]
}

export interface CategoriesFilters {
  page?: number
  limit?: number
  search?: string
  parent_id?: string | null
  sort?: SortField
  order?: "ASC" | "DESC"
  include_subcategories?: boolean
}

export interface CategoriesResponse {
  data: Category[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface SubcategoriesResponse {
  data: Category[]
}

export interface CreateCategoryDto {
  name: string
  description: string
  parent_id?: string | null
}

export interface UpdateCategoryDto {
  name: string
  description: string
  parent_id?: string | null
}

export type SortField = "name" | "description" | "createdAt" | "updatedAt" 