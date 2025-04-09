"use client"

import type React from "react"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function SectionHeading({ children, className = "", delay = 0.3 }: SectionHeadingProps) {
  return (
    <motion.h2
      className={`text-white font-inter font-semibold text-section-title leading-normal ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.h2>
  )
}
