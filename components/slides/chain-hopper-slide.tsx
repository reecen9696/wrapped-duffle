"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { useEffect, useRef, useState } from "react"

interface ChainHopperData {
  chains: number
  protocols: number
  chainData: { name: string; count: number }[]
}

interface ChainHopperSlideProps {
  data: ChainHopperData
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function ChainHopperSlide({ data, backgroundGroup = 3, animationVariant = "slideUp" }: ChainHopperSlideProps) {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const maxCount = Math.max(...data.chainData.map((d) => d.count))

  // Use Intersection Observer to detect when the slide is in view
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          // Once triggered, we can disconnect the observer
          observer.disconnect()
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the slide is visible
      },
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Calculate the size of each circle based on its count relative to the max count
  const getCircleSize = (count: number) => {
    // Base size for the smallest circle
    const minSize = 80
    // Maximum size for the largest circle
    const maxSize = 200
    // Calculate size proportionally
    const size = minSize + (count / maxCount) * (maxSize - minSize)
    return size
  }

  // Sort chains by count (descending) to place larger circles first
  const sortedChains = [...data.chainData].sort((a, b) => b.count - a.count)

  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <div ref={sectionRef}>
        <h2
          className="text-white mb-12"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: "48px",
            lineHeight: "1.2",
          }}
        >
          You interacted with {data.chains} chains
        </h2>

        {/* Circle layout container */}
        <div
          className="flex flex-wrap justify-center gap-6 w-full max-w-3xl"
          style={{ opacity: isInView ? 1 : 0, transition: "opacity 0.5s" }}
        >
          {sortedChains.map((chain, i) => {
            const size = getCircleSize(chain.count)

            return (
              <div
                key={i}
                className="flex items-center justify-center rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: "#FF6E19",
                  transform: `scale(${isInView ? 1 : 0})`,
                  opacity: isInView ? 1 : 0,
                  transition: `transform 0.7s ease-out ${0.3 + i * 0.15}s, opacity 0.7s ease-out ${0.3 + i * 0.15}s`,
                }}
              >
                <div
                  className="flex flex-col items-center justify-center"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: `opacity 0.3s ease-out ${0.3 + i * 0.15 + 0.2}s`,
                  }}
                >
                  <div
                    className="font-bold text-black"
                    style={{
                      fontSize: `${Math.max(16, size / 6)}px`,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {chain.name}
                  </div>
                  <div
                    className="text-black font-medium"
                    style={{
                      fontSize: `${Math.max(12, size / 10)}px`,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {chain.count}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SlideBase>
  )
}
