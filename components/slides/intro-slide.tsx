"use client"

import { SlideContainer } from "@/components/ui/slide-container"
import { SectionHeading } from "@/components/ui/section-heading"

export function IntroSlide() {
  return (
    <SlideContainer>
      <div className="flex flex-col items-center text-center">
        <SectionHeading className="mb-1">It. Is. Here.</SectionHeading>
        <SectionHeading delay={1.1}>Your on chain wrapped!</SectionHeading>
      </div>
    </SlideContainer>
  )
}
