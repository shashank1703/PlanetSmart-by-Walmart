"use client"

import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { useEcoPoints } from "@/contexts/eco-points-context"
import { 
  Leaf, 
  Calendar, 
  Award, 
  TrendingUp, 
  Settings, 
  LogOut,
  ShoppingBag,
  DollarSign,
  TreePine,
  Droplets,
  Zap,
  Star,
  Trophy,
  Target,
  BarChart3
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import Link from "next/link"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { points } = useEcoPoints()

  if (!user) return null

  const stats = [
    {
      icon: ShoppingBag,
      label: "Total Orders",
      value: user.totalOrders || 0,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: DollarSign,
      label: "Total Spent",
      value: `$${(user.totalSpent || 0).toFixed(2)}`,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: TreePine,
      label: "Trees Saved",
      value: user.treesSaved || 0,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Droplets,
      label: "Water Saved (L)",
      value: (user.waterSaved || 0).toLocaleString(),
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Zap,
      label: "Carbon Offset (kg)",
      value: (user.carbonOffset || 0).toLocaleString(),
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Target,
      label: "Favorite Category",
      value: user.favoriteCategory || "General",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ]

  const recentActivity = [
    {
      type: "order",
      title: "Order Completed",
      description: "Bamboo Toothbrush Set",
      date: user.lastOrder || "2024-03-15",
      points: 50
    },
    {
      type: "achievement",
      title: "Achievement Unlocked",
      description: "Tree Planter Badge",
      date: "2024-03-14",
      points: 100
    },
    {
      type: "impact",
      title: "Environmental Impact",
      description: "Saved 2 trees this month",
      date: "2024-03-13",
      points: 25
    }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 pt-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-green-800 mb-6">Your Dashboard</h1>
            <p className="text-xl text-green-600">Track your sustainable journey and impact</p>
          </motion.div>

          {/* User Profile Card */}
          <motion.div
            className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-green-800 mb-2">{user.name}</h2>
                <p className="text-green-600 mb-2">{user.email}</p>
                <div className="flex items-center space-x-4 text-sm text-green-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>Member since {user.joinDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy size={16} />
                    <span>{user.membershipTier}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-800">{points}</div>
                <div className="text-green-600">EcoPoints</div>
              </div>
            </div>

            {/* Badges */}
            {user.badges && user.badges.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Your Badges</h3>
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge, index) => (
                    <motion.div
                      key={badge}
                      className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      <Star size={14} />
                      <span>{badge}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`${stat.bgColor} rounded-2xl p-6 border border-white/60`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <stat.icon className={`${stat.color}`} size={24} />
                  <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-green-800">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <motion.div
              className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/50 shadow-lg"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center space-x-2">
                <BarChart3 size={24} />
                <span>Recent Activity</span>
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      {activity.type === "order" && <ShoppingBag className="text-green-600" size={16} />}
                      {activity.type === "achievement" && <Award className="text-yellow-600" size={16} />}
                      {activity.type === "impact" && <Leaf className="text-green-600" size={16} />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-green-800">{activity.title}</div>
                      <div className="text-sm text-green-600">{activity.description}</div>
                      <div className="text-xs text-gray-500">{activity.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">+{activity.points}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/50 shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center space-x-2">
                <TrendingUp size={24} />
                <span>Quick Actions</span>
              </h3>
              <div className="space-y-3">
                <Link href="/products">
                  <motion.div
                    className="bg-green-50 hover:bg-green-100 rounded-xl p-4 cursor-pointer transition-all border border-green-200"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-green-800">Shop Products</div>
                        <div className="text-sm text-green-600">Browse sustainable items</div>
                      </div>
                    </div>
                  </motion.div>
                </Link>

                <Link href="/rewards">
                  <motion.div
                    className="bg-blue-50 hover:bg-blue-100 rounded-xl p-4 cursor-pointer transition-all border border-blue-200"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Award className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-green-800">View Rewards</div>
                        <div className="text-sm text-green-600">Redeem your points</div>
                      </div>
                    </div>
                  </motion.div>
                </Link>

                <Link href="/explore">
                  <motion.div
                    className="bg-purple-50 hover:bg-purple-100 rounded-xl p-4 cursor-pointer transition-all border border-purple-200"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Leaf className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-green-800">Explore Impact</div>
                        <div className="text-sm text-green-600">See your environmental impact</div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>


        </div>
      </div>
    </ProtectedRoute>
  )
}
