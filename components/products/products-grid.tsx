"use client"

import { motion } from "framer-motion"
import { Grid, List, Package } from "lucide-react"
import { useState } from "react"
import ProductCard from "@/components/products/product-card"

export default function ProductsGrid({ products, searchQuery }) {
  const [viewMode, setViewMode] = useState("grid")

  return (
    <div>
      {/* Results Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
          </h2>
          <p className="text-green-600">
            Showing {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <motion.button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "grid" ? "bg-green-500 text-white" : "bg-white/50 text-green-600 hover:bg-green-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Grid size={20} />
          </motion.button>
          <motion.button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "list" ? "bg-green-500 text-white" : "bg-white/50 text-green-600 hover:bg-green-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <List size={20} />
          </motion.button>
        </div>
      </motion.div>

      {/* Products Grid/List */}
      {products.length === 0 ? (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Package className="mx-auto text-green-400 mb-4" size={64} />
          <h3 className="text-2xl font-semibold text-green-800 mb-2">No Products Found</h3>
          <p className="text-green-600 mb-6">
            {searchQuery
              ? `No products match your search for "${searchQuery}". Try adjusting your filters or search terms.`
              : "No products match your current filters. Try adjusting your criteria."}
          </p>
          <motion.button
            onClick={() => window.location.reload()}
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset Filters
          </motion.button>
        </motion.div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} viewMode={viewMode} onAddToCart={() => {}} onAchievement={() => {}} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
