"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { SectionHeading } from "@/components/ui/section-heading"

interface WhatYouSaidSlideProps {
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function WhatYouSaidSlide({ backgroundGroup = 1, animationVariant = "fade" }: WhatYouSaidSlideProps) {
  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <SectionHeading>
        It's not just what you did
        <br />
        it's what you said...
      </SectionHeading>
    </SlideBase>
  )
}
