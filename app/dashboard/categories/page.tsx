"use client"

import { useState } from "react"
import { useCategories } from "@/features/categories/hooks/useCategories"
import { CategoriesTable } from "@/features/categories/components/categories-table"
import { CategoriesFilters } from "@/features/categories/components/categories-filters"
import { CategoryFormDialog } from "@/features/categories/components/category-form-dialog"
import { DeleteCategoryDialog } from "@/features/categories/components/delete-category-dialog"
import type { Category, CategoriesFilters as Filters, CreateCategoryDto } from "@/features/categories/types"
import { Button } from "@/components/ui/button"
import { FolderPlus } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export default function CategoriesPage() {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 10,
  })

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [parentCategory, setParentCategory] = useState<Category | null>(null)
  const [showFormDialog, setShowFormDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const {
    categories,
    meta,
    isLoading,
    create,
    isCreating,
    update,
    isUpdating,
    remove,
    isDeleting,
  } = useCategories(filters)

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  const handlePageSizeChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }))
  }

  const handleSort = (field: Filters["sort"]) => {
    setFilters((prev) => ({
      ...prev,
      sort: field,
      order: prev.sort === field && prev.order === "ASC" ? "DESC" : "ASC",
    }))
  }

  const handleShowSubcategoriesChange = (checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      include_subcategories: checked || undefined,
      page: 1, // Reset page when changing view
    }))
  }

  const handleCreate = () => {
    setSelectedCategory(null)
    setParentCategory(null)
    setShowFormDialog(true)
  }

  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
    setParentCategory(null)
    setShowFormDialog(true)
  }

  const handleAddSubcategory = (parent: Category) => {
    setSelectedCategory(null)
    setParentCategory(parent)
    setShowFormDialog(true)
  }

  const handleDelete = (category: Category) => {
    setSelectedCategory(category)
    setShowDeleteDialog(true)
  }

  const handleFormSubmit = (data: CreateCategoryDto) => {
    const dto = parentCategory
      ? { ...data, parent_id: parentCategory.id }
      : data

    if (selectedCategory) {
      update(
        { id: selectedCategory.id, dto },
        { onSuccess: () => setShowFormDialog(false) }
      )
    } else {
      create(dto, { onSuccess: () => setShowFormDialog(false) })
    }
  }

  const handleDeleteConfirm = (category: Category) => {
    remove(category.id, { onSuccess: () => setShowDeleteDialog(false) })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Button onClick={handleCreate}>
          <FolderPlus className="h-4 w-4 mr-2" />
          New Category
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <CategoriesFilters
          filters={filters}
          onChange={setFilters}
        />
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Switch
              id="show-subcategories"
              checked={!!filters.include_subcategories}
              onCheckedChange={handleShowSubcategoriesChange}
            />
            <Label htmlFor="show-subcategories">
              Show subcategories
            </Label>
          </div>
        </Card>
      </div>

      <CategoriesTable
        categories={categories}
        isLoading={isLoading}
        meta={meta}
        filters={filters}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddSubcategory={handleAddSubcategory}
      />

      <CategoryFormDialog
        category={selectedCategory ?? undefined}
        parentCategory={parentCategory ?? undefined}
        open={showFormDialog}
        onOpenChange={setShowFormDialog}
        onSubmit={handleFormSubmit}
        isLoading={isCreating || isUpdating}
      />

      <DeleteCategoryDialog
        category={selectedCategory}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  )
} 