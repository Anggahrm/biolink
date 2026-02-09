import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const music = await prisma.music.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(music)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch music' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth()
    const data = await request.json()
    const music = await prisma.music.create({
      data: {
        title: data.title,
        artist: data.artist,
        url: data.url,
        coverUrl: data.coverUrl,
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    })
    return NextResponse.json(music)
  } catch {
    return NextResponse.json({ error: 'Failed to create music' }, { status: 500 })
  }
}
