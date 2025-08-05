"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ContactForm } from "./contact-form"

interface ContactFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactFormDialog({ open, onOpenChange }: ContactFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Message</DialogTitle>
        </DialogHeader>
        <ContactForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
} 