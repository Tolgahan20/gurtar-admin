"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { User } from "../types"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { 
  Crown, 
  Building2, 
  UserCog, 
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  UserCircle,
  Trophy,
  Coins,
  PackageSearch,
} from "lucide-react"
import Image from "next/image"

interface UserDetailsModalProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const roleIcons = {
  admin: Crown,
  business_owner: Building2,
  worker: UserCog,
  user: UserIcon,
}

const ecoLevelColors = {
  beginner: "bg-gray-500",
  saver: "bg-green-500",
  champion: "bg-blue-500",
  eco_hero: "bg-purple-500",
}

export function UserDetailsModal({
  user,
  open,
  onOpenChange,
}: UserDetailsModalProps) {
  if (!user) return null

  const RoleIcon = roleIcons[user.role]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="flex items-start gap-4">
            <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 relative">
              <Image 
                src={user.profile_image_url} 
                alt={user.full_name}
                width={80}
                height={80}
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{user.full_name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <RoleIcon className="h-4 w-4" />
                <span className="capitalize">{user.role.replace("_", " ")}</span>
              </div>
              <Badge 
                variant={user.is_banned ? "destructive" : "secondary"}
                className="mt-2"
              >
                {user.is_banned ? "Banned" : "Active"}
              </Badge>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{user.phone_number}</span>
            </div>
            {user.birthday && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{format(new Date(user.birthday), "PPP")}</span>
              </div>
            )}
            {user.gender && (
              <div className="flex items-center gap-2 text-sm">
                <UserCircle className="h-4 w-4 text-gray-500" />
                <span className="capitalize">{user.gender}</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Eco Level</span>
              </div>
              <Badge variant="secondary" className={ecoLevelColors[user.eco_level]}>
                {user.eco_level.replace("_", " ").toUpperCase()}
              </Badge>
              <div className="text-sm text-gray-500">
                Score: {user.eco_score}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <PackageSearch className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Orders</span>
              </div>
              <div className="text-2xl font-semibold">{user.total_orders}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Money Saved</span>
              </div>
              <div className="text-2xl font-semibold">€{user.total_money_saved}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">CO2 Saved</span>
              </div>
              <div className="text-2xl font-semibold">{user.total_co2_saved}kg</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 