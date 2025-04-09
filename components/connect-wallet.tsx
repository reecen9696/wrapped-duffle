"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

interface ConnectWalletProps {
  onConnect: () => void
}

export function ConnectWallet({ onConnect }: ConnectWalletProps) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center" style={{ backgroundColor: "#080A10" }}>
      <div className="absolute top-8 left-8">
        <Image
          src="/placeholder.svg?height=40&width=80"
          alt="RampX Logo"
          width={80}
          height={40}
          className="object-contain"
        />
      </div>
      <div className="absolute top-8 right-8">
        <div className="text-white text-sm font-mono uppercase tracking-wider">CRYPTO / ACCELERATED</div>
      </div>

      <motion.div
        className="flex flex-col items-center justify-center gap-12 max-w-md text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-6">
          <h1 className="text-7xl font-bold text-white" style={{ fontFamily: "'Swiss 911 Compressed', sans-serif" }}>
            Think.
            <br />
            Bigger.
          </h1>
          <p className="text-xl text-white/80 font-medium" style={{ fontFamily: "Manrope, sans-serif" }}>
            Connect your wallet to see your on-chain year in review
          </p>
        </div>

        <Button
          onClick={onConnect}
          className="bg-[#FF791A] hover:bg-[#FF791A]/90 text-white px-8 py-6 rounded-md text-lg font-bold"
        >
          Take Flight
        </Button>
      </motion.div>

      <div className="absolute bottom-8 text-white/50 text-xs">
        BROUGHT TO YOU BY
        <br />
        DUFFLE INC.
      </div>
    </div>
  )
}
