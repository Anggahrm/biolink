'use client'

import { useState } from 'react'
import { Plus, Trash2, Music, Save, X } from 'lucide-react'
import Image from 'next/image'

interface Track {
  id: string
  title: string
  artist: string
  url: string
  coverUrl?: string | null
  order: number
  isActive: boolean
}

interface MusicManagerProps {
  initialMusic: Track[]
}

export default function MusicManager({ initialMusic }: MusicManagerProps) {
  const [music, setMusic] = useState<Track[]>(initialMusic)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    url: '',
    coverUrl: '',
  })
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setFormData({ title: '', artist: '', url: '', coverUrl: '' })
    setIsAdding(false)
  }

  const handleAdd = async () => {
    if (!formData.title || !formData.artist || !formData.url) return
    setLoading(true)
    try {
      const res = await fetch('/api/music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          coverUrl: formData.coverUrl || null,
          order: music.length 
        }),
      })
      if (res.ok) {
        const newTrack = await res.json()
        setMusic([...music, newTrack])
        resetForm()
      }
    } catch (error) {
      console.error('Failed to add music:', error)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this track?')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/music/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMusic(music.filter(m => m.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete music:', error)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-neo-text">Music Tracks</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="neo-btn px-4 py-2 bg-neo-primary text-white flex items-center gap-2"
          disabled={loading}
        >
          <Plus className="w-4 h-4" />
          Add Track
        </button>
      </div>

      {isAdding && (
        <div className="neo-card p-4 bg-neo-secondary/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-neo-text mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="neo-input w-full px-3 py-2"
                placeholder="Song Title"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-neo-text mb-1">Artist</label>
              <input
                type="text"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                className="neo-input w-full px-3 py-2"
                placeholder="Artist Name"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-neo-text mb-1">Audio URL</label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="neo-input w-full px-3 py-2"
                placeholder="https://example.com/audio.mp3"
              />
              <p className="text-xs text-neo-text/50 mt-1">Direct link to MP3 file</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-neo-text mb-1">Cover Image URL (optional)</label>
              <input
                type="text"
                value={formData.coverUrl}
                onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                className="neo-input w-full px-3 py-2"
                placeholder="https://example.com/cover.jpg"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              className="neo-btn px-4 py-2 bg-neo-secondary text-neo-border flex items-center gap-2"
              disabled={loading}
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={resetForm}
              className="neo-btn px-4 py-2 bg-neo-bg text-neo-text flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {music.map((track) => (
          <div
            key={track.id}
            className="neo-card p-4 bg-neo-bg flex items-center gap-4"
          >
            <div className="w-12 h-12 flex items-center justify-center border-2 border-neo-border bg-neo-primary overflow-hidden">
              {track.coverUrl ? (
                <Image src={track.coverUrl} alt={track.title} width={48} height={48} className="w-full h-full object-cover" unoptimized />
              ) : (
                <Music className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-neo-text truncate">{track.title}</p>
              <p className="text-sm text-neo-text/60 truncate">{track.artist}</p>
            </div>
            <button
              onClick={() => handleDelete(track.id)}
              className="neo-btn p-2 bg-red-400"
              disabled={loading}
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
        
        {music.length === 0 && (
          <div className="neo-card p-8 bg-neo-bg text-center">
            <p className="text-neo-text/60">No music tracks yet. Add your first track!</p>
          </div>
        )}
      </div>
    </div>
  )
}
