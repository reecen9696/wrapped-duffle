"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { SlideContainer } from "@/components/ui/slide-container"
import { BodyText } from "@/components/ui/body-text"
import type { NftData } from "@/lib/api"

interface NftDegeneracySlideProps {
  data: NftData
}

export function NftDegeneracySlide({ data }: NftDegeneracySlideProps) {
  const nftImages = data.images.slice(0, 16)
  const displayImages =
    nftImages.length < 16 ? [...nftImages, ...nftImages, ...nftImages, ...nftImages].slice(0, 16) : nftImages

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
          className="grid grid-cols-4 gap-3 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          {displayImages.map((src, i) => (
            <motion.div
              key={i}
              className="relative w-24 h-24 rounded-md overflow-hidden border border-white/20"
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              viewport={{ once: true }}
            >
              <Image src={src || "/placeholder.svg"} alt={`NFT ${i + 1}`} fill className="object-cover" />
            </motion.div>
          ))}
        </motion.div>

        <h2 className="text-white mb-8 font-inter font-semibold text-section-title leading-normal">
          You minted {data.count} NFTs.
        </h2>

        <BodyText>Art? Utility? Who cares.</BodyText>
      </motion.div>
    </SlideContainer>
  )
}
