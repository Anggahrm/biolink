'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, Save, X, GripVertical } from 'lucide-react'

interface Link {
  id: string
  title: string
  url: string
  icon: string
  category: string
  color: string
  order: number
  isActive: boolean
}

interface LinkManagerProps {
  initialLinks: Link[]
}

const iconOptions = [
  'instagram', 'twitter', 'github', 'linkedin', 'mail', 'globe', 
  'youtube', 'tiktok', 'spotify', 'dribbble', 'figma', 'link',
  'phone', 'map', 'shop', 'book', 'code', 'camera', 'heart', 
  'star', 'zap', 'send', 'message', 'file', 'download', 'external'
]

const categoryOptions = ['social', 'portfolio', 'contact', 'custom']

const colorPresets = [
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#1DA1F2', '#E1306C',
  '#333333', '#6B5B95', '#88D8B0', '#FF6F61', '#5B5EA6'
]

export default function LinkManager({ initialLinks }: LinkManagerProps) {
  const [links, setLinks] = useState<Link[]>(initialLinks)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    icon: 'link',
    category: 'custom',
    color: '#FF6B6B',
  })
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setFormData({ title: '', url: '', icon: 'link', category: 'custom', color: '#FF6B6B' })
    setEditingId(null)
    setIsAdding(false)
  }

  const handleAdd = async () => {
    if (!formData.title || !formData.url) return
    setLoading(true)
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, order: links.length }),
      })
      if (res.ok) {
        const newLink = await res.json()
        setLinks([...links, newLink])
        resetForm()
      }
    } catch (error) {
      console.error('Failed to add link:', error)
    }
    setLoading(false)
  }

  const handleUpdate = async (id: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/links/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        const updatedLink = await res.json()
        setLinks(links.map(l => l.id === id ? updatedLink : l))
        resetForm()
      }
    } catch (error) {
      console.error('Failed to update link:', error)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this link?')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/links/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setLinks(links.filter(l => l.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete link:', error)
    }
    setLoading(false)
  }

  const startEdit = (link: Link) => {
    setEditingId(link.id)
    setFormData({
      title: link.title,
      url: link.url,
      icon: link.icon,
      category: link.category,
      color: link.color,
    })
    setIsAdding(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-neo-text">Links</h2>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null); resetForm(); }}
          className="neo-btn px-4 py-2 bg-neo-primary text-white flex items-center gap-2"
          disabled={loading}
        >
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="neo-card p-4 bg-neo-accent/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-neo-text mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="neo-input w-full px-3 py-2"
                placeholder="Instagram"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-neo-text mb-1">URL</label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="neo-input w-full px-3 py-2"
                placeholder="https://instagram.com/username"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-neo-text mb-1">Icon</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="neo-input w-full px-3 py-2"
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-neo-text mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="neo-input w-full px-3 py-2"
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-neo-text mb-1">Color</label>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map(color => (
                  <button
                    key={color}
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-8 h-8 border-4 ${formData.color === color ? 'border-neo-text' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-8 h-8 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => editingId ? handleUpdate(editingId) : handleAdd()}
              className="neo-btn px-4 py-2 bg-neo-secondary text-neo-border flex items-center gap-2"
              disabled={loading}
            >
              <Save className="w-4 h-4" />
              {editingId ? 'Update' : 'Save'}
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
        {links.map((link) => (
          <div
            key={link.id}
            className="neo-card p-4 bg-neo-bg flex items-center gap-4"
          >
            <GripVertical className="w-5 h-5 text-neo-text/30 cursor-grab" />
            <div
              className="w-10 h-10 flex items-center justify-center border-2 border-neo-border"
              style={{ backgroundColor: link.color }}
            >
              <span className="text-white text-xs font-bold">{link.icon.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-neo-text truncate">{link.title}</p>
              <p className="text-sm text-neo-text/60 truncate">{link.url}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(link)}
                className="neo-btn p-2 bg-neo-accent"
                disabled={loading}
              >
                <Edit2 className="w-4 h-4 text-neo-border" />
              </button>
              <button
                onClick={() => handleDelete(link.id)}
                className="neo-btn p-2 bg-red-400"
                disabled={loading}
              >
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ))}
        
        {links.length === 0 && (
          <div className="neo-card p-8 bg-neo-bg text-center">
            <p className="text-neo-text/60">No links yet. Add your first link!</p>
          </div>
        )}
      </div>
    </div>
  )
}
