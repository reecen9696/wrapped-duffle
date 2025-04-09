"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { SectionHeading } from "@/components/ui/section-heading"

interface BeenAroundSlideProps {
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function BeenAroundSlide({ backgroundGroup = 1, animationVariant = "fade" }: BeenAroundSlideProps) {
  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <SectionHeading>You've been around...</SectionHeading>
    </SlideBase>
  )
}
