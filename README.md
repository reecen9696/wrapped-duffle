# RampX Wrapped

A year-in-review experience for RampX users, showcasing their on-chain activity in an engaging, interactive presentation.

## Project Overview

This project is a Next.js application that presents users with a visually appealing "wrapped" experience, similar to Spotify Wrapped, but for crypto activities. It showcases various metrics like wallet creation date, transaction history, NFT activity, and more.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
rampx-wrapped/
├── app/                  # Next.js App Router
├── components/           # React components
│   ├── slides/           # Individual slide components
│   └── ui/               # Reusable UI components
├── config/               # Configuration files
│   └── slides.ts         # Slide configuration and ordering
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and API
└── public/               # Static assets
\`\`\`

## Slide Configuration

The presentation is composed of multiple slides that are configured in `config/slides.ts`. To modify the order of slides or enable/disable specific slides, edit this file.

Each slide has the following configuration:

\`\`\`typescript
{
  id: SlideType.SLIDE_NAME,
  component: SlideComponent,
  title: "Slide Title",
  description: "Description of the slide",
  dataKey: "dataKeyInContext", // Optional: key to access data from context
  enabled: true, // Whether the slide is enabled
}
\`\`\`

## Adding a New Slide

### Step 1: Create a new slide component

Create a new file in `components/slides/` using the template below:

\`\`\`tsx
// components/slides/my-new-slide.tsx
"use client"

import { motion } from "framer-motion"
import { SlideContainer } from "@/components/ui/slide-container"
import { AccentLabel } from "@/components/ui/accent-label"
import { StatDisplay } from "@/components/ui/stat-display"
import { BodyText } from "@/components/ui/body-text"

// Define your data interface
interface MyNewSlideData {
  value: number
  description: string
}

interface MyNewSlideProps {
  data: MyNewSlideData
}

export function MyNewSlide({ data }: MyNewSlideProps) {
  return (
    <SlideContainer>
      <motion.div
        className="flex flex-col items-center text-center max-w-4xl px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Title */}
        <AccentLabel>MY NEW SLIDE</AccentLabel>
        
        {/* Main value display */}
        <StatDisplay value={data.value} />
        
        {/* Description */}
        <BodyText>{data.description}</BodyText>
      </motion.div>
    </SlideContainer>
  )
}
\`\`\`

### Step 2: Update the slide type enum

Add your new slide type to the `SlideType` enum in `config/slides.ts`:

\`\`\`typescript
export enum SlideType {
  // ... existing slide types
  MY_NEW_SLIDE = "my_new_slide",
}
\`\`\`

### Step 3: Add your slide to the configuration

Add your slide to the `slidesConfig` array in `config/slides.ts`:

\`\`\`typescript
// Import your new slide
import { MyNewSlide } from "@/components/slides/my-new-slide"

// Add to the slidesConfig array
export const slidesConfig: SlideConfig[] = [
  // ... existing slides
  {
    id: SlideType.MY_NEW_SLIDE,
    component: MyNewSlide,
    title: "My New Slide",
    description: "Description of what this slide shows",
    dataKey: "myNewData", // This should match the key in the WrappedData interface
    enabled: true,
  },
]
\`\`\`

### Step 4: Add the data interface to the API

Update the `WrappedData` interface in `lib/api.ts` to include your new data:

\`\`\`typescript
export interface WrappedData {
  // ... existing data
  myNewData: {
    value: number
    description: string
  }
}

// And add mock data to the mockData object
const mockData: WrappedData = {
  // ... existing mock data
  myNewData: {
    value: 42,
    description: "Example metric",
  },
}
\`\`\`

### Step 5: Test your new slide

Run the development server and check your new slide. Make any necessary adjustments to the styling, animations, or data handling.

## Styling

The project uses Tailwind CSS for styling with a custom theme defined in `tailwind.config.ts`.

## Animation

Animations are implemented using Framer Motion. Common animation patterns are extracted into reusable components.

## Data

The application uses mock data from `lib/api.ts`. In a production environment, this would be replaced with real API calls.
