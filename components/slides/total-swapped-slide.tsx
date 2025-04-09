"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { AccentLabel } from "@/components/ui/accent-label"
import { StatDisplay } from "@/components/ui/stat-display"
import type { TransactionData } from "@/lib/api"

interface TotalSwappedSlideProps {
  data: TransactionData
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function TotalSwappedSlide({ data, backgroundGroup = 3, animationVariant = "slideUp" }: TotalSwappedSlideProps) {
  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <AccentLabel>TOTAL TRANSACTIONS</AccentLabel>
      <StatDisplay value={data.total.toLocaleString()} initialX={0} initialY={50} />
    </SlideBase>
  )
}
