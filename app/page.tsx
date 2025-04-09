"use client"

import { useScrollSnap } from "@/hooks/use-scroll-snap"
import { WrappedProvider, useWrappedData } from "@/context/wrapped-context"
import Image from "next/image"
import { LoadingScreen } from "@/components/loading-screen"
import { getEnabledSlides } from "@/config/slides"

function WrappedExperience() {
  const { containerRef } = useScrollSnap()
  const { data, isLoading, error } = useWrappedData()
  const enabledSlides = getEnabledSlides()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (error || !data) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
        <div className="text-white text-xl">Something went wrong. Please try again later.</div>
      </div>
    )
  }

  return (
    <main ref={containerRef} className="h-screen w-full overflow-y-scroll snap-y snap-mandatory relative">
      {/* Content slides - dynamically rendered from config */}
      <div className="relative z-10">
        {enabledSlides.map((slideConfig) => {
          const SlideComponent = slideConfig.component
          // Pass the appropriate data prop if dataKey is specified
          const slideProps = slideConfig.dataKey ? { data: data[slideConfig.dataKey] } : {}

          return (
            <SlideComponent
              key={slideConfig.id}
              {...slideProps}
              backgroundGroup={slideConfig.backgroundGroup}
              animationVariant={slideConfig.animationVariant}
            />
          )
        })}
      </div>

      {/* Static overlay with 20% opacity - applied globally */}
      <div className="fixed inset-0 w-full h-full z-20 pointer-events-none opacity-20">
        <Image src="/images/static.svg" alt="Static Overlay" fill className="object-cover" />
      </div>

      {/* Fixed logo that appears above everything */}
      <div className="fixed top-8 left-8 z-50">
        <Image src="/images/logo.svg" alt="RampX Logo" width={48} height={48} className="object-contain" />
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <WrappedProvider>
      <WrappedExperience />
    </WrappedProvider>
  )
}
