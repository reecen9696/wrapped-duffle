"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { fetchWrappedData, type WrappedData } from "@/lib/api"

interface WrappedContextType {
  data: WrappedData | null
  isLoading: boolean
  error: Error | null
  refetch: (walletAddress?: string) => Promise<void>
}

const WrappedContext = createContext<WrappedContextType>({
  data: null,
  isLoading: true,
  error: null,
  refetch: async () => {},
})

interface WrappedProviderProps {
  children: ReactNode
  walletAddress?: string
}

export function WrappedProvider({ children, walletAddress }: WrappedProviderProps) {
  const [data, setData] = useState<WrappedData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async (address?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const wrappedData = await fetchWrappedData(address)
      setData(wrappedData)
    } catch (err) {
      console.error("Error fetching wrapped data:", err)
      setError(err instanceof Error ? err : new Error("Failed to fetch data"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(walletAddress)
  }, [walletAddress])

  const refetch = async (address?: string) => {
    await fetchData(address || walletAddress)
  }

  return <WrappedContext.Provider value={{ data, isLoading, error, refetch }}>{children}</WrappedContext.Provider>
}

export function useWrappedData() {
  return useContext(WrappedContext)
}
