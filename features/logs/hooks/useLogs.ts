/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { adminLogsApi } from "../api"
import { AdminLogsFilters, SortField } from "../types"

export function useLogs() {
  const [filters, setFilters] = useState<AdminLogsFilters>({
    page: 1,
    limit: 10,
  })

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin-logs", filters],
    queryFn: () => adminLogsApi.getLogs(filters),
  })

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }))
  }

  const handleActionTypeFilter = (actionType: string) => {
    if (actionType === "all") {
      const { action_type: _, ...rest } = filters
      setFilters({ ...rest, page: 1 })
    } else {
      setFilters(prev => ({ ...prev, action_type: actionType, page: 1 }))
    }
  }

  const handleTargetTypeFilter = (targetType: string) => {
    if (targetType === "all") {
      const { target_type: _, ...rest } = filters
      setFilters({ ...rest, page: 1 })
    } else {
      setFilters(prev => ({ ...prev, target_type: targetType, page: 1 }))
    }
  }

  const handleSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search, page: 1 }))
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

  return {
    logs: data?.data ?? [],
    meta: data?.meta,
    isLoading,
    error,
    filters,
    refetch,
    handlePageChange,
    handleActionTypeFilter,
    handleTargetTypeFilter,
    handleSearch,
    handleLimitChange,
    handleSort,
  }
} 