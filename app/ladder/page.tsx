"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LadderPage() {
  const [menLadder, setMenLadder] = useState([
    { id: "1", name: "John Smith", rank: 1, won: 12, lost: 3 },
    { id: "2", name: "Michael Johnson", rank: 2, won: 10, lost: 4 },
    { id: "3", name: "David Williams", rank: 3, won: 8, lost: 5 },
    { id: "4", name: "Robert Brown", rank: 4, won: 7, lost: 6 },
    { id: "5", name: "James Davis", rank: 5, won: 5, lost: 4 },
  ])

  const [womenLadder, setWomenLadder] = useState([
    { id: "1", name: "Sarah Johnson", rank: 1, won: 11, lost: 2 },
    { id: "2", name: "Emily Davis", rank: 2, won: 9, lost: 3 },
    { id: "3", name: "Jessica Wilson", rank: 3, won: 8, lost: 4 },
    { id: "4", name: "Amanda Taylor", rank: 4, won: 6, lost: 5 },
    { id: "5", name: "Olivia Martin", rank: 5, won: 4, lost: 3 },
  ])

  const [newPlayer, setNewPlayer] = useState({ name: "", phone: "", email: "" })
  const [selectedLadder, setSelectedLadder] = useState("men")

  const handleAddPlayer = () => {
    if (selectedLadder === "men") {
      const newRank = menLadder.length + 1
      setMenLadder([
        ...menLadder,
        {
          id: `m${newRank}`,
          name: newPlayer.name,
          rank: newRank,
          won: 0,
          lost: 0,
        },
      ])
    } else {
      const newRank = womenLadder.length + 1
      setWomenLadder([
        ...womenLadder,
        {
          id: `w${newRank}`,
          name: newPlayer.name,
          rank: newRank,
          won: 0,
          lost: 0,
        },
      ])
    }

    // Reset form
    setNewPlayer({ name: "", phone: "", email: "" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Player Ladder Rankings</h1>

      <div className="flex justify-end mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Join Ladder</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join the Ladder</DialogTitle>
              <DialogDescription>Enter your information to join the player ladder.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newPlayer.email}
                  onChange={(e) => setNewPlayer({ ...newPlayer, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newPlayer.phone}
                  onChange={(e) => setNewPlayer({ ...newPlayer, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ladder">Ladder</Label>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="men"
                      name="ladder"
                      value="men"
                      checked={selectedLadder === "men"}
                      onChange={() => setSelectedLadder("men")}
                      className="mr-2"
                    />
                    <Label htmlFor="men">Men's Ladder</Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="women"
                      name="ladder"
                      value="women"
                      checked={selectedLadder === "women"}
                      onChange={() => setSelectedLadder("women")}
                      className="mr-2"
                    />
                    <Label htmlFor="women">Women's Ladder</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddPlayer}>Join Ladder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="men">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="men">Men's Ladder</TabsTrigger>
          <TabsTrigger value="women">Women's Ladder</TabsTrigger>
        </TabsList>
        <TabsContent value="men">
          <Card>
            <CardHeader>
              <CardTitle>Men's Ladder Rankings</CardTitle>
              <CardDescription>Challenge players ranked 1-2 positions above you to move up the ladder.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2">Rank</th>
                      <th className="text-left pb-2">Name</th>
                      <th className="text-left pb-2">Won</th>
                      <th className="text-left pb-2">Lost</th>
                      <th className="text-left pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menLadder.map((player) => (
                      <tr key={player.id} className="border-b">
                        <td className="py-3">{player.rank}</td>
                        <td className="py-3">{player.name}</td>
                        <td className="py-3">{player.won}</td>
                        <td className="py-3">{player.lost}</td>
                        <td className="py-3">
                          <Button variant="outline" size="sm">
                            Challenge
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="women">
          <Card>
            <CardHeader>
              <CardTitle>Women's Ladder Rankings</CardTitle>
              <CardDescription>Challenge players ranked 1-2 positions above you to move up the ladder.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2">Rank</th>
                      <th className="text-left pb-2">Name</th>
                      <th className="text-left pb-2">Won</th>
                      <th className="text-left pb-2">Lost</th>
                      <th className="text-left pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {womenLadder.map((player) => (
                      <tr key={player.id} className="border-b">
                        <td className="py-3">{player.rank}</td>
                        <td className="py-3">{player.name}</td>
                        <td className="py-3">{player.won}</td>
                        <td className="py-3">{player.lost}</td>
                        <td className="py-3">
                          <Button variant="outline" size="sm">
                            Challenge
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Ladder Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How the Ladder Works</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Players can challenge others who are ranked 1-2 positions above them.</li>
                <li>If the challenger wins, they swap positions with the player they challenged.</li>
                <li>Players must accept challenges within 7 days.</li>
                <li>Players must complete matches within 14 days of accepting a challenge.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Match Format</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Matches are best of 3 sets.</li>
                <li>Regular scoring with advantage.</li>
                <li>Tie-break at 6-6 in all sets.</li>
                <li>Players must arrange their own matches and court time.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Reporting Results</h3>
              <p>
                After completing a match, both players must confirm the result by emailing
                <a href="mailto:ladder@sportsclub.com" className="text-primary ml-1">
                  ladder@sportsclub.com
                </a>
                or updating the result in person at the club.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

