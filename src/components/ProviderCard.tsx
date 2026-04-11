'use client'

import Link from 'next/link'
import { ExternalLink, TrendingUp, Heart, HeartOff } from 'lucide-react'
import { useState } from 'react'
import { useFavorites } from '../hooks/useFavorites'

interface Model {
  id: string
  name: string
  type: string
  multiplier: number
}

interface Provider {
  id: string
  name: string
  website: string
  description: string
  models: Model[]
  tags: string[]
  availability?: number
  pricingHistory?: Array<{
    price: number
  }>
}

interface ProviderCardProps {
  provider: Provider
  showFavoriteButton?: boolean
}

export default function ProviderCard({ 
  provider, 
  showFavoriteButton = true 
}: ProviderCardProps) {
  const [imageError, setImageError] = useState(false)
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite(provider.id)) {
        await removeFavorite(provider.id)
      } else {
        await addFavorite(provider.id)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  // Get latest pricing
  const getLatestPricing = () => {
    if (provider.pricingHistory?.length > 0) {
      return provider.pricingHistory[0].price
    }
    return null
  }

  const latestPrice = getLatestPricing()
  const currentAvailability = provider.availability || 95.0

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Provider Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{provider.name}</h3>
            <p className="text-gray-600 mt-1">{provider.description}</p>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            {showFavoriteButton && (
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite(provider.id)
                    ? 'text-red-500 bg-red-50 hover:bg-red-100'
                    : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
                }`}
                aria-label={
                  isFavorite(provider.id) ? 'Remove from favorites' : 'Add to favorites'
                }
              >
                {isFavorite(provider.id) ? (
                  <HeartOff className="w-5 h-5" />
                ) : (
                  <Heart className="w-5 h-5" />
                )}
              </button>
            )}
            
            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Visit provider website"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Availability Badge */}
        {currentAvailability && (
          <div className="flex items-center mb-4">
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              currentAvailability >= 99 ? 'bg-green-100 text-green-800' :
              currentAvailability >= 95 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {currentAvailability}% uptime
            </div>
          </div>
        )}

        {/* Models */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Available Models:</h4>
          <div className="flex flex-wrap gap-2">
            {provider.models.map((model) => (
              <span
                key={model.id}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {model.name} ({model.multiplier}x)
              </span>
            ))}
          </div>
        </div>

        {/* Pricing */}
        {latestPrice && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Current Price:</h4>
            <div className="text-2xl font-bold text-green-600">
              ${latestPrice.toFixed(2)}
            </div>
            <p className="text-sm text-gray-500">per 1M tokens</p>
          </div>
        )}

        {/* Tags */}
        {provider.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {provider.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <Link
            href={`/providers/${provider.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            View Details
          </Link>
          <Link
            href="/compare"
            className="flex-1 bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-200 transition-colors font-medium"
          >
            Compare
          </Link>
        </div>
      </div>
    </div>
  )
}
