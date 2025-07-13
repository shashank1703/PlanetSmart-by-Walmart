"use client"

import { motion } from "framer-motion"
import { Star, Leaf, Droplets, Recycle, Plus, Heart, Eye } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useEcoPoints } from "@/contexts/eco-points-context"
import ConfettiAnimation from "@/components/confetti-animation"

const SustainabilityBadge = ({ type, animated = false }) => {
  const badges = {
    organic: { icon: Leaf, label: "USDA Organic", color: "bg-green-500" },
    water: { icon: Droplets, label: "Water Efficient", color: "bg-blue-500" },
    recycled: { icon: Recycle, label: "Recycled Materials", color: "bg-purple-500" },
  }

  const badge = badges[type]
  if (!badge) return null

  return (
    <motion.div
      className={`${badge.color} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1`}
      animate={animated ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
    >
      <badge.icon size={12} />
      <span>{badge.label}</span>
    </motion.div>
  )
}

export default function ProductCard({ product, viewMode = "grid", onAddToCart, onAchievement }) {
  const [isLiked, setIsLiked] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { addToCart } = useCart()
  const { addPoints } = useEcoPoints()

  const handleAddToCart = () => {
    addToCart(product)
    addPoints(product.ecoPoints)
    setShowConfetti(true)

    // Trigger achievement if provided
    if (onAchievement) {
      onAchievement({
        message: `You just saved ${product.impact.water}L of water!`,
        subMessage: `This is equal to planting ${product.impact.trees} trees!`,
        ecoPoints: product.ecoPoints,
      })
    }

    setTimeout(() => setShowConfetti(false), 3000)
  }

  if (viewMode === "list") {
    return (
      <motion.div
        className="group bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {showConfetti && <ConfettiAnimation />}

        {/* Product Image */}
        <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl">
          <img
            src={product.image || "/placeholder.svg?height=128&width=128"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Sustainability Badges */}
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
            {product.badges.slice(0, 2).map((badge, index) => (
              <SustainabilityBadge key={index} type={badge} />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-green-800">{product.name}</h3>
            <motion.button
              className="p-2 rounded-full hover:bg-green-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`${isLiked ? "text-red-500 fill-current" : "text-gray-400"}`} size={20} />
            </motion.button>
          </div>

          <p className="text-green-600 text-sm mb-3">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  size={16}
                />
              ))}
            </div>
            <span className="text-sm text-green-600">({product.reviews})</span>
          </div>

          {/* Sustainability Score */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-green-700">Sustainability Score</span>
              <span className="text-sm font-bold text-green-800">{product.sustainabilityScore}/100</span>
            </div>
            <div className="w-full bg-green-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${product.sustainabilityScore}%` }}
              />
            </div>
          </div>

          {/* Impact Stats */}
          <div className="flex items-center space-x-4 text-xs mb-4">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-green-800">{product.impact.trees}</span>
              <span className="text-green-600">Trees</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-blue-800">{product.impact.water}L</span>
              <span className="text-blue-600">Water</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-yellow-800">+{product.ecoPoints}</span>
              <span className="text-yellow-600">Points</span>
            </div>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex flex-col items-end space-y-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-green-800">${product.price}</div>
            <div className="text-sm text-green-600">+{product.ecoPoints} EcoPoints</div>
          </div>

          <div className="flex space-x-2">
            <motion.button
              className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye size={18} />
            </motion.button>

            <motion.button
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
            >
              <Plus size={18} />
              <span>Add to Cart</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  // Grid view (default)
  return (
    <motion.div
      className="group relative bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {showConfetti && <ConfettiAnimation />}

      {/* Product Image */}
      <div className="relative mb-6 overflow-hidden rounded-2xl">
        <img
          src={product.image || "/placeholder.svg?height=200&width=300"}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Like Button */}
        <motion.button
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`${isLiked ? "text-red-500 fill-current" : "text-gray-600"}`} size={16} />
        </motion.button>

        {/* Sustainability Badges */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {product.badges.map((badge, index) => (
            <SustainabilityBadge key={index} type={badge} animated />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-green-800 mb-2">{product.name}</h3>
        <p className="text-green-600 text-sm mb-3">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              size={16}
            />
          ))}
          <span className="text-sm text-green-600 ml-2">({product.reviews})</span>
        </div>

        {/* Sustainability Score */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-green-700">Sustainability Score</span>
            <span className="text-sm font-bold text-green-800">{product.sustainabilityScore}/100</span>
          </div>
          <div className="w-full bg-green-100 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${product.sustainabilityScore}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="bg-green-50 rounded-lg p-2 text-center">
            <div className="font-semibold text-green-800">{product.impact.trees}</div>
            <div className="text-green-600">Trees Saved</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <div className="font-semibold text-blue-800">{product.impact.water}L</div>
            <div className="text-blue-600">Water Saved</div>
          </div>
        </div>
      </div>

      {/* Price and Add to Cart */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-green-800">${product.price}</div>
          <div className="text-sm text-green-600">+{product.ecoPoints} EcoPoints</div>
        </div>

        <motion.button
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
        >
          <Plus size={20} />
        </motion.button>
      </div>
    </motion.div>
  )
}
