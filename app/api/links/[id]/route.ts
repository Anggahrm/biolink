import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()
    const { id } = await params
    const data = await request.json()
    const link = await prisma.link.update({
      where: { id },
      data: {
        title: data.title,
        url: data.url,
        icon: data.icon,
        category: data.category,
        color: data.color,
        order: data.order,
        isActive: data.isActive,
      },
    })
    return NextResponse.json(link)
  } catch {
    return NextResponse.json({ error: 'Failed to update link' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()
    const { id } = await params
    await prisma.link.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 })
  }
}
