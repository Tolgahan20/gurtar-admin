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
import { Business } from "../types"
import { VERIFY_REASONS, UNVERIFY_REASONS } from "../constants"
import { cn } from "@/lib/utils"

interface VerifyConfirmationDialogProps {
  business: Business | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (business: Business, reason: string) => Promise<void>
}

type ReasonType = "predefined" | "custom"

export function VerifyConfirmationDialog({
  business,
  open,
  onOpenChange,
  onConfirm,
}: VerifyConfirmationDialogProps) {
  const [reasonType, setReasonType] = useState<ReasonType>("predefined")
  const [selectedReason, setSelectedReason] = useState<string>("")
  const [customReason, setCustomReason] = useState("")

  if (!business) return null

  const title = business.is_verified ? "Unverify Business" : "Verify Business"
  const description = business.is_verified
    ? `Are you sure you want to unverify ${business.name}? This will restrict their access to certain features.`
    : `Are you sure you want to verify ${business.name}? This will grant them full access to the platform.`
  const actionText = business.is_verified ? "Yes, Unverify" : "Yes, Verify"
  const reasonsList = business.is_verified ? UNVERIFY_REASONS : VERIFY_REASONS

  const handleConfirm = () => {
    const reason = reasonType === "predefined" ? selectedReason : customReason.trim()
    if (!reason) return
    onConfirm(business, reason)
    onOpenChange(false)
    // Reset form
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
    : customReason.trim().length >= 10 // Require at least 10 characters for custom reason

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
                placeholder={`Enter detailed reason for ${business.is_verified ? 'unverifying' : 'verifying'} (minimum 10 characters)`}
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
              business.is_verified ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700",
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