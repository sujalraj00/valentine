'use client';
import { useState } from 'react';
 import Icon from'@/components/ui/AppIcon';

interface FormData {
  recipientName: string
  senderName: string
  customMessage: string
  revealText: string
}

interface CardFormProps {
  formData: FormData
  onUpdateForm: (data: Partial<FormData>) => void
}

export default function CardForm({ formData, onUpdateForm }: CardFormProps) {
  const [charCount, setCharCount] = useState(formData.customMessage.length)
  const maxChars = 500

  const handleMessageChange = (value: string) => {
    if (value.length <= maxChars) {
      setCharCount(value.length)
      onUpdateForm({ customMessage: value })
    }
  }

  return (
    <div className="space-y-6">
      {/* Recipient Name */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Icon name="UserIcon" size={16} className="text-primary" />
          Recipient Name
        </label>
        <input
          type="text"
          value={formData.recipientName}
          onChange={(e) => onUpdateForm({ recipientName: e.target.value })}
          placeholder="Who is this card for?"
          className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* Sender Name */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Icon name="HeartIcon" size={16} className="text-primary" />
          Your Name
        </label>
        <input
          type="text"
          value={formData.senderName}
          onChange={(e) => onUpdateForm({ senderName: e.target.value })}
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* Custom Message */}
      <div className="space-y-2">
        <label className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Icon name="ChatBubbleLeftIcon" size={16} className="text-primary" />
            Your Message
          </span>
          <span className="text-xs text-muted-foreground">
            {charCount}/{maxChars}
          </span>
        </label>
        <textarea
          value={formData.customMessage}
          onChange={(e) => handleMessageChange(e.target.value)}
          placeholder="Write your heartfelt message here..."
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
        />
      </div>

      {/* Reveal Text */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Icon name="SparklesIcon" size={16} className="text-primary" />
          Midnight Reveal Message
          <span className="text-xs text-muted-foreground font-normal">(Reveals on Feb 14)</span>
        </label>
        <textarea
          value={formData.revealText}
          onChange={(e) => onUpdateForm({ revealText: e.target.value })}
          placeholder="A special message that reveals at midnight..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
        />
      </div>

      {/* Helper Text */}
      <div className="glass-card p-4 flex items-start gap-3">
        <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">Pro Tip</p>
          <p>Make your message personal! Mention inside jokes, special memories, or things only you two understand. ❤️</p>
        </div>
      </div>
    </div>
  )
}