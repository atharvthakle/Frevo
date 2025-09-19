"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  Star,
  Users,
  Plus,
  Filter,
  Zap,
  Shield,
  FileText,
  MessageSquare,
  TrendingUp,
  Award,
  Eye,
  Heart,
  Send,
} from "lucide-react"

const jobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    type: "Full-time",
    budget: "$80-120k",
    posted: "2 days ago",
    applicants: 23,
    description: "We're looking for a senior React developer to join our growing team...",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    urgent: false,
    verified: true,
    aiMatch: 95,
  },
  {
    id: 2,
    title: "UI/UX Designer for Mobile App",
    company: "StartupXYZ",
    location: "San Francisco, CA",
    type: "Contract",
    budget: "$5,000-8,000",
    posted: "1 day ago",
    applicants: 12,
    description: "Design a beautiful and intuitive mobile app interface...",
    skills: ["Figma", "UI Design", "Mobile Design", "Prototyping"],
    urgent: true,
    verified: true,
    aiMatch: 88,
  },
  {
    id: 3,
    title: "Content Writer - Fintech",
    company: "FinanceFlow",
    location: "Remote",
    type: "Part-time",
    budget: "$30-50/hour",
    posted: "3 days ago",
    applicants: 8,
    description: "Create engaging content for our fintech platform...",
    skills: ["Content Writing", "Fintech", "SEO", "Research"],
    urgent: false,
    verified: false,
    aiMatch: 76,
  },
  {
    id: 4,
    title: "Full-Stack Developer",
    company: "InnovateLab",
    location: "New York, NY",
    type: "Full-time",
    budget: "$90-130k",
    posted: "5 days ago",
    applicants: 31,
    description: "Join our team to build cutting-edge web applications...",
    skills: ["React", "Python", "PostgreSQL", "Docker"],
    urgent: false,
    verified: true,
    aiMatch: 82,
  },
]

const freelancers = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Full-Stack Developer",
    location: "San Francisco, CA",
    rate: "$85/hour",
    rating: 4.9,
    reviews: 127,
    skills: ["React", "Node.js", "Python", "AWS"],
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    frevoScore: 892,
    completedJobs: 45,
    responseTime: "2 hours",
    bio: "Experienced full-stack developer with 8+ years building scalable web applications...",
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "UI/UX Designer",
    location: "Remote",
    rate: "$70/hour",
    rating: 4.8,
    reviews: 89,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    frevoScore: 756,
    completedJobs: 32,
    responseTime: "1 hour",
    bio: "Creative designer passionate about creating intuitive user experiences...",
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    title: "Content Strategist",
    location: "Austin, TX",
    rate: "$45/hour",
    rating: 4.7,
    reviews: 64,
    skills: ["Content Strategy", "SEO", "Copywriting", "Analytics"],
    avatar: "/placeholder.svg?height=40&width=40",
    verified: false,
    frevoScore: 623,
    completedJobs: 28,
    responseTime: "4 hours",
    bio: "Strategic content creator helping brands tell their story effectively...",
  },
]

const activeProjects = [
  {
    id: 1,
    title: "E-commerce Platform Redesign",
    client: "ShopEasy Inc.",
    freelancer: "Alex Johnson",
    budget: "$12,000",
    deadline: "2024-02-15",
    progress: 65,
    status: "in-progress",
    escrowAmount: "$6,000",
    milestones: [
      { name: "Wireframes", completed: true, amount: "$2,000" },
      { name: "Design System", completed: true, amount: "$3,000" },
      { name: "Frontend Development", completed: false, amount: "$4,000" },
      { name: "Testing & Launch", completed: false, amount: "$3,000" },
    ],
  },
  {
    id: 2,
    title: "Mobile App UI Design",
    client: "FitTracker Pro",
    freelancer: "Sarah Chen",
    budget: "$8,000",
    deadline: "2024-01-30",
    progress: 90,
    status: "review",
    escrowAmount: "$8,000",
    milestones: [
      { name: "User Research", completed: true, amount: "$2,000" },
      { name: "Wireframes", completed: true, amount: "$2,000" },
      { name: "UI Design", completed: true, amount: "$3,000" },
      { name: "Prototype", completed: false, amount: "$1,000" },
    ],
  },
]

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("browse")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedJob, setSelectedJob] = useState<(typeof jobs)[0] | null>(null)
  const [selectedFreelancer, setSelectedFreelancer] = useState<(typeof freelancers)[0] | null>(null)
  const [isPostJobOpen, setIsPostJobOpen] = useState(false)

  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    budget: "",
    type: "contract",
    skills: "",
    deadline: "",
  })

  const handlePostJob = () => {
    console.log("Posting job:", newJob)
    setIsPostJobOpen(false)
    setNewJob({
      title: "",
      description: "",
      budget: "",
      type: "contract",
      skills: "",
      deadline: "",
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
              <Briefcase className="h-8 w-8" />
              Get Hired Marketplace
            </h1>
            <p className="text-muted-foreground">Connect with opportunities and grow your freelance career</p>
          </div>

          <Dialog open={isPostJobOpen} onOpenChange={setIsPostJobOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-white mt-4 lg:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Post a Job
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-foreground">Post a New Job</DialogTitle>
                <DialogDescription>Create a job posting to find the perfect freelancer</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Job Title</label>
                  <Input
                    placeholder="e.g., Senior React Developer"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <Textarea
                    placeholder="Describe the job requirements, responsibilities, and what you're looking for..."
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Budget</label>
                    <Input
                      placeholder="$5,000 - $10,000"
                      value={newJob.budget}
                      onChange={(e) => setNewJob({ ...newJob, budget: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Job Type</label>
                    <Select value={newJob.type} onValueChange={(value) => setNewJob({ ...newJob, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Required Skills</label>
                  <Input
                    placeholder="React, TypeScript, Node.js (comma separated)"
                    value={newJob.skills}
                    onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Deadline</label>
                  <Input
                    type="date"
                    value={newJob.deadline}
                    onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                  />
                </div>

                <Button onClick={handlePostJob} className="w-full gradient-primary text-white">
                  Post Job
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
            <TabsTrigger value="freelancers">Find Talent</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* AI Recommendations */}
            <Card className="card-float bg-primary/10 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">AI Recommendations</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on your skills and Frevo Score, we found 3 perfect matches for you!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Listings */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="card-float bg-card border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-foreground">{job.title}</CardTitle>
                          {job.verified && <Shield className="h-4 w-4 text-secondary" />}
                          {job.urgent && <Badge className="bg-accent text-accent-foreground">Urgent</Badge>}
                        </div>
                        <CardDescription className="flex items-center gap-4 text-sm">
                          <span>{job.company}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.posted}
                          </span>
                        </CardDescription>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">{job.budget}</div>
                        <div className="text-sm text-muted-foreground">{job.type}</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{job.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {job.applicants} applicants
                          </span>
                          <Badge className="bg-primary/20 text-primary">
                            <Zap className="h-3 w-3 mr-1" />
                            {job.aiMatch}% match
                          </Badge>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Heart className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" className="gradient-primary text-white">
                            <Send className="h-4 w-4 mr-1" />
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="freelancers" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freelancers.map((freelancer) => (
                <Card key={freelancer.id} className="card-float bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={freelancer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {freelancer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-foreground text-base">{freelancer.name}</CardTitle>
                          {freelancer.verified && <Shield className="h-4 w-4 text-secondary" />}
                        </div>
                        <CardDescription>{freelancer.title}</CardDescription>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 text-accent" />
                          <span className="text-sm font-medium text-foreground">{freelancer.rating}</span>
                          <span className="text-xs text-muted-foreground">({freelancer.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Rate</span>
                        <span className="font-bold text-foreground">{freelancer.rate}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Frevo Score</span>
                        <Badge variant="outline">{freelancer.frevoScore}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {freelancer.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {freelancer.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{freelancer.skills.length - 3}
                          </Badge>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2">{freelancer.bio}</p>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                        <Button size="sm" className="flex-1 gradient-primary text-white">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="space-y-6">
              {activeProjects.map((project) => (
                <Card key={project.id} className="card-float bg-card border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-foreground">{project.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-1">
                          <span>Client: {project.client}</span>
                          <span>Freelancer: {project.freelancer}</span>
                        </CardDescription>
                      </div>
                      <Badge
                        className={
                          project.status === "in-progress"
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent text-accent-foreground"
                        }
                      >
                        {project.status === "in-progress" ? "In Progress" : "Under Review"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Budget</span>
                          <div className="font-bold text-foreground">{project.budget}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Deadline</span>
                          <div className="font-bold text-foreground">
                            {new Date(project.deadline).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Escrow</span>
                          <div className="font-bold text-secondary flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            {project.escrowAmount}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-foreground">Milestones</h4>
                        {project.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              {milestone.completed ? (
                                <div className="w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                              ) : (
                                <div className="w-4 h-4 border-2 border-muted rounded-full"></div>
                              )}
                              <span className={milestone.completed ? "text-foreground" : "text-muted-foreground"}>
                                {milestone.name}
                              </span>
                            </div>
                            <span className="font-medium text-foreground">{milestone.amount}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="bg-transparent">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" className="bg-transparent">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {project.status === "review" && (
                          <Button className="gradient-primary text-white">
                            <Award className="h-4 w-4 mr-2" />
                            Approve & Release
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-float bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Profile Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Frevo Score</span>
                    <span className="text-sm font-bold text-foreground">847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Jobs Completed</span>
                    <span className="text-sm font-bold text-foreground">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="text-sm font-bold text-foreground">96%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Response Time</span>
                    <span className="text-sm font-bold text-foreground">2 hours</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-float bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Earnings This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-foreground">$8,450</div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-secondary" />
                    <span className="text-secondary">+23% from last month</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Projects</span>
                      <span className="text-foreground">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pending Payments</span>
                      <span className="text-foreground">$2,100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
