"use client"

import type React from "react"

import { motion } from "framer-motion"

interface AccentLabelProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AccentLabel({ children, className = "", delay = 0.3 }: AccentLabelProps) {
  return (
    <motion.div
      className={`text-accent uppercase mb-4 font-mono font-medium text-card-title ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
