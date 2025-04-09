"use client"

import { forwardRef, type ReactNode } from "react"

interface SlideContainerProps {
  children: ReactNode
  className?: string
}

export const SlideContainer = forwardRef<HTMLElement, SlideContainerProps>(({ children, className = "" }, ref) => {
  return (
    <section
      ref={ref}
      className={`h-screen w-full flex flex-col items-center justify-center snap-start relative overflow-hidden ${className}`}
    >
      {children}
    </section>
  )
})

SlideContainer.displayName = "SlideContainer"
