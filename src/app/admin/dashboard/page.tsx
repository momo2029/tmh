'use client'

import { useState } from 'react'
import { Users, MessageSquare, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

interface DashboardStats {
  totalProviders: number
  totalReviews: number
  averageRating: number
  activeAlerts: number
  pendingReviews: number
}

export default function AdminDashboard() {
  const [stats] = useState<DashboardStats>({
    totalProviders: 24,
    totalReviews: 156,
    averageRating: 4.2,
    activeAlerts: 3,
    pendingReviews: 8
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Monitor platform activity and manage content
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Providers</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalProviders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Reviews</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalReviews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Average Rating</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.averageRating}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Alerts</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeAlerts}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Review Pending Content</div>
                <div className="text-sm text-gray-500 mt-1">{stats.pendingReviews} items awaiting approval</div>
              </button>
              
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Add New Provider</div>
                <div className="text-sm text-gray-500 mt-1">Submit a new AI service provider</div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}