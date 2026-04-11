'use client'

import { useState } from 'react'
import { Star, ThumbsUp, MessageCircle, Clock, CheckCircle } from 'lucide-react'
import { useParams } from 'next/navigation'

interface Review {
  id: string
  rating: number
  comment: string
  author: string
  date: string
  isVerified: boolean
  likes: number
  providerName: string
}

export default function ProviderReviewsPage() {
  const params = useParams()
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    author: ''
  })
  const [submitting, setSubmitting] = useState(false)

  // Mock reviews data - in real app this would come from API
  const reviews: Review[] = [
    {
      id: '1',
      rating: 5,
      comment: 'Excellent service with fast response times and competitive pricing. Highly recommend for production use.',
      author: 'TechLead_2024',
      date: '2024-03-15',
      isVerified: true,
      likes: 23,
      providerName: 'GPTGod'
    },
    {
      id: '2',
      rating: 4,
      comment: 'Good quality responses, but sometimes takes longer than expected. Overall satisfied.',
      author: 'DevUser',
      date: '2024-03-10',
      isVerified: false,
      likes: 8,
      providerName: 'GPTGod'
    }
  ]

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReview.rating || !newReview.comment) return

    setSubmitting(true)
    
    try {
      console.log('Submitting review:', newReview)
      setNewReview({ rating: 0, comment: '', author: '' })
    } catch (error) {
      console.error('Error submitting review:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive ? () => setNewReview({ ...newReview, rating: star }) : undefined}
          />
        ))}
      </div>
    )
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Reviews Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h1>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center md:justify-start mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-gray-600">
                Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter(r => r.rating === star).length
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                
                return (
                  <div key={star} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 w-8">{star}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Review Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Write a Review</h2>
        
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex space-x-1">
              {renderStars(newReview.rating, true)}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={newReview.author}
              onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
              placeholder="Anonymous"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review *
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={4}
              placeholder="Share your experience with this provider..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Your review will be published after moderation</span>
          </div>
          
          <button
            type="submit"
            disabled={!newReview.rating || !newReview.comment || submitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{review.author}</h4>
                    {review.isVerified && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              
              <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{review.likes}</span>
              </button>
            </div>
            
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
        
        {reviews.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No reviews yet.</p>
            <p className="text-gray-400">Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  )
}