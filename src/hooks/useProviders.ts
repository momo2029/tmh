import { useState, useEffect } from 'react'

interface Provider {
  id: string
  name: string
  website: string
  description: string
  models: Array<{
    id: string
    name: string
    type: string
    multiplier: number
  }>
  tags: string[]
  availability?: number
  pricingHistory?: Array<{
    price: number
  }>
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

interface ProvidersResponse {
  providers: Provider[]
  pagination: Pagination
}

export function useProviders() {
  const [data, setData] = useState<ProvidersResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProviders = async (params?: URLSearchParams) => {
    try {
      setLoading(true)
      setError(null)

      let url = '/api/providers'
      if (params) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch providers')
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProviders()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchProviders
  }
}
