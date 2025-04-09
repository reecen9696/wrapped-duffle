"use client"

import { useEffect, useRef } from "react"
import Matter from "matter-js"

export function CoinAnimation() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<Matter.Engine>()

  useEffect(() => {
    if (!sceneRef.current) return

    // Performance optimization: Create engine with optimized settings
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1, scale: 0.0004 },
      positionIterations: 4, // Reduced from default 6
      velocityIterations: 3, // Reduced from default 4
      constraintIterations: 1, // Minimum value
      enableSleeping: true, // Allow objects to "sleep" when not moving
    })
    engineRef.current = engine

    // Performance optimization: Optimized renderer settings
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent", // Changed to transparent
        pixelRatio: 1, // Force 1:1 pixel ratio regardless of device
        showSleeping: false, // Don't render special indicators for sleeping objects
        showDebug: false,
        showBroadphase: false,
        showBounds: false,
        showVelocity: false,
        showCollisions: false,
        showAxes: false,
        showPositions: false,
        showAngleIndicator: false,
        showIds: false,
        showShadows: false,
      },
    })

    // Performance optimization: Create boundaries more efficiently
    const wallOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" }, // Changed to transparent
      collisionFilter: { group: 1 }, // Use collision groups
    }

    // Create ground and walls
    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 25,
      window.innerWidth,
      50,
      wallOptions,
    )

    const leftWall = Matter.Bodies.rectangle(-25, window.innerHeight / 2, 50, window.innerHeight, wallOptions)

    const rightWall = Matter.Bodies.rectangle(
      window.innerWidth + 25,
      window.innerHeight / 2,
      50,
      window.innerHeight,
      wallOptions,
    )

    // Add all boundaries at once
    Matter.Composite.add(engine.world, [ground, leftWall, rightWall])

    // Fixed coin size
    const coinRadius = 30

    // Performance optimization: Pre-calculate values
    const totalCoins = 30
    const coinsPerRow = 3
    const horizontalSpacing = coinRadius * 2.2
    const verticalSpacing = coinRadius * 2.2
    const startX = window.innerWidth - coinRadius * 2
    const startY = -window.innerHeight * 0.5 // Start balls above the viewport

    // Performance optimization: Create all coins at once
    const coins = []
    const coinOptions = {
      restitution: 0.5,
      friction: 0.05,
      frictionAir: 0.002,
      density: 0.001,
      render: {
        fillStyle: "#FF6E19", // Changed to match the accent color
        lineWidth: 0,
      },
      collisionFilter: { group: 0 }, // Use collision groups
    }

    for (let i = 0; i < totalCoins; i++) {
      const row = Math.floor(i / coinsPerRow)
      const col = i % coinsPerRow

      // Add randomness to position
      const randomOffsetX = (Math.random() - 0.5) * 30
      const randomOffsetY = (Math.random() - 0.5) * 30

      // Position coins
      const x = startX - col * horizontalSpacing + randomOffsetX
      const y = startY + row * verticalSpacing + randomOffsetY

      const coin = Matter.Bodies.circle(x, y, coinRadius, coinOptions)

      // Add initial velocity and spin
      Matter.Body.setVelocity(coin, {
        x: (Math.random() - 0.5) * 0.4,
        y: Math.random() * 0.2 + 0.1, // Slightly faster initial downward velocity
      })

      Matter.Body.setAngularVelocity(coin, (Math.random() - 0.5) * 0.15)

      coins.push(coin)
    }

    // Add all coins at once (more efficient)
    Matter.Composite.add(engine.world, coins)

    // Performance optimization: Optimized runner
    const runner = Matter.Runner.create({
      isFixed: true,
      delta: 1000 / 40, // 40 FPS is sufficient
    })

    Matter.Runner.run(runner, engine)
    Matter.Render.run(render)

    // Performance optimization: Debounced resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        render.options.width = window.innerWidth
        render.options.height = window.innerHeight
        render.canvas.width = window.innerWidth
        render.canvas.height = window.innerHeight

        Matter.Body.setPosition(ground, {
          x: window.innerWidth / 2,
          y: window.innerHeight + 25,
        })
        Matter.Body.setPosition(rightWall, {
          x: window.innerWidth + 25,
          y: window.innerHeight / 2,
        })
      }, 100)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
      Matter.Render.stop(render)
      Matter.Runner.stop(runner)
      Matter.World.clear(engine.world, false)
      Matter.Engine.clear(engine)
      if (render.canvas) render.canvas.remove()
    }
  }, [])

  return <div ref={sceneRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}
