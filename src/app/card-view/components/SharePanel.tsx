'use client';
import { useState } from 'react';
 import Icon from'@/components/ui/AppIcon';

export default function SharePanel() {
  const [copied, setCopied] = useState(false)
  const shareUrl = 'https://valentineviralcard.com/card/abc123'

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socialPlatforms = [
    { id: 'social_facebook', name: 'Facebook', icon: 'UserGroupIcon', color: 'bg-blue-600' },
    { id: 'social_instagram', name: 'Instagram', icon: 'CameraIcon', color: 'bg-pink-600' },
    { id: 'social_twitter', name: 'Twitter', icon: 'ChatBubbleLeftIcon', color: 'bg-sky-500' },
    { id: 'social_whatsapp', name: 'WhatsApp', icon: 'ChatBubbleOvalLeftIcon', color: 'bg-green-600' },
  ]

  return (
    <div className="space-y-6">
      {/* Share URL */}
      <div className="glass-card p-6 backdrop-blur-xl space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Icon name="LinkIcon" size={20} className="text-primary" />
          Share Link
        </h3>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm"
          />
          <button
            onClick={handleCopyLink}
            className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <Icon name={copied ? 'CheckIcon' : 'ClipboardIcon'} size={20} />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Social Sharing */}
      <div className="glass-card p-6 backdrop-blur-xl space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Icon name="ShareIcon" size={20} className="text-primary" />
          Share on Social Media
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {socialPlatforms.map((platform) => (
            <button
              key={platform.id}
              className={`${platform.color} text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2`}
            >
              <Icon name={platform.icon as any} size={20} />
              {platform.name}
            </button>
          ))}
        </div>
      </div>

      {/* QR Code */}
      <div className="glass-card p-6 backdrop-blur-xl space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Icon name="QrCodeIcon" size={20} className="text-primary" />
          QR Code
        </h3>
        
        <div className="bg-white p-6 rounded-xl flex items-center justify-center">
          <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="QrCodeIcon" size={96} className="text-muted-foreground" />
          </div>
        </div>
        
        <button className="w-full px-4 py-3 rounded-lg bg-muted text-foreground font-semibold hover:bg-muted/80 transition-all flex items-center justify-center gap-2">
          <Icon name="ArrowDownTrayIcon" size={20} />
          Download QR Code
        </button>
      </div>

      {/* Download Card */}
      <div className="glass-card p-6 backdrop-blur-xl space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Icon name="ArrowDownTrayIcon" size={20} className="text-primary" />
          Download
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all">
            High-Res Image
          </button>
          <button className="px-4 py-3 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/90 transition-all">
            Video Card
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="glass-card p-6 backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-gradient-valentine mb-1">47</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Views</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gradient-valentine mb-1">12</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Shares</div>
          </div>
        </div>
      </div>
    </div>
  )
}