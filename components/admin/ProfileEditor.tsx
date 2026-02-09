'use client'

import { useState } from 'react'
import { Save, User } from 'lucide-react'
import Image from 'next/image'

interface Profile {
  id: string
  name: string
  bio?: string | null
  avatarUrl?: string | null
}

interface ProfileEditorProps {
  initialProfile: Profile
}

export default function ProfileEditor({ initialProfile }: ProfileEditorProps) {
  const [profile, setProfile] = useState(initialProfile)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    setSaved(false)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          bio: profile.bio,
          avatarUrl: profile.avatarUrl,
        }),
      })
      if (res.ok) {
        const updated = await res.json()
        setProfile(updated)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error('Failed to save profile:', error)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-bold text-neo-text">Profile Settings</h2>
      
      <div className="neo-card p-6 bg-neo-bg">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 border-4 border-neo-border bg-neo-primary overflow-hidden">
              {profile.avatarUrl ? (
                <Image src={profile.avatarUrl} alt={profile.name} width={128} height={128} className="w-full h-full object-cover" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
              )}
            </div>
            <p className="text-xs text-neo-text/50 text-center">Preview</p>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-bold text-neo-text mb-1">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="neo-input w-full px-3 py-2"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-neo-text mb-1">Bio</label>
              <textarea
                value={profile.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="neo-input w-full px-3 py-2 min-h-[100px] resize-none"
                placeholder="Tell something about yourself..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-neo-text mb-1">Avatar URL</label>
              <input
                type="text"
                value={profile.avatarUrl || ''}
                onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                className="neo-input w-full px-3 py-2"
                placeholder="https://example.com/avatar.jpg"
              />
              <p className="text-xs text-neo-text/50 mt-1">Paste a URL to your profile image</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                className="neo-btn px-6 py-2 bg-neo-secondary text-neo-border flex items-center gap-2"
                disabled={loading}
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              
              {saved && (
                <span className="text-neo-secondary font-bold animate-pulse">Saved!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
