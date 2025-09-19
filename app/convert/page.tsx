"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRightLeft,
  DollarSign,
  Clock,
  Download,
  Info,
  TrendingUp,
  TrendingDown,
  Lock,
  Unlock,
  FileText,
  Calculator,
  Zap,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock exchange rate data
const rateHistory = [
  { time: "09:00", rate: 83.25 },
  { time: "09:30", rate: 83.18 },
  { time: "10:00", rate: 83.32 },
  { time: "10:30", rate: 83.28 },
  { time: "11:00", rate: 83.35 },
  { time: "11:30", rate: 83.42 },
  { time: "12:00", rate: 83.38 },
  { time: "12:30", rate: 83.45 },
]

const recentTransactions = [
  { id: 1, amount: 500, rate: 83.25, inr: 41625, date: "2024-01-15", status: "completed" },
  { id: 2, amount: 1200, rate: 83.18, inr: 99816, date: "2024-01-12", status: "completed" },
  { id: 3, amount: 800, rate: 83.32, inr: 66656, date: "2024-01-10", status: "completed" },
]

export default function ConvertPage() {
  const [usdAmount, setUsdAmount] = useState("")
  const [currentRate, setCurrentRate] = useState(83.42)
  const [isRateLocked, setIsRateLocked] = useState(false)
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0)
  const [rateChange, setRateChange] = useState(0.17)
  const [rateChangePercent, setRateChangePercent] = useState(0.2)

  // Simulate rate updates
  useEffect(() => {
    if (!isRateLocked) {
      const interval = setInterval(() => {
        const change = (Math.random() - 0.5) * 0.1
        setCurrentRate((prev) => Number((prev + change).toFixed(2)))
        setRateChange(change)
        setRateChangePercent(Number(((change / currentRate) * 100).toFixed(2)))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isRateLocked, currentRate])

  // Handle rate lock countdown
  useEffect(() => {
    if (isRateLocked && lockTimeRemaining > 0) {
      const interval = setInterval(() => {
        setLockTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRateLocked(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isRateLocked, lockTimeRemaining])

  const handleLockRate = () => {
    setIsRateLocked(true)
    setLockTimeRemaining(300) // 5 minutes in seconds
  }

  const handleUnlockRate = () => {
    setIsRateLocked(false)
    setLockTimeRemaining(0)
  }

  const calculateConversion = () => {
    const amount = Number.parseFloat(usdAmount) || 0
    const conversionFee = amount * 0.015 // 1.5% fee
    const serviceFee = 2.99 // Fixed service fee
    const totalFees = conversionFee + serviceFee
    const netAmount = amount - totalFees
    const inrAmount = netAmount * currentRate

    return {
      usdAmount: amount,
      conversionFee,
      serviceFee,
      totalFees,
      netAmount,
      inrAmount,
      effectiveRate: amount > 0 ? inrAmount / amount : 0,
    }
  }

  const conversion = calculateConversion()

  const handleConvert = () => {
    if (!usdAmount || Number.parseFloat(usdAmount) <= 0) return

    // Handle conversion logic here
    console.log("Converting:", conversion)

    // Reset form
    setUsdAmount("")
    setIsRateLocked(false)
    setLockTimeRemaining(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <ArrowRightLeft className="h-8 w-8" />
            Currency Conversion
          </h1>
          <p className="text-muted-foreground">Convert USD to INR with transparent fees and instant FIRC generation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Conversion Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Rate Card */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    USD to INR
                  </CardTitle>
                  <Badge variant={rateChange >= 0 ? "secondary" : "destructive"} className="flex items-center gap-1">
                    {rateChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {rateChange >= 0 ? "+" : ""}
                    {rateChange.toFixed(2)} ({rateChangePercent >= 0 ? "+" : ""}
                    {rateChangePercent}%)
                  </Badge>
                </div>
                <CardDescription>Live exchange rate with 5-minute lock option</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl font-bold text-foreground">₹{currentRate}</div>
                    <div className="text-sm text-muted-foreground">per USD</div>
                  </div>

                  <div className="flex items-center gap-3">
                    {isRateLocked ? (
                      <div className="text-center">
                        <Badge className="bg-primary text-primary-foreground mb-2 flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          Rate Locked
                        </Badge>
                        <div className="text-sm text-muted-foreground">{formatTime(lockTimeRemaining)} remaining</div>
                        <Progress value={(lockTimeRemaining / 300) * 100} className="w-24 h-2 mt-1" />
                      </div>
                    ) : (
                      <Button onClick={handleLockRate} className="gradient-secondary text-white">
                        <Lock className="h-4 w-4 mr-2" />
                        Lock Rate (5 min)
                      </Button>
                    )}

                    {isRateLocked && (
                      <Button variant="outline" onClick={handleUnlockRate} className="bg-transparent">
                        <Unlock className="h-4 w-4 mr-2" />
                        Unlock
                      </Button>
                    )}
                  </div>
                </div>

                {/* Rate Chart */}
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rateHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#d1d5db" fontSize={10} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#374151",
                          border: "1px solid #4b5563",
                          borderRadius: "8px",
                          color: "#ffffff",
                        }}
                      />
                      <Line type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Calculator */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Convert USD to INR
                </CardTitle>
                <CardDescription>Enter amount to see breakdown and fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="usd-amount">USD Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="usd-amount"
                      type="number"
                      placeholder="1000"
                      value={usdAmount}
                      onChange={(e) => setUsdAmount(e.target.value)}
                      className="pl-10 text-lg"
                    />
                  </div>
                </div>

                {usdAmount && Number.parseFloat(usdAmount) > 0 && (
                  <div className="space-y-4">
                    <Separator />

                    {/* Fee Breakdown */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Fee Breakdown
                      </h4>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">USD Amount</span>
                          <span className="font-medium text-foreground">${conversion.usdAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conversion Fee (1.5%)</span>
                          <span className="text-accent">-${conversion.conversionFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service Fee</span>
                          <span className="text-accent">-${conversion.serviceFee.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span className="text-foreground">Net USD Amount</span>
                          <span className="text-foreground">${conversion.netAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Exchange Rate</span>
                          <span className="text-foreground">₹{currentRate}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-foreground">You'll Receive</span>
                          <span className="text-secondary">₹{conversion.inrAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Effective Rate</span>
                          <span className="text-muted-foreground">₹{conversion.effectiveRate.toFixed(2)} per USD</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleConvert}
                      className="w-full gradient-primary text-white text-lg py-6"
                      disabled={!isRateLocked && Number.parseFloat(usdAmount) > 100}
                    >
                      <ArrowRightLeft className="h-5 w-5 mr-2" />
                      {!isRateLocked && Number.parseFloat(usdAmount) > 100
                        ? "Lock Rate First for Large Amounts"
                        : `Convert $${usdAmount} to INR`}
                    </Button>

                    {!isRateLocked && Number.parseFloat(usdAmount) > 100 && (
                      <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                        <div className="flex items-start gap-2 text-sm">
                          <Clock className="h-4 w-4 text-accent mt-0.5" />
                          <div>
                            <p className="text-foreground font-medium">Lock recommended for large amounts</p>
                            <p className="text-muted-foreground">
                              Amounts over $100 should use rate lock to avoid market fluctuations
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Why This Fee? */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Why This Fee?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="text-foreground font-medium">Transparent Pricing</p>
                    <p className="text-muted-foreground">1.5% conversion fee + $2.99 service fee. No hidden charges.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <div>
                    <p className="text-foreground font-medium">Instant FIRC</p>
                    <p className="text-muted-foreground">Automatic Foreign Inward Remittance Certificate generation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="text-foreground font-medium">Compliance Included</p>
                    <p className="text-muted-foreground">
                      All regulatory compliance and reporting handled automatically.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download FIRC
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  View Transaction History
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calculator className="h-4 w-4 mr-2" />
                  Tax Calculator
                </Button>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Conversions</CardTitle>
                <CardDescription>Your last 3 transactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        ${transaction.amount} → ₹{transaction.inr.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Rate: ₹{transaction.rate} • {transaction.date}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Market Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-secondary" />
                    <span className="text-foreground font-medium">Rate Trending Up</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">USD/INR has gained 0.3% in the last hour</p>
                </div>

                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-foreground font-medium">Best Time to Convert</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Historically, rates are better between 10 AM - 2 PM IST
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Today's High</span>
                    <span className="text-foreground font-medium">₹83.52</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Today's Low</span>
                    <span className="text-foreground font-medium">₹83.15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly Average</span>
                    <span className="text-foreground font-medium">₹83.28</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Tips */}
            <Card className="card-float bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Lock rates for amounts over $100 to avoid volatility</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">FIRC is automatically generated for all conversions</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Convert during market hours for better rates</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
