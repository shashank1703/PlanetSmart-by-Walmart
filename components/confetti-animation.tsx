"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  type: string
  delay: number
}

const ConfettiPiece = ({ type, delay = 0 }: { type: string; delay?: number }) => {
  const pieces = {
    leaf: { emoji: "🍃", color: "text-green-500" },
    water: { emoji: "💧", color: "text-blue-500" },
    sun: { emoji: "☀️", color: "text-yellow-500" },
    tree: { emoji: "🌳", color: "text-green-600" },
  }

  const piece = pieces[type as keyof typeof pieces] || pieces.leaf

  return (
    <motion.div
      className={`absolute text-2xl ${piece.color} pointer-events-none`}
      initial={{
        x: Math.random() * 400 - 200,
        y: -50,
        rotate: 0,
        scale: 0,
      }}
      animate={{
        x: Math.random() * 400 - 200,
        y: 400,
        rotate: 360,
        scale: [0, 1, 0.8, 0],
      }}
      transition={{
        duration: 3,
        delay,
        ease: "easeOut",
      }}
    >
      {piece.emoji}
    </motion.div>
  )
}

export default function ConfettiAnimation() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const confettiTypes = ["leaf", "water", "sun", "tree"]
    const newPieces = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      type: confettiTypes[Math.floor(Math.random() * confettiTypes.length)],
      delay: Math.random() * 0.5,
    }))

    setPieces(newPieces)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((piece) => (
        <ConfettiPiece key={piece.id} type={piece.type} delay={piece.delay} />
      ))}
    </div>
  )
}
