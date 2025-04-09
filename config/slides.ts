import type React from "react"

import { IntroSlide } from "@/components/slides/intro-slide"
import { RewindSlide } from "@/components/slides/rewind-slide"
import { WalletOriginSlide } from "@/components/slides/wallet-origin-slide"
import { FirstActionSlide } from "@/components/slides/first-action-slide"
import { BeenAroundSlide } from "@/components/slides/been-around-slide"
import { ChainHopperSlide } from "@/components/slides/chain-hopper-slide"
import { TotalSwappedSlide } from "@/components/slides/total-swapped-slide"
import { ActiveDaysSlide } from "@/components/slides/active-days-slide"
import { FavoriteProtocolSlide } from "@/components/slides/favorite-protocol-slide"
import { UnhingedPlaysSlide } from "@/components/slides/unhinged-plays-slide"
import { BiggestApeSlide } from "@/components/slides/biggest-ape-slide"
import { NftDegeneracySlide } from "@/components/slides/nft-degeneracy-slide"
import { WhatYouSaidSlide } from "@/components/slides/what-you-said-slide"
import { SocialScoreSlide } from "@/components/slides/social-score-slide"
import { FinalScoreSlide } from "@/components/slides/final-score-slide"

export enum SlideType {
  INTRO = "intro",
  WALLET_ORIGIN = "wallet_origin",
  FIRST_ACTION = "first_action",
  BEEN_AROUND = "been_around",
  CHAIN_HOPPER = "chain_hopper",
  TOTAL_TRANSACTIONS = "total_transactions",
  ACTIVE_DAYS = "active_days",
  FAVORITE_PROTOCOL = "favorite_protocol",
  UNHINGED_PLAYS = "unhinged_plays",
  BIGGEST_APE = "biggest_ape",
  NFT_DEGENERACY = "nft_degeneracy",
  WHAT_YOU_SAID = "what_you_said",
  SOCIAL_SCORE = "social_score",
  FINAL_SCORE = "final_score",
  REWIND = "rewind",
}

export interface SlideConfig {
  id: SlideType
  component: React.ComponentType<any>
  title: string
  description: string
  dataKey?: string
  enabled: boolean
  backgroundGroup: number
  animationVariant?: "fade" | "slideUp" | "scale" | "none"
}

// Background assignments based on user requirements:
// Page 1 & 2 - #0A0D11 (Group 1)
// Page 3 & 4 - light orange (Group 2)
// Page 5 - #0A0D11 (Group 1)
// Page 6, 7, 8, 9 - Blue (Group 3)
// Page 10 - #0A0D11 (Group 1)
// Page 11, 12 - light orange (Group 2)
// Page 13 - #0A0D11 (Group 1)
// Page 14 - Blue (Group 3)
// Page 15 - #0A0D11 (Group 1)

export const slidesConfig: SlideConfig[] = [
  // Page 1 - Dark
  {
    id: SlideType.INTRO,
    component: IntroSlide,
    title: "Intro",
    description: "Introduction slide with 'It. Is. Here.' text",
    enabled: true,
    backgroundGroup: 1,
    animationVariant: "fade",
  },
  // Page 2 - Dark
  {
    id: SlideType.REWIND,
    component: RewindSlide,
    title: "Rewind",
    description: "Let's rewind to where it all began...",
    enabled: true,
    backgroundGroup: 1,
    animationVariant: "slideUp",
  },
  // Page 3 - Light Orange
  {
    id: SlideType.WALLET_ORIGIN,
    component: WalletOriginSlide,
    title: "Wallet Origin",
    description: "When the wallet was created",
    dataKey: "walletOrigin",
    enabled: true,
    backgroundGroup: 2,
    animationVariant: "slideUp",
  },
  // Page 4 - Light Orange
  {
    id: SlideType.FIRST_ACTION,
    component: FirstActionSlide,
    title: "First Action",
    description: "First swap action",
    dataKey: "firstAction",
    enabled: true,
    backgroundGroup: 2,
    animationVariant: "slideUp",
  },
  // Page 5 - Dark
  {
    id: SlideType.BEEN_AROUND,
    component: BeenAroundSlide,
    title: "Been Around",
    description: "You've been around...",
    enabled: true,
    backgroundGroup: 1,
    animationVariant: "fade",
  },
  // Page 6 - Blue
  {
    id: SlideType.CHAIN_HOPPER,
    component: ChainHopperSlide,
    title: "Chain Hopper",
    description: "Chains interacted with",
    dataKey: "chainHopper",
    enabled: true,
    backgroundGroup: 3,
    animationVariant: "slideUp",
  },
  // Page 7 - Blue
  {
    id: SlideType.TOTAL_TRANSACTIONS,
    component: TotalSwappedSlide,
    title: "Total Transactions",
    description: "Total number of transactions",
    dataKey: "transactions",
    enabled: true,
    backgroundGroup: 3,
    animationVariant: "slideUp",
  },
  // Page 8 - Blue
  {
    id: SlideType.ACTIVE_DAYS,
    component: ActiveDaysSlide,
    title: "Active Days",
    description: "Number of active days",
    dataKey: "activeDays",
    enabled: true,
    backgroundGroup: 3,
    animationVariant: "slideUp",
  },
  // Page 9 - Blue
  {
    id: SlideType.FAVORITE_PROTOCOL,
    component: FavoriteProtocolSlide,
    title: "Favorite Protocol",
    description: "Most used protocol",
    dataKey: "favoriteProtocol",
    enabled: true,
    backgroundGroup: 3,
    animationVariant: "fade",
  },
  // Page 10 - Dark
  {
    id: SlideType.UNHINGED_PLAYS,
    component: UnhingedPlaysSlide,
    title: "Unhinged Plays",
    description: "Let's relive your most unhinged plays...",
    enabled: true,
    backgroundGroup: 1,
    animationVariant: "fade",
  },
  // Page 11 - Light Orange
  {
    id: SlideType.BIGGEST_APE,
    component: BiggestApeSlide,
    title: "Biggest Ape",
    description: "Biggest token ape",
    dataKey: "biggestApe",
    enabled: true,
    backgroundGroup: 2,
    animationVariant: "slideUp",
  },
  // Page 12 - Light Orange
  {
    id: SlideType.NFT_DEGENERACY,
    component: NftDegeneracySlide,
    title: "NFT Degeneracy",
    description: "NFTs minted",
    dataKey: "nftDegeneracy",
    enabled: true,
    backgroundGroup: 2,
    animationVariant: "slideUp",
  },
  // Page 13 - Dark
  {
    id: SlideType.WHAT_YOU_SAID,
    component: WhatYouSaidSlide,
    title: "What You Said",
    description: "It's not just what you did it's what you said...",
    enabled: true,
    backgroundGroup: 1,
    animationVariant: "fade",
  },
  // Page 14 - Blue
  {
    id: SlideType.SOCIAL_SCORE,
    component: SocialScoreSlide,
    title: "Social Score",
    description: "Social media presence",
    dataKey: "socialScore",
    enabled: true,
    backgroundGroup: 3,
    animationVariant: "slideUp",
  },
  // Page 15 - Dark
  {
    id: SlideType.FINAL_SCORE,
    component: FinalScoreSlide,
    title: "Final Score",
    description: "Final summary and score",
    dataKey: "finalScore",
    enabled: true,
    backgroundGroup: 1,
    animationVariant: "scale",
  },
]

export const getEnabledSlides = () => {
  return slidesConfig.filter((slide) => slide.enabled)
}

export const getSlideById = (id: SlideType) => {
  return slidesConfig.find((slide) => slide.id === id)
}

export const getBackgroundForSlide = (slideId: SlideType) => {
  const slide = getSlideById(slideId)
  return slide ? { group: slide.backgroundGroup } : { group: 1 }
}
