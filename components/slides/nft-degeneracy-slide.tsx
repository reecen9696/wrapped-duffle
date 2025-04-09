"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { BodyText } from "@/components/ui/body-text"
import Image from "next/image"
import type { NftData } from "@/lib/api"

interface NftDegeneracySlideProps {
  data: NftData
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function NftDegeneracySlide({
  data,
  backgroundGroup = 2,
  animationVariant = "slideUp",
}: NftDegeneracySlideProps) {
  const nftImages = data.images.slice(0, 16)
  const displayImages =
    nftImages.length < 16 ? [...nftImages, ...nftImages, ...nftImages, ...nftImages].slice(0, 16) : nftImages

  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <div className="grid grid-cols-4 gap-3 mb-8">
        {displayImages.map((src, i) => (
          <div
            key={i}
            className="relative w-24 h-24 rounded-md overflow-hidden border border-white/20"
            style={{
              opacity: 0,
              transform: "translateY(10px)",
              animation: `fadeInUp 0.5s ease-out ${0.3 + i * 0.05}s forwards`,
            }}
          >
            <Image src={src || "/placeholder.svg"} alt={`NFT ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      <h2 className="text-white mb-8 font-inter font-semibold text-section-title leading-normal">
        You minted {data.count} NFTs.
      </h2>

      <BodyText>Art? Utility? Who cares.</BodyText>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </SlideBase>
  )
}
