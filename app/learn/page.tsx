"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  Trophy,
  Star,
  Clock,
  Users,
  Play,
  BookOpen,
  Target,
  Zap,
  TrendingUp,
  DollarSign,
  Shield,
  Calculator,
  Search,
  CheckCircle,
  Lock,
} from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Taxes 101",
    description: "Master the basics of taxation for freelancers and creators",
    category: "Tax & Compliance",
    difficulty: "Beginner",
    duration: "2 hours",
    xp: 150,
    enrolled: 2847,
    rating: 4.8,
    progress: 0,
    status: "available",
    icon: Calculator,
    color: "#6366f1",
    lessons: 8,
    badge: "Tax Ninja",
    contextualTrigger: "first_fx_conversion",
  },
  {
    id: 2,
    title: "Investing Basics",
    description: "Build wealth with smart investment strategies",
    category: "Investment",
    difficulty: "Beginner",
    duration: "3 hours",
    xp: 200,
    enrolled: 1923,
    rating: 4.9,
    progress: 45,
    status: "in-progress",
    icon: TrendingUp,
    color: "#10b981",
    lessons: 12,
    badge: "Investment Pro",
    contextualTrigger: "vault_milestone",
  },
  {
    id: 3,
    title: "FIRC & Compliance",
    description: "Everything about Foreign Inward Remittance Certificates",
    category: "Compliance",
    difficulty: "Intermediate",
    duration: "1.5 hours",
    xp: 120,
    enrolled: 1456,
    rating: 4.7,
    progress: 100,
    status: "completed",
    icon: Shield,
    color: "#f97316",
    lessons: 6,
    badge: "Compliance Master",
    contextualTrigger: "first_fx_conversion",
  },
  {
    id: 4,
    title: "Freelancer Finance",
    description: "Manage your freelance income like a pro",
    category: "Personal Finance",
    difficulty: "Beginner",
    duration: "2.5 hours",
    xp: 180,
    enrolled: 3241,
    rating: 4.8,
    progress: 0,
    status: "available",
    icon: DollarSign,
    color: "#ea580c",
    lessons: 10,
    badge: "Finance Guru",
    contextualTrigger: "profile_creation",
  },
  {
    id: 5,
    title: "Advanced Vaulting",
    description: "Master advanced vault strategies and automation",
    category: "Savings",
    difficulty: "Advanced",
    duration: "4 hours",
    xp: 300,
    enrolled: 892,
    rating: 4.9,
    progress: 0,
    status: "locked",
    icon: Target,
    color: "#8b5cf6",
    lessons: 15,
    badge: "Vault Master",
    contextualTrigger: "vault_expert",
    requirement: "Complete 3 beginner courses",
  },
  {
    id: 6,
    title: "Crypto for Creators",
    description: "Navigate the world of cryptocurrency safely",
    category: "Cryptocurrency",
    difficulty: "Intermediate",
    duration: "3.5 hours",
    xp: 250,
    enrolled: 1567,
    rating: 4.6,
    progress: 0,
    status: "available",
    icon: Zap,
    color: "#06b6d4",
    lessons: 14,
    badge: "Crypto Pioneer",
    contextualTrigger: "advanced_user",
  },
]

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Completed your first course",
    icon: GraduationCap,
    earned: true,
    xp: 50,
    rarity: "common",
  },
  {
    id: 2,
    title: "Tax Ninja",
    description: "Mastered taxation fundamentals",
    icon: Calculator,
    earned: true,
    xp: 150,
    rarity: "rare",
  },
  {
    id: 3,
    title: "Compliance Master",
    description: "Expert in regulatory compliance",
    icon: Shield,
    earned: true,
    xp: 120,
    rarity: "rare",
  },
  {
    id: 4,
    title: "Learning Streak",
    description: "7 days of continuous learning",
    icon: Star,
    earned: false,
    xp: 200,
    rarity: "epic",
  },
  {
    id: 5,
    title: "Knowledge Seeker",
    description: "Completed 10 courses",
    icon: BookOpen,
    earned: false,
    xp: 500,
    rarity: "legendary",
  },
]

const categories = ["All", "Tax & Compliance", "Investment", "Personal Finance", "Savings", "Cryptocurrency"]

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<(typeof courses)[0] | null>(null)

  const totalXP =
    achievements.filter((a) => a.earned).reduce((sum, a) => sum + a.xp, 0) +
    courses.filter((c) => c.status === "completed").reduce((sum, c) => sum + c.xp, 0)
  const currentLevel = Math.floor(totalXP / 500) + 1
  const xpToNextLevel = currentLevel * 500 - totalXP

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const completedCourses = courses.filter((c) => c.status === "completed").length
  const inProgressCourses = courses.filter((c) => c.status === "in-progress").length

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-secondary text-secondary-foreground"
      case "Intermediate":
        return "bg-accent text-accent-foreground"
      case "Advanced":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-muted-foreground"
      case "rare":
        return "text-primary"
      case "epic":
        return "text-accent"
      case "legendary":
        return "text-secondary"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <GraduationCap className="h-8 w-8" />
                Learn & Earn
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Level {currentLevel}
                </Badge>
              </h1>
              <p className="text-muted-foreground">Master financial skills with gamified courses and earn XP</p>
            </div>

            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{totalXP}</div>
                <div className="text-xs text-muted-foreground">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{completedCourses}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{achievements.filter((a) => a.earned).length}</div>
                <div className="text-xs text-muted-foreground">Badges</div>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <Card className="card-float bg-card border-border mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Level {currentLevel} Progress</span>
                <span className="text-sm text-muted-foreground">
                  {xpToNextLevel} XP to Level {currentLevel + 1}
                </span>
              </div>
              <Progress value={((totalXP % 500) / 500) * 100} className="h-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory !== category ? "bg-transparent" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Contextual Nudge */}
            <Card className="card-float bg-primary/10 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Want to learn how FIRC works?</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Since you just completed your first FX conversion, check out our FIRC & Compliance course!
                    </p>
                    <Button size="sm" className="mt-2 gradient-primary text-white">
                      Start Learning
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const Icon = course.icon
                return (
                  <Card
                    key={course.id}
                    className={`card-float cursor-pointer transition-all ${
                      course.status === "locked" ? "opacity-60" : "hover:scale-105"
                    }`}
                    onClick={() => !course.status === "locked" && setSelectedCourse(course)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                          style={{ backgroundColor: `${course.color}20`, color: course.color }}
                        >
                          {course.status === "locked" ? <Lock className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge className={getDifficultyColor(course.difficulty)} variant="secondary">
                            {course.difficulty}
                          </Badge>
                          {course.status === "completed" && (
                            <Badge className="bg-secondary text-secondary-foreground">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Done
                            </Badge>
                          )}
                          {course.status === "in-progress" && (
                            <Badge className="bg-accent text-accent-foreground">In Progress</Badge>
                          )}
                        </div>
                      </div>

                      <CardTitle className="text-foreground">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        {course.progress > 0 && (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-foreground">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4 text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {course.lessons} lessons
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-accent" />
                            <span className="text-foreground font-medium">{course.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {course.enrolled.toLocaleString()} enrolled
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            <Trophy className="h-2 w-2 mr-1" />+{course.xp} XP
                          </Badge>
                        </div>

                        {course.status === "locked" && (
                          <div className="p-2 bg-muted/20 rounded text-xs text-muted-foreground">
                            <Lock className="h-3 w-3 inline mr-1" />
                            {course.requirement}
                          </div>
                        )}

                        <Button
                          className="w-full"
                          disabled={course.status === "locked"}
                          variant={course.status === "completed" ? "outline" : "default"}
                        >
                          {course.status === "locked" && <Lock className="h-4 w-4 mr-2" />}
                          {course.status === "completed" && <CheckCircle className="h-4 w-4 mr-2" />}
                          {course.status === "in-progress" && <Play className="h-4 w-4 mr-2" />}
                          {course.status === "available" && <Play className="h-4 w-4 mr-2" />}

                          {course.status === "locked" && "Locked"}
                          {course.status === "completed" && "Review"}
                          {course.status === "in-progress" && "Continue"}
                          {course.status === "available" && "Start Course"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <Card
                    key={achievement.id}
                    className={`card-float ${
                      achievement.earned ? "bg-card border-border" : "bg-muted/20 border-muted opacity-60"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            achievement.earned ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant="outline" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </Badge>
                          {achievement.earned && (
                            <Badge className="bg-secondary text-secondary-foreground">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Earned
                            </Badge>
                          )}
                        </div>
                      </div>

                      <CardTitle className="text-foreground">{achievement.title}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Reward</span>
                        <Badge variant="outline" className="text-xs">
                          <Trophy className="h-2 w-2 mr-1" />+{achievement.xp} XP
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="card-float bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Learning Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Courses Completed</span>
                    <span className="text-sm font-bold text-foreground">{completedCourses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">In Progress</span>
                    <span className="text-sm font-bold text-foreground">{inProgressCourses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total XP Earned</span>
                    <span className="text-sm font-bold text-foreground">{totalXP}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Level</span>
                    <span className="text-sm font-bold text-foreground">{currentLevel}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-float bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements
                    .filter((a) => a.earned)
                    .slice(0, 3)
                    .map((achievement) => {
                      const Icon = achievement.icon
                      return (
                        <div key={achievement.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                            <Icon className="h-4 w-4 text-secondary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground">+{achievement.xp} XP</p>
                          </div>
                        </div>
                      )
                    })}
                </CardContent>
              </Card>

              <Card className="card-float bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Next Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm font-medium text-foreground">Reach Level {currentLevel + 1}</p>
                    <p className="text-xs text-muted-foreground">{xpToNextLevel} XP remaining</p>
                  </div>
                  <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                    <p className="text-sm font-medium text-foreground">Learning Streak</p>
                    <p className="text-xs text-muted-foreground">Learn for 7 consecutive days</p>
                  </div>
                  <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <p className="text-sm font-medium text-foreground">Complete 5 Courses</p>
                    <p className="text-xs text-muted-foreground">{5 - completedCourses} courses to go</p>
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
