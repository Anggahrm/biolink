'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'
import Image from 'next/image'

interface Track {
  id: string
  title: string
  artist: string
  url: string
  coverUrl?: string | null
}

interface MusicPlayerProps {
  tracks: Track[]
}

export default function MusicPlayer({ tracks }: MusicPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const track = tracks[currentTrack]

  const nextTrack = useCallback(() => {
    const newIndex = currentTrack === tracks.length - 1 ? 0 : currentTrack + 1
    setCurrentTrack(newIndex)
    setIsPlaying(false)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }, 100)
  }, [currentTrack, tracks.length])

  useEffect(() => {
    if (tracks.length > 0) {
      setShowPlayer(true)
    }
  }, [tracks])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setProgress(audio.currentTime)
      setDuration(audio.duration || 0)
    }

    const handleEnded = () => {
      nextTrack()
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateProgress)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateProgress)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack, nextTrack])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const prevTrack = () => {
    const newIndex = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1
    setCurrentTrack(newIndex)
    setIsPlaying(false)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }, 100)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setProgress(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!showPlayer || !track) return null

  // Minimized view - just a small floating button with track info
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <audio ref={audioRef} src={track.url} preload="metadata" />
        <div className="neo-card p-2 bg-neo-secondary flex items-center gap-2">
          <div className="w-10 h-10 bg-neo-border flex items-center justify-center flex-shrink-0 overflow-hidden">
            {track.coverUrl ? (
              <Image
                src={track.coverUrl}
                alt={track.title}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-neo-primary flex items-center justify-center">
                <span className="text-white text-xs font-bold">♪</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 max-w-24">
            <p className="text-neo-border font-display font-bold truncate text-xs">
              {track.title}
            </p>
            <p className="text-neo-border/70 truncate text-[10px]">{track.artist}</p>
          </div>

          <button
            onClick={togglePlay}
            className="neo-btn p-2 bg-neo-accent border-2 border-neo-border hover:translate-y-[-2px] transition-all"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-neo-border" />
            ) : (
              <Play className="w-4 h-4 text-neo-border ml-0.5" />
            )}
          </button>

          <button
            onClick={() => setIsMinimized(false)}
            className="neo-btn p-2 bg-neo-bg border-2 border-neo-border hover:translate-y-[-2px] transition-all"
            title="Expand player"
          >
            <ChevronUp className="w-4 h-4 text-neo-border" />
          </button>
        </div>
      </div>
    )
  }

  // Full player view
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
      <audio ref={audioRef} src={track.url} preload="metadata" />

      <div className="neo-card p-4 bg-neo-secondary">
        {/* Header with minimize button */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-neo-border flex items-center justify-center flex-shrink-0 overflow-hidden">
              {track.coverUrl ? (
                <Image
                  src={track.coverUrl}
                  alt={track.title}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-neo-primary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">♪</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-neo-border font-display font-bold truncate text-sm">
                {track.title}
              </p>
              <p className="text-neo-border/70 truncate text-xs">{track.artist}</p>
            </div>
          </div>

          <button
            onClick={() => setIsMinimized(true)}
            className="neo-btn p-2 bg-neo-bg border-2 border-neo-border hover:translate-y-[-2px] transition-all ml-2"
            title="Minimize player"
          >
            <ChevronDown className="w-4 h-4 text-neo-border" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-neo-border/70 w-10">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-2 bg-neo-border/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-neo-border [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-neo-bg"
          />
          <span className="text-xs text-neo-border/70 w-10 text-right">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={toggleMute}
            className="neo-btn-sm p-2 bg-neo-bg border-2 border-neo-border hover:translate-y-[-2px] hover:shadow-neo-sm transition-all"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-neo-border" />
            ) : (
              <Volume2 className="w-4 h-4 text-neo-border" />
            )}
          </button>

          <button
            onClick={prevTrack}
            className="neo-btn-sm p-2 bg-neo-bg border-2 border-neo-border hover:translate-y-[-2px] hover:shadow-neo-sm transition-all"
          >
            <SkipBack className="w-4 h-4 text-neo-border" />
          </button>

          <button
            onClick={togglePlay}
            className="neo-btn p-3 bg-neo-accent border-2 border-neo-border hover:translate-y-[-2px] hover:shadow-neo-sm transition-all"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-neo-border" />
            ) : (
              <Play className="w-5 h-5 text-neo-border ml-0.5" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="neo-btn-sm p-2 bg-neo-bg border-2 border-neo-border hover:translate-y-[-2px] hover:shadow-neo-sm transition-all"
          >
            <SkipForward className="w-4 h-4 text-neo-border" />
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-2 bg-neo-border/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-neo-border"
          />
        </div>

        <div className="text-center mt-2 text-xs text-neo-border/50">
          {currentTrack + 1} / {tracks.length}
        </div>
      </div>
    </div>
  )
}
