"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { SectionHeading } from "@/components/ui/section-heading"

export function RewindSlide() {
  return (
    <SlideBase backgroundType="dark" animationVariant="slideUp">
      <SectionHeading>Let's rewind to where it all began...</SectionHeading>
    </SlideBase>
  )
}
