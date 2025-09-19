"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Vault, Plus, AlertTriangle, Lock, Target, TrendingUp, Zap, Trophy, Clock, Sparkles } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

// Mock vault data
const vaults = [
  {
    id: 1,
    name: "Emergency Fund",
    emoji: "🛡️",
    type: "warning",
    currentAmount: 45000,
    targetAmount: 100000,
    color: "#6366f1",
    warningThreshold: 80,
    description: "Your financial safety net",
    monthlyContribution: 5000,
    autoDeposit: true,
    achievements: ["First 10K", "Consistent Saver"],
    daysActive: 127,
  },
  {
    id: 2,
    name: "Lifestyle & Fun",
    emoji: "🎉",
    type: "warning",
    currentAmount: 28000,
    targetAmount: 35000,
    color: "#10b981",
    warningThreshold: 80,
    description: "Guilt-free spending money",
    monthlyContribution: 8000,
    autoDeposit: true,
    achievements: ["Party Planner"],
    daysActive: 89,
  },
  {
    id: 3,
    name: "Tax Savings",
    emoji: "📊",
    type: "lock",
    currentAmount: 15000,
    targetAmount: 50000,
    color: "#f97316",
    warningThreshold: 90,
    description: "Locked until tax season",
    monthlyContribution: 3000,
    autoDeposit: true,
    achievements: ["Tax Ninja"],
    daysActive: 156,
    unlockDate: "2024-03-31",
  },
  {
    id: 4,
    name: "Dream Vacation",
    emoji: "✈️",
    type: "warning",
    currentAmount: 12000,
    targetAmount: 80000,
    color: "#ea580c",
    warningThreshold: 75,
    description: "Europe trip fund",
    monthlyContribution: 4000,
    autoDeposit: false,
    achievements: [],
    daysActive: 45,
  },
]

const vaultThemes = [
  { name: "Savings", emoji: "💰", color: "#6366f1" },
  { name: "Travel", emoji: "✈️", color: "#10b981" },
  { name: "Emergency", emoji: "🛡️", color: "#f97316" },
  { name: "Investment", emoji: "📈", color: "#ea580c" },
  { name: "Education", emoji: "🎓", color: "#8b5cf6" },
  { name: "Health", emoji: "🏥", color: "#06b6d4" },
  { name: "Tech", emoji: "💻", color: "#84cc16" },
  { name: "Fun", emoji: "🎉", color: "#f59e0b" },
]

const monthlyData = [
  { month: "Jan", contributions: 15000, withdrawals: 5000 },
  { month: "Feb", contributions: 18000, withdrawals: 3000 },
  { month: "Mar", contributions: 20000, withdrawals: 8000 },
  { month: "Apr", contributions: 22000, withdrawals: 4000 },
  { month: "May", contributions: 19000, withdrawals: 6000 },
  { month: "Jun", contributions: 25000, withdrawals: 2000 },
]

export default function VaultsPage() {
  const [selectedVault, setSelectedVault] = useState(vaults[0])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newVault, setNewVault] = useState({
    name: "",
    targetAmount: "",
    type: "warning",
    theme: vaultThemes[0],
    warningThreshold: 80,
    monthlyContribution: "",
    autoDeposit: true,
  })

  const totalVaultAmount = vaults.reduce((sum, vault) => sum + vault.currentAmount, 0)
  const totalTargetAmount = vaults.reduce((sum, vault) => sum + vault.targetAmount, 0)
  const overallProgress = (totalVaultAmount / totalTargetAmount) * 100

  const getVaultProgress = (vault: (typeof vaults)[0]) => {
    return (vault.currentAmount / vault.targetAmount) * 100
  }

  const isVaultAtWarning = (vault: (typeof vaults)[0]) => {
    return getVaultProgress(vault) >= vault.warningThreshold
  }

  const handleCreateVault = () => {
    // Handle vault creation logic here
    console.log("Creating vault:", newVault)
    setIsCreateDialogOpen(false)
    // Reset form
    setNewVault({
      name: "",
      targetAmount: "",
      type: "warning",
      theme: vaultThemes[0],
      warningThreshold: 80,
      monthlyContribution: "",
      autoDeposit: true,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Vault className="h-8 w-8" />
              Your Vaults
              <Badge variant="secondary" className="flex items-center gap-1">
                <Trophy className="h-3 w-3" />
                Level 3
              </Badge>
            </h1>
            <p className="text-muted-foreground">Smart money management with gamified savings goals</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-white mt-4 lg:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Create New Vault
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Create New Vault</DialogTitle>
                <DialogDescription>Set up a new savings goal with smart alerts and gamification</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="vault-name">Vault Name</Label>
                  <Input
                    id="vault-name"
                    placeholder="e.g., Dream Car Fund"
                    value={newVault.name}
                    onChange={(e) => setNewVault({ ...newVault, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-amount">Target Amount (₹)</Label>
                  <Input
                    id="target-amount"
                    type="number"
                    placeholder="50000"
                    value={newVault.targetAmount}
                    onChange={(e) => setNewVault({ ...newVault, targetAmount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Vault Theme</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {vaultThemes.map((theme) => (
                      <Button
                        key={theme.name}
                        variant={newVault.theme.name === theme.name ? "default" : "outline"}
                        className="flex flex-col items-center p-3 h-auto"
                        onClick={() => setNewVault({ ...newVault, theme })}
                      >
                        <span className="text-lg mb-1">{theme.emoji}</span>
                        <span className="text-xs">{theme.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Vault Type</Label>
                  <Select value={newVault.type} onValueChange={(value) => setNewVault({ ...newVault, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warning">Warning Vault (Alerts at threshold)</SelectItem>
                      <SelectItem value="lock">Money Lock Vault (Restricted access)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Warning Threshold (%)</Label>
                  <Input
                    type="number"
                    min="50"
                    max="95"
                    value={newVault.warningThreshold}
                    onChange={(e) => setNewVault({ ...newVault, warningThreshold: Number.parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly-contribution">Monthly Auto-Contribution (₹)</Label>
                  <Input
                    id="monthly-contribution"
                    type="number"
                    placeholder="5000"
                    value={newVault.monthlyContribution}
                    onChange={(e) => setNewVault({ ...newVault, monthlyContribution: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-deposit"
                    checked={newVault.autoDeposit}
                    onCheckedChange={(checked) => setNewVault({ ...newVault, autoDeposit: checked })}
                  />
                  <Label htmlFor="auto-deposit">Enable auto-deposit</Label>
                </div>

                <Button onClick={handleCreateVault} className="w-full gradient-primary text-white">
                  Create Vault
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Overall Progress */}
        <Card className="card-float bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Target className="h-5 w-5" />
              Overall Progress
            </CardTitle>
            <CardDescription>You're {overallProgress.toFixed(1)}% towards your total savings goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Saved</span>
                <span className="font-bold text-foreground">₹{totalVaultAmount.toLocaleString()}</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Target: ₹{totalTargetAmount.toLocaleString()}</span>
                <span className="text-secondary font-medium">
                  ₹{(totalTargetAmount - totalVaultAmount).toLocaleString()} to go
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vault List */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {vaults.map((vault) => {
                const progress = getVaultProgress(vault)
                const isWarning = isVaultAtWarning(vault)

                return (
                  <Card
                    key={vault.id}
                    className={`card-float bg-card border-border cursor-pointer transition-all ${
                      selectedVault.id === vault.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedVault(vault)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                            style={{ backgroundColor: `${vault.color}20`, color: vault.color }}
                          >
                            {vault.emoji}
                          </div>
                          <div>
                            <CardTitle className="text-foreground flex items-center gap-2">
                              {vault.name}
                              {vault.type === "lock" && <Lock className="h-4 w-4 text-muted-foreground" />}
                              {isWarning && <AlertTriangle className="h-4 w-4 text-accent" />}
                            </CardTitle>
                            <CardDescription>{vault.description}</CardDescription>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground">
                            ₹{vault.currentAmount.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">of ₹{vault.targetAmount.toLocaleString()}</div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium text-foreground">{progress.toFixed(1)}%</span>
                        </div>
                        <Progress
                          value={progress}
                          className="h-2"
                          style={
                            {
                              "--progress-background": vault.color,
                            } as React.CSSProperties
                          }
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />₹{vault.monthlyContribution.toLocaleString()}/month
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {vault.daysActive} days
                            </span>
                          </div>

                          {vault.achievements.length > 0 && (
                            <div className="flex gap-1">
                              {vault.achievements.map((achievement, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  <Trophy className="h-2 w-2 mr-1" />
                                  {achievement}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        {isWarning && (
                          <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                            <div className="flex items-center gap-2 text-sm">
                              <AlertTriangle className="h-4 w-4 text-accent" />
                              <span className="text-foreground font-medium">
                                {vault.type === "warning"
                                  ? `You're at ${progress.toFixed(0)}% of your ${vault.name.toLowerCase()} budget!`
                                  : `Vault is ${progress.toFixed(0)}% full - consider unlocking soon`}
                              </span>
                            </div>
                          </div>
                        )}

                        {vault.type === "lock" && vault.unlockDate && (
                          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                            <div className="flex items-center gap-2 text-sm">
                              <Lock className="h-4 w-4 text-primary" />
                              <span className="text-foreground">
                                Unlocks on {new Date(vault.unlockDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Vault Details Sidebar */}
          <div className="space-y-6">
            {/* Selected Vault Details */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Vault Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-3"
                    style={{ backgroundColor: `${selectedVault.color}20`, color: selectedVault.color }}
                  >
                    {selectedVault.emoji}
                  </div>
                  <h3 className="font-bold text-foreground">{selectedVault.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedVault.description}</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <Badge variant={selectedVault.type === "lock" ? "destructive" : "secondary"}>
                      {selectedVault.type === "lock" ? (
                        <>
                          <Lock className="h-3 w-3 mr-1" />
                          Money Lock
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Warning
                        </>
                      )}
                    </Badge>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Warning at</span>
                    <span className="text-sm font-medium text-foreground">{selectedVault.warningThreshold}%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Auto-deposit</span>
                    <Badge variant={selectedVault.autoDeposit ? "secondary" : "outline"}>
                      {selectedVault.autoDeposit ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Days active</span>
                    <span className="text-sm font-medium text-foreground">{selectedVault.daysActive}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full bg-transparent" variant="outline">
                    Add Money
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline" disabled={selectedVault.type === "lock"}>
                    {selectedVault.type === "lock" ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Locked
                      </>
                    ) : (
                      "Withdraw"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Activity */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Monthly Activity</CardTitle>
                <CardDescription>Your vault contributions and withdrawals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#d1d5db" fontSize={12} />
                      <YAxis stroke="#d1d5db" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#374151",
                          border: "1px solid #4b5563",
                          borderRadius: "8px",
                          color: "#ffffff",
                        }}
                      />
                      <Bar dataKey="contributions" fill="#10b981" name="Contributions" />
                      <Bar dataKey="withdrawals" fill="#f97316" name="Withdrawals" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-medium text-foreground">Vault Master</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Created your first Money Lock vault</p>
                </div>

                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Consistency King</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">30 days of auto-deposits in a row</p>
                </div>

                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">Goal Getter</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Reached 50% of your first vault goal</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
