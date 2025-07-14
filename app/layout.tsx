import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { EcoPointsProvider } from "@/contexts/eco-points-context"
import { AuthProvider } from "@/contexts/auth-context"
import Navigation from "@/components/navigation"
import CustomCursor from "@/components/custom-cursor"
import AnimatedBackground from "@/components/animated-background"
import AIEcoAssistant from "@/components/ai-eco-assistant"
import CartModal from "@/components/cart-modal"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PlanetSmart By Walmart - Sustainable Shopping Platform",
  description: "Shop eco-friendly products and track your environmental impact",
    generator: 'Shashank Bhargava'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <EcoPointsProvider>
              <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 relative overflow-hidden">
                <div className="relative z-0">
                  <AnimatedBackground />
                </div>
                <div className="relative z-10">
                  <CustomCursor />
                  <Navigation />

                  {children}

                  <AIEcoAssistant />
                  <CartModal />
                  <Toaster />
                </div>
                {/* Components moved to wrapper divs above */}
              </div>
            </EcoPointsProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
