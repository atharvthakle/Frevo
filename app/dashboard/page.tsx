"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp,
  DollarSign,
  IndianRupee,
  Vault,
  ArrowRightLeft,
  FileText,
  AlertTriangle,
  Trophy,
  Target,
  Zap,
  Users,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

// Mock data for charts
const vaultData = [
  { name: "Savings", value: 45, amount: 4500, color: "#6366f1" },
  { name: "Lifestyle", value: 30, amount: 3000, color: "#10b981" },
  { name: "Taxes", value: 15, amount: 1500, color: "#f97316" },
  { name: "Goals", value: 10, amount: 1000, color: "#ea580c" },
]

const incomeData = [
  { month: "Jan", income: 8500, expenses: 6200 },
  { month: "Feb", income: 9200, expenses: 6800 },
  { month: "Mar", income: 11000, expenses: 7500 },
  { month: "Apr", income: 12500, expenses: 8200 },
  { month: "May", income: 10800, expenses: 7800 },
  { month: "Jun", income: 13200, expenses: 8900 },
]

const conversionRates = [
  { time: "9:00", rate: 83.25 },
  { time: "10:00", rate: 83.18 },
  { time: "11:00", rate: 83.32 },
  { time: "12:00", rate: 83.28 },
  { time: "1:00", rate: 83.35 },
  { time: "2:00", rate: 83.42 },
]

export default function DashboardPage() {
  const totalVaultAmount = vaultData.reduce((sum, item) => sum + item.amount, 0)
  const lifestyleVault = vaultData.find((v) => v.name === "Lifestyle")
  const lifestylePercentage = lifestyleVault ? (lifestyleVault.amount / totalVaultAmount) * 100 : 0

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Balances */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, Alex !
                <span className="ml-2">👋</span>
              </h1>
              <p className="text-muted-foreground">You're crushing it this month! Level 3 Creator</p>
            </div>

            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Trophy className="h-3 w-3" />
                Frevo Score: 847
              </Badge>
              <Button className="gradient-primary text-white">
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Quick Convert
              </Button>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="card-float bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">USD Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">$2,847.50</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-secondary flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5% from last month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card className="card-float bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">INR Balance</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">₹45,230</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-secondary flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.2% from last month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card className="card-float bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Vaults</CardTitle>
                <Vault className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">₹{totalVaultAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-secondary flex items-center">
                    <Target className="h-3 w-3 mr-1" />4 active vaults
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vault Overview with Donut Chart */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Vault className="h-5 w-5" />
                  Vault Distribution
                </CardTitle>
                <CardDescription>Your money is working smart across different goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="w-64 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={vaultData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {vaultData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [`₹${vaultData.find((d) => d.value === value)?.amount}`, name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex-1 space-y-4">
                    {vaultData.map((vault, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vault.color }} />
                          <span className="text-sm font-medium text-foreground">{vault.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-foreground">₹{vault.amount.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{vault.value}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Income vs Expenses Timeline */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Income & Expenses</CardTitle>
                <CardDescription>Your financial flow over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={incomeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#d1d5db" />
                      <YAxis stroke="#d1d5db" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#374151",
                          border: "1px solid #4b5563",
                          borderRadius: "8px",
                          color: "#ffffff",
                        }}
                      />
                      <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} name="Income" />
                      <Line type="monotone" dataKey="expenses" stroke="#f97316" strokeWidth={3} name="Expenses" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Rate Tracker */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5" />
                  Live USD/INR Rate
                </CardTitle>
                <CardDescription>Lock this rate for 5 minutes with one click</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-foreground">₹83.42</div>
                    <div className="text-sm text-secondary flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +0.17 (0.2%)
                    </div>
                  </div>
                  <Button className="gradient-secondary text-white">Lock Rate</Button>
                </div>

                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={conversionRates}>
                      <Line type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={2} dot={false} />
                      <XAxis dataKey="time" hide />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#374151",
                          border: "1px solid #4b5563",
                          borderRadius: "8px",
                          color: "#ffffff",
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Nudges & Quick Actions */}
          <div className="space-y-6">
            {/* Smart Nudges */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Smart Nudges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Lifestyle Vault Alert</p>
                      <p className="text-xs text-foreground/80 mt-1">
                        You're at {lifestylePercentage.toFixed(0)}% of your lifestyle budget. Consider moving some to
                        savings!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Frevo Score Boost</p>
                      <p className="text-xs text-foreground/80 mt-1">
                        3 repeat clients boosted your score by +15 points this week!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Trophy className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Achievement Unlocked</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Nice save! You just leveled up your Vault game
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Invoices */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Upcoming Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">TechCorp Invoice</p>
                    <p className="text-xs text-muted-foreground">Due in 3 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">$1,200</p>
                    <Badge variant="secondary" className="text-xs">
                      Pending
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Design Studio</p>
                    <p className="text-xs text-muted-foreground">Due in 1 week</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">$850</p>
                    <Badge variant="outline" className="text-xs">
                      Draft
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Startup XYZ</p>
                    <p className="text-xs text-muted-foreground">Recurring monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">$2,000</p>
                    <Badge className="text-xs bg-secondary text-secondary-foreground">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Conversions</span>
                  <span className="text-sm font-bold text-foreground">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Invoices Sent</span>
                  <span className="text-sm font-bold text-foreground">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Vault Contributions</span>
                  <span className="text-sm font-bold text-foreground">₹15,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Learning XP</span>
                  <span className="text-sm font-bold text-foreground">+240</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
