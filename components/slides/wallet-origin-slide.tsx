"use client"

import { motion } from "framer-motion"
import { SlideContainer } from "@/components/ui/slide-container"
import { AccentLabel } from "@/components/ui/accent-label"
import { StatDisplay } from "@/components/ui/stat-display"

interface WalletOriginData {
  createdDate: string
  percentile: number
}

interface WalletOriginSlideProps {
  data: WalletOriginData
}

export function WalletOriginSlide({ data }: WalletOriginSlideProps) {
  // Split the date into month and year
  const dateParts = data.createdDate.split(" ")
  const month = dateParts[0] || "April"
  const year = dateParts[1] || "2022"

  return (
    <SlideContainer>
      <motion.div
        className="flex flex-col items-center text-center max-w-4xl px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <AccentLabel>CREATED WALLET</AccentLabel>

        {/* Side by side month and year display */}
        <motion.div
          className="flex flex-row items-center justify-center gap-8 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <StatDisplay value={month} initialX={-50} />
          <StatDisplay value={year} initialX={50} delay={0.7} />
        </motion.div>
      </motion.div>
    </SlideContainer>
  )
}
