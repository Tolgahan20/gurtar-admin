"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import type { Category, CreateCategoryDto } from "../types"
import { useEffect } from "react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
})

interface CategoryFormDialogProps {
  category?: Category
  parentCategory?: Category
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CreateCategoryDto) => void
  isLoading: boolean
}

export function CategoryFormDialog({
  category,
  parentCategory,
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: CategoryFormDialogProps) {
  const form = useForm<CreateCategoryDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  // Reset form when category or dialog state changes
  useEffect(() => {
    if (open) {
      form.reset({
        name: category?.name ?? "",
        description: category?.description ?? "",
      })
    }
  }, [form, category, open])

  const handleSubmit = (data: CreateCategoryDto) => {
    onSubmit(data)
  }

  const title = category
    ? "Edit Category"
    : parentCategory
    ? `Add Subcategory to "${parentCategory.name}"`
    : "Create Category"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <div>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Category name"
                className={form.formState.errors.name ? "border-red-500" : ""}
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <div>
              <Textarea
                id="description"
                {...form.register("description")}
                placeholder="Category description"
                rows={3}
                className={form.formState.errors.description ? "border-red-500" : ""}
              />
              {form.formState.errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {category ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 