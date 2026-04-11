import { NextResponse } from 'next/server'

const mockFavorites = new Set(['gptgod'])

export async function GET(request: Request) {
  try {
    const favoriteProviders = [
      {
        id: 'gptgod',
        name: 'GPTGod',
        website: 'https://gptgod.cloud',
        description: 'Premium AI API provider with competitive pricing and reliable service',
        models: [
          { id: 'gpt-4', name: 'GPT-4', type: 'openai', multiplier: 1.2 },
          { id: 'claude-3-opus', name: 'Claude 3 Opus', type: 'claude', multiplier: 0.6 }
        ],
        tags: ['fast', 'reliable'],
        availability: 98.5,
        pricingHistory: [{ price: 1.2 }]
      }
    ]

    return NextResponse.json(favoriteProviders)
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    if (!data.providerId) {
      return NextResponse.json(
        { error: 'Provider ID is required' },
        { status: 400 }
      )
    }

    mockFavorites.add(data.providerId)
    console.log('Added to favorites:', data.providerId)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error adding favorite:', error)
    return NextResponse.json(
      { error: 'Failed to add favorite' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const providerId = searchParams.get('providerId')
    
    if (!providerId) {
      return NextResponse.json(
        { error: 'Provider ID is required' },
        { status: 400 }
      )
    }

    mockFavorites.delete(providerId)
    console.log('Removed from favorites:', providerId)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing favorite:', error)
    return NextResponse.json(
      { error: 'Failed to remove favorite' },
      { status: 500 }
    )
  }
}
