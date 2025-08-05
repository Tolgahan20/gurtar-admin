"use client"

import { Card } from "@/components/ui/card"
import {
  Users,
  Store,
  FileText,
  MessageSquare,
  FolderTree,
} from "lucide-react"

const stats = [
  {
    name: "Total Users",
    value: "1,234",
    icon: Users,
    description: "Active users on the platform",
  },
  {
    name: "Businesses",
    value: "56",
    icon: Store,
    description: "Registered businesses",
  },
  {
    name: "Admin Actions",
    value: "789",
    icon: FileText,
    description: "Actions in the last 30 days",
  },
  {
    name: "Contact Messages",
    value: "23",
    icon: MessageSquare,
    description: "Unresolved messages",
  },
  {
    name: "Categories",
    value: "12",
    icon: FolderTree,
    description: "Active business categories",
  },
]

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <stat.icon className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
