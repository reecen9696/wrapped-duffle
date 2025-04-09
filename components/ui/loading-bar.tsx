"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface LoadingBarProps {
  value: number
  maxValue: number
  totalSquares?: number
  color?: string
  showValue?: boolean
  delay?: number
  duration?: number
  onComplete?: () => void
}

export function LoadingBar({
  value,
  maxValue,
  totalSquares = 20,
  color = "#FF6E19",
  showValue = true,
  delay = 0.5,
  duration = 2000,
  onComplete,
}: LoadingBarProps) {
  const [currentValue, setCurrentValue] = useState(0)
  const [currentSquares, setCurrentSquares] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Calculate percentage
  const percentage = Math.round((value / maxValue) * 100)

  // Calculate filled squares based on percentage
  const filledSquares = Math.round((percentage / 100) * totalSquares)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    // Start animation after delay
    timeoutId = setTimeout(() => {
      setIsAnimating(true)
      animateLoading()
    }, delay * 1000)

    return () => clearTimeout(timeoutId)
  }, [])

  const animateLoading = () => {
    const startTime = Date.now()

    // Easing function for smoother animation
    const easeOutQuad = (t: number) => t * (2 - t)

    const animate = () => {
      const elapsed = Date.now() - startTime
      const linearProgress = Math.min(elapsed / duration, 1)

      // Apply easing
      const easedProgress = easeOutQuad(linearProgress)

      // Update current value and squares
      setCurrentValue(Math.round(easedProgress * value))
      setCurrentSquares(Math.round(easedProgress * filledSquares))

      if (linearProgress < 1) {
        requestAnimationFrame(animate)
      } else if (onComplete) {
        onComplete()
      }
    }

    requestAnimationFrame(animate)
  }

  return (
    <div
      style={{
        fontFamily: "DM Mono, monospace",
        fontWeight: 500,
        fontSize: "20px",
        color: color,
      }}
    >
      [
      {Array(totalSquares)
        .fill(null)
        .map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + i * 0.03 }}
          >
            {i < currentSquares ? "■" : "□"}
          </motion.span>
        ))}{" "}
      {showValue && <motion.span>{currentValue}</motion.span>}]
    </div>
  )
}
