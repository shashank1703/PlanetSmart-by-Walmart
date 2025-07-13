"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"

interface EcoFarmProps {
  treeCount: number
  waterSaved: number
}

const TreeSVG = ({ variant = 0 }) => {
  const treeTypes = [
    // Triangular pine
    <>
      <motion.path
        d="M16 4L8 20H24L16 4Z"
        fill="#4ade80"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
      />
    </>,
    // Round top
    <>
      <motion.path
        d="M16 4C11 4 8 8 8 12C8 16 12 20 16 20C20 20 24 16 24 12C24 8 21 4 16 4Z"
        fill="#4ade80"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
      />
    </>,
    // Oval shaped
    <>
      <motion.path
        d="M16 4C13 4 10 8 10 14C10 20 13 24 16 24C19 24 22 20 22 14C22 8 19 4 16 4Z"
        fill="#4ade80"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
      />
    </>,
    // Multi-level pine
    <>
      <motion.path
        d="M16 4L10 12H22L16 4ZM16 10L8 20H24L16 10Z"
        fill="#4ade80"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
      />
    </>
  ]

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {treeTypes[variant]}
      <motion.rect
        x="14.5"
        y="24"
        width="3"
        height="6"
        fill="#854d0e"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.2 }}
      />
    </svg>
  )
}


const WaterDropSVG = () => (
  <motion.svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 180, opacity: [0, 1, 1, 0] }}
    transition={{ duration: 2, ease: "easeIn", times: [0, 0.2, 0.8, 1] }}
  >
    <path
      d="M8 2C6 6 4 8 4 10C4 12.2091 5.79086 14 8 14C10.2091 14 12 12.2091 12 10C12 8 10 6 8 2Z"
      fill="#60a5fa"
    />
  </motion.svg>
)

const WellSVG = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M24 12C18 12 14 16 14 20C14 24 18 28 24 28C30 28 34 24 34 20C34 16 30 12 24 12Z"
      fill="#60a5fa"
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
    />
    <motion.path
      d="M14 20H34V36C34 38 30 40 24 40C18 40 14 38 14 36V20Z"
      fill="#7c3aed"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: 0.3 }}
    />
    <motion.path
      d="M12 18H36"
      stroke="#854d0e"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    />
  </svg>
)

export default function EcoFarm({ treeCount, waterSaved }: EcoFarmProps) {
  const [trees, setTrees] = useState<number[]>([])
  const prevWaterSaved = useRef(waterSaved)
  const [showWaterDrop, setShowWaterDrop] = useState(false)

  useEffect(() => {
    if (waterSaved > prevWaterSaved.current) {
      setShowWaterDrop(true)
      const timer = setTimeout(() => setShowWaterDrop(false), 1000)
      return () => clearTimeout(timer)
    }
    prevWaterSaved.current = waterSaved
  }, [waterSaved])

  useEffect(() => {
    setTrees(Array.from({ length: Math.min(treeCount, 8) }, (_, i) => i))
  }, [treeCount])

  return (
    <div className="flex gap-4">
      {/* Trees Section */}
      <div className="flex-1 relative h-32 bg-gradient-to-b from-cyan-100 to-cyan-200 rounded-xl overflow-hidden shadow-inner">
        {/* Clouds Background */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-2 left-4 w-12 h-6 bg-white/70 rounded-full"
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-4 right-8 w-16 h-8 bg-white/70 rounded-full"
            animate={{ x: [10, -10, 10] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Hills Background */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-emerald-200 to-emerald-100/50" />
          <div className="absolute bottom-0 left-0 w-2/3 h-16 bg-emerald-300/30 rounded-full transform -translate-x-1/4 translate-y-8" />
          <div className="absolute bottom-0 right-0 w-2/3 h-20 bg-emerald-300/30 rounded-full transform translate-x-1/4 translate-y-10" />
        </div>
        
        {/* Trees Layout */}
        <div className="absolute inset-0">
          <AnimatePresence>
            {trees.map((index) => {
              const row = Math.floor(index / 4)
              const col = index % 4
              const xOffset = col * 25 + (row % 2 ? 12 : 0)
              const yOffset = row * 20 + (col % 2 ? -4 : 0)
              
              return (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${xOffset}%`,
                    bottom: `${20 + yOffset}%`,
                  }}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 20 }}
                  transition={{
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: index * 0.1,
                  }}
                >
                  <TreeSVG variant={index % 4} />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-green-800">
          {treeCount} Trees
        </div>
      </div>

      {/* Water Well Section */}
      <div className="w-32 relative h-32 bg-gradient-to-b from-blue-100 to-blue-200 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-blue-800/20 to-transparent" />
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <WellSVG />
        </motion.div>

        {/* Water Drop Animation */}
        <AnimatePresence>
          {showWaterDrop && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
              <WaterDropSVG />
            </div>
          )}
        </AnimatePresence>

        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-blue-800 z-40">
          {waterSaved}L Water
        </div>
      </div>
    </div>
  )
}
