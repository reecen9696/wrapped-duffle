"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { BackgroundConfig } from "@/config/backgrounds"

interface BackgroundRendererProps {
  config: BackgroundConfig
  isActive?: boolean
}

export function BackgroundRenderer({ config, isActive = true }: BackgroundRendererProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const renderBackground = () => {
    switch (config.type) {
      case "solid":
        return (
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: config.color || "#0A0D11" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
        )

      case "image":
        return (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {config.imageUrl && (
              <Image
                src={config.imageUrl || "/placeholder.svg"}
                alt="Background"
                fill
                className="object-cover"
                priority
              />
            )}
            {config.overlayColor && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: config.overlayColor,
                  opacity: config.overlayOpacity || 0.5,
                }}
              />
            )}
          </motion.div>
        )

      case "gradient":
        return (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#080A10] to-[#101420]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
        )

      case "custom":
        return (
          <motion.div
            className={`absolute inset-0 ${config.className || ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {config.imageUrl && (
              <Image
                src={config.imageUrl || "/placeholder.svg"}
                alt="Custom Background"
                fill
                className="object-cover"
                priority
              />
            )}
            {config.overlayColor && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: config.overlayColor,
                  opacity: config.overlayOpacity || 0.5,
                }}
              />
            )}
          </motion.div>
        )

      default:
        return (
          <motion.div
            className="absolute inset-0 bg-[#0A0D11]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
        )
    }
  }

  return <div className="absolute inset-0 z-0">{renderBackground()}</div>
}
