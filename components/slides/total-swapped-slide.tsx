"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { AccentLabel } from "@/components/ui/accent-label"
import { StatDisplay } from "@/components/ui/stat-display"
import { motion } from "framer-motion"
import type { TransactionData } from "@/lib/api"

interface TotalSwappedSlideProps {
  data: TransactionData
}

export function TotalSwappedSlide({ data }: TotalSwappedSlideProps) {
  return (
    <SlideContainer>
      <motion.div
        className="flex flex-col items-center text-center max-w-4xl px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <AccentLabel>TOTAL TRANSACTIONS</AccentLabel>
        <StatDisplay value={data.total.toLocaleString()} initialX={0} initialY={50} />
      </motion.div>
    </SlideContainer>
  )
}
