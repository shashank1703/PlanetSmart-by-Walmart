"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import { nonEcoProductsData } from "@/data/non-eco-products-data"
import { productsData } from "@/data/products-data"
import ProtectedRoute from "@/components/protected-route"
import Link from "next/link"

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Simulate user's previous purchases (in a real app, this would come from user data)
  const userPreviousPurchases = nonEcoProductsData.slice(0, 10)

  const categories = [
    { id: "all", name: "All Items" },
    { id: "personal", name: "Personal Care" },
    { id: "home", name: "Home & Kitchen" },
    { id: "clothing", name: "Clothing" },
    { id: "tech", name: "Tech" },
  ]

  const filteredPurchases = selectedCategory === "all" 
    ? userPreviousPurchases 
    : userPreviousPurchases.filter(item => item.category === selectedCategory)

  const getSustainableAlternative = (productId: number) => {
    return productsData.find(product => product.id === productId)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-24 relative">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="relative z-20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-6xl md:text-7xl font-bold text-green-800 mb-6">
              Explore Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Impact
              </span>
            </h1>
            <p className="text-xl text-green-700 max-w-3xl mx-auto leading-relaxed">
              Discover how your previous purchases impact the environment and find sustainable alternatives 
              that help you make a positive difference.
            </p>
          </div>

          {/* Impact Summary */}
          <Card className="mb-8 bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 text-2xl">
                <AlertTriangle className="h-6 w-6" />
                Your Environmental Impact
              </CardTitle>
              <CardDescription className="text-lg">
                Based on your previous purchases, here's your current environmental footprint
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center bg-red-50/50 rounded-xl p-4 border border-red-200">
                  <div className="text-3xl font-bold text-red-500">-285</div>
                  <div className="text-sm text-gray-600">Eco Points Lost</div>
                </div>
                <div className="text-center bg-orange-50/50 rounded-xl p-4 border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600">1,200+</div>
                  <div className="text-sm text-gray-600">Plastic Items Used</div>
                </div>
                <div className="text-center bg-red-50/50 rounded-xl p-4 border border-red-200">
                  <div className="text-3xl font-bold text-red-500">$1,200+</div>
                  <div className="text-sm text-gray-600">Annual Waste Cost</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full ${
                  selectedCategory === category.id 
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white" 
                    : "border-green-500 text-green-600 hover:bg-green-50"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Previous Purchases */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-8 flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              Your Previous Purchases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPurchases.map((item) => {
                const alternative = getSustainableAlternative(item.sustainableAlternative.productId)
                return (
                  <Card key={item.id} className="bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-green-800">{item.name}</CardTitle>
                          <CardDescription className="text-green-600">{item.description}</CardDescription>
                        </div>
                        <Badge variant="destructive" className="text-xs">
                          {item.sustainabilityScore}% Eco Score
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm font-medium">Environmental Impact:</span>
                        </div>
                        <p className="text-sm text-gray-600">{item.environmentalImpact}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-red-500">${item.price}</span>
                          <Badge variant="outline" className="text-red-500 border-red-200">
                            -{Math.abs(item.ecoPoints)} Eco Points
                          </Badge>
                        </div>

                        {/* Sustainable Alternative */}
                        {alternative && (
                          <div className="mt-4 p-4 bg-green-50/80 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-700">Sustainable Alternative</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <img 
                                src={alternative.image} 
                                alt={alternative.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm text-green-800">{alternative.name}</h4>
                                <p className="text-xs text-gray-600 mb-1">{item.sustainableAlternative.savings}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-bold text-green-600">${alternative.price}</span>
                                  <Badge className="bg-green-600 text-white text-xs">
                                    +{alternative.ecoPoints} Eco Points
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white"
                              asChild
                            >
                              <Link href={`/products#product-${alternative.id}`}>
                                View Alternative
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-8 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              Recommended Sustainable Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsData.slice(0, 6).map((product) => (
                <Card key={product.id} className="bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-green-800">{product.name}</CardTitle>
                        <CardDescription className="text-green-600">{product.description}</CardDescription>
                      </div>
                      <Badge className="bg-green-600 text-white">
                        {product.sustainabilityScore}% Eco Score
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">${product.price}</span>
                        <Badge className="bg-green-600 text-white">
                          +{product.ecoPoints} Eco Points
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-green-600">
                        <Leaf className="h-4 w-4" />
                        <span className="text-sm">Environmental Impact:</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Saves {product.impact.trees} trees and {product.impact.water}L of water
                      </div>

                      <Button 
                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                        asChild
                      >
                        <Link href={`/products#product-${product.id}`}>
                          View Product
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-green-700 text-2xl">
                Ready to Make a Difference?
              </CardTitle>
              <CardDescription className="text-center text-lg">
                Start your sustainable journey today and earn eco points while helping the planet
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white" asChild>
                <Link href="/products">
                  Browse Sustainable Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  )
}
