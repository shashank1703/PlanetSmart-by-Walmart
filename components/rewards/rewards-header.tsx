"use client"

import { motion } from "framer-motion"
import { Award, Sparkles } from "lucide-react"

export default function RewardsHeader() {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0 }}
    >
      <div className="flex items-center justify-center space-x-3 mb-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
        >
          <Award className="text-yellow-500" size={32} />
        </motion.div>
        <h1 className="text-5xl font-bold text-green-800">Rewards & Impact</h1>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
        >
          <Sparkles className="text-yellow-400" size={28} />
        </motion.div>
      </div>

      <p className="text-xl text-green-600 max-w-3xl mx-auto leading-relaxed mb-8">
        Track your personalized Eco DNA tree, claim amazing rewards, and see how you're contributing to our global
        environmental impact.
      </p>

      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="bg-white/40 backdrop-blur-sm rounded-full px-4 py-2 border border-white/50">
          <span className="text-green-700 font-medium">🌱 Grow Your Eco DNA</span>
        </div>
        <div className="bg-white/40 backdrop-blur-sm rounded-full px-4 py-2 border border-white/50">
          <span className="text-green-700 font-medium">🎁 Unlock Rewards</span>
        </div>
        <div className="bg-white/40 backdrop-blur-sm rounded-full px-4 py-2 border border-white/50">
          <span className="text-green-700 font-medium">🌍 Global Impact</span>
        </div>
      </div>
    </motion.div>
  )
}
