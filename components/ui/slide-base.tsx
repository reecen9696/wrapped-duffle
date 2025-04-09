"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { BackgroundRenderer } from "@/components/backgrounds/background-renderer"
import { getBackgroundByGroup } from "@/config/backgrounds"
import type { BackgroundConfig } from "@/config/backgrounds"

export interface SlideBaseProps {
  children: ReactNode
  backgroundGroup: number // Make this required
  customBackground?: BackgroundConfig
  className?: string
  contentClassName?: string
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
  delay?: number
}

export function SlideBase({
  children,
  backgroundGroup,
  customBackground,
  className,
  contentClassName,
  animationVariant = "fade",
  delay = 0.3,
}: SlideBaseProps) {
  // Get background config from group or use custom
  const backgroundConfig = customBackground || getBackgroundByGroup(backgroundGroup)

  // Animation variants for content only (not background)
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8, delay },
    },
    slideUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.8, delay, type: "spring", stiffness: 100 },
    },
    none: {
      initial: {},
      animate: {},
      transition: {},
    },
  }

  const selectedVariant = variants[animationVariant]

  return (
    <section
      className={cn(
        "h-screen w-full flex flex-col items-center justify-center snap-start relative overflow-hidden",
        className,
      )}
    >
      {/* Background - fixed position, no animation */}
      <BackgroundRenderer config={backgroundConfig} />

      {/* Main content with animation */}
      <motion.div
        className={cn(
          "relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4",
          contentClassName,
        )}
        initial={selectedVariant.initial}
        whileInView={selectedVariant.animate}
        transition={selectedVariant.transition}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </section>
  )
}
