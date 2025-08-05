import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCategories, createCategory, updateCategory, deleteCategory, getSubcategories } from "../api"
import type { CategoriesFilters, CreateCategoryDto, UpdateCategoryDto } from "../types"
import { toast } from "sonner"
import { MESSAGES } from "@/constants/messages"

interface ApiErrorResponse {
  message: string | string[]
  error: string
  statusCode: number
}

export const useCategories = (filters: CategoriesFilters = {}) => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["categories", filters],
    queryFn: () => getCategories(filters),
    staleTime: 30000, // Consider data fresh for 30 seconds
  })

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: (dto: CreateCategoryDto) => createCategory(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success(MESSAGES.CATEGORIES.CREATE_SUCCESS)
    },
    onError: (error: unknown) => {
      const apiError = error as ApiErrorResponse
      toast.error(apiError.message || MESSAGES.COMMON.UNKNOWN_ERROR)
    },
  })

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCategoryDto }) =>
      updateCategory(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success(MESSAGES.CATEGORIES.UPDATE_SUCCESS)
    },
    onError: (error: unknown) => {
      const apiError = error as ApiErrorResponse
      toast.error(apiError.message || MESSAGES.COMMON.UNKNOWN_ERROR)
    },
  })

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success(MESSAGES.CATEGORIES.DELETE_SUCCESS)
    },
    onError: (error: unknown) => {
      const apiError = error as ApiErrorResponse
      const errorMessage = apiError.message

      if (errorMessage === "Cannot delete category with associated businesses") {
        toast.error(MESSAGES.CATEGORIES.HAS_BUSINESSES)
      } else {
        toast.error(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage || MESSAGES.COMMON.UNKNOWN_ERROR)
      }
    },
  })

  return {
    categories: data?.data ?? [],
    meta: data?.meta,
    isLoading,
    create,
    isCreating,
    update,
    isUpdating,
    remove,
    isDeleting,
  }
}

export const useSubcategories = (categoryId: string | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: () => getSubcategories(categoryId!),
    enabled: !!categoryId,
  })

  return {
    subcategories: data ?? [],
    isLoading,
  }
} 