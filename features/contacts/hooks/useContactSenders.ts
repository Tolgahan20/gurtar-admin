import { useQuery } from "@tanstack/react-query"
import { getContactMessages } from "../api"

interface ContactSender {
  name: string
  email: string
}

export const useContactSenders = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["contact-senders"],
    queryFn: async () => {
      const response = await getContactMessages({
        limit: 100, // Get a large number to find unique senders
      })

      // Get unique senders by email
      const uniqueSenders = new Map<string, ContactSender>()
      response.data.forEach((message) => {
        uniqueSenders.set(message.email, {
          name: message.name,
          email: message.email,
        })
      })

      return Array.from(uniqueSenders.values())
    },
  })

  return {
    senders: data ?? [],
    isLoading,
  }
} 