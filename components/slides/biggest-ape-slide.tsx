"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { AccentLabel } from "@/components/ui/accent-label"
import { StatDisplay } from "@/components/ui/stat-display"
import { CoinAnimation } from "@/components/coin-animation"
import { useInView } from "@/hooks/use-in-view"

interface BiggestApeData {
  amount: number
  token: string
}

interface BiggestApeSlideProps {
  data: BiggestApeData
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function BiggestApeSlide({ data, backgroundGroup = 2, animationVariant = "slideUp" }: BiggestApeSlideProps) {
  const { ref, isInView } = useInView()

  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      {/* Coin animation that only renders when the slide is in view */}
      {isInView && <CoinAnimation />}

      <div ref={ref} className="z-10 relative">
        <AccentLabel>BIGGEST TOKEN APE</AccentLabel>

        {/* Large amount display - "$6400" */}
        <StatDisplay value={data.amount} prefix="$" />
      </div>
    </SlideBase>
  )
}
