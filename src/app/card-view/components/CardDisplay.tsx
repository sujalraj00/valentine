'use client';
import { useState } from 'react';
 import AppImage from'@/components/ui/AppImage';
 import Icon from'@/components/ui/AppIcon';

interface CardDisplayProps {
  cardImage: string
  cardAlt: string
  recipientName: string
  senderName: string
  isRevealed: boolean
}

export default function CardDisplay({
  cardImage,
  cardAlt,
  recipientName,
  senderName,
  isRevealed,
}: CardDisplayProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="relative">
      {/* Card Container */}
      <div
        className={`relative rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer ${
          isZoomed ? 'scale-110' : 'scale-100'
        }`}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <AppImage
          src={cardImage}
          alt={cardAlt}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-overlay" />

        {/* Card Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
          {/* Names */}
          <div className="glass-card p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70 mb-1">To</p>
                <p className="text-2xl font-bold text-white">{recipientName}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="HeartIcon" variant="solid" size={24} className="text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-white/70 mb-1">From</p>
                <p className="text-2xl font-bold text-white">{senderName}</p>
              </div>
            </div>
          </div>

          {/* Revealed Badge */}
          {isRevealed && (
            <div className="glass-card p-4 backdrop-blur-xl border-2 border-primary text-center">
              <div className="flex items-center justify-center gap-2">
                <Icon name="SparklesIcon" size={20} className="text-primary" />
                <span className="text-sm font-bold text-primary uppercase tracking-wider">
                  Valentine's Day Revealed!
                </span>
                <Icon name="SparklesIcon" size={20} className="text-primary" />
              </div>
            </div>
          )}
        </div>

        {/* Zoom Hint */}
        <div className="absolute top-4 right-4">
          <div className="glass-card px-3 py-2 backdrop-blur-xl flex items-center gap-2">
            <Icon name={isZoomed ? 'MagnifyingGlassMinusIcon' : 'MagnifyingGlassPlusIcon'} size={16} className="text-white" />
            <span className="text-xs font-semibold text-white">
              {isZoomed ? 'Zoom Out' : 'Click to Zoom'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}