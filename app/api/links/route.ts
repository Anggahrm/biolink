import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(links)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth()
    const data = await request.json()
    const link = await prisma.link.create({
      data: {
        title: data.title,
        url: data.url,
        icon: data.icon || 'link',
        category: data.category || 'custom',
        color: data.color || '#FF6B6B',
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    })
    return NextResponse.json(link)
  } catch {
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 })
  }
}
