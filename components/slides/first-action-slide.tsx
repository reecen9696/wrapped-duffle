"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { AccentLabel } from "@/components/ui/accent-label"
import { StatDisplay } from "@/components/ui/stat-display"
import { BodyText } from "@/components/ui/body-text"
import { LoadingBar } from "@/components/ui/loading-bar"
import { useInView } from "@/hooks/use-in-view"

interface FirstActionData {
  action: string
  date: string
  percentile: number
}

interface FirstActionSlideProps {
  data: FirstActionData
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function FirstActionSlide({ data, backgroundGroup = 2, animationVariant = "slideUp" }: FirstActionSlideProps) {
  const { ref, isInView } = useInView()

  // Extract month and year from the date
  const dateParts = data.date.split(" ")
  const month = dateParts[0] || "June"
  const year = dateParts[1] || "2023"

  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <div ref={ref}>
        <AccentLabel>YOUR FIRST SWAP</AccentLabel>

        {/* Large date display - "JUNE 2023" */}
        <div className="flex flex-row items-center justify-center gap-8 w-full mb-12">
          <StatDisplay value={month} initialX={-50} />
          <StatDisplay value={year} initialX={50} delay={0.7} />
        </div>

        {/* Text-based loading bar */}
        <div className="mb-4">
          {isInView && <LoadingBar value={data.percentile} maxValue={100} delay={1.5} showValue={true} />}
        </div>

        <BodyText delay={1.4}>That's earlier than {data.percentile}% of RampX users.</BodyText>
      </div>
    </SlideBase>
  )
}
