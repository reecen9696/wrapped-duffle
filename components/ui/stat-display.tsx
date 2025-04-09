"use client"

import { motion } from "framer-motion"

interface StatDisplayProps {
  value: string | number
  prefix?: string
  size?: "medium" | "large" | "xlarge"
  className?: string
  delay?: number
  initialX?: number
  initialY?: number
}

export function StatDisplay({
  value,
  prefix = "",
  size = "xlarge",
  className = "",
  delay = 0.5,
  initialX = 0,
  initialY = 0,
}: StatDisplayProps) {
  const sizeClasses = {
    medium: "text-stat-medium",
    large: "text-stat-large",
    xlarge: "text-stat-xlarge",
  }

  return (
    <motion.div
      className={`text-white font-inter font-extrabold leading-tight tracking-tighter ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
    >
      {prefix}
      {value}
    </motion.div>
  )
}
