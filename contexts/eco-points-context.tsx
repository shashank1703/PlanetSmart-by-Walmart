"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"

interface EcoPointsContextType {
  points: number
  addPoints: (amount: number) => void
  spendPoints: (amount: number) => boolean
}

const EcoPointsContext = createContext<EcoPointsContextType | undefined>(undefined)

export function EcoPointsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [points, setPoints] = useState(user?.ecoPoints || 0)

  useEffect(() => {
    if (user) {
      setPoints(user.ecoPoints)
    }
  }, [user])

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount)
  }

  const spendPoints = (amount: number) => {
    if (points >= amount) {
      setPoints((prev) => prev - amount)
      return true
    }
    return false
  }

  return (
    <EcoPointsContext.Provider
      value={{
        points,
        addPoints,
        spendPoints,
      }}
    >
      {children}
    </EcoPointsContext.Provider>
  )
}

export function useEcoPoints() {
  const context = useContext(EcoPointsContext)
  if (context === undefined) {
    throw new Error("useEcoPoints must be used within an EcoPointsProvider")
  }
  return context
}
