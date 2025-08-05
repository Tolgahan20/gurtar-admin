export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: "Successfully logged in",
    LOGIN_ERROR: "Invalid email or password",
    LOGOUT_SUCCESS: "Successfully logged out",
    SESSION_EXPIRED: "Your session has expired. Please log in again",
    UNAUTHORIZED: "You are not authorized to access this resource",
  },
  USERS: {
    BAN_SUCCESS: "User has been banned successfully",
    UNBAN_SUCCESS: "User has been unbanned successfully",
    NOT_FOUND: "User not found",
  },
  BUSINESSES: {
    VERIFY_SUCCESS: "Business has been verified successfully",
    UNVERIFY_SUCCESS: "Business has been unverified successfully",
    STATUS_UPDATED: "Business status has been updated successfully",
    NOT_FOUND: "Business not found",
  },
  CATEGORIES: {
    CREATE_SUCCESS: "Category created successfully",
    UPDATE_SUCCESS: "Category updated successfully",
    DELETE_SUCCESS: "Category deleted successfully",
    NOT_FOUND: "Category not found",
    HAS_BUSINESSES: "Cannot delete category because it has associated businesses",
  },
  CONTACTS: {
    RESOLVE_SUCCESS: "Contact message marked as resolved",
    UNRESOLVE_SUCCESS: "Contact message marked as unresolved",
    NOT_FOUND: "Contact message not found",
    CREATE_SUCCESS: "Your message has been sent successfully",
  },
  COMMON: {
    UNKNOWN_ERROR: "An unknown error occurred",
    NETWORK_ERROR: "Network error. Please check your connection",
    VALIDATION_ERROR: "Please check your input and try again",
    FORBIDDEN: "You don't have permission to perform this action",
    SERVER_ERROR: "Server error. Please try again later",
  },
} as const 