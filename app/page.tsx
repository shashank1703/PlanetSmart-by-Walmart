"use client"

import { useAuth } from "@/contexts/auth-context"
import HeroSection from "@/components/hero-section"
import EcoImpactDashboard from "@/components/eco-impact-dashboard"
import ProductGrid from "@/components/product-grid"
import EcoPointsRewards from "@/components/eco-points-rewards"
import ProtectedRoute from "@/components/protected-route"

export default function EcoTrustPlatform() {
  const { user } = useAuth()

  // Landing page for unauthenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
        <main className="relative z-10">
          <HeroSection />
          <div id="impact">
            <EcoImpactDashboard />
          </div>
          <ProductGrid />
          <EcoPointsRewards />
        </main>
      </div>
    )
  }

  // Protected content for authenticated users
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
        <main className="relative z-10">
          <HeroSection />
          <div id="impact">
            <EcoImpactDashboard />
          </div>
          <ProductGrid />
          <EcoPointsRewards />
        </main>
      </div>
    </ProtectedRoute>
  )
}
