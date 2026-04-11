'use client'

import { useState } from 'react'
import { ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'
import ProviderCard from '../../components/ProviderCard'

interface Model {
  id: string
  name: string
  type: string
  multiplier: number
}

interface Tag {
  tag: {
    name: string
  }
}

interface Provider {
  id: string
  name: string
  website: string
  description: string
  models: Model[]
  tags: Tag[]
  availability?: number
  pricingHistory?: Array<{
    price: number
  }>
}

export default function ComparePage() {
  const [selectedProviders, setSelectedProviders] = useState<Provider[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showProviderSelector, setShowProviderSelector] = useState(false)

  // Mock data for provider selection - in real app this would come from API
  const availableProviders: Provider[] = [
    {
      id: 'gptgod',
      name: 'GPTGod',
      website: 'https://gptgod.cloud',
      description: 'Premium AI API provider with competitive pricing and reliable service',
      models: [
        { id: 'gpt-4', name: 'GPT-4', type: 'openai', multiplier: 1.2 },
        { id: 'claude-3-opus', name: 'Claude 3 Opus', type: 'claude', multiplier: 0.6 }
      ],
      tags: [],
      availability: 98.5,
      pricingHistory: [{ price: 1.2 }]
    },
    {
      id: 'zhtec',
      name: 'ZHTEC',
      website: 'https://api1.zhtec.xyz',
      description: 'Cost-effective AI solutions for developers and businesses',
      models: [
        { id: 'gpt-4', name: 'GPT-4', type: 'openai', multiplier: 1.0 },
        { id: 'claude-3-opus', name: 'Claude 3 Opus', type: 'claude', multiplier: 8.0 }
      ],
      tags: [],
      availability: 96.2,
      pricingHistory: [{ price: 1.0 }]
    }
  ]

  const filteredProviders = availableProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addToCompare = (provider: Provider) => {
    if (!selectedProviders.find(p => p.id === provider.id)) {
      setSelectedProviders([...selectedProviders, provider])
    }
    setShowProviderSelector(false)
    setSearchTerm('')
  }

  const removeFromCompare = (providerId: string) => {
    setSelectedProviders(selectedProviders.filter(p => p.id !== providerId))
  }

  const getLatestPricing = (provider: Provider) => {
    if (provider.pricingHistory?.length > 0) {
      return provider.pricingHistory[0].price
    }
    return null
  }

  const getAllModels = () => {
    const allModels = new Set<string>()
    selectedProviders.forEach(provider => {
      provider.models.forEach(model => {
        allModels.add(model.name)
      })
    })
    return Array.from(allModels).sort()
  }

  const getModelPrice = (provider: Provider, modelName: string) => {
    const model = provider.models.find(m => m.name === modelName)
    if (model && provider.pricingHistory?.length > 0) {
      return (model.multiplier * provider.pricingHistory[0].price).toFixed(2)
    }
    return 'N/A'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/providers"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Providers
            </Link>
            
            <h1 className="text-xl font-semibold text-gray-900">Compare Providers</h1>
            
            <button
              onClick={() => setShowProviderSelector(true)}
              disabled={selectedProviders.length >= 3}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Provider</span>
            </button>
          </div>
          
          <p className="mt-2 text-gray-600">
            Select up to 3 providers to compare their features, pricing, and performance.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selected Providers */}
        {selectedProviders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Comparing {selectedProviders.length} Provider{selectedProviders.length > 1 ? 's' : ''}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {selectedProviders.map((provider) => (
                <div key={provider.id} className="relative">
                  <ProviderCard provider={provider} showFavoriteButton={false} />
                  
                  <button
                    onClick={() => removeFromCompare(provider.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    aria-label={`Remove ${provider.name} from comparison`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feature
                      </th>
                      {selectedProviders.map((provider) => (
                        <th key={provider.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {provider.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Website
                      </td>
                      {selectedProviders.map((provider) => (
                        <td key={provider.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a 
                            href={provider.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Visit
                          </a>
                        </td>
                      ))}
                    </tr>
                    
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Availability
                      </td>
                      {selectedProviders.map((provider) => (
                        <td key={provider.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {provider.availability}% uptime
                        </td>
                      ))}
                    </tr>

                    {getAllModels().map((modelName) => (
                      <tr key={modelName}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {modelName} Price
                        </td>
                        {selectedProviders.map((provider) => (
                          <td key={provider.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${getModelPrice(provider, modelName)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Provider Selector Modal */}
        {showProviderSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Add Provider to Compare</h3>
                  <button
                    onClick={() => setShowProviderSelector(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <input
                  type="text"
                  placeholder="Search providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="p-6 overflow-y-auto max-h-96">
                <div className="space-y-4">
                  {filteredProviders.map((provider) => (
                    <div 
                      key={provider.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => addToCompare(provider)}
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">{provider.name}</h4>
                        <p className="text-sm text-gray-500">{provider.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {provider.models.slice(0, 3).map((model) => (
                            <span key={model.id} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {model.name}
                            </span>
                          ))}
                          {provider.models.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{provider.models.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button className="ml-4 text-blue-600 hover:text-blue-800 font-medium">
                        Add
                      </button>
                    </div>
                  ))}
                  
                  {filteredProviders.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                      No providers found matching your search.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}