"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { SlideContainer } from "@/components/ui/slide-container"

interface ChainHopperData {
  chains: number
  protocols: number
  chainData: { name: string; count: number }[]
}

interface ChainHopperSlideProps {
  data: ChainHopperData
}

export function ChainHopperSlide({ data }: ChainHopperSlideProps) {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
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
    <SlideContainer ref={sectionRef}>
      <motion.div
        className="flex flex-col items-center text-center max-w-4xl px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
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
        <motion.div
          className="flex flex-wrap justify-center gap-6 w-full max-w-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {sortedChains.map((chain, i) => {
            const size = getCircleSize(chain.count)

            return (
              <motion.div
                key={i}
                className="flex items-center justify-center rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: "#FF6E19",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                  delay: 0.3 + i * 0.15, // Staggered delay
                  duration: 0.7, // Slightly longer duration for smooth growth
                  ease: "easeOut", // Simple ease out for smooth growth without bounce
                }}
              >
                <motion.div
                  className="flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.15 + 0.2, // Text appears slightly after the circle
                    duration: 0.3,
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
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </SlideContainer>
  )
}
