import Link from 'next/link';
import { ExternalLink, Star, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { mockProviders } from '../../../lib/mockData';

export default function ProviderDetailPage({ params }: { params: { id: string } }) {
  const provider = mockProviders.find(p => p.id === params.id);

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Provider not found</h1>
          <Link href="/providers" className="text-blue-600 hover:text-blue-800">
            Back to providers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/providers" className="text-blue-600 hover:text-blue-800">
              ← Back to providers
            </Link>
            <div className="flex-1"></div>
            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Visit Website
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Provider Overview */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                  <p className="text-gray-600 mt-2">{provider.description}</p>
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  provider.availability >= 99 ? 'bg-green-100 text-green-800' :
                  provider.availability >= 95 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {provider.availability}% uptime
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {provider.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Models Available */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Models</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {provider.models.map((model) => (
                  <div key={model.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{model.name}</h3>
                      <span className="text-sm text-blue-600 font-medium">{model.multiplier}x</span>
                    </div>
                    <p className="text-sm text-gray-600 capitalize">{model.type}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Community Reviews</h2>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">Developer</span>
                  </div>
                  <p className="text-gray-700">Great service with reliable uptime and competitive pricing.</p>
                  <p className="text-sm text-gray-500 mt-2">2 days ago</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-current text-yellow-400" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="ml-2 text-sm text-gray-600">Startup Founder</span>
                  </div>
                  <p className="text-gray-700">Good API documentation and responsive support team.</p>
                  <p className="text-sm text-gray-500 mt-2">1 week ago</p>
                </div>
              </div>
              <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                Write a review
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing (per 1M tokens)</h2>
              <div className="space-y-3">
                {Object.entries(provider.pricing).map(([model, price]) => (
                  model !== 'reverse' && (
                    <div key={model} className="flex justify-between items-center">
                      <span className="capitalize text-gray-600">{model}:</span>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="font-semibold text-gray-900">${price}</span>
                      </div>
                    </div>
                  )
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
                  Compare with others
                </button>
                <button className="w-full mt-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors font-medium">
                  Add to comparison
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Last Updated:</dt>
                  <dd className="font-medium text-gray-900">Today</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Models Available:</dt>
                  <dd className="font-medium text-gray-900">{provider.models.length}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Average Rating:</dt>
                  <dd className="font-medium text-gray-900">4.2/5</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Response Time:</dt>
                  <dd className="font-medium text-gray-900">~200ms</dd>
                </div>
              </dl>
            </div>

            {/* Recent Updates */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Clock className="w-4 h-4 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">Added DeepSeek Chat support</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-4 h-4 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">Updated Claude pricing</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}