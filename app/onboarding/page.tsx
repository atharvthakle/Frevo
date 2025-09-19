"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Briefcase,
  Code,
  Users,
  Phone,
  Mail,
  Camera,
  Shield,
  Trophy,
  Star,
  CheckCircle,
  ArrowRight,
  Upload,
  QrCode,
  Zap,
} from "lucide-react"

const personas = [
  {
    id: "freelancer",
    title: "Freelancer",
    description: "I work with international clients and need FX conversion",
    icon: User,
    color: "#6366f1",
    benefits: ["FX Conversion", "Invoice Management", "Tax Compliance", "FIRC Generation"],
  },
  {
    id: "client",
    title: "Client",
    description: "I hire freelancers and need to manage payments",
    icon: Briefcase,
    color: "#10b981",
    benefits: ["Payment Management", "Escrow Services", "Contractor Discovery", "Compliance Tools"],
  },
  {
    id: "builder",
    title: "Builder",
    description: "I'm building products and need financial tools",
    icon: Code,
    color: "#f97316",
    benefits: ["Business Banking", "Investment Tools", "Growth Analytics", "Team Management"],
  },
  {
    id: "general",
    title: "General User",
    description: "I want to manage my money better",
    icon: Users,
    color: "#ea580c",
    benefits: ["Smart Vaults", "Expense Tracking", "Financial Education", "Community Access"],
  },
]

const onboardingSteps = [
  { id: 1, title: "Choose Persona", description: "Tell us about yourself" },
  { id: 2, title: "Basic Info", description: "Name, email, and phone" },
  { id: 3, title: "KYC Verification", description: "Identity verification" },
  { id: 4, title: "Create Profile", description: "Build your Frevo ID" },
  { id: 5, title: "Welcome", description: "You're all set!" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPersona, setSelectedPersona] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    panCard: null as File | null,
    aadhaar: null as File | null,
    profilePhoto: null as File | null,
  })
  const [kycStatus, setKycStatus] = useState({
    pan: "pending",
    aadhaar: "pending",
    photo: "pending",
  })

  const currentStepData = onboardingSteps.find((step) => step.id === currentStep)
  const progress = (currentStep / onboardingSteps.length) * 100

  const handleNext = () => {
    if (currentStep < onboardingSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      window.location.href = "/"
    }
  }

  const handleFileUpload = (type: "pan" | "aadhaar" | "photo", file: File) => {
    if (type === "pan") {
      setFormData({ ...formData, panCard: file })
    } else if (type === "aadhaar") {
      setFormData({ ...formData, aadhaar: file })
    } else if (type === "photo") {
      setFormData({ ...formData, profilePhoto: file })
    }

    // Simulate verification process
    setKycStatus({ ...kycStatus, [type]: "processing" })
    setTimeout(() => {
      setKycStatus({ ...kycStatus, [type]: "verified" })
    }, 2000)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Journey</h2>
              <p className="text-muted-foreground">Select the option that best describes you</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {personas.map((persona) => {
                const Icon = persona.icon
                const isSelected = selectedPersona === persona.id
                return (
                  <Card
                    key={persona.id}
                    className={`card-float cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "ring-2 ring-primary bg-primary/10 border-primary/50 shadow-lg shadow-primary/20 scale-[1.02]"
                        : "bg-card border-border hover:bg-muted/20 hover:border-primary/30 hover:shadow-md hover:scale-[1.01]"
                    }`}
                    onClick={() => setSelectedPersona(persona.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            isSelected ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground"
                          }`}
                          style={{
                            backgroundColor: isSelected ? persona.color : `${persona.color}20`,
                            color: isSelected ? "white" : persona.color,
                          }}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle
                            className={`transition-colors duration-300 ${isSelected ? "text-primary" : "text-foreground"}`}
                          >
                            {persona.title}
                          </CardTitle>
                          <CardDescription>{persona.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">You'll get access to:</p>
                        <div className="grid grid-cols-2 gap-1">
                          {persona.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                              <CheckCircle
                                className={`h-3 w-3 transition-colors duration-300 ${isSelected ? "text-primary" : "text-secondary"}`}
                              />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Basic Information</h2>
              <p className="text-muted-foreground">Let's get to know you better</p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Alex"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Johnson"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Identity Verification</h2>
              <p className="text-muted-foreground">Upload your documents for KYC compliance</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              {/* PAN Card Upload */}
              <Card className="card-float bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    PAN Card
                    {kycStatus.pan === "verified" && <CheckCircle className="h-4 w-4 text-secondary" />}
                  </CardTitle>
                  <CardDescription>Upload a clear photo of your PAN card</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-300">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload("pan", file)
                      }}
                      className="hidden"
                      id="pan-upload"
                    />
                    <Button
                      variant="outline"
                      className="bg-transparent hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                      onClick={() => document.getElementById("pan-upload")?.click()}
                    >
                      Choose File
                    </Button>
                    {formData.panCard && (
                      <p className="text-xs text-muted-foreground mt-2">Selected: {formData.panCard.name}</p>
                    )}
                    {kycStatus.pan === "verified" && (
                      <Badge className="mt-2 bg-secondary text-secondary-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {kycStatus.pan === "processing" && (
                      <Badge className="mt-2 bg-yellow-500/20 text-yellow-600 border-yellow-500/30">
                        Processing...
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Aadhaar Upload */}
              <Card className="card-float bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Aadhaar Card
                    {kycStatus.aadhaar === "verified" && <CheckCircle className="h-4 w-4 text-secondary" />}
                  </CardTitle>
                  <CardDescription>Upload a clear photo of your Aadhaar card</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-300">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload("aadhaar", file)
                      }}
                      className="hidden"
                      id="aadhaar-upload"
                    />
                    <Button
                      variant="outline"
                      className="bg-transparent hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                      onClick={() => document.getElementById("aadhaar-upload")?.click()}
                    >
                      Choose File
                    </Button>
                    {formData.aadhaar && (
                      <p className="text-xs text-muted-foreground mt-2">Selected: {formData.aadhaar.name}</p>
                    )}
                    {kycStatus.aadhaar === "verified" && (
                      <Badge className="mt-2 bg-secondary text-secondary-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {kycStatus.aadhaar === "processing" && (
                      <Badge className="mt-2 bg-yellow-500/20 text-yellow-600 border-yellow-500/30">
                        Processing...
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Profile Photo */}
              <Card className="card-float bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Profile Photo
                    {kycStatus.photo === "verified" && <CheckCircle className="h-4 w-4 text-secondary" />}
                  </CardTitle>
                  <CardDescription>Upload a clear selfie for your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-300">
                    <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload("photo", file)
                      }}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Button
                      variant="outline"
                      className="bg-transparent hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                      onClick={() => document.getElementById("photo-upload")?.click()}
                    >
                      Choose File
                    </Button>
                    {formData.profilePhoto && (
                      <p className="text-xs text-muted-foreground mt-2">Selected: {formData.profilePhoto.name}</p>
                    )}
                    {kycStatus.photo === "verified" && (
                      <Badge className="mt-2 bg-secondary text-secondary-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {kycStatus.photo === "processing" && (
                      <Badge className="mt-2 bg-yellow-500/20 text-yellow-600 border-yellow-500/30">
                        Processing...
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Frevo ID</h2>
              <p className="text-muted-foreground">Your portable digital identity for the creator economy</p>
            </div>

            <div className="max-w-md mx-auto">
              <Card className="card-float bg-card border-border">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-foreground">
                    {formData.firstName} {formData.lastName}
                  </CardTitle>
                  <CardDescription>Level 1: Verified Creator</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Verification Status</span>
                    <Badge className="bg-secondary text-secondary-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Persona</span>
                    <Badge variant="outline">{personas.find((p) => p.id === selectedPersona)?.title}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Frevo Score</span>
                    <span className="text-sm font-bold text-foreground">100</span>
                  </div>

                  <Separator />

                  <div className="text-center">
                    <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Your portable QR portfolio</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span className="text-foreground">Identity Verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span className="text-foreground">Bank Account Ready</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span className="text-foreground">Compliance Complete</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6 text-center">
            <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center">
              <Trophy className="h-12 w-12 text-white" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to Frevo!</h2>
              <p className="text-lg text-muted-foreground mb-6">
                You've successfully created your account and earned your first achievement
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <Card className="card-float bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <Star className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-foreground">First Steps Champion</h3>
                      <p className="text-sm text-muted-foreground">Completed onboarding successfully</p>
                      <Badge className="mt-1 bg-secondary text-secondary-foreground">+50 XP</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-foreground">1</div>
                  <div className="text-xs text-muted-foreground">Level</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">100</div>
                  <div className="text-xs text-muted-foreground">Frevo Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">50</div>
                  <div className="text-xs text-muted-foreground">XP Earned</div>
                </div>
              </div>
            </div>

            <Button
              className="gradient-primary text-white px-8 py-3"
              onClick={() => (window.location.href = "/dashboard")}
            >
              <Zap className="h-4 w-4 mr-2" />
              Start Your Journey
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/images/logo.png" alt="Frevo Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-xl font-bold text-foreground">Frevo</span>
            </div>

            {currentStep < 5 && (
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  Step {currentStep} of {onboardingSteps.length}
                </div>
                <div className="w-32">
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentStep < 5 && (
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-2">
                {onboardingSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.id <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.id < currentStep ? <CheckCircle className="h-4 w-4" /> : step.id}
                    </div>
                    {index < onboardingSteps.length - 1 && (
                      <div className={`w-8 h-0.5 mx-2 ${step.id < currentStep ? "bg-primary" : "bg-muted"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-lg font-medium text-muted-foreground">{currentStepData?.title}</h1>
              <p className="text-sm text-muted-foreground">{currentStepData?.description}</p>
            </div>
          </div>
        )}

        {renderStepContent()}

        {/* Navigation Buttons */}
        {currentStep < 5 && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              className="bg-transparent hover:bg-muted/50 transition-all duration-300"
            >
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !selectedPersona) ||
                (currentStep === 2 && (!formData.firstName || !formData.lastName || !formData.email)) ||
                (currentStep === 3 &&
                  (kycStatus.pan !== "verified" || kycStatus.aadhaar !== "verified" || kycStatus.photo !== "verified"))
              }
              className="gradient-primary text-white hover:scale-105 transition-all duration-300"
            >
              {currentStep === onboardingSteps.length - 1 ? "Complete Setup" : "Continue"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
