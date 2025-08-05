"use client"

import { useState } from "react"
import { Category, SortField } from "../types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FolderTree,
  Pencil,
  Trash2,
  ChevronRight,
  ChevronDown,
  Plus,
} from "lucide-react"
import { Pagination } from "@/components/ui/pagination"

interface CategoriesTableProps {
  categories: Category[]
  isLoading: boolean
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  filters: {
    sort?: SortField
    order?: "ASC" | "DESC"
    parent_id?: string | null
  }
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  onSort: (field: SortField) => void
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
  onAddSubcategory: (parentCategory: Category) => void
}

interface SortableColumnProps {
  field: SortField
  currentSort?: SortField
  currentOrder?: "ASC" | "DESC"
  onSort: (field: SortField) => void
  children: React.ReactNode
}

function SortableColumn({ field, currentSort, currentOrder, onSort, children }: SortableColumnProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 hover:bg-transparent"
      onClick={() => onSort(field)}
    >
      <span>{children}</span>
      {currentSort === field ? (
        currentOrder === "ASC" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
}

function CategoryRow({
  category,
  onEdit,
  onDelete,
  onAddSubcategory,
  level = 0,
}: {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
  onAddSubcategory: (category: Category) => void
  level?: number
}) {
  const [expanded, setExpanded] = useState(false)
  const hasSubcategories = category.subcategories && category.subcategories.length > 0

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          <div className="flex items-center">
            <div style={{ width: `${level * 24}px` }} />
            {hasSubcategories && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 mr-2"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            )}
            {category.name}
          </div>
        </TableCell>
        <TableCell>{category.description}</TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
              onClick={() => onAddSubcategory(category)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => onEdit(category)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onDelete(category)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {expanded && category.subcategories?.map((subcategory) => (
        <CategoryRow
          key={subcategory.id}
          category={subcategory}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddSubcategory={onAddSubcategory}
          level={level + 1}
        />
      ))}
    </>
  )
}

export function CategoriesTable({
  categories,
  isLoading,
  meta,
  filters,
  onPageChange,
  onPageSizeChange,
  onSort,
  onEdit,
  onDelete,
  onAddSubcategory,
}: CategoriesTableProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <div className="h-96 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      </Card>
    )
  }

  if (!categories?.length) {
    return (
      <EmptyState
        icon={FolderTree}
        title="No categories found"
        description="Try adjusting your search filters or create a new category."
      />
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <SortableColumn
                  field="name"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Name
                </SortableColumn>
              </TableHead>
              <TableHead>
                <SortableColumn
                  field="description"
                  currentSort={filters.sort}
                  currentOrder={filters.order}
                  onSort={onSort}
                >
                  Description
                </SortableColumn>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddSubcategory={onAddSubcategory}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
      {meta && (
        <div className="flex justify-end">
          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            pageSize={meta.limit}
            totalItems={meta.total}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      )}
    </div>
  )
} 