"use client"

import type { ReactNode } from "react"
import Image from "next/image"

export type BackgroundVariant = "dark" | "light" | "gradient" | "stars" | "particles" | "noise"

interface BackgroundManagerProps {
  variant: BackgroundVariant
  children?: ReactNode
}

export function BackgroundManager({ variant, children }: BackgroundManagerProps) {
  // Render different backgrounds based on variant
  const renderBackground = () => {
    switch (variant) {
      case "dark":
        return <div className="absolute inset-0 bg-[#080A10]" />

      case "light":
        return <div className="absolute inset-0 bg-white" />

      case "gradient":
        return <div className="absolute inset-0 bg-gradient-to-b from-[#080A10] to-[#101420]" />

      case "stars":
        return (
          <div className="absolute inset-0">
            <Image src="/images/stars-bg.png" alt="Stars Background" fill className="object-cover opacity-70" />
            <div className="absolute inset-0 bg-[#080A10]/70" />
          </div>
        )

      case "particles":
        return (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#080A10]" />
            {/* Particles would be implemented with a library or custom component */}
            <div className="absolute inset-0 opacity-30">{/* Placeholder for particles */}</div>
          </div>
        )

      case "noise":
        return (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#080A10]" />
            <Image
              src="/images/noise.png"
              alt="Noise Texture"
              fill
              className="object-cover mix-blend-overlay opacity-20"
            />
          </div>
        )

      default:
        return <div className="absolute inset-0 bg-[#080A10]" />
    }
  }

  return (
    <div className="relative w-full h-full">
      {renderBackground()}
      {children}
    </div>
  )
}
