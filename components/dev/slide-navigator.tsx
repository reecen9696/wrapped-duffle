"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getEnabledSlides } from "@/config/slides"
import { ChevronUp, ChevronDown, List, X } from "lucide-react"

/**
 * A developer tool component that allows quick navigation between slides
 * Only visible in development mode
 */
export function SlideNavigator() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const enabledSlides = getEnabledSlides()

  // Track current slide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const slideIndex = Math.round(scrollPosition / windowHeight)
      setCurrentSlideIndex(Math.min(slideIndex, enabledSlides.length - 1))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [enabledSlides.length])

  // Navigate to a specific slide
  const navigateToSlide = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: "smooth",
    })
    setCurrentSlideIndex(index)
  }

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed right-8 bottom-8 z-50">
      {isOpen ? (
        <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-white/20 w-64">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Slide Navigator</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/70 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </Button>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-white/70 text-xs">
              Slide {currentSlideIndex + 1} of {enabledSlides.length}
            </span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white/70 hover:text-white"
                onClick={() => navigateToSlide(Math.max(0, currentSlideIndex - 1))}
                disabled={currentSlideIndex === 0}
              >
                <ChevronUp size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white/70 hover:text-white"
                onClick={() => navigateToSlide(Math.min(enabledSlides.length - 1, currentSlideIndex + 1))}
                disabled={currentSlideIndex === enabledSlides.length - 1}
              >
                <ChevronDown size={14} />
              </Button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto pr-2">
            <ul className="space-y-1">
              {enabledSlides.map((slide, index) => (
                <li key={slide.id}>
                  <Button
                    variant={currentSlideIndex === index ? "default" : "ghost"}
                    className={`w-full justify-start text-left text-xs h-8 ${
                      currentSlideIndex === index ? "bg-[#FF6E19]" : "text-white/70 hover:text-white"
                    }`}
                    onClick={() => navigateToSlide(index)}
                  >
                    {index + 1}. {slide.title}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <Button className="bg-black/80 backdrop-blur-sm hover:bg-black/60 text-white" onClick={() => setIsOpen(true)}>
          <List size={16} className="mr-2" />
          Slides
        </Button>
      )}
    </div>
  )
}
