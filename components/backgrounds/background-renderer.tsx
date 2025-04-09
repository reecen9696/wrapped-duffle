"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
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

  // No animations for backgrounds - they should appear/disappear instantly
  // when switching between background groups
  const renderBackground = () => {
    switch (config.type) {
      case "solid":
        return (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: config.color || "#0A0D11",
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        )

      case "image":
        return (
          <div
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
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
          </div>
        )

      case "gradient":
        return (
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#080A10] to-[#101420]"
            style={{
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        )

      case "custom":
        return (
          <div
            className={`absolute inset-0 ${config.className || ""}`}
            style={{
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
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
          </div>
        )

      default:
        return (
          <div
            className="absolute inset-0 bg-[#0A0D11]"
            style={{
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        )
    }
  }

  return <div className="absolute inset-0 z-0">{renderBackground()}</div>
}
