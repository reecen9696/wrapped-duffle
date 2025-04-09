"use client"

import { motion } from "framer-motion"

interface MetricRowProps {
  label: string
  value: string
  delay?: number
}

export function MetricRow({ label, value, delay = 0.4 }: MetricRowProps) {
  return (
    <motion.div
      className="flex justify-between items-center p-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      <div className="text-white/80 text-left">{label}</div>
      <div className="text-white font-semibold">{value}</div>
    </motion.div>
  )
}
