import { prisma } from '@/lib/prisma'
import ProfileCard from '@/components/ProfileCard'
import LinkButton from '@/components/LinkButton'
import MusicPlayer from '@/components/MusicPlayer'
import ThemeToggle from '@/components/ThemeToggle'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [profile, links, music] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 'default' } }),
    prisma.link.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    prisma.music.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
  ])

  return (
    <main className="min-h-screen bg-neo-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-neo-primary/20 rotate-12 border-4 border-neo-border/10" />
        <div className="absolute top-1/4 right-10 w-24 h-24 bg-neo-secondary/20 -rotate-6 border-4 border-neo-border/10" />
        <div className="absolute bottom-1/4 left-20 w-20 h-20 bg-neo-accent/30 rotate-45 border-4 border-neo-border/10" />
        <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-neo-primary/20 -rotate-12 border-4 border-neo-border/10" />
      </div>
      
      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-md mx-auto px-6 py-16 pb-40">
        {profile && (
          <ProfileCard
            name={profile.name}
            bio={profile.bio}
            avatarUrl={profile.avatarUrl}
          />
        )}
        
        <div className="mt-10 space-y-4">
          {links.map((link, index) => (
            <LinkButton
              key={link.id}
              title={link.title}
              url={link.url}
              icon={link.icon}
              color={link.color}
              index={index}
            />
          ))}
        </div>
        
        <Footer />
      </div>
      
      {/* Music player */}
      <MusicPlayer tracks={music} />
    </main>
  )
}
