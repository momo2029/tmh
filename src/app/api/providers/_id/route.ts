import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const provider = await db.aIProvider.findUnique({
      where: { id: params.id },
      include: {
        models: true,
        tags: {
          include: {
            tag: true
          }
        },
        pricingHistory: {
          orderBy: {
            date: 'desc'
          },
          take: 10
        },
        reviews: {
          where: {
            isApproved: true
          },
          orderBy: {
            date: 'desc'
          },
          take: 20
        },
        uptimeData: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 30
        }
      }
    })

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(provider)
  } catch (error) {
    console.error('Error fetching provider:', error)
    return NextResponse.json(
      { error: 'Failed to fetch provider' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data

    const provider = await db.aIProvider.update({
      where: { id: params.id },
      data: updateData,
      include: {
        models: true,
        tags: {
          include: {
            tag: true
          }
        }
      }
    })

    return NextResponse.json(provider)
  } catch (error) {
    console.error('Error updating provider:', error)
    return NextResponse.json(
      { error: 'Failed to update provider' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.aIProvider.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting provider:', error)
    return NextResponse.json(
      { error: 'Failed to delete provider' },
      { status: 500 }
    )
  }
}