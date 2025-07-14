"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import ProductsHeader from "@/components/products/products-header"
import ProductsFilters from "@/components/products/products-filters"
import ProductsGrid from "@/components/products/products-grid"
import ProductsSearch from "@/components/products/products-search"
import ProtectedRoute from "@/components/protected-route"
import { productsData } from "@/data/products-data"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sustainabilityRange, setSustainabilityRange] = useState([0, 100])
  const [selectedBadges, setSelectedBadges] = useState([])
  const [sortBy, setSortBy] = useState("sustainability")

  const filteredProducts = useMemo(() => {
    const filtered = productsData.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Category filter
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      // Sustainability filter
      const matchesSustainability =
        product.sustainabilityScore >= sustainabilityRange[0] && product.sustainabilityScore <= sustainabilityRange[1]

      // Badges filter
      const matchesBadges =
        selectedBadges.length === 0 || selectedBadges.some((badge) => product.badges.includes(badge))

      return matchesSearch && matchesCategory && matchesPrice && matchesSustainability && matchesBadges
    })

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "sustainability":
        filtered.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
        break
      case "impact":
        filtered.sort((a, b) => b.impact.trees + b.impact.water / 10 - (a.impact.trees + a.impact.water / 10))
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, priceRange, sustainabilityRange, selectedBadges, sortBy])

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-24 relative">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="relative z-20">
            <ProductsHeader />

            {/* Search Bar */}
            <motion.div
              className="w-full max-w-2xl mx-auto my-6"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0 }}
            >
              <ProductsSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </motion.div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <motion.div
              className="lg:w-80 flex-shrink-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProductsFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sustainabilityRange={sustainabilityRange}
                setSustainabilityRange={setSustainabilityRange}
                selectedBadges={selectedBadges}
                setSelectedBadges={setSelectedBadges}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </motion.div>

            {/* Products Grid */}
            <div className="flex-1">
              <ProductsGrid products={filteredProducts} searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
