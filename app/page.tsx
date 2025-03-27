"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Search, Facebook } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function HomePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [totalVisits, setTotalVisits] = useState(12843)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  // Simulate login for demo purposes
  const simulateLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setUser({
      name: "John Smith",
      email: "john@example.com",
    })
    setShowLoginForm(false)
  }

  // Simulate register for demo purposes
  const simulateRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setUser({
      name: "New User",
      email: "new@example.com",
    })
    setShowRegisterForm(false)
  }

  // Simulate logout for demo purposes
  const simulateLogout = () => {
    setUser(null)
  }

  // Simulate visitor count incrementing
  useEffect(() => {
    // This would normally be handled by analytics
    const randomIncrement = Math.floor(Math.random() * 3) + 1
    const interval = setInterval(() => {
      setTotalVisits((prev) => prev + randomIncrement)
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <header className="mb-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">Dublin Sports Mentor</div>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/mission" className="hover:text-primary">
                Our Mission
              </Link>
            </li>
            <li>
              <Link href="/booking" className="hover:text-primary">
                Book a Session
              </Link>
            </li>
            <li>
              <Link href="/ladder" className="hover:text-primary">
                Ladder
              </Link>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center hover:text-primary">
                  <Facebook className="h-4 w-4 mr-1" />
                  Social Media
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <a
                      href="https://www.facebook.com/groups/138252883393098/?ref=share"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Squash in Dublin
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="https://www.facebook.com/groups/anuroopbs/?ref=share"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Squash in Hyderabad
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="https://www.facebook.com/groups/625415176502463/?ref=share"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Squash Coaches Network
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            {user ? (
              <li className="relative">
                <div className="flex items-center cursor-pointer group">
                  <span className="mr-1">{user.name}</span>
                  <span className="text-xs">▼</span>
                  <div className="absolute right-0 top-full mt-2 bg-white shadow-md rounded-md hidden group-hover:block z-10 w-48">
                    <div className="py-2">
                      <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                        My Profile
                      </Link>
                      <button onClick={simulateLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              <li>
                <Button variant="outline" onClick={() => setShowLoginForm(true)}>
                  Login / Register
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-primary/10 rounded-lg p-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <h1 className="text-4xl font-bold mb-4">Improve Your Game with Professional Coaching</h1>
            <p className="text-lg mb-6">
              Join our community of players and take your skills to the next level with personalized coaching sessions.
            </p>
            <div className="flex space-x-4">
              <Button>Book a Session</Button>
              <Button variant="outline">View Ladder</Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <h3 className="text-4xl font-bold text-primary mb-2">833</h3>
                  <p className="text-sm font-medium">People introduced so far</p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <h3 className="text-4xl font-bold text-primary mb-2">14,167</h3>
                  <p className="text-sm font-medium">Remaining to reach 1% of Dublin</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <h3 className="text-4xl font-bold text-primary mb-2">49,167</h3>
                  <p className="text-sm font-medium">Remaining to reach 1% of Ireland</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                  <h3 className="text-3xl font-bold text-green-700 mb-2">{totalVisits}</h3>
                  <p className="text-sm font-medium text-green-800">Total visits on this page so far</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <Search className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Sports Consultation Services</CardTitle>
              <CardDescription>
                Discover the perfect sport that matches your personality and find the nearest facilities around you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Our personalized assessment helps you identify sports that align with your natural abilities, interests,
                and lifestyle, ensuring a fulfilling athletic journey.
              </p>
              <Button variant="outline" className="w-full">
                Get Consultation
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Find Players</CardTitle>
              <CardDescription>
                Connect with other players of similar skill level for practice matches and friendly competition.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Our network helps you find compatible playing partners in your area, making it easy to schedule regular
                games and improve your skills.
              </p>
              <Button variant="outline" className="w-full">
                Find Players
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ladder Rankings Preview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Current Ladder Rankings</h2>
        <Tabs defaultValue="women">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="women">Women's Ladder</TabsTrigger>
            <TabsTrigger value="men">Men's Ladder</TabsTrigger>
          </TabsList>
          <TabsContent value="women">
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2">Rank</th>
                        <th className="text-left pb-2">Name</th>
                        <th className="text-left pb-2">Won</th>
                        <th className="text-left pb-2">Lost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">1</td>
                        <td className="py-3">Sarah Johnson</td>
                        <td className="py-3">11</td>
                        <td className="py-3">2</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">2</td>
                        <td className="py-3">Emily Davis</td>
                        <td className="py-3">9</td>
                        <td className="py-3">3</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">3</td>
                        <td className="py-3">Jessica Wilson</td>
                        <td className="py-3">8</td>
                        <td className="py-3">4</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">4</td>
                        <td className="py-3">Amanda Taylor</td>
                        <td className="py-3">6</td>
                        <td className="py-3">5</td>
                      </tr>
                      <tr>
                        <td className="py-3">5</td>
                        <td className="py-3">Olivia Martin</td>
                        <td className="py-3">4</td>
                        <td className="py-3">3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="men">
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2">Rank</th>
                        <th className="text-left pb-2">Name</th>
                        <th className="text-left pb-2">Won</th>
                        <th className="text-left pb-2">Lost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">1</td>
                        <td className="py-3">John Smith</td>
                        <td className="py-3">12</td>
                        <td className="py-3">3</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">2</td>
                        <td className="py-3">Michael Johnson</td>
                        <td className="py-3">10</td>
                        <td className="py-3">4</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">3</td>
                        <td className="py-3">David Williams</td>
                        <td className="py-3">8</td>
                        <td className="py-3">5</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">4</td>
                        <td className="py-3">Robert Brown</td>
                        <td className="py-3">7</td>
                        <td className="py-3">6</td>
                      </tr>
                      <tr>
                        <td className="py-3">5</td>
                        <td className="py-3">James Davis</td>
                        <td className="py-3">5</td>
                        <td className="py-3">4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Login Dialog */}
      {showLoginForm && (
        <Dialog open={showLoginForm} onOpenChange={setShowLoginForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login to Your Account</DialogTitle>
              <DialogDescription>Enter your credentials to access your account</DialogDescription>
            </DialogHeader>
            <form onSubmit={simulateLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="flex justify-between items-center">
                <Button type="submit">Login</Button>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setShowLoginForm(false)
                    setShowRegisterForm(true)
                  }}
                >
                  Need an account? Register
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Register Dialog */}
      {showRegisterForm && (
        <Dialog open={showRegisterForm} onOpenChange={setShowRegisterForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create an Account</DialogTitle>
              <DialogDescription>Join Dublin Sports Mentor to access all features</DialogDescription>
            </DialogHeader>
            <form onSubmit={simulateRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <Input id="reg-password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <div className="flex justify-between items-center">
                <Button type="submit">Register</Button>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setShowRegisterForm(false)
                    setShowLoginForm(true)
                  }}
                >
                  Already have an account? Login
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

