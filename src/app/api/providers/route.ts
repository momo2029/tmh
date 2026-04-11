import { NextResponse } from 'next/server'

const mockProviders = [
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
    pricingHistory: [{ price: 1.2 }],
    reviews: []
  }
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    
    let filteredProviders = [...mockProviders]
    
    if (search) {
      filteredProviders = filteredProviders.filter(provider =>
        provider.name.toLowerCase().includes(search.toLowerCase()) ||
        provider.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    return NextResponse.json({
      providers: filteredProviders,
      pagination: {
        page: 1,
        limit: filteredProviders.length,
        total: filteredProviders.length,
        pages: 1
      }
    })
  } catch (error) {
    console.error('Error fetching providers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('New provider submitted:', data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error creating provider:', error)
    return NextResponse.json(
      { error: 'Failed to create provider' },
      { status: 500 }
    )
  }
}
