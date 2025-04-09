"use client"

import { useState, useEffect } from "react"

interface UseAnimatedCounterProps {
  endValue: number
  startValue?: number
  duration?: number
  isInView?: boolean
}

export function useAnimatedCounter({
  endValue,
  startValue,
  duration = 2000,
  isInView = true,
}: UseAnimatedCounterProps) {
  const [currentValue, setCurrentValue] = useState(startValue || Math.floor(endValue / 2))

  useEffect(() => {
    if (!isInView) return

    // Start from initial value
    setCurrentValue(startValue || Math.floor(endValue / 2))

    // Animate to final number
    const startTime = performance.now()

    const updateNumber = (timestamp: number) => {
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Calculate current value with easing
      const value = Math.floor(
        (startValue || Math.floor(endValue / 2)) + (endValue - (startValue || Math.floor(endValue / 2))) * progress,
      )
      setCurrentValue(value)

      if (progress < 1) {
        requestAnimationFrame(updateNumber)
      }
    }

    requestAnimationFrame(updateNumber)
  }, [isInView, endValue, startValue, duration])

  return currentValue
}
