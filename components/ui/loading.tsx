"use client"

import { cn } from "@/lib/utils"

interface LoadingProps {
  fullScreen?: boolean
  className?: string
}

export function Loading({ fullScreen = false, className }: LoadingProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullScreen && "fixed inset-0 bg-white/80 backdrop-blur-sm z-50",
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin">
          <svg
            className="h-full w-full"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v4m0 4v4m-6-3h4m4 0h4"
              className="opacity-30"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10"
              className="opacity-75"
            />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
} 