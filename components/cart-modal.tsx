"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag, Leaf } from "lucide-react"
import EcoFarm from "./eco-farm"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import ConfettiAnimation from "@/components/confetti-animation"
import { useToast } from "@/hooks/use-toast"

export default function CartModal() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const { toast } = useToast()
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout'>('cart')
  const [address, setAddress] = useState("")
  const [pinCode, setPinCode] = useState("")
  const [paymentOption, setPaymentOption] = useState("card")
  const [showConfetti, setShowConfetti] = useState(false)

  const totalImpact = cartItems.reduce(
    (acc, item) => ({
      trees: acc.trees + item.impact.trees * item.quantity,
      water: acc.water + item.impact.water * item.quantity,
    }),
    { trees: 0, water: 0 },
  )

  const totalEcoPoints = cartItems.reduce((sum, item) => sum + (item.ecoPoints || 0) * (item.quantity || 1), 0)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Cart Modal */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShoppingBag size={24} />
                  <h2 className="text-xl font-semibold">Your Cart</h2>
                </div>
                <motion.button
                  onClick={() => setIsCartOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {cartItems.length > 0 && (
                <>
                  <div className="mt-4">
                    <EcoFarm treeCount={totalImpact.trees} waterSaved={totalImpact.water} />
                  </div>
                  <div className="flex justify-center items-center mt-2">
                    <span className="text-green-50 font-semibold text-base flex items-center gap-2">
                      🌱 Eco Points Earned: <span className="bg-green-100 text-green-700 rounded-full px-2 py-1 ml-2 text-base">+{totalEcoPoints}</span>
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar min-h-0">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <Leaf className="mx-auto text-green-400 mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Your cart is empty</h3>
                  <p className="text-green-600">Add some eco-friendly products to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-white/50 rounded-2xl p-4 border border-white/60"
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold text-green-800">{item.name}</h3>
                          <p className="text-green-600 text-sm">${item.price}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="text-xs text-green-600">
                              {item.impact.trees} trees • {item.impact.water}L water
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full bg-green-100 hover:bg-green-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Minus size={16} className="text-green-600" />
                          </motion.button>

                          <span className="w-8 text-center font-semibold text-green-800">{item.quantity}</span>

                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full bg-green-100 hover:bg-green-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus size={16} className="text-green-600" />
                          </motion.button>
                        </div>
                      </div>

                      <motion.button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-3 text-red-500 text-sm hover:text-red-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Remove
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-white/80 flex-shrink-0">
                {checkoutStep === 'cart' ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-green-800">Total:</span>
                      <span className="text-2xl font-bold text-green-800">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <motion.button
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCheckoutStep('checkout')}
                    >
                      Checkout & Save the Planet
                    </motion.button>
                    <p className="text-center text-xs text-green-600 mt-3">Free carbon-neutral shipping on all orders</p>
                  </>
                ) : (
                  <form className="flex flex-col gap-4" onSubmit={e => {
                    e.preventDefault();
                    setShowConfetti(true);
                    setTimeout(() => {
                      setShowConfetti(false);
                      setCheckoutStep('cart');
                      setIsCartOpen(false);
                      // Remove all items from cart
                      cartItems.forEach(item => removeFromCart(item.id));
                      // Show toast
                      toast({
                        title: "Order Placed! 🌱",
                        description: "Thank you for your sustainable purchase! Your order is on its way.",
                        variant: "default",
                      });
                    }, 2000);
                  }}>
                    <input
                      className="w-full p-2 rounded-lg border border-green-200 text-sm"
                      placeholder="Address"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      required
                    />
                    <input
                      className="w-full p-2 rounded-lg border border-green-200 text-sm"
                      placeholder="Pin Code"
                      value={pinCode}
                      onChange={e => setPinCode(e.target.value)}
                      required
                    />
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-green-700">Payment Method:</label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="payment" value="card" checked={paymentOption === "card"} onChange={() => setPaymentOption("card")} />
                        Card
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="payment" value="upi" checked={paymentOption === "upi"} onChange={() => setPaymentOption("upi")} />
                        UPI
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="payment" value="cod" checked={paymentOption === "cod"} onChange={() => setPaymentOption("cod")} />
                        Cash on Delivery
                      </label>
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all mt-2"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Pay & Place Order
                    </motion.button>
                    {showConfetti && <ConfettiAnimation />}
                  </form>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
