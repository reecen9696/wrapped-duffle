"use client"

import { useState } from "react"

// Mock data for the RampX Wrapped experience
export function useMockData() {
  const [data, setData] = useState({
    walletOrigin: {
      createdDate: "April 2022",
      percentile: 85,
    },
    firstAction: {
      action: "swap",
      date: "June 2023",
      percentile: 77,
    },
    favoriteProtocol: {
      name: "Jupiter",
      count: 43,
    },
    biggestApe: {
      amount: 6400,
      token: "BONK",
    },
    nftDegeneracy: {
      count: 12,
    },
    chainHopper: {
      chains: 5,
      protocols: 12,
      chainData: [
        { name: "Solana", count: 156 },
        { name: "Ethereum", count: 78 },
        { name: "Arbitrum", count: 42 },
        { name: "Base", count: 23 },
        { name: "Polygon", count: 15 },
      ],
    },
    powerMove: {
      amount: 4239,
      percentile: 68,
    },
    socialScore: {
      percentile: 30,
      platforms: ["X", "Ethos", "Kaito"],
    },
    finalScore: {
      score: 1300,
    },
  })

  return data
}
