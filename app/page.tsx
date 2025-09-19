"use client"

import { Navigation } from "@/components/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Vault,
  ArrowRightLeft,
  GraduationCap,
  Sparkles,
  Star,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-teal-600/15"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/10 to-blue-500/15"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent"></div>

        <div
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-2xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        <div
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-500/25 to-teal-500/25 rounded-full blur-xl animate-pulse delay-1000"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-br from-teal-500/25 to-purple-500/25 rounded-full blur-xl animate-pulse delay-2000"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-lg animate-pulse delay-3000"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div
          className="absolute bottom-1/3 right-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-lg animate-pulse delay-4000"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image src="/images/frevo-logo.png" alt="FREVO" width={300} height={80} className="h-56 w-auto" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
                </div>
                <div className="absolute -bottom-2 -left-2">
                  <Star className="h-4 w-4 text-blue-400 animate-pulse delay-1000" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Fiance, simplified for{" "}
              <span className="inline-block px-3 py-1 gradient-primary text-white rounded-lg animate-pulse shadow-lg">
                GEN-Z
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              The Gen Z-first fintech platform that blends money management, compliance, identity verification, job
              opportunities, education, and community in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/onboarding">
                <Button
                  size="lg"
                  className="gradient-primary text-white border-0 px-8 py-3 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 bg-muted/50 backdrop-blur-sm border-border/50 hover:bg-muted/70 hover:scale-105 transition-all duration-300"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
              <Badge
                variant="secondary"
                className="flex items-center gap-2 bg-muted/50 backdrop-blur-sm hover:bg-muted/70 transition-all duration-300"
              >
                <Zap className="h-3 w-3" />
                Instant Setup
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-2 bg-muted/50 backdrop-blur-sm hover:bg-muted/70 transition-all duration-300"
              >
                <Shield className="h-3 w-3" />
                Bank-Grade Security
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-2 bg-muted/50 backdrop-blur-sm hover:bg-muted/70 transition-all duration-300"
              >
                <Users className="h-3 w-3" />
                10K+ Users
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-background to-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-foreground border-purple-500/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Get Started in Minutes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Your Digital Identity Awaits</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete KYC verification, choose your persona, and unlock your Frevo Verified ID - all in one seamless
              flow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="card-float bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-border/50 hover:border-purple-500/40 transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <CardTitle className="text-foreground">Choose Persona</CardTitle>
                <CardDescription>
                  Freelancer, Client, Builder, or General User - pick what fits you best
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-float bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-border/50 hover:border-blue-500/40 transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <CardTitle className="text-foreground">KYC Verification</CardTitle>
                <CardDescription>Quick PAN & Aadhaar verification with instant approval</CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-float bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-border/50 hover:border-teal-500/40 transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <CardTitle className="text-foreground">Frevo Verified ID</CardTitle>
                <CardDescription>Get your portable QR portfolio for the creator economy</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/onboarding">
              <Button className="gradient-primary text-white px-8 py-3 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">
                Begin Onboarding
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything you need to level up</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From smart vaults to instant FX conversion, we've got your financial journey covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-float bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50 hover:border-purple-500/30 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Vault className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-foreground">Smart Vaults</CardTitle>
                <CardDescription>Automated savings with gamified goals and spending alerts</CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-float bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50 hover:border-blue-500/30 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ArrowRightLeft className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-foreground">FX Conversion</CardTitle>
                <CardDescription>Instant USD to INR conversion with transparent fees and FIRC</CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-float bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50 hover:border-teal-500/30 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-foreground">Frevo Score</CardTitle>
                <CardDescription>Build your financial reputation with every transaction</CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-float bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50 hover:border-purple-500/30 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-foreground">Learn & Earn</CardTitle>
                <CardDescription>Gamified financial education with real rewards</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-teal-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl rounded-full"></div>
            <div className="relative bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-12 card-float">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to revolutionize your finances?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who've already leveled up their financial game with Frevo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/onboarding">
                  <Button
                    size="lg"
                    className="gradient-primary text-white px-8 py-3 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                  >
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/learn">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 bg-muted/50 backdrop-blur-sm border-border/50 hover:bg-muted/70 hover:scale-105 transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
