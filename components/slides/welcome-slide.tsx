"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export function WelcomeSlide() {
  const frameRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [leftBarWidth, setLeftBarWidth] = useState("0px")
  const [rightBarWidth, setRightBarWidth] = useState("0px")
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    // Calculate the distance from the edges of the screen to the corners of the frame
    const calculateBarWidths = () => {
      if (frameRef.current) {
        const frameRect = frameRef.current.getBoundingClientRect()
        const leftDistance = frameRect.left
        const rightDistance = window.innerWidth - frameRect.right

        setLeftBarWidth(`${leftDistance}px`)
        setRightBarWidth(`${rightDistance}px`)
      }
    }

    // Use Intersection Observer to detect when the welcome slide is in view
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          // Only consider it in view if it's fully visible (or nearly so)
          const entry = entries[0]
          setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.9)
        },
        { threshold: [0.9] }, // Only trigger when 90% or more is visible
      )

      observer.observe(sectionRef.current)

      // Calculate widths initially
      calculateBarWidths()

      // Add resize listener
      window.addEventListener("resize", calculateBarWidths)

      return () => {
        if (sectionRef.current) observer.unobserve(sectionRef.current)
        window.removeEventListener("resize", calculateBarWidths)
      }
    }
  }, [])

  // Styles for the bars - completely hidden when not in view
  const barStyle = {
    opacity: isInView ? 1 : 0,
    visibility: isInView ? "visible" : "hidden",
    transition: "opacity 0.3s, visibility 0.3s",
  }

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex flex-col items-center justify-center snap-start relative overflow-visible bg-white"
    >
      <div className="relative w-full max-w-2xl mx-auto px-4">
        <motion.div
          ref={frameRef}
          className="flex flex-col items-center text-center relative py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Top left corner */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-black" />

          {/* Top right corner */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-black" />

          <h1
            className="text-black mb-8 font-inter"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400 /* Regular */,
              fontSize: "64px" /* Display Stat size */,
              lineHeight: "1.1",
            }}
          >
            You've been making
            <br />
            moves on-chain.
          </h1>
          <p
            className="text-black/85 font-inter" /* Updated opacity to 85% */
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500 /* Medium */,
              fontSize: "14px" /* Body Text size */,
            }}
          >
            Let's see how you stack up against other RampX users.
          </p>

          {/* Bottom left corner */}
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-black" />

          {/* Bottom right corner */}
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-black" />
        </motion.div>
      </div>

      {/* Left horizontal line */}
      <motion.div
        className="fixed left-0 top-1/2 -translate-y-1/2 border-t border-[#BBBBBB] z-10"
        style={barStyle}
        initial={{ width: 0 }}
        animate={isInView ? { width: leftBarWidth } : { width: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
      >
        <div className="absolute right-0 top-0 h-4 border-l border-[#BBBBBB] -translate-y-1/2"></div>
      </motion.div>

      {/* Right horizontal line */}
      <motion.div
        className="fixed right-0 top-1/2 -translate-y-1/2 border-t border-[#BBBBBB] z-10"
        style={barStyle}
        initial={{ width: 0 }}
        animate={isInView ? { width: rightBarWidth } : { width: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
      >
        <div className="absolute left-0 top-0 h-4 border-l border-[#BBBBBB] -translate-y-1/2"></div>
      </motion.div>

      {/* Centered scroll indicator with #BBBBBB color */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-12">
        <motion.div
          className="flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <p
            className="text-[#BBBBBB] text-xs text-center font-inter"
            style={{ fontSize: "12px", fontWeight: 400, opacity: 0.65 }}
          >
            Scroll Down
          </p>
          <div className="w-6 h-10 border border-[#BBBBBB] rounded-full mx-auto mt-2 flex justify-center">
            <motion.div
              className="w-1 h-2 bg-[#BBBBBB] rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
