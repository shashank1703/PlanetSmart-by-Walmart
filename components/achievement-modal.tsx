"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Award, Sparkles } from "lucide-react"

export default function AchievementModal({ isOpen, onClose, data }) {
  if (!data) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-white/60 shadow-2xl text-center relative overflow-hidden">
              {/* Background Animation */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                    style={{
                      left: Math.random() * 100 + "%",
                      top: Math.random() * 100 + "%",
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                ))}
              </div>

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/50 hover:bg-white/70 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} className="text-gray-600" />
              </motion.button>

              {/* Achievement Icon */}
              <motion.div
                className="mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
              >
                <div className="relative">
                  <Award className="mx-auto text-yellow-500" size={64} />
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                  >
                    <Sparkles className="text-yellow-400" size={24} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Achievement Text */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-green-800 mb-4">Great Choice! 🎉</h2>

                <div className="bg-green-50 rounded-2xl p-4 mb-4">
                  <p className="text-green-700 font-semibold mb-2">{data.message}</p>
                  <p className="text-green-600 text-sm">{data.subMessage}</p>
                </div>

                <div className="bg-yellow-50 rounded-2xl p-4 mb-6">
                  <p className="text-yellow-700 font-semibold">+{data.ecoPoints} EcoPoints Earned! ⚡</p>
                </div>
              </motion.div>

              {/* Action Button */}
              <motion.button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Keep Shopping for the Planet!
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
