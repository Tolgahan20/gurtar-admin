import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { usersApi } from "../api"
import { User, UsersFilters, SortField, SortOrder } from "../types"

export function useUsers() {
  const [filters, setFilters] = useState<UsersFilters>({
    page: 1,
    limit: 10,
  })

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => usersApi.getUsers(filters),
  })

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }))
  }

  const handleRoleFilter = (role: string) => {
    if (role === "all") {
      const { role: _, ...rest } = filters
      setFilters({ ...rest, page: 1 })
    } else {
      setFilters(prev => ({ ...prev, role: role as User["role"], page: 1 }))
    }
  }

  const handleSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search, page: 1 }))
  }

  const handleBanStatusFilter = (status: string) => {
    if (status === "all") {
      const { is_banned: _, ...rest } = filters
      setFilters({ ...rest, page: 1 })
    } else {
      setFilters(prev => ({ ...prev, is_banned: status === "banned", page: 1 }))
    }
  }

  const handleLimitChange = (limit: number) => {
    setFilters(prev => ({ ...prev, limit, page: 1 }))
  }

  const handleSort = (field: SortField) => {
    setFilters(prev => ({
      ...prev,
      sort: field,
      order: prev.sort === field && prev.order === "ASC" ? "DESC" : "ASC",
    }))
  }
  
  const sort = useMemo(() => ({
    sortBy: filters.sort,
    sortOrder: filters.order?.toLowerCase() as 'asc' | 'desc' | undefined,
  }), [filters.sort, filters.order])

  return {
    users: data?.data ?? [],
    meta: data?.meta,
    isLoading,
    error,
    filters: sort,
    refetch,
    handlePageChange,
    handleRoleFilter,
    handleSearch,
    handleBanStatusFilter,
    handleLimitChange,
    handleSort,
  }
}
