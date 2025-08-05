"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Users,
  Store,
  FileText,
  MessageSquare,
  FolderTree,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    name: "Businesses",
    href: "/dashboard/businesses",
    icon: Store,
  },
  {
    name: "Admin Logs",
    href: "/dashboard/logs",
    icon: FileText,
  },
  {
    name: "Contact Messages",
    href: "/dashboard/contacts",
    icon: MessageSquare,
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: FolderTree,
  },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  isMobile: boolean
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isCollapsed, onToggle, isMobile, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  const sidebarContent = (
    <>
      <div className={cn(
        "flex h-16 items-center border-b px-4",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && <span className="text-xl font-bold">Gurtar</span>}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                isCollapsed && "justify-center"
              )}
              onClick={isMobile ? onClose : undefined}
            >
              <item.icon
                className={cn(
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white",
                  "h-6 w-6 flex-shrink-0",
                  isCollapsed ? "mx-0" : "mr-3"
                )}
              />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-64 p-0 bg-gray-900">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className={cn(
      "flex h-full flex-col bg-gray-900 text-white",
      isCollapsed ? "w-16" : "w-64",
      "transition-width duration-200"
    )}>
      {sidebarContent}
    </div>
  )
} 