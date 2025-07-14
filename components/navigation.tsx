"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf, Droplets, Sun, TreePine, ShoppingCart, User, Search, Compass, LogOut, Settings, BarChart3 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { scrollToSection } from "@/utils/scroll"

const NavIcon = ({ icon: Icon, label, href, isActive = false }) => {
  const pathname = usePathname()
  const active = pathname === href || isActive

  return (
    <Link href={href}>
      <motion.div
        className={`flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer transition-all ${
          active ? "bg-green-200/30 text-green-700" : "text-green-600 hover:bg-green-100/30"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div animate={{ rotate: active ? 360 : 0 }} transition={{ duration: 0.5 }}>
          <Icon size={20} />
        </motion.div>
        <span className="font-medium hidden md:block">{label}</span>
      </motion.div>
    </Link>
  )
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { cartItems, setIsCartOpen } = useCart()
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleImpactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (pathname === "/") {
      scrollToSection("impact")
    } else {
      window.location.href = "/#impact"
    }
  }

  return (
    <motion.nav
      className={`fixed top-4 inset-x-0 z-50 transition-all duration-300 font-serif px-4 ${
        scrolled ? "backdrop-blur-md bg-white/20" : "backdrop-blur-sm bg-white/10"
      } rounded-full border border-white/20 shadow-lg py-3`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between space-x-6">
        {/* Logo */}
        <motion.div className="flex items-center space-x-2 cursor-pointer" whileHover={{ scale: 1.05 }} onClick={() => window.location.href = "/"}>
          <Leaf className="text-green-600" size={24} />
          <span className="text-green-700 text-xl font-serif">PlanetSmart By Walmart</span>
        </motion.div>

        {/* Navigation Icons */}
        {user && (
          <div className="flex items-center space-x-2">
            <NavIcon icon={TreePine} label="Products" href="/products" />
            <NavIcon icon={Compass} label="Explore" href="/explore" />
            <motion.div
              onClick={handleImpactClick}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer transition-all ${
                pathname === "/" ? "bg-green-200/30 text-green-700" : "text-green-600 hover:bg-green-100/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div animate={{ rotate: pathname === "/" ? 360 : 0 }} transition={{ duration: 0.5 }}>
                <Droplets size={20} />
              </motion.div>
              <span className="font-medium hidden md:block">Impact</span>
            </motion.div>
            <NavIcon icon={Sun} label="Rewards" href="/rewards" />
          </div>
        )}

        {/* Cart, Search & User */}
        <div className="flex items-center space-x-4">
          {pathname === "/products" && user && (
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => document.querySelector(".products-search-input")?.focus()}
            >
              <Search className="text-green-600" size={20} />
            </motion.div>
          )}
          
          {user && (
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="text-green-600" size={20} />
              {cartItems.length > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {cartItems.length}
                </motion.span>
              )}
            </motion.div>
          )}

          {user ? (
            <div className="relative" ref={userMenuRef}>
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-green-700 font-medium hidden md:block">{user.name}</span>
              </motion.div>

              {/* User Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    className="absolute right-0 top-12 w-64 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl p-4"
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-3">
                      <div className="border-b border-green-100 pb-3">
                        <div className="font-medium text-green-800">{user.name}</div>
                        <div className="text-sm text-green-600">{user.email}</div>
                        <div className="text-xs text-green-500 mt-1">
                          {user.ecoPoints} PlanetSmart Points
                        </div>
                        <div className="text-xs text-green-500">
                          Member since {user.joinDate}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Link href="/dashboard">
                          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 text-green-700 flex items-center space-x-2">
                            <BarChart3 size={16} />
                            <span>Dashboard</span>
                          </button>
                        </Link>
                        <Link href="/profile">
                          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 text-green-700 flex items-center space-x-2">
                            <Settings size={16} />
                            <span>Profile</span>
                          </button>
                        </Link>
                        <button 
                          onClick={logout}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 flex items-center space-x-2"
                        >
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/auth">
              <motion.button
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
