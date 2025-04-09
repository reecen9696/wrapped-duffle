"use client"

import type React from "react"

import { motion } from "framer-motion"

interface BodyTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function BodyText({ children, className = "", delay = 0.5 }: BodyTextProps) {
  return (
    <motion.p
      className={`text-white/85 font-inter font-medium text-card-title ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.p>
  )
}
