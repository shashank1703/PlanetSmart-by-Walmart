"use client"

import { motion } from "framer-motion"
import { TreePine, Droplets, Wind, Recycle } from "lucide-react"
import { useEffect, useState } from "react"

const ImpactCard = ({ icon: Icon, title, value, unit, color, description, delay = 0 }) => {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0
      const end = Number.parseInt(value)
      const duration = 2000
      const increment = end / (duration / 16)

      const counter = setInterval(() => {
        start += increment
        if (start >= end) {
          setAnimatedValue(end)
          clearInterval(counter)
        } else {
          setAnimatedValue(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(counter)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <motion.div
      className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <motion.div
          className={`p-4 rounded-2xl ${color} bg-opacity-20`}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
        >
          <Icon className={color.replace("bg-", "text-")} size={32} />
        </motion.div>

        <motion.div
          className="text-right"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
        >
          <div className="text-3xl font-bold text-green-800">{animatedValue.toLocaleString()}</div>
          <div className="text-green-600 font-medium">{unit}</div>
        </motion.div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
        <p className="text-green-600 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-green-100 rounded-full h-2 mb-4">
        <motion.div
          className={`h-2 rounded-full ${color.replace("bg-", "bg-")}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((animatedValue / Number.parseInt(value)) * 100, 100)}%` }}
          transition={{ duration: 2, delay: delay + 0.5 }}
        />
      </div>

      <motion.div
        className="text-xs text-green-500 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1 }}
      >
        Updated in real-time
      </motion.div>
    </motion.div>
  )
}

export default function EcoImpactDashboard() {
  const impactData = [
    {
      icon: TreePine,
      title: "Trees Saved",
      value: "1247",
      unit: "Trees",
      color: "bg-green-500",
      description: "Equivalent trees saved through sustainable product choices and reduced paper consumption.",
    },
    {
      icon: Droplets,
      title: "Water Conserved",
      value: "45890",
      unit: "Liters",
      color: "bg-blue-500",
      description: "Fresh water preserved through eco-friendly manufacturing and packaging processes.",
    },
    {
      icon: Wind,
      title: "CO₂ Reduced",
      value: "8934",
      unit: "kg CO₂",
      color: "bg-gray-500",
      description: "Carbon emissions prevented through sustainable shipping and renewable energy usage.",
    },
    {
      icon: Recycle,
      title: "Plastic Avoided",
      value: "2156",
      unit: "kg Plastic",
      color: "bg-purple-500",
      description: "Single-use plastic eliminated through biodegradable and reusable product alternatives.",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-green-800 mb-6">Your Environmental Impact</h2>
          <p className="text-xl text-green-600 max-w-3xl mx-auto leading-relaxed">
            See the real-time positive impact you're making on our planet with every purchase. Together, we're building
            a more sustainable future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactData.map((item, index) => (
            <ImpactCard key={item.title} {...item} delay={index * 0.2} />
          ))}
        </div>

        {/* Achievement Banner */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 text-white text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            🌟
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">Eco Champion Status Achieved!</h3>
          <p className="text-green-100">You've reached the top 10% of environmental impact contributors this month!</p>
        </motion.div>
      </div>
    </section>
  )
}
