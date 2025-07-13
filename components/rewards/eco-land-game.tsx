"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback } from "react"
import { TreePine, Droplets, Sun, Home, Zap, Users, Trophy, Share2, RotateCcw } from "lucide-react"
import { useEcoPoints } from "@/contexts/eco-points-context"

// Game asset types and costs
const ASSET_TYPES = {
  tree: { icon: TreePine, cost: 10, color: "text-green-500", name: "Tree", impact: { co2: 5, trees: 1 } },
  water: { icon: Droplets, cost: 15, color: "text-blue-500", name: "Water Well", impact: { water: 50 } },
  solar: { icon: Sun, cost: 25, color: "text-yellow-500", name: "Solar Panel", impact: { energy: 20 } },
  home: { icon: Home, cost: 50, color: "text-amber-600", name: "Eco Home", impact: { co2: 10, energy: 15 } },
  wind: { icon: Zap, cost: 40, color: "text-purple-500", name: "Wind Turbine", impact: { energy: 30 } },
}

// Grid size
const GRID_SIZE = 10

// Mock user data
const mockUserData = {
  level: 3,
  totalTrees: 15,
  totalWater: 750,
  totalCO2: 125,
  totalEnergy: 200,
  unlockedAssets: ["tree", "water", "solar", "home"],
}

// Mock friends data
const mockFriends = [
  { id: 1, name: "Sarah Green", level: 5, trees: 32, score: 1250, avatar: "🌱" },
  { id: 2, name: "Mike Earth", level: 4, trees: 28, score: 1100, avatar: "🌍" },
  { id: 3, name: "Luna Eco", level: 6, trees: 45, score: 1800, avatar: "🌙" },
  { id: 4, name: "Alex Solar", level: 3, trees: 22, score: 950, avatar: "☀️" },
]

interface GridTile {
  id: string
  type: keyof typeof ASSET_TYPES | null
  level: number
  x: number
  y: number
}

interface GameStats {
  trees: number
  water: number
  co2: number
  energy: number
  score: number
}

const EcoAssetComponent = ({ type, level = 1, isPreview = false, onClick }) => {
  if (!type) return null

  const asset = ASSET_TYPES[type]
  const Icon = asset.icon

  return (
    <motion.div
      className={`relative flex items-center justify-center w-full h-full rounded-lg ${
        isPreview
          ? "bg-white/50 border-2 border-dashed border-green-400"
          : "bg-gradient-to-br from-green-100 to-green-200"
      } cursor-pointer`}
      onClick={onClick}
      whileHover={{ scale: isPreview ? 1 : 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 200 }}
    >
      <Icon
        className={`${asset.color} ${level > 1 ? "drop-shadow-lg" : ""}`}
        size={level === 1 ? 20 : level === 2 ? 24 : 28}
      />

      {/* Level indicator */}
      {level > 1 && !isPreview && (
        <motion.div
          className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {level}
        </motion.div>
      )}

      {/* Growth animation particles */}
      {!isPreview && (
        <AnimatePresence>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [-10, -20, -30],
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3 + Math.random() * 2,
              }}
            />
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  )
}

const GameGrid = ({ grid, onTileClick, previewTile, selectedAsset }) => {
  return (
    <div className="grid grid-cols-10 gap-1 bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-2xl border-2 border-green-200">
      {grid.map((tile) => (
        <motion.div
          key={tile.id}
          className={`aspect-square border rounded-lg transition-all duration-200 ${
            tile.type
              ? "border-green-300 bg-white shadow-sm"
              : "border-green-200 bg-white/50 hover:bg-white/80 hover:border-green-400"
          }`}
          onClick={() => onTileClick(tile)}
          whileHover={{ scale: tile.type ? 1 : 1.05 }}
        >
          {tile.type ? (
            <EcoAssetComponent type={tile.type} level={tile.level} onClick={() => onTileClick(tile)} />
          ) : previewTile?.x === tile.x && previewTile?.y === tile.y && selectedAsset ? (
            <EcoAssetComponent type={selectedAsset} isPreview={true} />
          ) : null}
        </motion.div>
      ))}
    </div>
  )
}

const BuildingPanel = ({ selectedAsset, onAssetSelect, userPoints, unlockedAssets }) => {
  return (
    <motion.div
      className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
        <Home className="mr-2" size={20} />
        Build Your EcoLand
      </h3>

      <div className="space-y-3">
        {Object.entries(ASSET_TYPES).map(([key, asset]) => {
          const isUnlocked = unlockedAssets.includes(key)
          const canAfford = userPoints >= asset.cost
          const isSelected = selectedAsset === key

          return (
            <motion.button
              key={key}
              onClick={() => isUnlocked && canAfford && onAssetSelect(key)}
              className={`w-full p-3 rounded-xl border-2 transition-all flex items-center space-x-3 ${
                isSelected
                  ? "border-green-500 bg-green-50 shadow-lg"
                  : isUnlocked && canAfford
                    ? "border-green-200 bg-white hover:border-green-400 hover:bg-green-50"
                    : "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
              }`}
              whileHover={isUnlocked && canAfford ? { scale: 1.02 } : {}}
              whileTap={isUnlocked && canAfford ? { scale: 0.98 } : {}}
              disabled={!isUnlocked || !canAfford}
            >
              <asset.icon className={asset.color} size={24} />
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-800">{asset.name}</div>
                <div className="text-sm text-gray-600">{asset.cost} EcoPoints</div>
              </div>
              {!isUnlocked && <div className="text-xs bg-gray-200 px-2 py-1 rounded">Locked</div>}
              {isUnlocked && !canAfford && (
                <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                  Need {asset.cost - userPoints} more
                </div>
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

const GameStats = ({ stats, level }) => {
  return (
    <motion.div
      className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
        <Trophy className="mr-2" size={20} />
        Your Impact (Level {level})
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <TreePine className="text-green-500 mx-auto mb-1" size={20} />
          <div className="text-lg font-bold text-green-800">{stats.trees}</div>
          <div className="text-xs text-green-600">Trees Planted</div>
        </div>

        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <Droplets className="text-blue-500 mx-auto mb-1" size={20} />
          <div className="text-lg font-bold text-blue-800">{stats.water}L</div>
          <div className="text-xs text-blue-600">Water Saved</div>
        </div>

        <div className="bg-purple-50 rounded-xl p-3 text-center">
          <Zap className="text-purple-500 mx-auto mb-1" size={20} />
          <div className="text-lg font-bold text-purple-800">{stats.co2}kg</div>
          <div className="text-xs text-purple-600">CO₂ Reduced</div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-3 text-center">
          <Sun className="text-yellow-500 mx-auto mb-1" size={20} />
          <div className="text-lg font-bold text-yellow-800">{stats.energy}kWh</div>
          <div className="text-xs text-yellow-600">Clean Energy</div>
        </div>
      </div>

      {/* Progress to next level */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress to Level {level + 1}</span>
          <span>{Math.min(stats.score % 500, 500)}/500</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(stats.score % 500) / 5}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  )
}

const Leaderboard = ({ friends, userStats }) => {
  const allPlayers = [
    {
      name: "You",
      level: mockUserData.level,
      trees: userStats.trees,
      score: userStats.score,
      avatar: "🌟",
      isUser: true,
    },
    ...friends,
  ].sort((a, b) => b.score - a.score)

  return (
    <motion.div
      className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
        <Trophy className="mr-2" size={20} />
        Eco Champions
      </h3>

      <div className="space-y-3">
        {allPlayers.slice(0, 5).map((player, index) => (
          <motion.div
            key={player.name}
            className={`flex items-center space-x-3 p-3 rounded-xl ${
              player.isUser ? "bg-green-100 border-2 border-green-300" : "bg-white/50"
            }`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                index === 0
                  ? "bg-yellow-400"
                  : index === 1
                    ? "bg-gray-300"
                    : index === 2
                      ? "bg-amber-600"
                      : "bg-gray-200"
              }`}
            >
              {index < 3 ? ["🥇", "🥈", "🥉"][index] : player.avatar}
            </div>

            <div className="flex-1">
              <div className="font-semibold text-gray-800">{player.name}</div>
              <div className="text-sm text-gray-600">
                Level {player.level} • {player.trees} trees
              </div>
            </div>

            <div className="text-right">
              <div className="font-bold text-green-600">{player.score}</div>
              <div className="text-xs text-gray-500">EcoScore</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const FriendFarms = ({ friends, onVisitFarm }) => {
  return (
    <motion.div
      className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
        <Users className="mr-2" size={20} />
        Visit Friends' Farms
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {friends.slice(0, 4).map((friend) => (
          <motion.button
            key={friend.id}
            onClick={() => onVisitFarm(friend)}
            className="p-3 bg-white/60 rounded-xl border border-green-200 hover:border-green-400 hover:bg-white/80 transition-all text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">{friend.avatar}</span>
              <span className="font-semibold text-gray-800 text-sm">{friend.name}</span>
            </div>
            <div className="text-xs text-gray-600">
              Level {friend.level} • {friend.trees} trees
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default function EcoLandGame() {
  const { points, spendPoints } = useEcoPoints()
  const [selectedAsset, setSelectedAsset] = useState<keyof typeof ASSET_TYPES | null>(null)
  const [previewTile, setPreviewTile] = useState<{ x: number; y: number } | null>(null)
  const [gameStats, setGameStats] = useState<GameStats>({
    trees: mockUserData.totalTrees,
    water: mockUserData.totalWater,
    co2: mockUserData.totalCO2,
    energy: mockUserData.totalEnergy,
    score: 1250,
  })

  // Initialize grid
  const [grid, setGrid] = useState<GridTile[]>(() => {
    const initialGrid: GridTile[] = []
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        initialGrid.push({
          id: `${x}-${y}`,
          type: null,
          level: 1,
          x,
          y,
        })
      }
    }

    // Add some initial assets
    const initialAssets = [
      { x: 2, y: 3, type: "tree" as const },
      { x: 4, y: 2, type: "water" as const },
      { x: 6, y: 4, type: "tree" as const },
      { x: 3, y: 6, type: "solar" as const },
      { x: 7, y: 7, type: "home" as const },
    ]

    initialAssets.forEach((asset) => {
      const index = asset.y * GRID_SIZE + asset.x
      if (initialGrid[index]) {
        initialGrid[index].type = asset.type
      }
    })

    return initialGrid
  })

  const handleTileClick = useCallback(
    (tile: GridTile) => {
      if (!selectedAsset) {
        // If clicking on existing asset, upgrade it
        if (tile.type && tile.level < 3) {
          const upgradeCost = ASSET_TYPES[tile.type].cost * tile.level
          if (spendPoints(upgradeCost)) {
            setGrid((prev) => prev.map((t) => (t.id === tile.id ? { ...t, level: t.level + 1 } : t)))

            // Update stats
            const impact = ASSET_TYPES[tile.type].impact
            setGameStats((prev) => ({
              ...prev,
              trees: prev.trees + (impact.trees || 0),
              water: prev.water + (impact.water || 0),
              co2: prev.co2 + (impact.co2 || 0),
              energy: prev.energy + (impact.energy || 0),
              score: prev.score + upgradeCost,
            }))
          }
        }
        return
      }

      // Place new asset
      if (!tile.type && spendPoints(ASSET_TYPES[selectedAsset].cost)) {
        setGrid((prev) => prev.map((t) => (t.id === tile.id ? { ...t, type: selectedAsset, level: 1 } : t)))

        // Update stats
        const impact = ASSET_TYPES[selectedAsset].impact
        setGameStats((prev) => ({
          ...prev,
          trees: prev.trees + (impact.trees || 0),
          water: prev.water + (impact.water || 0),
          co2: prev.co2 + (impact.co2 || 0),
          energy: prev.energy + (impact.energy || 0),
          score: prev.score + ASSET_TYPES[selectedAsset].cost,
        }))

        setSelectedAsset(null)
      }
    },
    [selectedAsset, spendPoints],
  )

  const handleMouseEnter = useCallback(
    (tile: GridTile) => {
      if (selectedAsset && !tile.type) {
        setPreviewTile({ x: tile.x, y: tile.y })
      }
    },
    [selectedAsset],
  )

  const handleMouseLeave = useCallback(() => {
    setPreviewTile(null)
  }, [])

  const resetGame = () => {
    setGrid((prev) => prev.map((tile) => ({ ...tile, type: null, level: 1 })))
    setGameStats({
      trees: 0,
      water: 0,
      co2: 0,
      energy: 0,
      score: 0,
    })
    setSelectedAsset(null)
  }

  const shareProgress = () => {
    // Mock share functionality
    alert(
      `🌱 I've built an amazing EcoLand with ${gameStats.trees} trees and saved ${gameStats.co2}kg of CO₂! Join me in making the world greener! 🌍`,
    )
  }

  const visitFriend = (friend) => {
    alert(`Visiting ${friend.name}'s EcoLand! 🌟 They have ${friend.trees} trees and are Level ${friend.level}!`)
  }

  return (
    <div className="space-y-8">
      {/* Game Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-green-800 mb-2">🌍 Your EcoLand</h2>
        <p className="text-green-600 text-lg">Build, grow, and share your sustainable world!</p>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-green-200">
            <span className="text-green-800 font-semibold">{points} EcoPoints Available</span>
          </div>
          <motion.button
            onClick={shareProgress}
            className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium flex items-center space-x-2 hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={16} />
            <span>Share</span>
          </motion.button>
          <motion.button
            onClick={resetGame}
            className="bg-gray-500 text-white px-4 py-2 rounded-full font-medium flex items-center space-x-2 hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Building Panel */}
        <div className="lg:col-span-1">
          <BuildingPanel
            selectedAsset={selectedAsset}
            onAssetSelect={setSelectedAsset}
            userPoints={points}
            unlockedAssets={mockUserData.unlockedAssets}
          />
        </div>

        {/* Game Grid */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            onMouseLeave={handleMouseLeave}
          >
            <GameGrid
              grid={grid}
              onTileClick={handleTileClick}
              previewTile={previewTile}
              selectedAsset={selectedAsset}
            />
          </motion.div>

          {/* Game Instructions */}
          <motion.div
            className="mt-4 bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm text-green-700 text-center">
              💡 <strong>How to play:</strong> Select an asset from the left panel, then click on empty tiles to place
              them. Click on existing assets to upgrade them! Earn EcoPoints by making sustainable purchases.
            </p>
          </motion.div>
        </div>

        {/* Stats Panel */}
        <div className="lg:col-span-1">
          <GameStats stats={gameStats} level={mockUserData.level} />
        </div>
      </div>

      {/* Social Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Leaderboard friends={mockFriends} userStats={gameStats} />
        <FriendFarms friends={mockFriends} onVisitFarm={visitFriend} />
      </div>
    </div>
  )
}
