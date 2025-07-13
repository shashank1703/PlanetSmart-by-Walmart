"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  ecoPoints: number
  joinDate: string
  totalOrders?: number
  totalSpent?: number
  treesSaved?: number
  waterSaved?: number
  carbonOffset?: number
  favoriteCategory?: string
  lastOrder?: string
  membershipTier?: string
  badges?: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users
const demoUsers = [
  {
    id: "1",
    name: "Shashank",
    email: "shashank@gmail.com",
    password: "123456",
    ecoPoints: 1250,
    joinDate: "2024-01-15",
    totalOrders: 23,
    totalSpent: 1247.50,
    treesSaved: 45,
    waterSaved: 8900,
    carbonOffset: 234,
    favoriteCategory: "Personal Care",
    lastOrder: "2024-03-15",
    membershipTier: "Eco Champion",
    badges: ["Early Adopter", "Tree Planter", "Water Saver", "Carbon Neutral"]
  },
  {
    id: "2",
    name: "Harsh",
    email: "harsh@gmail.com",
    password: "123456",
    ecoPoints: 890,
    joinDate: "2024-02-20",
    totalOrders: 15,
    totalSpent: 892.30,
    treesSaved: 32,
    waterSaved: 5600,
    carbonOffset: 156,
    favoriteCategory: "Home & Kitchen",
    lastOrder: "2024-03-12",
    membershipTier: "Eco Explorer",
    badges: ["Water Saver", "Recycler", "Local Shopper"]
  },
  {
    id: "3",
    name: "Ishita",
    email: "ishita@gmail.com", 
    password: "123456",
    ecoPoints: 2100,
    joinDate: "2024-03-10",
    totalOrders: 34,
    totalSpent: 2156.80,
    treesSaved: 78,
    waterSaved: 12400,
    carbonOffset: 445,
    favoriteCategory: "Tech",
    lastOrder: "2024-03-18",
    membershipTier: "Eco Master",
    badges: ["Eco Master", "Carbon Neutral", "Tree Planter", "Water Saver", "Early Adopter", "Influencer"]
  },
  {
    id: "4",
    name: "Adarsh",
    email: "adarsh@gmail.com",
    password: "123456",
    ecoPoints: 650,
    joinDate: "2024-04-05",
    totalOrders: 12,
    totalSpent: 678.90,
    treesSaved: 24,
    waterSaved: 3800,
    carbonOffset: 98,
    favoriteCategory: "Clothing",
    lastOrder: "2024-03-10",
    membershipTier: "Eco Explorer",
    badges: ["Fashion Forward", "Recycler"]
  }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem("ecotrust_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const demoUser = demoUsers.find(u => u.email === email && u.password === password)
    
    if (demoUser) {
      const userData = {
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        ecoPoints: demoUser.ecoPoints,
        joinDate: demoUser.joinDate,
        totalOrders: demoUser.totalOrders || 0,
        totalSpent: demoUser.totalSpent || 0,
        treesSaved: demoUser.treesSaved || 0,
        waterSaved: demoUser.waterSaved || 0,
        carbonOffset: demoUser.carbonOffset || 0,
        favoriteCategory: demoUser.favoriteCategory || "General",
        lastOrder: demoUser.lastOrder || "",
        membershipTier: demoUser.membershipTier || "Eco Starter",
        badges: demoUser.badges || []
      }
      
      setUser(userData)
      localStorage.setItem("ecotrust_user", JSON.stringify(userData))
      
      setIsLoading(false)
      return { success: true, message: "Login successful!" }
    } else {
      setIsLoading(false)
      return { success: false, message: "Invalid email or password" }
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if email already exists
    const existingUser = demoUsers.find(u => u.email === email)
    if (existingUser) {
      setIsLoading(false)
      return { success: false, message: "Email already registered" }
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      ecoPoints: 0,
      joinDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: 0,
      treesSaved: 0,
      waterSaved: 0,
      carbonOffset: 0,
      favoriteCategory: "General",
      lastOrder: "",
      membershipTier: "Eco Starter",
      badges: ["Newcomer"]
    }
    
    // Add to demo users (in real app, this would go to database)
    demoUsers.push(newUser)
    
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      ecoPoints: newUser.ecoPoints,
      joinDate: newUser.joinDate,
      totalOrders: newUser.totalOrders,
      totalSpent: newUser.totalSpent,
      treesSaved: newUser.treesSaved,
      waterSaved: newUser.waterSaved,
      carbonOffset: newUser.carbonOffset,
      favoriteCategory: newUser.favoriteCategory,
      lastOrder: newUser.lastOrder,
      membershipTier: newUser.membershipTier,
      badges: newUser.badges
    }
    
    setUser(userData)
    localStorage.setItem("ecotrust_user", JSON.stringify(userData))
    
    setIsLoading(false)
    return { success: true, message: "Account created successfully!" }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ecotrust_user")
    window.location.href = "/auth"
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
