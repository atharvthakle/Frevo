"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Shield, Bell, Mail, MapPin, Calendar, Award, Edit, Camera } from "lucide-react"

export default function ProfilePage() {
  const achievements = [
    {
      name: "First Vault",
      description: "Created your first savings vault",
      rarity: "Common",
      color: "bg-green-500/20 text-green-400",
    },
    {
      name: "FX Master",
      description: "Completed 10 currency conversions",
      rarity: "Rare",
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      name: "Learning Streak",
      description: "7-day learning streak",
      rarity: "Epic",
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      name: "Invoice Pro",
      description: "Generated $10K in invoices",
      rarity: "Legendary",
      color: "bg-yellow-500/20 text-yellow-400",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="h-32 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-teal-500/20 rounded-lg"></div>
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-background">
                <AvatarImage src="/professional-profile.png" />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                  AK
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0 bg-muted border-2 border-background"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-20 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Alex Kumar</h1>
              <p className="text-muted-foreground mb-4">Full-stack Developer & Creator</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Mumbai, India
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined Dec 2023
                </div>
              </div>
            </div>
            <Button className="gradient-primary text-white border-0 mt-4 sm:mt-0">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-float bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Frevo Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">847</div>
              <p className="text-xs text-muted-foreground">Level 3 Creator</p>
            </CardContent>
          </Card>

          <Card className="card-float bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">$24,500</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>

          <Card className="card-float bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Vaults Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">7</div>
              <p className="text-xs text-muted-foreground">$12,300 saved</p>
            </CardContent>
          </Card>

          <Card className="card-float bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Learning XP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">2,450</div>
              <p className="text-xs text-muted-foreground">15 courses completed</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="card-float bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Alex" className="bg-muted/50" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Kumar" className="bg-muted/50" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alex@example.com" className="bg-muted/50" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" className="bg-muted/50" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="card-float bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Your Achievements</CardTitle>
                <CardDescription>Unlock badges and level up your Frevo journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30 border border-border/50"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                        <Award className="h-6 w-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{achievement.name}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                        <Badge className={`mt-1 ${achievement.color}`}>{achievement.rarity}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="card-float bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Security Settings</CardTitle>
                <CardDescription>Manage your account security and verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="font-medium text-foreground">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">Enabled via SMS</div>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-blue-400" />
                    <div>
                      <div className="font-medium text-foreground">KYC Verification</div>
                      <div className="text-sm text-muted-foreground">Identity verified</div>
                    </div>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400">Verified</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="card-float bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Preferences</CardTitle>
                <CardDescription>Customize your Frevo experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-purple-400" />
                    <div>
                      <div className="font-medium text-foreground">Push Notifications</div>
                      <div className="text-sm text-muted-foreground">Get notified about important updates</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <div>
                      <div className="font-medium text-foreground">Email Preferences</div>
                      <div className="text-sm text-muted-foreground">Weekly summaries and tips</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
