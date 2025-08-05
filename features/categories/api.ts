import axiosInstance from "@/lib/axios"
import { ENDPOINTS } from "@/constants/endpoints"
import type {
  CategoriesResponse,
  CategoriesFilters,
  CreateCategoryDto,
  UpdateCategoryDto,
  Category,
} from "./types"

export const getCategories = async (
  filters: CategoriesFilters
): Promise<CategoriesResponse> => {
  const { data } = await axiosInstance.get(ENDPOINTS.CATEGORIES.LIST, {
    params: filters,
  })
  return data
}

export const getSubcategories = async (
  categoryId: string
): Promise<Category[]> => {
  const { data } = await axiosInstance.get(ENDPOINTS.CATEGORIES.SUBCATEGORIES(categoryId))
  return data
}

export const createCategory = async (
  dto: CreateCategoryDto
): Promise<Category> => {
  const { data } = await axiosInstance.post(ENDPOINTS.CATEGORIES.CREATE, dto)
  return data
}

export const updateCategory = async (
  id: string,
  dto: UpdateCategoryDto
): Promise<Category> => {
  const { data } = await axiosInstance.put(ENDPOINTS.CATEGORIES.UPDATE(id), dto)
  return data
}

export const deleteCategory = async (id: string): Promise<void> => {
  await axiosInstance.delete(ENDPOINTS.CATEGORIES.DELETE(id))
} 