"use client"

import { motion } from "framer-motion"
import { Search, X } from "lucide-react"

export default function ProductsSearch({ searchQuery, setSearchQuery }) {
  return (
    <motion.div
      className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-xl relative z-10"
    >


      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, description, or tags..."
          className="products-search-input w-full p-3 pl-10 pr-10 text-base rounded-xl border-2 border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90 placeholder:text-gray-400"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" size={24} />

        {searchQuery && (
          <motion.button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={18} />
          </motion.button>
        )}
      </div>

      {searchQuery && (
        <motion.div className="mt-3 text-sm text-green-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Searching for: <span className="font-medium">"{searchQuery}"</span>
        </motion.div>
      )}
    </motion.div>
  )
}
