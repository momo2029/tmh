import Link from 'next/link'
import { ExternalLink, Star, TrendingUp, Clock, CheckCircle } from 'lucide-react'

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

interface ProviderDetail {
  id: string
  name: string
  website: string
  description: string
  models: Model[]
  tags: Tag[]
  availability?: number
}

export default function ProviderDetailPage() {
  const provider: ProviderDetail = {
    id: 'gptgod',
    name: 'GPTGod',
    website: 'https://gptgod.cloud',
    description: 'Premium AI API provider with competitive pricing and reliable service.',
    models: [
      { id: 'gpt-4', name: 'GPT-4', type: 'openai', multiplier: 1.2 },
      { id: 'claude-3-opus', name: 'Claude 3 Opus', type: 'claude', multiplier: 0.6 }
    ],
    tags: [
      { tag: { name: 'fast' } },
      { tag: { name: 'reliable' } }
    ],
    availability: 98.5
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
              <p className="mt-2 text-gray-600 max-w-2xl">{provider.description}</p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {provider.availability}% uptime
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-900">4.2 (127 reviews)</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Updated 2 hours ago</span>
                </div>
              </div>
            </div>
            
            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Visit Website</span>
            </a>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {provider.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {tag.tag.name}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Models Section */}
            <section className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Models</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {provider.models.map((model) => (
                  <div key={model.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{model.name}</h3>
                      <span className="text-sm text-gray-500 capitalize">{model.type}</span>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      Multiplier: {model.multiplier}x
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
                <Link 
                  href={`/providers/${provider.id}/reviews`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View all reviews
                </Link>
              </div>
              
              <div className="text-center py-8">
                <p className="text-gray-500">Reviews coming soon...</p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Pricing</h3>
              
              <div className="space-y-3">
                {provider.models.map((model) => {
                  const modelPrice = (model.multiplier * 1.2).toFixed(2)
                  return (
                    <div key={model.id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{model.name}</span>
                      <span className="font-medium text-gray-900">${modelPrice}</span>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="text-xs text-gray-500">
                  Prices per 1M tokens
                </div>
              </div>
              
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Get API Key
              </button>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Status</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="text-sm font-medium text-gray-900">{provider.availability}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Response</span>
                  <span className="text-sm font-medium text-gray-900">~150ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}