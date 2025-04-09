// Define all available backgrounds
export type BackgroundType = "solid" | "image" | "gradient" | "custom"

export interface BackgroundConfig {
  id: string
  type: BackgroundType
  color?: string
  imageUrl?: string
  overlayColor?: string
  overlayOpacity?: number
  className?: string
}

// Define background groups that can be referenced in slide config
export const backgroundGroups: Record<number, BackgroundConfig> = {
  // Dark background (#0A0D11) - Pages 1, 2, 5, 10, 13, 15
  1: {
    id: "dark-bg",
    type: "solid",
    color: "#0A0D11",
  },

  // Light orange background - Pages 3, 4, 11, 12
  2: {
    id: "light-orange-bg",
    type: "image",
    imageUrl: "/images/backgrounds/lightorange.png",
    overlayOpacity: 0.1,
  },

  // Blue background - Pages 6, 7, 8, 9, 14
  3: {
    id: "blue-bg",
    type: "image",
    imageUrl: "/images/backgrounds/blue.png",
    overlayOpacity: 0.1,
  },

  // Orange spots background (alternative for special slides)
  4: {
    id: "orange-spots-bg",
    type: "image",
    imageUrl: "/images/backgrounds/spotorange.png",
    overlayOpacity: 0.1,
  },
}

// Get background config by group ID
export function getBackgroundByGroup(groupId: number): BackgroundConfig {
  return backgroundGroups[groupId] || backgroundGroups[1] // Default to group 1 if not found
}

// Get background config by ID
export function getBackgroundById(id: string): BackgroundConfig | undefined {
  return Object.values(backgroundGroups).find((bg) => bg.id === id)
}
