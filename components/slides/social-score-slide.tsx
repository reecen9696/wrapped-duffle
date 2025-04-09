"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { AccentLabel } from "@/components/ui/accent-label"
import { BodyText } from "@/components/ui/body-text"
import Image from "next/image"

interface SocialScoreData {
  percentile: number
  platforms: string[]
}

interface SocialScoreSlideProps {
  data: SocialScoreData
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

// Map platform names to their icon paths
const platformIcons = {
  X: "/images/x.svg",
  Ethos: "/images/ethos.svg",
  Kaito: "/images/kaito.svg",
}

export function SocialScoreSlide({ data, backgroundGroup = 3, animationVariant = "slideUp" }: SocialScoreSlideProps) {
  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <AccentLabel>SOCIAL SCORE</AccentLabel>

      <h2 className="text-white font-inter font-semibold text-subsection-title leading-normal mb-8">
        You're in the top {data.percentile}%.
      </h2>

      <div className="flex gap-6 mb-8">
        {data.platforms.map((platform, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full"
            style={{
              opacity: 0,
              transform: "scale(0)",
              animation: `scaleIn 0.5s ease-out ${0.5 + i * 0.1}s forwards`,
            }}
          >
            <Image
              src={platformIcons[platform] || "/placeholder.svg?height=24&width=24"}
              alt={platform}
              width={24}
              height={24}
              className="w-auto h-6"
            />
          </div>
        ))}
      </div>

      <BodyText>We see you on {data.platforms.join(", ")}.</BodyText>

      <style jsx global>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </SlideBase>
  )
}
