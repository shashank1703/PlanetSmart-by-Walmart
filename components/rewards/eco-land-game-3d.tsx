"use client"

import { motion } from "framer-motion"
import { useState, useCallback, useRef, Suspense } from "react"
import { TreePine, Droplets, Sun, Home, Zap, Users, Trophy, Share2, RotateCcw } from "lucide-react"
import { useEcoPoints } from "@/contexts/eco-points-context"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Box, Cylinder, Cone, Html, Environment } from "@react-three/drei"

// Game asset types and costs
const ASSET_TYPES = {
  tree: { icon: TreePine, cost: 10, color: "text-green-600", name: "Tree", impact: { co2: 5, trees: 1 } },
  water: { icon: Droplets, cost: 15, color: "text-blue-600", name: "Water Well", impact: { water: 50 } },
  solar: { icon: Sun, cost: 25, color: "text-yellow-600", name: "Solar Panel", impact: { energy: 20 } },
  home: { icon: Home, cost: 50, color: "text-amber-700", name: "Eco Home", impact: { co2: 10, energy: 15 } },
  wind: { icon: Zap, cost: 40, color: "text-purple-600", name: "Wind Turbine", impact: { energy: 30 } },
}

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

// 3D Asset Components with realistic materials
const Tree3D = ({ position, level, onClick, isPreview }) => {
  const meshRef = useRef()
  const scale = 0.8 + (level - 1) * 0.4

  useFrame((state) => {
    if (meshRef.current && !isPreview) {
      // Gentle swaying animation
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.6) * 0.02
    }
  })

  return (
    <group position={position} onClick={onClick}>
      <group ref={meshRef} scale={[scale, scale, scale]}>
        {/* Tree trunk with rich wood texture */}
        <Cylinder args={[0.15, 0.2, 1.2]} position={[0, 0.6, 0]}>
          <meshPhongMaterial 
            color="#8B6B4D"
            shininess={10}
            specular="#3D2B1F"
          />
        </Cylinder>

        {/* Tree foliage with gradient colors */}
        <Cone args={[1.0, 1.8]} position={[0, 1.8, 0]}>
          <meshPhongMaterial 
            color="#2D5A27"
            shininess={15}
            specular="#4A7A43"
          />
        </Cone>

        {level > 1 && (
          <Cone args={[0.8, 1.4]} position={[0, 2.6, 0]}>
            <meshPhongMaterial 
              color="#3B7A33"
              shininess={20}
              specular="#589A4F"
            />
          </Cone>
        )}

        {level > 2 && (
          <Cone args={[0.6, 1.0]} position={[0, 3.2, 0]}>
            <meshPhongMaterial 
              color="#4A9A3F"
              shininess={25}
              specular="#67BA5B"
            />
          </Cone>
        )}
      </group>

      {/* Level indicator */}
      {level > 1 && !isPreview && (
        <Html position={[0.8, 2.5, 0]} style={{ pointerEvents: "none" }}>
          <div className="bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
            {level}
          </div>
        </Html>
      )}
    </group>
  )
}

const WaterWell3D = ({ position, level, onClick, isPreview }) => {
  const waterRef = useRef()
  const scale = 0.6 + (level - 1) * 0.3

  useFrame((state) => {
    if (waterRef.current) {
      // Gentle water ripple effect
      waterRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group position={position} onClick={onClick}>
      <group scale={[scale, scale, scale]}>
        {/* Well structure with stone texture */}
        <Cylinder args={[0.9, 0.9, 0.4]} position={[0, 0.2, 0]}>
          <meshPhongMaterial 
            color="#8B7765"
            shininess={5}
            specular="#463E37"
          />
        </Cylinder>

        {/* Water surface with realistic effect */}
        <Cylinder ref={waterRef} args={[0.8, 0.8, 0.05]} position={[0, 0.42, 0]}>
          <meshPhongMaterial 
            color="#3E8EBC"
            transparent 
            opacity={0.85}
            shininess={90}
            specular="#FFFFFF"
          />
        </Cylinder>

        {/* Well rim with weathered stone look */}
        <Cylinder args={[1.0, 1.0, 0.15]} position={[0, 0.47, 0]}>
          <meshPhongMaterial 
            color="#7A7067"
            shininess={15}
            specular="#464241"
          />
        </Cylinder>

        {/* Well roof with enhanced wood texture */}
        {level > 1 && (
          <group>
            <Cylinder args={[0.05, 0.05, 1.5]} position={[-0.7, 1.2, 0]}>
              <meshPhongMaterial 
                color="#8B6B4D"
                shininess={10}
                specular="#3D2B1F"
              />
            </Cylinder>
            <Cylinder args={[0.05, 0.05, 1.5]} position={[0.7, 1.2, 0]}>
              <meshPhongMaterial 
                color="#8B6B4D"
                shininess={10}
                specular="#3D2B1F"
              />
            </Cylinder>
            <Cone args={[0.8, 0.6]} position={[0, 2.1, 0]}>
              <meshPhongMaterial 
                color="#B38B6D"
                shininess={15}
                specular="#8B7355"
              />
            </Cone>
          </group>
        )}
      </group>

      {level > 1 && !isPreview && (
        <Html position={[0.8, 1.5, 0]} style={{ pointerEvents: "none" }}>
          <div className="bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
            {level}
          </div>
        </Html>
      )}
    </group>
  )
}

const SolarPanel3D = ({ position, level, onClick, isPreview }) => {
  const meshRef = useRef()
  const scale = 0.7 + (level - 1) * 0.3

  useFrame((state) => {
    if (meshRef.current && !isPreview) {
      // Subtle tracking movement
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group position={position} onClick={onClick}>
      <group ref={meshRef} scale={[scale, scale, scale]}>
        {/* Solar panel base with metallic finish */}
        <Cylinder args={[0.12, 0.12, 1.2]} position={[0, 0.6, 0]}>
          <meshPhongMaterial 
            color="#B8B8B8"
            shininess={60}
            specular="#FFFFFF"
          />
        </Cylinder>

        {/* Solar panel with modern blue-black finish */}
        <Box args={[1.8, 0.12, 1.2]} position={[0, 1.4, 0]} rotation={[0, 0, 0.15]}>
          <meshPhongMaterial 
            color="#1C1C2E"
            shininess={100}
            specular="#4B4BA3"
          />
        </Box>

        {/* Panel grid lines with metallic accent */}
        <Box args={[1.8, 0.13, 0.02]} position={[0, 1.4, 0]} rotation={[0, 0, 0.15]}>
          <meshPhongMaterial 
            color="#2E2E5C"
            shininess={90}
            specular="#6B6BC3"
          />
        </Box>
        <Box args={[0.02, 0.13, 1.2]} position={[0, 1.4, 0]} rotation={[0, 0, 0.15]}>
          <meshPhongMaterial 
            color="#2E2E5C"
            shininess={90}
            specular="#6B6BC3"
          />
        </Box>

        {level > 1 && (
          <Box args={[1.8, 0.12, 1.2]} position={[0, 1.7, 0]} rotation={[0, 0, -0.15]}>
            <meshPhongMaterial 
              color="#2A2A4F"
              shininess={95}
              specular="#5959B3"
            />
          </Box>
        )}

        {level > 2 && (
          <Box args={[1.8, 0.12, 1.2]} position={[0, 2.0, 0]} rotation={[0, 0, 0]}>
            <meshPhongMaterial 
              color="#383870"
              shininess={85}
              specular="#6767C3"
            />
          </Box>
        )}
      </group>

      {level > 1 && !isPreview && (
        <Html position={[0.8, 2.2, 0]} style={{ pointerEvents: "none" }}>
          <div className="bg-yellow-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
            {level}
          </div>
        </Html>
      )}
    </group>
  )
}

const EcoHome3D = ({ position, level, onClick, isPreview }) => {
  const meshRef = useRef()
  const scale = 0.5 + (level - 1) * 0.25

  useFrame((state) => {
    if (meshRef.current && !isPreview) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.02
    }
  })

  return (
    <group position={position} onClick={onClick}>
      <group ref={meshRef} scale={[scale, scale, scale]}>
        {/* House base with enhanced modern eco-friendly look */}
        <Box args={[1.8, 1.2, 1.8]} position={[0, 0.6, 0]}>
          <meshPhongMaterial 
            color="#F5E6D3"
            shininess={35}
            specular="#D4C4A7"
          />
        </Box>

        {/* Roof with natural wood finish */}
        <Cone args={[1.4, 1.0]} position={[0, 1.6, 0]} rotation={[0, Math.PI / 4, 0]}>
          <meshPhongMaterial 
            color="#8B6B4D"
            shininess={20}
            specular="#3D2B1F"
          />
        </Cone>

        {/* Windows with brown wooden frames */}
        <Box args={[0.35, 0.35, 0.02]} position={[-0.5, 0.7, 0.91]}>
          <meshPhongMaterial 
            color="#8B4513"
            shininess={80}
            specular="#4A2511"
            opacity={0.95}
            transparent
          />
        </Box>
        <Box args={[0.35, 0.35, 0.02]} position={[0.5, 0.7, 0.91]}>
          <meshPhongMaterial 
            color="#8B4513"
            shininess={80}
            specular="#4A2511"
            opacity={0.95}
            transparent
          />
        </Box>

        {/* Door with rich wood texture */}
        <Box args={[0.35, 0.7, 0.02]} position={[0, 0.35, 0.91]}>
          <meshPhongMaterial 
            color="#855E42"
            shininess={30}
            specular="#2E1810"
          />
        </Box>

        {/* Chimney with stone texture */}
        {level > 1 && (
          <Box args={[0.2, 0.6, 0.2]} position={[0.6, 2.3, 0.6]}>
            <meshPhongMaterial 
              color="#8B7765"
              shininess={15}
              specular="#463E37"
            />
          </Box>
        )}

        {/* Garden with lush green */}
        {level > 2 && (
          <group>
            <Cylinder args={[0.3, 0.3, 0.1]} position={[-1.2, 0.05, 1.2]}>
              <meshPhongMaterial 
                color="#3B7A33"
                shininess={20}
                specular="#589A4F"
              />
            </Cylinder>
            <Cylinder args={[0.3, 0.3, 0.1]} position={[1.2, 0.05, 1.2]}>
              <meshPhongMaterial 
                color="#3B7A33"
                shininess={20}
                specular="#589A4F"
              />
            </Cylinder>
          </group>
        )}
      </group>

      {level > 1 && !isPreview && (
        <Html position={[0.8, 2.0, 0]} style={{ pointerEvents: "none" }}>
          <div className="bg-amber-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
            {level}
          </div>
        </Html>
      )}
    </group>
  )
}

const WindTurbine3D = ({ position, level, onClick, isPreview }) => {
  const bladesRef = useRef()
  const scale = 0.8 + (level - 1) * 0.3

  useFrame((state) => {
    if (bladesRef.current && !isPreview) {
      bladesRef.current.rotation.z = state.clock.elapsedTime * 1.5
    }
  })

  return (
    <group position={position} onClick={onClick}>
      <group scale={[scale, scale, scale]}>
        {/* Tower with metallic finish */}
        <Cylinder args={[0.08, 0.15, 2.5]} position={[0, 1.25, 0]}>
          <meshPhongMaterial 
            color="#D8D8D8"
            shininess={80}
            specular="#FFFFFF"
          />
        </Cylinder>

        {/* Nacelle with sleek modern look */}
        <Box args={[0.4, 0.25, 1.0]} position={[0, 2.6, 0]}>
          <meshPhongMaterial 
            color="#F0F0F0"
            shininess={90}
            specular="#FFFFFF"
          />
        </Box>

        {/* Blades with aerodynamic finish */}
        <group ref={bladesRef} position={[0, 2.6, 0.5]}>
          <Box args={[0.08, 1.8, 0.04]} position={[0, 0.9, 0]}>
            <meshPhongMaterial 
              color="#FAFAFA"
              shininess={70}
              specular="#E0E0E0"
            />
          </Box>
          <Box args={[0.08, 1.8, 0.04]} position={[0, -0.9, 0]} rotation={[0, 0, Math.PI]}>
            <meshPhongMaterial 
              color="#FAFAFA"
              shininess={70}
              specular="#E0E0E0"
            />
          </Box>
          <Box args={[1.8, 0.08, 0.04]} position={[0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <meshPhongMaterial 
              color="#FAFAFA"
              shininess={70}
              specular="#E0E0E0"
            />
          </Box>
        </group>

        {/* Additional turbines with matching finish */}
        {level > 1 && (
          <group position={[3, 0, 0]}>
            <Cylinder args={[0.06, 0.12, 2.0]} position={[0, 1.0, 0]}>
              <meshPhongMaterial 
                color="#D8D8D8"
                shininess={80}
                specular="#FFFFFF"
              />
            </Cylinder>
            <Box args={[0.3, 0.2, 0.8]} position={[0, 2.1, 0]}>
              <meshPhongMaterial 
                color="#F0F0F0"
                shininess={90}
                specular="#FFFFFF"
              />
            </Box>
          </group>
        )}
      </group>

      {level > 1 && !isPreview && (
        <Html position={[0.8, 3.0, 0]} style={{ pointerEvents: "none" }}>
          <div className="bg-purple-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
            {level}
          </div>
        </Html>
      )}
    </group>
  )
}

// 3D Asset Renderer
const Asset3D = ({ type, position, level, onClick, isPreview = false }) => {
  if (!type) return null

  const props = { position, level, onClick, isPreview }

  switch (type) {
    case "tree":
      return <Tree3D {...props} />
    case "water":
      return <WaterWell3D {...props} />
    case "solar":
      return <SolarPanel3D {...props} />
    case "home":
      return <EcoHome3D {...props} />
    case "wind":
      return <WindTurbine3D {...props} />
    default:
      return null
  }
}

// Grid Tile Component
const GridTile3D = ({ tile, onTileClick, previewAsset, isPreview }) => {
  const meshRef = useRef()
  const x = (tile.x - GRID_SIZE / 2) * 2.2
  const z = (tile.y - GRID_SIZE / 2) * 2.2

  return (
    <group>
      {/* Ground tile with bright green texture */}
      <Box ref={meshRef} args={[2.0, 0.1, 2.0]} position={[x, -0.05, z]} onClick={() => onTileClick(tile)}>
        <meshPhongMaterial
          color={tile.type ? "#338020" : "#57c239"}
          transparent
          opacity={isPreview ? 0.7 : 1.0}
          shininess={30}
          specular={"#ffffff"}
        />
      </Box>

      {/* Tile border with warm brown color */}
      <Box args={[2.0, 0.02, 0.05]} position={[x, 0.01, z + 1.0]}>
        <meshPhongMaterial color="#6a4933" shininess={20} />
      </Box>
      <Box args={[2.0, 0.02, 0.05]} position={[x, 0.01, z - 1.0]}>
        <meshPhongMaterial color="#6a4933" shininess={20} />
      </Box>
      <Box args={[0.05, 0.02, 2.0]} position={[x + 1.0, 0.01, z]}>
        <meshPhongMaterial color="#6a4933" shininess={20} />
      </Box>
      <Box args={[0.05, 0.02, 2.0]} position={[x - 1.0, 0.01, z]}>
        <meshPhongMaterial color="#6a4933" shininess={20} />
      </Box>

      {/* Asset or preview */}
      {tile.type && (
        <Asset3D type={tile.type} position={[x, 0, z]} level={tile.level} onClick={() => onTileClick(tile)} />
      )}

      {!tile.type && isPreview && previewAsset && (
        <Asset3D
          type={previewAsset}
          position={[x, 0, z]}
          level={1}
          onClick={() => onTileClick(tile)}
          isPreview={true}
        />
      )}
    </group>
  )
}

// Main 3D Scene
const EcoLandScene = ({ grid, onTileClick, previewTile, selectedAsset }) => {
  return (
    <>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight
        position={[10, 15, 5]}
        intensity={0.9}
        color="#fdfbf4"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <directionalLight position={[-5, 10, -5]} intensity={0.4} color="#e6f3ff" />

      {/* Grid tiles */}
      {grid.map((tile) => (
        <GridTile3D
          key={tile.id}
          tile={tile}
          onTileClick={onTileClick}
          previewAsset={selectedAsset}
          isPreview={previewTile?.x === tile.x && previewTile?.y === tile.y}
        />
      ))}

      {/* Enhanced ground plane with matching green */}
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshPhongMaterial 
          color="#65e042"
          shininess={10}
          specular="#338020"
        />
      </mesh>

      {/* Environment for realistic lighting */}
      <Environment preset="park" />
    </>
  )
}

// Building Panel with clean styling
const BuildingPanel = ({ selectedAsset, onAssetSelect, userPoints, unlockedAssets }) => {
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
        <Home className="mr-2 text-green-600" size={20} />
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
                  ? "border-green-500 bg-green-50 shadow-md"
                  : isUnlocked && canAfford
                    ? "border-green-300 bg-white hover:border-green-400 hover:bg-green-50 hover:shadow-md"
                    : "border-gray-300 bg-gray-50 opacity-50 cursor-not-allowed"
              }`}
              whileHover={isUnlocked && canAfford ? { scale: 1.02 } : {}}
              whileTap={isUnlocked && canAfford ? { scale: 0.98 } : {}}
              disabled={!isUnlocked || !canAfford}
            >
              <asset.icon className={`${asset.color}`} size={24} />
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-800">{asset.name}</div>
                <div className="text-sm text-green-600">{asset.cost} EcoPoints</div>
              </div>
              {!isUnlocked && <div className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Locked</div>}
              {isUnlocked && !canAfford && (
                <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded border border-red-200">
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

// Clean Stats Panel
const GameStats = ({ stats, level }) => {
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
        <Trophy className="mr-2 text-yellow-600" size={20} />
        Your Impact (Level {level})
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-xl p-3 text-center border border-green-200">
          <TreePine className="text-green-600 mx-auto mb-1" size={20} />
          <div className="text-lg font-bold text-green-700">{stats.trees}</div>
          <div className="text-xs text-green-600">Trees Planted</div>
        </div>

        <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-200">
          <Droplets className="text-blue-600 mx-auto mb-1" size={20} />
          <div className="text-lg font-bold text-blue-700">{stats.water}L</div>
          <div className="text-xs text-blue-600">Water Saved</div>
        </div>

        <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-200">
          <Zap className="text-purple-600 mx-auto mb-1" size={20} />
          <div className="text-lg font-bold text-purple-700">{stats.co2}kg</div>
          <div className="text-xs text-purple-600">CO₂ Reduced</div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-3 text-center border border-yellow-200">
          <Sun className="text-yellow-600 mx-auto mb-1" size={20} />
          <div className="text-lg font-bold text-yellow-700">{stats.energy}kWh</div>
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

// Clean Leaderboard
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
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
        <Trophy className="mr-2 text-yellow-600" size={20} />
        Eco Champions
      </h3>

      <div className="space-y-3">
        {allPlayers.slice(0, 5).map((player, index) => (
          <motion.div
            key={player.name}
            className={`flex items-center space-x-3 p-3 rounded-xl border ${
              player.isUser ? "bg-green-50 border-green-300 shadow-md" : "bg-white border-gray-200"
            }`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                index === 0
                  ? "bg-yellow-100 border-2 border-yellow-400"
                  : index === 1
                    ? "bg-gray-100 border-2 border-gray-400"
                    : index === 2
                      ? "bg-amber-100 border-2 border-amber-600"
                      : "bg-gray-50 border border-gray-300"
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

// Clean Friend Farms
const FriendFarms = ({ friends, onVisitFarm }) => {
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
        <Users className="mr-2 text-green-600" size={20} />
        Visit Friends' Farms
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {friends.slice(0, 4).map((friend) => (
          <motion.button
            key={friend.id}
            onClick={() => onVisitFarm(friend)}
            className="p-3 bg-white rounded-xl border border-green-200 hover:border-green-300 hover:bg-green-50 transition-all text-left"
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

// Main Enhanced EcoLand Game Component
export default function EcoLandGame3D() {
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
    alert(
      `🌱 I've built an amazing EcoLand with ${gameStats.trees} trees and saved ${gameStats.co2}kg of CO₂! Join me in making the world greener! 🌍`,
    )
  }

  const visitFriend = (friend) => {
    alert(`Visiting ${friend.name}'s EcoLand! 🌟 They have ${friend.trees} trees and are Level ${friend.level}!`)
  }

  return (
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Clean Game Header */}
      <motion.div
        className="text-center pt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-bold text-green-800 mb-2">🌍 Your EcoLand Farm</h2>
        <p className="text-green-600 text-xl mb-6">Build, grow, and share your sustainable world!</p>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-green-200 shadow-md">
            <span className="text-green-700 font-semibold text-lg">{points} EcoPoints Available</span>
          </div>
          <motion.button
            onClick={shareProgress}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium flex items-center space-x-2 transition-all shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={16} />
            <span>Share</span>
          </motion.button>
          <motion.button
            onClick={resetGame}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-medium flex items-center space-x-2 transition-all shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
        {/* Building Panel */}
        <div className="lg:col-span-1">
          <BuildingPanel
            selectedAsset={selectedAsset}
            onAssetSelect={setSelectedAsset}
            userPoints={points}
            unlockedAssets={mockUserData.unlockedAssets}
          />
        </div>

        {/* 3D Game Canvas */}
        <div className="lg:col-span-2">
          <motion.div
            className="h-[600px] rounded-2xl overflow-hidden border border-green-200 shadow-lg bg-white/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Suspense
              fallback={
                <div className="h-full flex items-center justify-center text-green-600">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p>Loading Your EcoLand...</p>
                  </div>
                </div>
              }
            >
              <Canvas
                camera={{ position: [15, 15, 15], fov: 60 }}
                shadows
                style={{ background: "linear-gradient(to bottom, #87CEEB, #F0FFF0)" }}
              >
                <EcoLandScene
                  grid={grid}
                  onTileClick={handleTileClick}
                  previewTile={previewTile}
                  selectedAsset={selectedAsset}
                />
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={8}
                  maxDistance={25}
                  maxPolarAngle={Math.PI / 2.2}
                />
              </Canvas>
            </Suspense>
          </motion.div>

          {/* Game Instructions */}
          <motion.div
            className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-200 shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm text-green-700 text-center">
              💡 <strong className="text-green-800">How to play:</strong> Select an asset from the left panel, then
              click on empty tiles to place them. Click on existing assets to upgrade them! Use mouse to rotate, zoom,
              and explore your 3D EcoLand. Earn EcoPoints by making sustainable purchases.
            </p>
          </motion.div>
        </div>

        {/* Stats Panel */}
        <div className="lg:col-span-1">
          <GameStats stats={gameStats} level={mockUserData.level} />
        </div>
      </div>

      {/* Social Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 pb-8">
        <Leaderboard friends={mockFriends} userStats={gameStats} />
        <FriendFarms friends={mockFriends} onVisitFarm={visitFriend} />
      </div>
    </div>
  )
}
