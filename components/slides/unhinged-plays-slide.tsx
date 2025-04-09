"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { SectionHeading } from "@/components/ui/section-heading"

interface UnhingedPlaysSlideProps {
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function UnhingedPlaysSlide({ backgroundGroup = 1, animationVariant = "fade" }: UnhingedPlaysSlideProps) {
  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <SectionHeading>Let's relive your most unhinged plays...</SectionHeading>
    </SlideBase>
  )
}
