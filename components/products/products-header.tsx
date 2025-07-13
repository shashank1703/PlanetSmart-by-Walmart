"use client"

import { motion } from "framer-motion"
import { Leaf } from "lucide-react"

export default function ProductsHeader() {
  return (
    <motion.div
      className="text-center mb-12 relative z-20 bg-gradient-to-b from-white/30 via-white/40 to-white/30 backdrop-blur-sm py-8 rounded-3xl shadow-lg border border-white/50"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0 }}
    >
      <div className="flex items-center justify-center space-x-3 mb-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
        >
          <Leaf className="text-green-500" size={32} />
        </motion.div>
        <h1 className="text-5xl font-bold text-green-800">Eco Products</h1>
      </div>

      <p className="text-xl text-green-600 max-w-3xl mx-auto leading-relaxed mb-8">
        Discover our complete collection of sustainable products. Filter by impact, sustainability score, and
        eco-certifications to find exactly what you need.
      </p>

      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="bg-white/40 backdrop-blur-sm rounded-full px-4 py-2 border border-white/50">
          <span className="text-green-700 font-medium">🌱 500+ Eco Products</span>
        </div>
        <div className="bg-white/40 backdrop-blur-sm rounded-full px-4 py-2 border border-white/50">
          <span className="text-green-700 font-medium">🏆 Certified Sustainable</span>
        </div>
        <div className="bg-white/40 backdrop-blur-sm rounded-full px-4 py-2 border border-white/50">
          <span className="text-green-700 font-medium">🚚 Carbon-Neutral Shipping</span>
        </div>
      </div>
    </motion.div>
  )
}
