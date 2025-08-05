"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { LoadingProvider } from "@/providers/loading-provider"
import { AuthInitializer } from "@/components/auth/auth-initializer"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <LoadingProvider>
            <AuthInitializer>
              {children}
            </AuthInitializer>
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  )
}
