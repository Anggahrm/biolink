import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: 'default' },
    })
    return NextResponse.json(profile)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await requireAuth()
    const data = await request.json()
    const profile = await prisma.profile.update({
      where: { id: 'default' },
      data: {
        name: data.name,
        bio: data.bio,
        avatarUrl: data.avatarUrl,
      },
    })
    return NextResponse.json(profile)
  } catch {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
