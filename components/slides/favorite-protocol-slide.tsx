"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { useEffect, useRef, useState } from "react"

interface FavoriteProtocolData {
  name: string
  count: number
}

interface FavoriteProtocolSlideProps {
  data: FavoriteProtocolData
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function FavoriteProtocolSlide({
  data,
  backgroundGroup = 3,
  animationVariant = "fade",
}: FavoriteProtocolSlideProps) {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Create 6 blocks with alternating styles
  const blocks = [
    { id: 0, style: { backgroundColor: "#FF6E19", color: "#07090F" } },
    { id: 1, style: { backgroundColor: "#07090F", color: "#FF6E19" } },
    { id: 2, style: { backgroundColor: "#FF6E19", color: "#07090F" } },
    { id: 3, style: { backgroundColor: "#07090F", color: "#FF6E19" } },
    { id: 4, style: { backgroundColor: "#FF6E19", color: "#07090F" } },
    { id: 5, style: { backgroundColor: "#07090F", color: "#FF6E19" } },
  ]

  // Use Intersection Observer to detect when the slide is in view
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          // Small delay to ensure the page is fully scrolled into view
          setTimeout(() => {
            setIsInView(true)
          }, 100)

          // Once triggered, we can disconnect the observer
          observer.disconnect()
        }
      },
      {
        threshold: 0.1, // Trigger when just 10% of the slide is visible
        rootMargin: "0px 0px -10% 0px", // Trigger slightly before fully in view
      },
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <div ref={sectionRef} className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto px-4">
        <div className="flex flex-col items-center w-full">
          {/* Container div without border */}
          <div
            className="relative w-full max-w-xl mx-auto mb-8"
            style={{
              opacity: 0,
              visibility: isInView ? "visible" : "hidden",
              animation: isInView ? "fadeIn 0.8s ease-out forwards" : "none",
              backgroundColor: "#07090F",
              padding: "2rem",
            }}
          >
            {/* Stack of Jupiter blocks */}
            <div className="flex flex-col w-full">
              {/* Render blocks in normal order but with reversed animation timing */}
              {blocks.map((block, index) => {
                // Calculate delay so bottom block appears first
                // blocks.length - 1 - index gives us 5 for the first item (index 0), 4 for the second, etc.
                const reverseIndex = blocks.length - 1 - index
                const animationDelay = 0.5 + reverseIndex * 0.5

                return (
                  <div
                    key={block.id}
                    className="w-full py-6 flex justify-center items-center"
                    style={{
                      ...block.style,
                      opacity: 0,
                      visibility: "hidden",
                      animation: isInView
                        ? `fall 1s cubic-bezier(0.215, 0.61, 0.355, 1) ${animationDelay}s forwards`
                        : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 800,
                        fontSize: "72px",
                        lineHeight: 1,
                      }}
                    >
                      {data.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Text at the bottom - simple fade in */}
          <div
            className="text-white text-center"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "24px",
              opacity: 0,
              animation: isInView ? "fadeIn 1s ease-out forwards" : "none",
            }}
          >
            Your favourite protocol with {data.count} swaps.
          </div>
        </div>
      </div>

      {/* CSS animation */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-1000px);
            opacity: 0;
            visibility: visible;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </SlideBase>
  )
}
