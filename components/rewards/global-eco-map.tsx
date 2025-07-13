"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Globe, Users, TreePine, Droplets, MapPin } from "lucide-react"

// Mock global data
const globalStats = {
  totalUsers: 125847,
  totalTrees: 1247893,
  totalWater: 15678234,
  totalCO2: 89234,
  countries: 67,
}

const userLocations = [
  { id: 1, lat: 40.7128, lng: -74.006, city: "New York", users: 1247, trees: 5234 },
  { id: 2, lat: 51.5074, lng: -0.1278, city: "London", users: 892, trees: 3456 },
  { id: 3, lat: 35.6762, lng: 139.6503, city: "Tokyo", users: 2134, trees: 8901 },
  { id: 4, lat: -33.8688, lng: 151.2093, city: "Sydney", users: 567, trees: 2345 },
  { id: 5, lat: 37.7749, lng: -122.4194, city: "San Francisco", users: 1456, trees: 6789 },
]

const MapPoint = ({ location, index }) => (
  <motion.div
    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
    style={{
      left: `${((location.lng + 180) / 360) * 100}%`,
      top: `${((90 - location.lat) / 180) * 100}%`,
    }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    whileHover={{ scale: 1.2 }}
  >
    {/* Pulsing circle */}
    <motion.div
      className="w-4 h-4 bg-green-500 rounded-full relative"
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(34, 197, 94, 0.7)",
          "0 0 0 10px rgba(34, 197, 94, 0)",
          "0 0 0 0 rgba(34, 197, 94, 0)",
        ],
      }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
    >
      {/* Tooltip */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        <div className="font-semibold text-green-800">{location.city}</div>
        <div className="text-sm text-green-600">{location.users} users</div>
        <div className="text-sm text-green-600">{location.trees} trees planted</div>
      </div>
    </motion.div>
  </motion.div>
)

export default function GlobalEcoMap() {
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    trees: 0,
    water: 0,
    co2: 0,
  })

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps

        setAnimatedStats({
          users: Math.floor(globalStats.totalUsers * progress),
          trees: Math.floor(globalStats.totalTrees * progress),
          water: Math.floor(globalStats.totalWater * progress),
          co2: Math.floor(globalStats.totalCO2 * progress),
        })

        if (step >= steps) {
          clearInterval(timer)
        }
      }, interval)

      return () => clearInterval(timer)
    }

    const cleanup = animateStats()
    return cleanup
  }, [])

  return (
    <div className="space-y-8">
      {/* Global Stats Header */}
      <motion.div
        className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-green-800 mb-4">🌍 Global Eco Impact</h2>
        <p className="text-xl text-green-600 mb-8">Together, we're creating a worldwide forest of positive change</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Eco Warriors", value: animatedStats.users, suffix: "" },
            { icon: TreePine, label: "Trees Planted", value: animatedStats.trees, suffix: "" },
            { icon: Droplets, label: "Water Saved", value: animatedStats.water, suffix: "L" },
            { icon: Globe, label: "CO₂ Reduced", value: animatedStats.co2, suffix: "kg" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/50 rounded-2xl p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <stat.icon className="text-green-500 mx-auto mb-3" size={32} />
              <div className="text-3xl font-bold text-green-800 mb-1">
                {stat.value.toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-green-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* World Map */}
      <motion.div
        className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-green-800 mb-2">Live Eco Communities</h3>
          <p className="text-green-600">See where our eco warriors are making the biggest impact</p>
        </div>

        {/* World Map Container */}
        <div
          className="relative bg-gradient-to-b from-blue-100 to-green-100 rounded-2xl overflow-hidden"
          style={{ aspectRatio: "2/1" }}
        >
          {/* Simplified world map background */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              {/* Simplified continent shapes */}
              <path d="M150 200 L300 180 L350 220 L320 280 L200 300 Z" fill="#22c55e" opacity="0.3" />
              <path d="M400 150 L600 140 L650 200 L600 250 L450 260 Z" fill="#22c55e" opacity="0.3" />
              <path d="M700 180 L850 170 L880 220 L820 270 L720 280 Z" fill="#22c55e" opacity="0.3" />
              <path d="M200 320 L350 310 L380 380 L300 400 L180 390 Z" fill="#22c55e" opacity="0.3" />
            </svg>
          </div>

          {/* User location points */}
          {userLocations.map((location, index) => (
            <MapPoint key={location.id} location={location} index={index} />
          ))}

          {/* Connecting lines animation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {userLocations.map((location, index) => (
              <motion.circle
                key={`pulse-${location.id}`}
                cx={`${((location.lng + 180) / 360) * 100}%`}
                cy={`${((90 - location.lat) / 180) * 100}%`}
                r="0"
                fill="rgba(34, 197, 94, 0.2)"
                initial={{ r: 0 }}
                animate={{ r: 50 }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.5,
                }}
              />
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex justify-center items-center space-x-8 mt-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-700">Active Communities</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="text-green-600" size={16} />
            <span className="text-green-700">Eco Impact Zones</span>
          </div>
        </div>
      </motion.div>

      {/* Community Leaderboard */}
      <motion.div
        className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">🏆 Top Eco Communities</h3>

        <div className="space-y-4">
          {userLocations
            .sort((a, b) => b.trees - a.trees)
            .map((location, index) => (
              <motion.div
                key={location.id}
                className="flex items-center justify-between bg-white/50 rounded-2xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                          ? "bg-gray-400"
                          : index === 2
                            ? "bg-amber-600"
                            : "bg-green-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-green-800">{location.city}</div>
                    <div className="text-sm text-green-600">{location.users} eco warriors</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-green-800">{location.trees.toLocaleString()}</div>
                  <div className="text-sm text-green-600">trees planted</div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  )
}
