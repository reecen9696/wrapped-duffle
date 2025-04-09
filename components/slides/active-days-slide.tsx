"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { BodyText } from "@/components/ui/body-text"
import { useInView } from "@/hooks/use-in-view"
import { useAnimatedCounter } from "@/hooks/use-animated-counter"
import type { ActiveDaysData } from "@/lib/api"

interface ActiveDaysSlideProps {
  data: ActiveDaysData
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function ActiveDaysSlide({ data, backgroundGroup = 3, animationVariant = "slideUp" }: ActiveDaysSlideProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  const currentNumber = useAnimatedCounter({
    endValue: data.count,
    isInView,
  })

  const totalCircles = 300
  const columns = 20

  const renderCircles = () => {
    const circles = []

    for (let i = 0; i < totalCircles; i++) {
      const delay = 0.8 + i * 0.005
      const isActive = data.activityMap ? data.activityMap[i % data.activityMap.length] : Math.random() > 0.3

      circles.push(
        <div
          key={i}
          className="circle"
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: isActive ? "#FF6E19" : "rgba(255, 110, 25, 0.2)",
            borderRadius: "50%",
            opacity: 0,
            transform: "scale(0)",
            animation: isInView ? `appear 0.3s forwards ${delay}s` : "none",
          }}
        />,
      )
    }

    return circles
  }

  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <div ref={ref} className="flex flex-col items-center justify-center text-center w-full max-w-4xl px-4 mx-auto">
        <div
          className="text-white mb-2 font-inter font-extrabold text-stat-large leading-tight tracking-tighter"
          style={{ opacity: isInView ? 1 : 0, transition: "opacity 0.6s" }}
        >
          {currentNumber.toLocaleString()}
        </div>

        <BodyText className="mb-8" delay={0.5}>
          Number of active days
        </BodyText>

        <div
          className="circle-grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "6px",
            width: "100%",
            maxWidth: "600px",
            justifyItems: "center",
          }}
        >
          {renderCircles()}
        </div>
      </div>

      <style jsx global>{`
        @keyframes appear {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </SlideBase>
  )
}
