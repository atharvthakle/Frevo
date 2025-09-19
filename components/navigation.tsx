"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Vault,
  ArrowRightLeft,
  FileText,
  Briefcase,
  GraduationCap,
  User,
  Search,
  Menu,
  X,
  UserPlus,
  Sparkles,
  Zap,
} from "lucide-react"

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Vaults", href: "/vaults", icon: Vault },
  { name: "Convert", href: "/convert", icon: ArrowRightLeft },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Get Hired", href: "/jobs", icon: Briefcase },
  { name: "Learn", href: "/learn", icon: GraduationCap },
  { name: "Profile", href: "/profile", icon: User },
]

const onboardingItem = { name: "Get Started", href: "/onboarding", icon: UserPlus }

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle smart search commands like "convert $500", "download FIRC", etc.
    console.log("Search query:", searchQuery)
  }

  const isHomePage = pathname === "/"
  const showNavigationTabs = !isHomePage

  return (
    <nav className="bg-gradient-to-r from-card/95 via-card/98 to-card/95 border-b border-border/50 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/images/logo.png" alt="Frevo Logo" width={32} height={32} className="rounded-lg" />
            {showNavigationTabs && (
              <Badge
                variant="secondary"
                className="text-xs bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30"
              >
                Level 3
              </Badge>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {isHomePage && (
              <>
                <Link href={onboardingItem.href}>
                  <Button className="flex items-center space-x-2 gradient-primary text-white border-0 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300">
                    <UserPlus className="h-4 w-4" />
                    <span className="text-sm font-medium">{onboardingItem.name}</span>
                  </Button>
                </Link>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex items-center space-x-1 text-foreground/60">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span className="text-sm">Join the Creator Economy</span>
                  </div>
                  <div className="w-px h-4 bg-border/50" />
                  <div className="flex items-center space-x-1 text-foreground/60">
                    <Zap className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">Gen Z First</span>
                  </div>
                </div>
              </>
            )}

            {showNavigationTabs &&
              navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`flex items-center space-x-2 transition-all duration-300 ${
                        isActive
                          ? "text-foreground bg-gradient-to-r from-secondary/80 to-secondary/60 shadow-sm"
                          : "text-foreground/70 hover:text-foreground hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Button>
                  </Link>
                )
              })}
          </div>

          {/* Smart Search Bar - only show when not on home page */}
          {showNavigationTabs && (
            <div className="hidden lg:block">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                <Input
                  type="text"
                  placeholder="Try 'convert $500' or 'download FIRC'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-gradient-to-r from-muted/50 to-muted/30 border-muted/50 focus:border-primary/50 backdrop-blur-sm transition-all duration-300"
                />
              </form>
            </div>
          )}

          {/* Mobile menu button - only show when not on home page */}
          {showNavigationTabs && (
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground/70 hover:text-foreground hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 transition-all duration-300"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation - only show when not on home page */}
        {isOpen && showNavigationTabs && (
          <div className="md:hidden py-4 border-t border-border/50 bg-gradient-to-b from-card/50 to-card/80 backdrop-blur-sm">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start space-x-3 transition-all duration-300 ${
                        isActive
                          ? "text-foreground bg-gradient-to-r from-secondary/80 to-secondary/60"
                          : "text-foreground/70 hover:text-foreground hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Search */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                <Input
                  type="text"
                  placeholder="Smart search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gradient-to-r from-muted/50 to-muted/30 border-muted/50 focus:border-primary/50 backdrop-blur-sm transition-all duration-300"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
