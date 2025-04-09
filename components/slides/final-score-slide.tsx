"use client"

import { SlideBase } from "@/components/ui/slide-base"
import { Button } from "@/components/ui/button"
import { Share, Award } from "lucide-react"
import { MetricRow } from "@/components/ui/metric-row"
import type { FinalScoreData } from "@/lib/api"
import { shareWrappedData } from "@/lib/api"
import { useState } from "react"
import { useWrappedData } from "@/context/wrapped-context"

interface FinalScoreSlideProps {
  data: FinalScoreData
  backgroundGroup?: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

export function FinalScoreSlide({ data, backgroundGroup = 1, animationVariant = "scale" }: FinalScoreSlideProps) {
  const [isSharing, setIsSharing] = useState(false)
  const { data: wrappedData } = useWrappedData()

  const handleShare = async () => {
    setIsSharing(true)
    try {
      const result = await shareWrappedData("demo-wallet-address")
      if (result.success && result.shareUrl) {
        alert(`Share your results: ${result.shareUrl}`)
      }
    } catch (error) {
      console.error("Error sharing results:", error)
      alert("Failed to share results. Please try again.")
    } finally {
      setIsSharing(false)
    }
  }

  const summaryData = wrappedData
    ? {
        walletAge: wrappedData.walletOrigin.createdDate,
        transactions: wrappedData.transactions.total.toLocaleString(),
        activeDays: wrappedData.activeDays.count.toLocaleString(),
        protocolsUsed: `${wrappedData.chainHopper.chains} chains & ${wrappedData.chainHopper.protocols} protocols`,
        favProtocol: wrappedData.favoriteProtocol.name,
        biggestApe: `${wrappedData.biggestApe.amount.toLocaleString()} ${wrappedData.biggestApe.token}`,
        nftsMinted: `${wrappedData.nftDegeneracy.count} NFTs`,
        socialPercentile: `Top ${wrappedData.socialScore.percentile}%`,
      }
    : {
        walletAge: "April 2022",
        transactions: "3,230",
        activeDays: "4,322",
        protocolsUsed: "5 chains & 43 protocols",
        favProtocol: "Jupiter",
        biggestApe: "$6,400 BONK",
        nftsMinted: "12 NFTs",
        socialPercentile: "Top 30%",
      }

  return (
    <SlideBase backgroundGroup={backgroundGroup} animationVariant={animationVariant}>
      <div className="w-full max-w-3xl border border-white/10 rounded-xl p-6 overflow-hidden">
        <div className="flex flex-col gap-4 mb-8">
          <MetricRow label="Owned wallet since" value={summaryData.walletAge} delay={0.4} />
          <MetricRow label="Total transactions" value={summaryData.transactions} delay={0.5} />
          <MetricRow label="Active days" value={summaryData.activeDays} delay={0.6} />
          <MetricRow label="Used" value={summaryData.protocolsUsed} delay={0.7} />
          <MetricRow label="Favorite protocol" value={summaryData.favProtocol} delay={0.8} />
          <MetricRow label="Biggest ape" value={summaryData.biggestApe} delay={0.9} />
          <MetricRow label="Minted" value={summaryData.nftsMinted} delay={1.0} />
          <MetricRow label="Social score" value={summaryData.socialPercentile} delay={1.1} />
        </div>

        <div className="w-full border-t border-white/10 my-6"></div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-6 h-6 text-accent" />
            <div className="text-accent text-xl font-bold">FINAL SCORE</div>
          </div>

          <div
            className="font-inter font-extrabold text-stat-large leading-tight tracking-tighter mb-6 bg-gradient-accent bg-clip-text text-transparent"
            style={{ textShadow: "0 0 20px rgba(255, 110, 25, 0.3)" }}
          >
            {data.score}
          </div>

          {data.rank && (
            <div className="text-white/85 text-lg mb-4">
              Rank: <span className="font-semibold text-accent">{data.rank}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Button
          onClick={handleShare}
          disabled={isSharing}
          className="bg-accent hover:bg-accent/90 text-white px-8 py-6 rounded-md text-lg font-bold flex items-center gap-2"
        >
          <Share className="w-5 h-5" />
          {isSharing ? "Sharing..." : "Share your profile"}
        </Button>
      </div>
    </SlideBase>
  )
}
