"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { AccentLabel } from "@/components/ui/accent-label"
import { StatDisplay } from "@/components/ui/stat-display"
import { BodyText } from "@/components/ui/body-text"
import { LoadingBar } from "@/components/ui/loading-bar"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"

interface FirstActionData {
  action: string
  date: string
  percentile: number
}

interface FirstActionSlideProps {
  data: FirstActionData
}

export function FirstActionSlide({ data }: FirstActionSlideProps) {
  const { ref, isInView } = useInView()

  // Extract month and year from the date
  const dateParts = data.date.split(" ")
  const month = dateParts[0] || "June"
  const year = dateParts[1] || "2023"

  return (
    <SlideContainer ref={ref}>
      <motion.div
        className="flex flex-col items-center text-center max-w-4xl px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <AccentLabel>YOUR FIRST SWAP</AccentLabel>

        {/* Large date display - "JUNE 2023" */}
        <motion.div
          className="flex flex-row items-center justify-center gap-8 w-full mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <StatDisplay value={month} initialX={-50} />
          <StatDisplay value={year} initialX={50} delay={0.7} />
        </motion.div>

        {/* Text-based loading bar */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {isInView && <LoadingBar value={data.percentile} maxValue={100} delay={1.5} showValue={true} />}
        </motion.div>

        <BodyText delay={1.4}>That's earlier than {data.percentile}% of RampX users.</BodyText>
      </motion.div>
    </SlideContainer>
  )
}
