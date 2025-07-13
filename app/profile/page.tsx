"use client"

import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { useEcoPoints } from "@/contexts/eco-points-context"
import { Leaf, Calendar, Award, TrendingUp, Settings, LogOut } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import Link from "next/link"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { points } = useEcoPoints()

  if (!user) return null

  const stats = [
    {
      icon: Leaf,
      label: "Trees Saved",
      value: Math.floor(points / 10),
      color: "text-green-600"
    },
    {
      icon: TrendingUp,
      label: "Impact Score",
      value: Math.floor(points / 5),
      color: "text-blue-600"
    },
    {
      icon: Award,
      label: "Achievements",
      value: Math.floor(points / 50),
      color: "text-purple-600"
    }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 pt-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-green-800 mb-6">Your Profile</h1>
            <p className="text-xl text-green-600">Track your sustainable journey and impact</p>
          </motion.div>

          {/* Profile Card */}
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
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-800">{points}</div>
                <div className="text-green-600">EcoPoints</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/50 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <stat.icon className={`mx-auto mb-3 ${stat.color}`} size={32} />
                  <div className="text-2xl font-bold text-green-800 mb-1">{stat.value}</div>
                  <div className="text-green-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/rewards">
              <motion.div
                className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <Award className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Rewards & Achievements</h3>
                    <p className="text-green-600 text-sm">View your rewards and track progress</p>
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link href="/products">
              <motion.div
                className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Leaf className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Shop Products</h3>
                    <p className="text-green-600 text-sm">Browse sustainable products</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Logout Button */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 mx-auto"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
