export interface WalletOriginData {
  createdDate: string
  percentile: number
}

export interface FirstActionData {
  action: string
  date: string
  percentile: number
}

export interface ChainData {
  name: string
  count: number
}

export interface ChainHopperData {
  chains: number
  protocols: number
  chainData: ChainData[]
}

export interface TransactionData {
  total: number
}

export interface ActiveDaysData {
  count: number
  activityMap?: boolean[]
}

export interface ProtocolData {
  name: string
  count: number
}

export interface TokenApeData {
  amount: number
  token: string
}

export interface NftData {
  count: number
  images: string[]
}

export interface SocialScoreData {
  percentile: number
  platforms: string[]
}

export interface FinalScoreData {
  score: number
  rank?: string
}

export interface WrappedData {
  walletOrigin: WalletOriginData
  firstAction: FirstActionData
  chainHopper: ChainHopperData
  transactions: TransactionData
  activeDays: ActiveDaysData
  favoriteProtocol: ProtocolData
  biggestApe: TokenApeData
  nftDegeneracy: NftData
  socialScore: SocialScoreData
  finalScore: FinalScoreData
}

const mockWrappedData: WrappedData = {
  walletOrigin: {
    createdDate: "April 2022",
    percentile: 85,
  },
  firstAction: {
    action: "swap",
    date: "June 2023",
    percentile: 77,
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
  transactions: {
    total: 3230,
  },
  activeDays: {
    count: 4322,
    activityMap: Array(365)
      .fill(false)
      .map(() => Math.random() > 0.3),
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
    images: [
      "/images/nft1.jpeg",
      "/images/nft2.png",
      "/images/nft3.jpeg",
      "/images/nft4.png",
      "/images/nft1.jpeg",
      "/images/nft2.png",
      "/images/nft3.jpeg",
      "/images/nft4.png",
      "/images/nft1.jpeg",
      "/images/nft2.png",
      "/images/nft3.jpeg",
      "/images/nft4.png",
    ],
  },
  socialScore: {
    percentile: 30,
    platforms: ["X", "Ethos", "Kaito"],
  },
  finalScore: {
    score: 1300,
    rank: "Crypto Degen",
  },
}

export async function fetchWrappedData(walletAddress?: string): Promise<WrappedData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWrappedData)
    }, 1500)
  })
}

export async function shareWrappedData(walletAddress: string): Promise<{ success: boolean; shareUrl?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        shareUrl: `https://rampx.com/wrapped/${walletAddress}`,
      })
    }, 800)
  })
}
