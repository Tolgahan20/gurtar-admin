import { LucideIcon } from "lucide-react"
import { Card } from "./card"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  className,
  children,
}: EmptyStateProps) {
  return (
    <Card className={cn("w-full", className)}>
      <div className="h-[400px] flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-5">
          {Icon && (
            <div className="flex justify-center">
              <Icon className="h-12 w-12 text-gray-400" />
            </div>
          )}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                {description}
              </p>
            )}
          </div>
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </Card>
  )
} 