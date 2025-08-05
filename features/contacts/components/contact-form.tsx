"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useCreateContact } from "../hooks/useCreateContact"
import type { CreateContactMessageDto } from "../types"
import { ContactSenderCombobox } from "./contact-sender-combobox"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

interface ContactFormProps {
  onSuccess?: () => void
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const { mutate: createContact, isPending } = useCreateContact()
  const [selectedSender, setSelectedSender] = useState<{ name: string; email: string }>()

  const form = useForm<CreateContactMessageDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = (data: CreateContactMessageDto) => {
    createContact(data, {
      onSuccess: () => {
        form.reset()
        onSuccess?.()
      },
    })
  }

  const handleSenderSelect = (sender: { name: string; email: string } | undefined) => {
    setSelectedSender(sender)
    if (sender) {
      form.setValue("name", sender.name)
      form.setValue("email", sender.email)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Select Existing Sender
          </label>
          <ContactSenderCombobox
            value={selectedSender}
            onSelect={handleSenderSelect}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <div>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="John Doe"
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
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <div>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="john@example.com"
              className={form.formState.errors.email ? "border-red-500" : ""}
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject
          </label>
          <div>
            <Input
              id="subject"
              {...form.register("subject")}
              placeholder="Question about business verification"
              className={form.formState.errors.subject ? "border-red-500" : ""}
            />
            {form.formState.errors.subject && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.subject.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <div>
            <Textarea
              id="message"
              {...form.register("message")}
              placeholder="I would like to know more about..."
              rows={5}
              className={form.formState.errors.message ? "border-red-500" : ""}
            />
            {form.formState.errors.message && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Message
        </Button>
      </form>
    </Card>
  )
} 