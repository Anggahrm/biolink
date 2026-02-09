import { prisma } from '@/lib/prisma'
import LinkManager from '@/components/admin/LinkManager'
import MusicManager from '@/components/admin/MusicManager'
import ProfileEditor from '@/components/admin/ProfileEditor'
import { Link2, Music, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [profile, links, music] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 'default' } }),
    prisma.link.findMany({ orderBy: { order: 'asc' } }),
    prisma.music.findMany({ orderBy: { order: 'asc' } }),
  ])

  const stats = [
    { label: 'Links', value: links.length, icon: Link2, color: 'bg-neo-primary' },
    { label: 'Tracks', value: music.length, icon: Music, color: 'bg-neo-secondary' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-neo-text">Dashboard</h1>
          <p className="text-neo-text/60 mt-1">Manage your biolink</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="neo-btn px-4 py-2 bg-neo-accent text-neo-border flex items-center gap-2 w-fit"
        >
          <ExternalLink className="w-4 h-4" />
          View Site
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`p-4 border-4 border-neo-border shadow-neo ${stat.color}`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-8 h-8 text-white" />
                <div>
                  <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
                  <p className="text-white/80 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Profile Section */}
      {profile && <ProfileEditor initialProfile={profile} />}

      {/* Links Section */}
      <LinkManager initialLinks={links} />

      {/* Music Section */}
      <MusicManager initialMusic={music} />
    </div>
  )
}
