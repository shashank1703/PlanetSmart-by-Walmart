"use client"

import { motion } from "framer-motion"
import { Gift, Star, Trophy, Zap } from "lucide-react"
import { useEcoPoints } from "@/contexts/eco-points-context"

const RewardCard = ({ reward, index, canClaim }) => (
  <motion.div
    className={`relative bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg ${
      canClaim ? "ring-2 ring-green-400" : ""
    }`}
    initial={{ opacity: 0, rotateY: -90 }}
    animate={{ opacity: 1, rotateY: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{
      scale: 1.05,
      rotateY: canClaim ? 5 : 0,
      transition: { duration: 0.3 },
    }}
  >
    {canClaim && (
      <motion.div
        className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      >
        <Star size={16} fill="currentColor" />
      </motion.div>
    )}

    <div className="text-center">
      <div className="text-4xl mb-3">{reward.icon}</div>
      <h3 className="text-lg font-semibold text-green-800 mb-2">{reward.title}</h3>
      <p className="text-green-600 text-sm mb-4">{reward.description}</p>

      <div className="flex items-center justify-center space-x-2 mb-4">
        <Zap className="text-yellow-500" size={16} />
        <span className="font-bold text-green-800">{reward.points} Points</span>
      </div>

      <motion.button
        className={`w-full py-2 px-4 rounded-full font-medium transition-all ${
          canClaim ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
        whileHover={canClaim ? { scale: 1.05 } : {}}
        whileTap={canClaim ? { scale: 0.95 } : {}}
        disabled={!canClaim}
      >
        {canClaim ? "Claim Reward" : "Keep Shopping"}
      </motion.button>
    </div>
  </motion.div>
)

export default function EcoPointsRewards() {
  const { points } = useEcoPoints()

  const rewards = [
    {
      id: 1,
      title: "10% Off Coupon",
      description: "Get 10% off your next purchase",
      points: 100,
      icon: "🎟️",
    },
    {
      id: 2,
      title: "Free Shipping",
      description: "Free shipping on any order",
      points: 150,
      icon: "📦",
    },
    {
      id: 3,
      title: "Plant a Tree",
      description: "We'll plant a tree in your name",
      points: 200,
      icon: "🌳",
    },
    {
      id: 4,
      title: "Eco Starter Kit",
      description: "Curated eco-friendly starter pack",
      points: 300,
      icon: "🎁",
    },
    {
      id: 5,
      title: "VIP Membership",
      description: "Exclusive access to new products",
      points: 500,
      icon: "👑",
    },
    {
      id: 6,
      title: "Carbon Offset",
      description: "Offset 1 ton of CO₂ emissions",
      points: 750,
      icon: "🌍",
    },
  ]

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-green-800 mb-6">EcoPoints & Rewards</h2>
          <p className="text-xl text-green-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Earn EcoPoints with every sustainable purchase and redeem them for amazing rewards that help you and the
            planet.
          </p>

          {/* Points Display */}
          <motion.div
            className="inline-flex items-center space-x-4 bg-white/50 backdrop-blur-md rounded-full px-8 py-4 border border-white/60 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Trophy className="text-yellow-500" size={32} />
            <div>
              <div className="text-3xl font-bold text-green-800">{points}</div>
              <div className="text-green-600 font-medium">EcoPoints Available</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-white/50 rounded-full p-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-green-700">Progress to Next Reward</span>
              <span className="text-sm font-bold text-green-800">{points}/200</span>
            </div>
            <div className="w-full bg-green-100 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((points / 200) * 100, 100)}%` }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewards.map((reward, index) => (
            <RewardCard key={reward.id} reward={reward} index={index} canClaim={points >= reward.points} />
          ))}
        </div>

        {/* Achievement Banner */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 text-white">
            <Gift className="mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-bold mb-2">Special Bonus!</h3>
            <p className="text-yellow-100 mb-4">Earn double EcoPoints on your next purchase this week!</p>
            <motion.button
              className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
