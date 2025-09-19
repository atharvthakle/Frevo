"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Plus, Search, Filter, Download, Eye, Send, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function InvoicesPage() {
  const invoices = [
    {
      id: "INV-001",
      client: "TechCorp Inc.",
      amount: 2500,
      currency: "USD",
      status: "paid",
      dueDate: "2024-01-15",
      createdDate: "2024-01-01",
      description: "Web Development Services",
    },
    {
      id: "INV-002",
      client: "StartupXYZ",
      amount: 1800,
      currency: "USD",
      status: "pending",
      dueDate: "2024-01-20",
      createdDate: "2024-01-05",
      description: "UI/UX Design Project",
    },
    {
      id: "INV-003",
      client: "Digital Agency",
      amount: 3200,
      currency: "USD",
      status: "overdue",
      dueDate: "2024-01-10",
      createdDate: "2023-12-20",
      description: "Full Stack Development",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "overdue":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Invoices</h1>
            <p className="text-muted-foreground">Manage your client invoices and payments</p>
          </div>
          <Button className="gradient-primary text-white border-0 mt-4 sm:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-float bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">$7,500</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="card-float bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">$1,800</div>
              <p className="text-xs text-muted-foreground">1 invoice</p>
            </CardContent>
          </Card>

          <Card className="card-float bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">$3,200</div>
              <p className="text-xs text-muted-foreground">1 invoice</p>
            </CardContent>
          </Card>

          <Card className="card-float bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">$4,300</div>
              <p className="text-xs text-muted-foreground">2 invoices</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search invoices..." className="pl-10 bg-muted/50 border-muted" />
          </div>
          <Button variant="outline" className="bg-muted/50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Invoices Table */}
        <Card className="card-float bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Invoices</CardTitle>
            <CardDescription>Track and manage your client invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{invoice.id}</div>
                      <div className="text-sm text-muted-foreground">{invoice.client}</div>
                      <div className="text-xs text-muted-foreground">{invoice.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-medium text-foreground">${invoice.amount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Due: {invoice.dueDate}</div>
                    </div>

                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status === "paid" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {invoice.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                      {invoice.status === "overdue" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {invoice.status}
                    </Badge>

                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
