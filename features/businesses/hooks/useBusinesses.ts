import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { businessesApi } from "../api"
import {  BusinessesFilters, SortField } from "../types"

export function useBusinesses() {
  const [filters, setFilters] = useState<BusinessesFilters>({
    page: 1,
    limit: 10,
  })

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["businesses", filters],
    queryFn: () => businessesApi.getBusinesses(filters),
  })

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }))
  }

  const handleVerificationFilter = (status: string) => {
    if (status === "all") {
      const { is_verified: _, ...rest } = filters
      setFilters({ ...rest, page: 1 })
    } else {
      setFilters(prev => ({ ...prev, is_verified: status === "verified", page: 1 }))
    }
  }

  const handleActiveFilter = (status: string) => {
    if (status === "all") {
      const { is_active: _, ...rest } = filters
      setFilters({ ...rest, page: 1 })
    } else {
      setFilters(prev => ({ ...prev, is_active: status === "active", page: 1 }))
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
    businesses: data?.data ?? [],
    meta: data?.meta,
    isLoading,
    error,
    filters,
    refetch,
    handlePageChange,
    handleVerificationFilter,
    handleActiveFilter,
    handleSearch,
    handleLimitChange,
    handleSort,
  }
} 