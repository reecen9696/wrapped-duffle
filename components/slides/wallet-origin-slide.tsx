"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { AccentLabel } from "@/components/ui/accent-label"
import { StatDisplay } from "@/components/ui/stat-display"

interface WalletOriginData {
  createdDate: string
  percentile: number
}

interface WalletOriginSlideProps {
  data: WalletOriginData
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function WalletOriginSlide({ data, backgroundGroup = 2, animationVariant = "slideUp" }: WalletOriginSlideProps) {
  // Split the date into month and year
  const dateParts = data.createdDate.split(" ")
  const month = dateParts[0] || "April"
  const year = dateParts[1] || "2022"

  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <AccentLabel>CREATED WALLET</AccentLabel>

      {/* Side by side month and year display */}
      <div className="flex flex-row items-center justify-center gap-8 w-full">
        <StatDisplay value={month} initialX={-50} />
        <StatDisplay value={year} initialX={50} delay={0.7} />
      </div>
    </SlideBase>
  )
}
