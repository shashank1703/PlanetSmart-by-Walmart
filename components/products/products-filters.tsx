"use client"

import { motion } from "framer-motion"
import { Filter, ChevronDown, Leaf, Droplets, Recycle, Star } from "lucide-react"
import { useState } from "react"

const categories = [
  { id: "all", name: "All Products", icon: "🌍" },
  { id: "home", name: "Home & Garden", icon: "🏠" },
  { id: "personal", name: "Personal Care", icon: "🧴" },
  { id: "kitchen", name: "Kitchen & Dining", icon: "🍽️" },
  { id: "clothing", name: "Eco Fashion", icon: "👕" },
  { id: "tech", name: "Green Tech", icon: "📱" },
  { id: "outdoor", name: "Outdoor & Sports", icon: "🏃" },
]

const badges = [
  { id: "organic", name: "USDA Organic", icon: Leaf, color: "text-green-500" },
  { id: "water", name: "Water Efficient", icon: Droplets, color: "text-blue-500" },
  { id: "recycled", name: "Recycled Materials", icon: Recycle, color: "text-purple-500" },
]

const sortOptions = [
  { id: "featured", name: "Featured" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "sustainability", name: "Sustainability Score" },
  { id: "impact", name: "Environmental Impact" },
  { id: "rating", name: "Customer Rating" },
]



export default function ProductsFilters({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sustainabilityRange,
  setSustainabilityRange,
  selectedBadges,
  setSelectedBadges,
  sortBy,
  setSortBy,
}) {
  // Remove local state for filters, keep only expandedSections
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    sustainability: true,
    badges: true,
    sort: true,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleBadge = (badgeId) => {
    setSelectedBadges((prev) => (prev.includes(badgeId) ? prev.filter((id) => id !== badgeId) : [...prev, badgeId]))
  }

  const FilterSection = ({ title, section, children }) => (
    <motion.div
      className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between text-lg font-semibold text-green-800 mb-4"
        whileHover={{ scale: 1.02 }}
      >
        <span className="flex items-center space-x-2">
          <Filter size={20} />
          <span>{title}</span>
        </span>
        <motion.div animate={{ rotate: expandedSections[section] ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: expandedSections[section] ? "auto" : 0,
          opacity: expandedSections[section] ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        {children}
      </motion.div>
    </motion.div>
  )

  return (
    <div className="space-y-6 p-4">
      {/* Sort */}
      <FilterSection title="Sort By" section="sort">
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                sortBy === option.id ? "bg-green-100 text-green-800 font-medium" : "hover:bg-green-50 text-green-700"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option.name}
            </motion.button>
          ))}
        </div>
      </FilterSection>

      {/* Categories */}
      <FilterSection title="Categories" section="category">
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 transition-all ${
                selectedCategory === category.id
                  ? "bg-green-100 text-green-800 font-medium"
                  : "hover:bg-green-50 text-green-700"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" section="price">
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-green-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <div className="relative px-3 py-6">
            {/* Track Background */}
            <div className="relative h-2 bg-green-200 rounded-lg">
              {/* Active Range */}
              <div
                className="absolute h-2 bg-green-400 rounded-lg"
                style={{
                  left: `${(priceRange[0] / 200) * 100}%`,
                  width: `${((priceRange[1] - priceRange[0]) / 200) * 100}%`,
                }}
              />
            </div>
            
            {/* Min Range Input */}
            <input
              type="range"
              min="0"
              max="200"
              value={priceRange[0]}
              onChange={(e) => {
                const value = Math.min(Number(e.target.value), priceRange[1])
                setPriceRange([value, priceRange[1]])
              }}
              className="absolute top-2 left-0 w-full h-6 bg-transparent cursor-pointer appearance-none 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 
                [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-grab 
                [&::-webkit-slider-thumb]:hover:bg-green-700 [&::-webkit-slider-thumb]:hover:scale-110 
                [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:active:scale-125
                [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:h-2 
                [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-grab 
                [&::-moz-range-thumb]:hover:bg-green-700 [&::-moz-range-thumb]:active:cursor-grabbing
                [&::-moz-range-track]:appearance-none [&::-moz-range-track]:h-2 
                [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:border-0"
              style={{ zIndex: 20 }}
            />
            
            {/* Max Range Input */}
            <input
              type="range"
              min="0"
              max="200"
              value={priceRange[1]}
              onChange={(e) => {
                const value = Math.max(Number(e.target.value), priceRange[0])
                setPriceRange([priceRange[0], value])
              }}
              className="absolute top-2 left-0 w-full h-6 bg-transparent cursor-pointer appearance-none 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 
                [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-grab 
                [&::-webkit-slider-thumb]:hover:bg-green-700 [&::-webkit-slider-thumb]:hover:scale-110 
                [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:active:scale-125
                [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:h-2 
                [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-grab 
                [&::-moz-range-thumb]:hover:bg-green-700 [&::-moz-range-thumb]:active:cursor-grabbing
                [&::-moz-range-track]:appearance-none [&::-moz-range-track]:h-2 
                [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:border-0"
              style={{ zIndex: 21 }}
            />
          </div>
          <div className="flex space-x-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => {
                const value = Math.max(0, Math.min(Number(e.target.value) || 0, priceRange[1]))
                setPriceRange([value, priceRange[1]])
              }}
              className="w-full p-2 rounded-lg border border-green-200 text-sm"
              placeholder="Min"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => {
                const value = Math.max(priceRange[0], Math.min(Number(e.target.value) || 0, 200))
                setPriceRange([priceRange[0], value])
              }}
              className="w-full p-2 rounded-lg border border-green-200 text-sm"
              placeholder="Max"
            />
          </div>
        </div>
      </FilterSection>

      {/* Sustainability Score */}
      <FilterSection title="Sustainability Score" section="sustainability">
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-green-600">
            <span>{sustainabilityRange[0]}/100</span>
            <span>{sustainabilityRange[1]}/100</span>
          </div>
          <div className="relative px-3 py-6">
            {/* Track Background */}
            <div className="relative h-2 bg-green-200 rounded-lg">
              {/* Active Range */}
              <div
                className="absolute h-2 bg-green-400 rounded-lg"
                style={{
                  left: `${(sustainabilityRange[0] / 100) * 100}%`,
                  width: `${((sustainabilityRange[1] - sustainabilityRange[0]) / 100) * 100}%`,
                }}
              />
            </div>
            
            {/* Min Range Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sustainabilityRange[0]}
              onChange={(e) => {
                const value = Math.min(Number(e.target.value), sustainabilityRange[1])
                setSustainabilityRange([value, sustainabilityRange[1]])
              }}
              className="absolute top-2 left-0 w-full h-6 bg-transparent cursor-pointer appearance-none 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 
                [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-grab 
                [&::-webkit-slider-thumb]:hover:bg-green-700 [&::-webkit-slider-thumb]:hover:scale-110 
                [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:active:scale-125
                [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:h-2 
                [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-grab 
                [&::-moz-range-thumb]:hover:bg-green-700 [&::-moz-range-thumb]:active:cursor-grabbing
                [&::-moz-range-track]:appearance-none [&::-moz-range-track]:h-2 
                [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:border-0"
              style={{ zIndex: 20 }}
            />
            
            {/* Max Range Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sustainabilityRange[1]}
              onChange={(e) => {
                const value = Math.max(Number(e.target.value), sustainabilityRange[0])
                setSustainabilityRange([sustainabilityRange[0], value])
              }}
              className="absolute top-2 left-0 w-full h-6 bg-transparent cursor-pointer appearance-none 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 
                [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-grab 
                [&::-webkit-slider-thumb]:hover:bg-green-700 [&::-webkit-slider-thumb]:hover:scale-110 
                [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:active:scale-125
                [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:h-2 
                [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-grab 
                [&::-moz-range-thumb]:hover:bg-green-700 [&::-moz-range-thumb]:active:cursor-grabbing
                [&::-moz-range-track]:appearance-none [&::-moz-range-track]:h-2 
                [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:border-0"
              style={{ zIndex: 21 }}
            />
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="text-green-500" size={16} />
              <span className="text-sm font-medium text-green-800">
                Score Range: {sustainabilityRange[0]} - {sustainabilityRange[1]}
              </span>
            </div>
            <div className="text-xs text-green-600">Higher scores indicate better environmental impact</div>
          </div>
        </div>
      </FilterSection>

      {/* Eco Badges */}
      <FilterSection title="Eco Certifications" section="badges">
        <div className="space-y-3">
          {badges.map((badge) => (
            <motion.button
              key={badge.id}
              onClick={() => toggleBadge(badge.id)}
              className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 transition-all ${
                selectedBadges.includes(badge.id)
                  ? "bg-green-100 text-green-800 font-medium ring-2 ring-green-300"
                  : "hover:bg-green-50 text-green-700"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <badge.icon className={badge.color} size={20} />
              <span>{badge.name}</span>
              {selectedBadges.includes(badge.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto w-2 h-2 bg-green-500 rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>
      </FilterSection>

      {/* Clear Filters */}
      <motion.button
        onClick={() => {
          setSelectedCategory("all")
          setPriceRange([0, 200])
          setSustainabilityRange([0, 100])
          setSelectedBadges([])
          setSortBy("featured")
        }}
        className="w-full bg-gradient-to-r from-red-400 to-red-500 text-white py-3 rounded-xl font-medium hover:from-red-500 hover:to-red-600 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Clear All Filters
      </motion.button>
    </div>
  )
}
