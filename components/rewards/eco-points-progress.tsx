"use client"

import { motion } from "framer-motion"
import { Trophy, Zap, Target } from "lucide-react"

export default function EcoPointsProgress({ points }) {
  const nextMilestone = 500
  const progress = (points / nextMilestone) * 100

  return (
    <motion.div
      className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl mb-12"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-6 md:mb-0">
          <motion.div
            className="bg-yellow-100 p-4 rounded-2xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
          >
            <Trophy className="text-yellow-600" size={32} />
          </motion.div>
          <div>
            <h2 className="text-3xl font-bold text-green-800">{points} EcoPoints</h2>
            <p className="text-green-600">Your current balance</p>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-green-700">Progress to Next Reward</span>
            <span className="text-sm font-bold text-green-800">
              {points}/{nextMilestone}
            </span>
          </div>
          <div className="w-full bg-green-100 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full flex items-center justify-end pr-2"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              {progress > 20 && <Zap className="text-white" size={12} />}
            </motion.div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-green-600">Current Level</span>
            <span className="text-xs text-green-600">Next Reward</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-green-50 rounded-2xl px-4 py-3">
          <Target className="text-green-600" size={20} />
          <div className="text-center">
            <div className="text-sm font-semibold text-green-800">{nextMilestone - points}</div>
            <div className="text-xs text-green-600">points to go</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
