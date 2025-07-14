"use client"

import { motion } from "framer-motion"
import { Gift, Star, Zap, Lock } from "lucide-react"
import { useEcoPoints } from "@/contexts/eco-points-context"

const rewards = [
  {
    id: 1,
    title: "10% Off Coupon",
    description: "Get 10% off your next purchase",
    points: 100,
    icon: "🎟️",
    category: "discount",
    rarity: "common",
  },
  {
    id: 2,
    title: "Free Shipping",
    description: "Free shipping on any order",
    points: 150,
    icon: "📦",
    category: "shipping",
    rarity: "common",
  },
  {
    id: 3,
    title: "Plant a Tree",
    description: "We'll plant a tree in your name",
    points: 200,
    icon: "🌳",
    category: "impact",
    rarity: "uncommon",
  },
  {
    id: 4,
    title: "Eco Starter Kit",
    description: "Curated eco-friendly starter pack",
    points: 300,
    icon: "🎁",
    category: "product",
    rarity: "uncommon",
  },
  {
    id: 5,
    title: "VIP Membership",
    description: "Exclusive access to new products",
    points: 500,
    icon: "👑",
    category: "membership",
    rarity: "rare",
  },
  {
    id: 6,
    title: "Carbon Offset",
    description: "Offset 1 ton of CO₂ emissions",
    points: 750,
    icon: "🌍",
    category: "impact",
    rarity: "rare",
  },
  {
    id: 7,
    title: "Eco Consultation",
    description: "1-hour sustainability consultation",
    points: 1000,
    icon: "🧑‍🏫",
    category: "service",
    rarity: "epic",
  },
  {
    id: 8,
    title: "Solar Panel Discount",
    description: "25% off solar panel installation",
    points: 1500,
    icon: "☀️",
    category: "discount",
    rarity: "epic",
  },
  {
    id: 9,
    title: "Eco Ambassador",
    description: "Become an official PlanetSmart ambassador",
    points: 2000,
    icon: "🏆",
    category: "status",
    rarity: "legendary",
  },
]

const RewardCard = ({ reward, index, canClaim, onClaim }) => {
  const rarityStyles = {
    common: { border: "border-gray-300", bg: "bg-gray-50", glow: "" },
    uncommon: { border: "border-green-300", bg: "bg-green-50", glow: "shadow-green-200" },
    rare: { border: "border-blue-300", bg: "bg-blue-50", glow: "shadow-blue-200" },
    epic: { border: "border-purple-300", bg: "bg-purple-50", glow: "shadow-purple-200" },
    legendary: { border: "border-yellow-300", bg: "bg-yellow-50", glow: "shadow-yellow-200" },
  }

  const style = rarityStyles[reward.rarity] || rarityStyles.common

  return (
    <motion.div
      className={`relative bg-white/40 backdrop-blur-md rounded-2xl p-6 border-2 ${style.border} shadow-lg ${
        canClaim ? `ring-2 ring-green-400 ${style.glow}` : ""
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
      {/* Rarity indicator */}
      <div
        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
          reward.rarity === "legendary"
            ? "bg-yellow-200 text-yellow-800"
            : reward.rarity === "epic"
              ? "bg-purple-200 text-purple-800"
              : reward.rarity === "rare"
                ? "bg-blue-200 text-blue-800"
                : reward.rarity === "uncommon"
                  ? "bg-green-200 text-green-800"
                  : "bg-gray-200 text-gray-800"
        }`}
      >
        {reward.rarity.toUpperCase()}
      </div>

      {canClaim && (
        <motion.div
          className="absolute -top-2 -left-2 bg-green-500 text-white rounded-full p-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        >
          <Star size={16} fill="currentColor" />
        </motion.div>
      )}

      {!canClaim && (
        <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <Lock className="text-gray-500" size={32} />
        </div>
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
          onClick={() => canClaim && onClaim(reward)}
        >
          {canClaim ? "Claim Reward" : `Need ${reward.points} Points`}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function RewardsGrid() {
  const { points, spendPoints } = useEcoPoints()

  const handleClaimReward = (reward) => {
    if (spendPoints(reward.points)) {
      // Show success message or animation
      console.log(`Claimed ${reward.title}!`)
    }
  }

  return (
    <div className="space-y-8">
      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rewards.map((reward, index) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            index={index}
            canClaim={points >= reward.points}
            onClaim={handleClaimReward}
          />
        ))}
      </div>

      {/* Special Bonus Section */}
      <motion.div
        className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-white text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Gift className="mx-auto mb-4" size={48} />
        <h3 className="text-2xl font-bold mb-2">Weekly Bonus Challenge!</h3>
        <p className="text-yellow-100 mb-4">Complete 5 eco-actions this week to earn 2x EcoPoints!</p>
        <div className="flex justify-center space-x-4">
          <div className="bg-white/20 rounded-full px-4 py-2">
            <span className="font-semibold">3/5 Actions Complete</span>
          </div>
          <motion.button
            className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-orange-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Challenge
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
