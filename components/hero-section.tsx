"use client"

import { motion } from "framer-motion"
import { ArrowRight, Leaf, Heart, Globe } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-green-800 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Shop for a
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Better Planet
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-green-700 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover eco-friendly products that make a real difference. Track your positive environmental impact with
            every purchase.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Shopping</span>
            <ArrowRight size={20} />
          </motion.button>

          <motion.button
            className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Impact Stats Preview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: Leaf, label: "Products Sold", value: "50K+", color: "text-green-500" },
            { icon: Heart, label: "Happy Customers", value: "25K+", color: "text-red-500" },
            { icon: Globe, label: "CO₂ Saved", value: "100T+", color: "text-blue-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <stat.icon className={`${stat.color} mx-auto mb-3`} size={32} />
              <div className="text-2xl font-bold text-green-800 mb-1">{stat.value}</div>
              <div className="text-green-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
