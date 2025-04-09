"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { SlideContainer } from "@/components/ui/slide-container"
import { AccentLabel } from "@/components/ui/accent-label"
import { BodyText } from "@/components/ui/body-text"

interface SocialScoreData {
  percentile: number
  platforms: string[]
}

interface SocialScoreSlideProps {
  data: SocialScoreData
}

// Map platform names to their icon paths
const platformIcons = {
  X: "/images/x.svg",
  Ethos: "/images/ethos.svg",
  Kaito: "/images/kaito.svg",
}

export function SocialScoreSlide({ data }: SocialScoreSlideProps) {
  return (
    <SlideContainer>
      <motion.div
        className="flex flex-col items-center text-center max-w-2xl px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <AccentLabel>SOCIAL SCORE</AccentLabel>

        <h2 className="text-white font-inter font-semibold text-subsection-title leading-normal mb-8">
          You're in the top {data.percentile}%.
        </h2>

        <motion.div
          className="flex gap-6 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          {data.platforms.map((platform, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <Image
                src={platformIcons[platform] || "/placeholder.svg?height=24&width=24"}
                alt={platform}
                width={24}
                height={24}
                className="w-auto h-6"
              />
            </motion.div>
          ))}
        </motion.div>

        <BodyText>We see you on {data.platforms.join(", ")}.</BodyText>
      </motion.div>
    </SlideContainer>
  )
}
