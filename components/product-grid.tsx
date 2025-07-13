"use client"

import { motion } from "framer-motion"
import { Star, Leaf, Droplets, Recycle, Plus, Heart } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useEcoPoints } from "@/contexts/eco-points-context"
import { useToast } from "@/hooks/use-toast"
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

const ProductCard = ({ product, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = () => {
    onAddToCart(product)
    setShowConfetti(true)

    // Show toast notification
    toast({
      title: "Product Added to Cart! 🛒",
      description: `You just saved ${product.impact.water}L of water! This is equal to planting ${product.impact.trees} trees!`,
      variant: "default",
    })

    setTimeout(() => setShowConfetti(false), 3000)
  }

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
          src={product.image || "/placeholder.svg"}
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

export default function ProductGrid() {
  const { addToCart } = useCart()
  const { addPoints } = useEcoPoints()

  const products = [
    {
    id: 1,
    name: "Bamboo Toothbrush Set",
    description: "Biodegradable bamboo toothbrushes with soft bristles",
    price: 24.99,
    category: "personal",
    image: "https://images-cdn.ubuy.co.in/6679506cd7d45554383fd32c-bamboo-toothbrushes-for-adults-10-pcs.jpg",
    rating: 5,
    reviews: 234,
    sustainabilityScore: 95,
    badges: ["organic", "recycled"],
    impact: { trees: 2, water: 45 },
    ecoPoints: 50,
    tags: ["bamboo", "toothbrush", "biodegradable", "oral care"],
  },
  {
    id: 2,
    name: "Organic Cotton Tote Bag",
    description: "Reusable shopping bag made from 100% organic cotton",
    price: 18.99,
    category: "home",
    image: "https://m.media-amazon.com/images/I/71iE3dA33nL._UY1100_.jpg",
    rating: 4,
    reviews: 156,
    sustainabilityScore: 88,
    badges: ["organic", "water"],
    impact: { trees: 1, water: 120 },
    ecoPoints: 35,
    tags: ["cotton", "tote", "reusable", "shopping", "organic"],
  },
  {
    id: 3,
    name: "Solar Power Bank",
    description: "Portable solar charger with 20,000mAh capacity",
    price: 89.99,
    category: "tech",
    image: "https://m.media-amazon.com/images/I/81m0pwmlXKL.jpg",
    rating: 5,
    reviews: 89,
    sustainabilityScore: 92,
    badges: ["recycled"],
    impact: { trees: 5, water: 200 },
    ecoPoints: 120,
    tags: ["solar", "power bank", "portable", "charger", "renewable"],
  },
  {
    id: 4,
    name: "Beeswax Food Wraps",
    description: "Reusable food storage wraps made from organic beeswax",
    price: 32.99,
    category: "kitchen",
    image: "https://images-cdn.ubuy.co.in/634f5d87657bf64d2143e6c3-reusable-beeswax-wrap-beeswax-food.jpg",
    rating: 4,
    reviews: 312,
    sustainabilityScore: 90,
    badges: ["organic"],
    impact: { trees: 3, water: 80 },
    ecoPoints: 65,
    tags: ["beeswax", "food wrap", "reusable", "storage", "organic"],
  },
  {
    id: 5,
    name: "Recycled Yoga Mat",
    description: "Non-slip yoga mat made from recycled materials",
    price: 54.99,
    category: "outdoor",
    image: "https://www.thestylesalad.in/cdn/shop/files/CorkYogaMat.jpg?v=1726919545",
    rating: 5,
    reviews: 178,
    sustainabilityScore: 85,
    badges: ["recycled", "water"],
    impact: { trees: 4, water: 150 },
    ecoPoints: 85,
    tags: ["yoga", "mat", "recycled", "fitness", "non-slip"],
  },
  {
    id: 6,
    name: "Stainless Steel Water Bottle",
    description: "Insulated water bottle that keeps drinks cold for 24h",
    price: 39.99,
    category: "personal",
    image: "https://image.made-in-china.com/202f0j00VwfbDvrIJtoU/New-Design-500ml-Recycled-SUS304-Insulated-Shinny-Glitter-Bling-Diamond-Stainless-Steel-Rhinestone-Water-Bottle-for-Gifts.webp",
    rating: 5,
    reviews: 445,
    sustainabilityScore: 93,
    badges: ["recycled", "water"],
    impact: { trees: 2, water: 300 },
    ecoPoints: 75,
    tags: ["water bottle", "stainless steel", "insulated", "reusable"],
  },
  ]

  const handleAddToCart = (product) => {
    addToCart(product)
    addPoints(product.ecoPoints)
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-green-800 mb-6">Eco-Friendly Products</h2>
          <p className="text-xl text-green-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated collection of sustainable products that help you live more consciously while making a
            positive impact on the environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
