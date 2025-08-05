export const BAN_REASONS = [
  {
    value: "terms_violation",
    label: "Terms of Service Violation",
  },
  {
    value: "inappropriate_behavior",
    label: "Inappropriate Behavior",
  },
  {
    value: "spam",
    label: "Spam or Misleading Content",
  },
  {
    value: "security_concern",
    label: "Security Concern",
  },
  {
    value: "fake_account",
    label: "Fake Account",
  },
] as const

export const UNBAN_REASONS = [
  {
    value: "appeal_approved",
    label: "Appeal Approved",
  },
  {
    value: "mistake",
    label: "Ban was a Mistake",
  },
  {
    value: "time_served",
    label: "Time Served - Good Behavior",
  },
  {
    value: "warning_sufficient",
    label: "Warning Deemed Sufficient",
  },
] as const

export type BanReason = typeof BAN_REASONS[number]["value"]
export type UnbanReason = typeof UNBAN_REASONS[number]["value"] 