export const VERIFY_REASONS = [
  {
    value: "documents_verified",
    label: "Business Documents Verified",
  },
  {
    value: "physical_verification",
    label: "Physical Location Verified",
  },
  {
    value: "owner_verified",
    label: "Business Owner Identity Verified",
  },
  {
    value: "license_verified",
    label: "Business License Verified",
  },
] as const

export const UNVERIFY_REASONS = [
  {
    value: "documents_expired",
    label: "Business Documents Expired",
  },
  {
    value: "policy_violation",
    label: "Policy Violation",
  },
  {
    value: "false_information",
    label: "False Information Provided",
  },
  {
    value: "location_changed",
    label: "Business Location Changed",
  },
] as const

export type VerifyReason = typeof VERIFY_REASONS[number]["value"]
export type UnverifyReason = typeof UNVERIFY_REASONS[number]["value"] 