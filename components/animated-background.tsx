"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const FloatingLeaf = ({ delay = 0, duration = 20 }) => (
  <motion.div
    className="absolute opacity-20"
    initial={{ x: -100, y: Math.random() * window.innerHeight, rotate: 0 }}
    animate={{
      x: window.innerWidth + 100,
      y: Math.random() * window.innerHeight,
      rotate: 360,
    }}
    transition={{
      duration,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
    </svg>
  </motion.div>
)

const WaterRipple = ({ delay = 0 }) => (
  <motion.div
    className="absolute rounded-full border-2 border-blue-200 opacity-30"
    style={{
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
    }}
    initial={{ scale: 0, opacity: 0.3 }}
    animate={{ scale: 4, opacity: 0 }}
    transition={{
      duration: 3,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeOut",
    }}
  />
)

const FloatingParticle = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-1 h-1 bg-green-300 rounded-full opacity-40"
    style={{
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
    }}
    animate={{
      y: [-20, -40, -20],
      x: [-10, 10, -10],
      opacity: [0.4, 0.8, 0.4],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  />
)

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-green-100" />

      {/* Floating Leaves */}
      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingLeaf key={`leaf-${i}`} delay={i * 2} duration={15 + Math.random() * 10} />
      ))}

      {/* Water Ripples */}
      {Array.from({ length: 5 }).map((_, i) => (
        <WaterRipple key={`ripple-${i}`} delay={i * 1.5} />
      ))}

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle key={`particle-${i}`} delay={i * 0.5} />
      ))}

      {/* Ambient Light Effect */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-200 rounded-full opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
