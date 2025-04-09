"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { AccentLabel } from "@/components/ui/accent-label"
import { StatDisplay } from "@/components/ui/stat-display"
import { CoinAnimation } from "@/components/coin-animation"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"

interface BiggestApeData {
  amount: number
  token: string
}

interface BiggestApeSlideProps {
  data: BiggestApeData
}

export function BiggestApeSlide({ data }: BiggestApeSlideProps) {
  const { ref, isInView } = useInView()

  return (
    <SlideContainer ref={ref}>
      {/* Coin animation that only renders when the slide is in view */}
      {isInView && <CoinAnimation />}

      <motion.div
        className="flex flex-col items-center text-center max-w-4xl px-4 z-10 relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <AccentLabel>BIGGEST TOKEN APE</AccentLabel>

        {/* Large amount display - "$6400" */}
        <StatDisplay value={data.amount} prefix="$" />
      </motion.div>
    </SlideContainer>
  )
}
