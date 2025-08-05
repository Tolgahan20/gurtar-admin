"use client"

import { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { User } from "../types"
import { BAN_REASONS, UNBAN_REASONS } from "../constants"
import { cn } from "@/lib/utils"

interface BanConfirmationDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (user: User, reason: string) => Promise<void>
}

type ReasonType = "predefined" | "custom"

export function BanConfirmationDialog({
  user,
  open,
  onOpenChange,
  onConfirm,
}: BanConfirmationDialogProps) {
  const [reasonType, setReasonType] = useState<ReasonType>("predefined")
  const [selectedReason, setSelectedReason] = useState<string>("")
  const [customReason, setCustomReason] = useState("")

  if (!user) return null

  const title = user.is_banned ? "Unban User" : "Ban User"
  const description = user.is_banned
    ? `Are you sure you want to unban ${user.full_name}? They will regain access to the platform.`
    : `Are you sure you want to ban ${user.full_name}? This will prevent them from accessing the platform.`
  const actionText = user.is_banned ? "Yes, Unban" : "Yes, Ban"
  const reasonsList = user.is_banned ? UNBAN_REASONS : BAN_REASONS

  const handleConfirm = () => {
    const reason = reasonType === "predefined" ? selectedReason : customReason.trim()
    if (!reason) return
    onConfirm(user, reason)
    onOpenChange(false)

    setReasonType("predefined")
    setSelectedReason("")
    setCustomReason("")
  }

  const handleCancel = () => {
    setReasonType("predefined")
    setSelectedReason("")
    setCustomReason("")
    onOpenChange(false)
  }

  const isValid = reasonType === "predefined" 
    ? selectedReason !== "" 
    : customReason.trim().length >= 10 

  return (
    <AlertDialog open={open} onOpenChange={handleCancel}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="pb-4">{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Reason Type</Label>
            <RadioGroup
              defaultValue="predefined"
              value={reasonType}
              onValueChange={(value: string) => {
                setReasonType(value as ReasonType)
                // Reset values when switching types
                if (value === "predefined") {
                  setCustomReason("")
                } else {
                  setSelectedReason("")
                }
              }}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="predefined" id="predefined" />
                <Label htmlFor="predefined">Select Reason</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom Reason</Label>
              </div>
            </RadioGroup>
          </div>

          {reasonType === "predefined" ? (
            <div className="space-y-2">
              <Label>Select Reason</Label>
              <Select value={selectedReason} onValueChange={setSelectedReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  {reasonsList.map((reason) => (
                    <SelectItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Custom Reason</Label>
              <Textarea
                value={customReason}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomReason(e.target.value)}
                placeholder={`Enter detailed reason for ${user.is_banned ? 'unbanning' : 'banning'} (minimum 10 characters)`}
                className="h-20"
              />
              {customReason.trim().length > 0 && customReason.trim().length < 10 && (
                <p className="text-sm text-red-500">
                  Please provide a more detailed reason (at least 10 characters)
                </p>
              )}
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={cn(
              user.is_banned ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700",
              !isValid && "opacity-50 cursor-not-allowed"
            )}
            disabled={!isValid}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 