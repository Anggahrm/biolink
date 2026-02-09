'use client'

import Link from 'next/link'
import { LogOut, ExternalLink } from 'lucide-react'

export default function AdminNav() {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/login'
  }

  return (
    <nav className="neo-card bg-neo-bg p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="font-display font-bold text-xl text-neo-text hover:text-neo-primary transition-colors"
          >
            Biolink
          </Link>
          <span className="text-neo-text/50 text-sm">/ Admin</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="neo-btn px-4 py-2 flex items-center gap-2 text-sm bg-neo-accent text-neo-border"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">View Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="neo-btn px-4 py-2 flex items-center gap-2 text-sm bg-neo-bg text-neo-text hover:bg-red-400 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
