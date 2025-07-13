"use client"

import { motion } from "framer-motion"
import { Suspense } from "react"
import ProtectedRoute from "@/components/protected-route"
import EcoLandGame3D from "@/components/rewards/eco-land-game-3d"
import RewardsHeader from "@/components/rewards/rewards-header"
import EcoPointsProgress from "@/components/rewards/eco-points-progress"
import { useEcoPoints } from "@/contexts/eco-points-context"

export default function RewardsPage() {
  const { points } = useEcoPoints()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <RewardsHeader />
            <EcoPointsProgress points={points} />
          </motion.div>

          {/* Main 3D EcoLand Game */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-green-600 text-lg">Loading your EcoLand experience...</p>
                  </div>
                </div>
              }
            >
              <EcoLandGame3D />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
