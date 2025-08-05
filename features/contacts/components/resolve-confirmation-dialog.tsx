"use client"

import { ContactMessage } from "../types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react"

interface ResolveConfirmationDialogProps {
  message: ContactMessage | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (message: ContactMessage) => void
  isLoading: boolean
}

export function ResolveConfirmationDialog({
  message,
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}: ResolveConfirmationDialogProps) {
  if (!message) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {message.is_resolved ? "Unresolve Message" : "Resolve Message"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {message.is_resolved
              ? "Are you sure you want to mark this message as unresolved?"
              : "Are you sure you want to mark this message as resolved?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(message)}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {message.is_resolved ? "Unresolve" : "Resolve"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 