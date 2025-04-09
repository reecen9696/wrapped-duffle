"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { SectionHeading } from "@/components/ui/section-heading"

interface IntroSlideProps {
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function IntroSlide({ backgroundGroup = 1, animationVariant = "fade" }: IntroSlideProps) {
  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <div className="flex flex-col items-center text-center">
        <SectionHeading className="mb-1">It. Is. Here.</SectionHeading>
        <SectionHeading delay={1.1}>Your on chain wrapped!</SectionHeading>
      </div>
    </SlideBase>
  )
}
