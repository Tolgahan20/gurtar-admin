"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UsersFiltersProps {
  onSearch: (search: string) => void
  onRoleFilter: (role: string) => void
  onStatusFilter: (status: string) => void
}

export function UsersFilters({
  onSearch,
  onRoleFilter,
  onStatusFilter,
}: UsersFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div className="flex-1 relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
        <Input
          placeholder="Search users..."
          className="pl-9 border-gray-200 bg-white shadow-none focus-visible:ring-1"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Select onValueChange={onRoleFilter}>
          <SelectTrigger className="w-full sm:w-[160px] border-gray-200 bg-white shadow-none">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="business_owner">Business Owner</SelectItem>
            <SelectItem value="worker">Worker</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={onStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px] border-gray-200 bg-white shadow-none">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
} 