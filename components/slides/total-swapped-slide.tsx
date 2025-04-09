"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { AccentLabel } from "@/components/ui/accent-label"
import { StatDisplay } from "@/components/ui/stat-display"
import type { TransactionData } from "@/lib/api"

interface TotalSwappedSlideProps {
  data: TransactionData
}

export function TotalSwappedSlide({ data }: TotalSwappedSlideProps) {
  return (
    <SlideBase backgroundType="dark" animationVariant="slideUp">
      <AccentLabel>TOTAL TRANSACTIONS</AccentLabel>
      <StatDisplay value={data.total.toLocaleString()} initialX={0} initialY={50} />
    </SlideBase>
  )
}
