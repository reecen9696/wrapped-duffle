"use client"

import { motion } from "framer-motion"
import { SlideContainer } from "@/components/ui/slide-container"

interface BiggestSwapData {
  amount: number
}

interface BiggestSwapSlideProps {
  data: BiggestSwapData
}

export function BiggestSwapSlide({ data }: BiggestSwapSlideProps) {
  return (
    <SlideContainer>
      <motion.div
        className="flex flex-col items-center text-center max-w-4xl px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-[#FF6E19] uppercase mb-4 font-dm-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "DM Mono, monospace",
            fontWeight: 500,
            fontSize: "20px",
          }}
        >
          BIGGEST SWAP
        </motion.div>

        {/* Large amount display - "$4,239" */}
        <motion.div
          className="flex flex-row items-center justify-center w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-white font-inter"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "192px",
              lineHeight: "1",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            ${data.amount.toLocaleString()}
          </motion.div>
        </motion.div>
      </motion.div>
    </SlideContainer>
  )
}
