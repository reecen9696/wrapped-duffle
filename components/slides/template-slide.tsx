"use client"

import { motion } from "framer-motion"
import { SlideContainer } from "@/components/ui/slide-container"
import { AccentLabel } from "@/components/ui/accent-label"
import { StatDisplay } from "@/components/ui/stat-display"
import { BodyText } from "@/components/ui/body-text"

/**
 * Simple Template Slide
 *
 * Basic structure for creating a new slide.
 */

// Define your data interface
interface TemplateSlideData {
  value: number
  description: string
}

interface TemplateSlideProps {
  data?: TemplateSlideData
}

// Default data if none is provided
const defaultData: TemplateSlideData = {
  value: 123,
  description: "This is a template slide",
}

export function TemplateSlide({ data = defaultData }: TemplateSlideProps) {
  return (
    <SlideContainer>
      <motion.div
        className="flex flex-col items-center text-center max-w-4xl px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Title */}
        <AccentLabel>TEMPLATE SLIDE</AccentLabel>

        {/* Main value display */}
        <StatDisplay value={data.value} />

        {/* Description */}
        <BodyText>{data.description}</BodyText>
      </motion.div>
    </SlideContainer>
  )
}
