import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()
    const { id } = await params
    await prisma.music.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete music' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()
    const { id } = await params
    const data = await request.json()
    const music = await prisma.music.update({
      where: { id },
      data: {
        title: data.title,
        artist: data.artist,
        url: data.url,
        coverUrl: data.coverUrl,
        order: data.order,
        isActive: data.isActive,
      },
    })
    return NextResponse.json(music)
  } catch {
    return NextResponse.json({ error: 'Failed to update music' }, { status: 500 })
  }
}
