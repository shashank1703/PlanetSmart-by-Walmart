"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Leaf, Lightbulb, Recycle } from "lucide-react"

const suggestions = [
  { icon: Leaf, text: "How can I reduce my carbon footprint?", category: "tips" },
  { icon: Recycle, text: "What products are most eco-friendly?", category: "products" },
  { icon: Lightbulb, text: "Give me sustainability tips for home", category: "tips" },
]

export default function AIEcoAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      content: "Hi! I'm your AI Eco Assistant 🌱 How can I help you make more sustainable choices today?",
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessages = [
      ...messages,
      { type: "user", content: inputValue },
      {
        type: "assistant",
        content:
          "That's a great question! Based on your shopping history, I recommend focusing on products with high sustainability scores. Would you like me to show you some personalized eco-friendly alternatives?",
      },
    ]

    setMessages(newMessages)
    setInputValue("")
  }

  const handleSuggestionClick = (suggestion) => {
    const responses = {
      "How can I reduce my carbon footprint?":
        "Great question! Here are 3 immediate ways: 1) Choose products with minimal packaging, 2) Opt for locally-sourced items, 3) Use our carbon offset feature at checkout. Your current footprint reduction is 15% this month! 🌍",
      "What products are most eco-friendly?":
        "Based on our sustainability scores, I recommend: Bamboo products (95% score), Solar-powered items (92% score), and Recycled materials (88% score). Check out our 'Top Eco Picks' section! ♻️",
      "Give me sustainability tips for home":
        "Here are personalized tips for your home: 1) Switch to LED bulbs (saves 80% energy), 2) Use our beeswax wraps instead of plastic, 3) Try our compost starter kit. You could save $200/year! 💡",
    }

    const newMessages = [
      ...messages,
      { type: "user", content: suggestion.text },
      { type: "assistant", content: responses[suggestion.text] },
    ]

    setMessages(newMessages)
  }

  return (
    <>
      {/* Chat Trigger Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        animate={
          !isOpen
            ? {
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 10px 25px rgba(34, 197, 94, 0.3)",
                  "0 15px 35px rgba(34, 197, 94, 0.4)",
                  "0 10px 25px rgba(34, 197, 94, 0.3)",
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <MessageCircle size={24} />
        </motion.div>

        {/* Notification Dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white/90 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  🌱
                </motion.div>
                <div>
                  <h3 className="font-semibold">Eco Assistant</h3>
                  <p className="text-xs text-green-100">Always here to help!</p>
                </div>
              </div>
              <motion.button onClick={() => setIsOpen(false)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <X size={20} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === "user" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      className="w-full text-left p-2 bg-green-50 hover:bg-green-100 rounded-lg text-sm flex items-center space-x-2 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <suggestion.icon size={16} className="text-green-600" />
                      <span>{suggestion.text}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me anything about sustainability..."
                  className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
