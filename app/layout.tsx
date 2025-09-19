import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import CustomCursor from "@/components/custom-cursor" // Added custom cursor import
import "./globals.css"

export const metadata: Metadata = {
  title: "FREVO : Gen-Z Fintech Platform",
  description: "Money, compliance, identity, jobs, education, and community for creators",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <CustomCursor /> {/* Added custom cursor component */}
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
