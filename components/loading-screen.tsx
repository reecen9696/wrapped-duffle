"use client"

import { motion } from "framer-motion"

export function LoadingScreen() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center" style={{ backgroundColor: "#080A10" }}>
      <motion.div
        className="w-16 h-16 border-4 border-[#FF791A] border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <p className="mt-6 text-white font-medium text-xl" style={{ fontFamily: "Manrope, sans-serif" }}>
        Loading your on-chain data...
      </p>
    </div>
  )
}
