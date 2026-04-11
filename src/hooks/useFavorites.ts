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

export function useFavorites() {
  const [favorites, setFavorites] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFavorites = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/favorites')
      if (!response.ok) {
        throw new Error('Failed to fetch favorites')
      }

      const data = await response.json()
      setFavorites(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addFavorite = async (providerId: string) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ providerId })
      })

      if (!response.ok) {
        throw new Error('Failed to add favorite')
      }

      await fetchFavorites()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const removeFavorite = async (providerId: string) => {
    try {
      const response = await fetch(`/api/favorites?providerId=${providerId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to remove favorite')
      }

      await fetchFavorites()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const isFavorite = (providerId: string) => {
    return favorites.some(fav => fav.id === providerId)
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
    refetch: fetchFavorites
  }
}
