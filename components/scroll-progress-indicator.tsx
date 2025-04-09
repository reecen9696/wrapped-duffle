"use client"

import { useEffect, useState } from "react"

export function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isFirstSlide, setIsFirstSlide] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate total scrollable height
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight

      // Calculate current scroll position
      const scrollTop = window.scrollY

      // Calculate scroll progress percentage
      const progress = Math.min(scrollTop / scrollHeight, 1)
      setScrollProgress(progress)

      // Check if we're on the first slide
      const onFirstSlide = scrollTop < 100
      setIsFirstSlide(onFirstSlide)
    }

    // Initial check
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Always show the indicator, but make it invisible on the first slide
  return (
    <div
      className="fixed bottom-8 left-8 h-32 w-[3px] z-50 flex flex-col items-center"
      style={{ opacity: isFirstSlide ? 0 : 1, transition: "opacity 0.3s ease" }}
    >
      {/* Background track */}
      <div className="h-full w-full bg-gray-500/50 relative">
        {/* Progress indicator */}
        <div
          className="absolute top-0 left-0 w-full bg-white"
          style={{
            height: `${scrollProgress * 100}%`,
            transition: "height 0.1s ease-out",
          }}
        />
      </div>
    </div>
  )
}
