"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { TreePine, Droplets, Recycle, Zap, Download, Share2, Eye } from "lucide-react"

// Mock user eco data
const userEcoData = {
  totalActions: 47,
  treesPlanted: 23,
  waterSaved: 1250,
  plasticAvoided: 15,
  co2Reduced: 89,
  level: 5,
  dnaSequence: "ATCG-GCTA-TTAG-CCGA-AATC",
  achievements: [
    { type: "water", count: 10, unlocked: true },
    { type: "trees", count: 20, unlocked: true },
    { type: "plastic", count: 15, unlocked: true },
    { type: "carbon", count: 50, unlocked: false },
  ],
}

const TreeBranch = ({ type, count, angle, delay = 0, glowIntensity = 1 }) => {
  const branchStyles = {
    water: { color: "text-blue-400", glow: "drop-shadow-lg filter drop-shadow-blue-400/50" },
    trees: { color: "text-green-400", glow: "drop-shadow-lg filter drop-shadow-green-400/50" },
    plastic: { color: "text-purple-400", glow: "drop-shadow-lg filter drop-shadow-purple-400/50" },
    carbon: { color: "text-gray-400", glow: "drop-shadow-lg filter drop-shadow-gray-400/50" },
  }

  const style = branchStyles[type] || branchStyles.trees

  return (
    <motion.div
      className="absolute origin-bottom"
      style={{
        transform: `rotate(${angle}deg)`,
        transformOrigin: "bottom center",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: glowIntensity,
        filter: `brightness(${1 + glowIntensity * 0.5})`,
      }}
      transition={{
        duration: 1.5,
        delay,
        type: "spring",
        stiffness: 100,
      }}
    >
      <div
        className={`w-2 bg-gradient-to-t from-green-600 to-green-400 rounded-full ${style.glow}`}
        style={{ height: `${Math.min(count * 8, 120)}px` }}
      >
        {/* Branch leaves/symbols */}
        <motion.div
          className={`absolute -top-2 -left-1 ${style.color} ${style.glow}`}
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: delay + 1,
          }}
        >
          {type === "water" && <Droplets size={16} />}
          {type === "trees" && <TreePine size={16} />}
          {type === "plastic" && <Recycle size={16} />}
          {type === "carbon" && <Zap size={16} />}
        </motion.div>

        {/* Spiral patterns for plastic */}
        {type === "plastic" && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="w-8 h-8 border-2 border-purple-400 rounded-full opacity-30" />
          </motion.div>
        )}

        {/* Leaf clusters for water */}
        {type === "water" && count > 5 && (
          <div className="absolute top-1/4 -left-2">
            {Array.from({ length: Math.min(count / 5, 4) }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-300 rounded-full"
                style={{
                  left: `${i * 3}px`,
                  top: `${i * 2}px`,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function EcoDNATree() {
  const [treeGlow, setTreeGlow] = useState(1)
  const [showDecoding, setShowDecoding] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTreeGlow((prev) => 0.7 + Math.sin(Date.now() / 1000) * 0.3)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const totalImpact =
    userEcoData.treesPlanted + userEcoData.waterSaved / 50 + userEcoData.plasticAvoided + userEcoData.co2Reduced / 10

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Tree Visualization */}
      <motion.div
        className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-2">Your Eco DNA Tree 🌱</h2>
          <p className="text-green-600">
            Level {userEcoData.level} • {userEcoData.totalActions} Actions Completed
          </p>
          <div className="text-sm text-green-500 font-mono mt-2">DNA: {userEcoData.dnaSequence}</div>
        </div>

        {/* Tree Container */}
        <div className="relative h-96 flex items-end justify-center">
          {/* Tree Trunk */}
          <motion.div
            className="w-8 h-32 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-full relative z-10"
            initial={{ height: 0 }}
            animate={{ height: 128 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{
              filter: `brightness(${treeGlow})`,
              boxShadow: `0 0 20px rgba(34, 197, 94, ${treeGlow * 0.3})`,
            }}
          />

          {/* Branches */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
            <TreeBranch type="trees" count={userEcoData.treesPlanted} angle={-45} delay={1} glowIntensity={treeGlow} />
            <TreeBranch
              type="water"
              count={Math.floor(userEcoData.waterSaved / 50)}
              angle={45}
              delay={1.2}
              glowIntensity={treeGlow}
            />
            <TreeBranch
              type="plastic"
              count={userEcoData.plasticAvoided}
              angle={-15}
              delay={1.4}
              glowIntensity={treeGlow}
            />
            <TreeBranch
              type="carbon"
              count={Math.floor(userEcoData.co2Reduced / 10)}
              angle={15}
              delay={1.6}
              glowIntensity={treeGlow}
            />
          </div>

          {/* Roots */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <div className="w-16 h-8 border-b-2 border-l-2 border-r-2 border-amber-700 rounded-b-full opacity-30" />
            <div className="w-12 h-6 border-b-2 border-l-2 border-r-2 border-amber-700 rounded-b-full opacity-20 mx-auto" />
          </motion.div>

          {/* Floating particles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full opacity-60"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [-10, -30, -10],
                opacity: [0.6, 1, 0.6],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Tree Actions */}
        <div className="flex justify-center space-x-4 mt-8">
          <motion.button
            onClick={() => setShowDecoding(!showDecoding)}
            className="bg-green-500 text-white px-4 py-2 rounded-xl font-medium flex items-center space-x-2 hover:bg-green-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye size={16} />
            <span>Decode Tree</span>
          </motion.button>

          <motion.button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl font-medium flex items-center space-x-2 hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            <span>Mint NFT</span>
          </motion.button>

          <motion.button
            className="bg-purple-500 text-white px-4 py-2 rounded-xl font-medium flex items-center space-x-2 hover:bg-purple-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={16} />
            <span>Share</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Tree Stats & Decoding */}
      <div className="space-y-6">
        {/* Impact Stats */}
        <motion.div
          className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-green-800 mb-6">Your Impact Genes</h3>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: TreePine,
                label: "Trees",
                value: userEcoData.treesPlanted,
                color: "text-green-500",
                bg: "bg-green-50",
              },
              {
                icon: Droplets,
                label: "Water (L)",
                value: userEcoData.waterSaved,
                color: "text-blue-500",
                bg: "bg-blue-50",
              },
              {
                icon: Recycle,
                label: "Plastic (kg)",
                value: userEcoData.plasticAvoided,
                color: "text-purple-500",
                bg: "bg-purple-50",
              },
              { icon: Zap, label: "CO₂ (kg)", value: userEcoData.co2Reduced, color: "text-gray-500", bg: "bg-gray-50" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`${stat.bg} rounded-2xl p-4 text-center`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <stat.icon className={`${stat.color} mx-auto mb-2`} size={24} />
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tree Decoding */}
        {showDecoding && (
          <motion.div
            className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-green-800 mb-6">🧬 Tree Decoding Results</h3>

            <div className="space-y-4">
              <div className="bg-green-50 rounded-2xl p-4">
                <h4 className="font-semibold text-green-800 mb-2">Environmental Impact Analysis</h4>
                <p className="text-green-700 text-sm">
                  Your tree shows strong water conservation genes (45% of branches) and excellent tree-planting activity
                  (30% of branches). Your eco-actions have influenced an estimated 127 people in your network.
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Behavioral Patterns</h4>
                <p className="text-blue-700 text-sm">
                  Peak activity: Weekends • Favorite category: Home & Garden • Consistency score: 8.7/10 • Next
                  milestone: 50 total actions
                </p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Collective Impact</h4>
                <p className="text-purple-700 text-sm">
                  Your actions contributed to saving 2.3 tons of CO₂ collectively, helped fund 3 renewable energy
                  projects, and supported 12 local eco-businesses.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Achievements */}
        <motion.div
          className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-green-800 mb-6">Tree Achievements</h3>

          <div className="space-y-3">
            {userEcoData.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.type}
                className={`flex items-center space-x-4 p-4 rounded-2xl ${
                  achievement.unlocked ? "bg-green-50 border-2 border-green-200" : "bg-gray-50 border-2 border-gray-200"
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className={`text-2xl ${achievement.unlocked ? "" : "grayscale"}`}>
                  {achievement.type === "water" && "💧"}
                  {achievement.type === "trees" && "🌳"}
                  {achievement.type === "plastic" && "♻️"}
                  {achievement.type === "carbon" && "⚡"}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${achievement.unlocked ? "text-green-800" : "text-gray-500"}`}>
                    {achievement.type === "water" && "Water Guardian"}
                    {achievement.type === "trees" && "Forest Protector"}
                    {achievement.type === "plastic" && "Plastic Warrior"}
                    {achievement.type === "carbon" && "Carbon Fighter"}
                  </div>
                  <div className={`text-sm ${achievement.unlocked ? "text-green-600" : "text-gray-400"}`}>
                    {achievement.unlocked
                      ? `Unlocked at ${achievement.count} actions`
                      : `Unlock at ${achievement.count} actions`}
                  </div>
                </div>
                {achievement.unlocked && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-500">
                    ✓
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
