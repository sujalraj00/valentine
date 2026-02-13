'use client';
import { useState } from 'react';
 import Icon from'@/components/ui/AppIcon';

const musicTracks = [
  { id: 'track_1', name: 'Romantic Piano', duration: '3:45' },
  { id: 'track_2', name: 'Love Ballad', duration: '4:20' },
  { id: 'track_3', name: 'Acoustic Romance', duration: '3:12' },
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)

  return (
    <div className="glass-card p-6 backdrop-blur-xl space-y-4">
      <div className="flex items-center gap-2">
        <Icon name="MusicalNoteIcon" size={20} className="text-primary" />
        <h3 className="text-lg font-bold text-foreground">Background Music</h3>
      </div>

      {/* Current Track */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            {musicTracks[currentTrack].name}
          </span>
          <span className="text-xs text-muted-foreground">
            {musicTracks[currentTrack].duration}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary w-2/3 transition-all" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))}
          disabled={currentTrack === 0}
          className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-all disabled:opacity-50"
        >
          <Icon name="BackwardIcon" size={20} className="text-foreground" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary hover:scale-110 flex items-center justify-center transition-all shadow-lg"
        >
          <Icon
            name={isPlaying ? 'PauseIcon' : 'PlayIcon'}
            variant="solid"
            size={24}
            className="text-white"
          />
        </button>

        <button
          onClick={() => setCurrentTrack(Math.min(musicTracks.length - 1, currentTrack + 1))}
          disabled={currentTrack === musicTracks.length - 1}
          className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-all disabled:opacity-50"
        >
          <Icon name="ForwardIcon" size={20} className="text-foreground" />
        </button>
      </div>

      {/* Track List */}
      <div className="space-y-2 pt-4 border-t border-border">
        {musicTracks.map((track, index) => (
          <button
            key={track.id}
            onClick={() => setCurrentTrack(index)}
            className={`w-full px-4 py-2 rounded-lg text-left flex items-center justify-between transition-all ${
              currentTrack === index
                ? 'bg-primary/10 text-primary' :'hover:bg-muted text-muted-foreground'
            }`}
          >
            <span className="text-sm font-medium">{track.name}</span>
            <span className="text-xs">{track.duration}</span>
          </button>
        ))}
      </div>
    </div>
  )
}