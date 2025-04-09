"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { SectionHeading } from "@/components/ui/section-heading"

interface RewindSlideProps {
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function RewindSlide({ backgroundGroup = 1, animationVariant = "slideUp" }: RewindSlideProps) {
  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <SectionHeading>Let's rewind to where it all began...</SectionHeading>
    </SlideBase>
  )
}
