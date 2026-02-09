import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

async function main() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }
  
  const pool = new pg.Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  await prisma.admin.upsert({
    where: { id: 'admin' },
    update: { password: adminPassword },
    create: { id: 'admin', password: adminPassword },
  })

  await prisma.profile.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      name: 'Your Name',
      bio: 'Creative Developer & Designer',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=biolink',
    },
  })

  const existingLinks = await prisma.link.count()
  if (existingLinks === 0) {
    await prisma.link.createMany({
      data: [
        { title: 'Instagram', url: 'https://instagram.com', icon: 'instagram', category: 'social', color: '#E1306C', order: 1 },
        { title: 'Twitter / X', url: 'https://x.com', icon: 'twitter', category: 'social', color: '#1DA1F2', order: 2 },
        { title: 'GitHub', url: 'https://github.com', icon: 'github', category: 'portfolio', color: '#333333', order: 3 },
        { title: 'Portfolio', url: 'https://yourwebsite.com', icon: 'globe', category: 'portfolio', color: '#4ECDC4', order: 4 },
        { title: 'Email Me', url: 'mailto:hello@example.com', icon: 'mail', category: 'contact', color: '#FFE66D', order: 5 },
      ],
    })
  }

  const existingMusic = await prisma.music.count()
  if (existingMusic === 0) {
    await prisma.music.createMany({
      data: [
        { title: 'Blinding Lights', artist: 'The Weeknd', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', order: 1 },
        { title: 'Levitating', artist: 'Dua Lipa', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', order: 2 },
      ],
    })
  }

  console.log('Seed completed!')
  
  await prisma.$disconnect()
  await pool.end()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
