'use client';
import { useState } from 'react';
 import Icon from'@/components/ui/AppIcon';

interface TimelineEvent {
  id: string
  title: string
  date: string
  description: string
}

interface TimelineBuilderProps {
  events: TimelineEvent[]
  onUpdateEvents: (events: TimelineEvent[]) => void
}

export default function TimelineBuilder({ events, onUpdateEvents }: TimelineBuilderProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newEvent, setNewEvent] = useState<Omit<TimelineEvent, 'id'>>({
    title: '',
    date: '',
    description: '',
  })

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event: TimelineEvent = {
        id: `event_${Date.now()}`,
        ...newEvent,
      }
      onUpdateEvents([...events, event])
      setNewEvent({ title: '', date: '', description: '' })
      setIsAdding(false)
    }
  }

  const removeEvent = (id: string) => {
    onUpdateEvents(events.filter(e => e.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="ClockIcon" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Relationship Timeline</h3>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <Icon name={isAdding ? 'XMarkIcon' : 'PlusIcon'} size={16} />
          {isAdding ? 'Cancel' : 'Add Event'}
        </button>
      </div>

      {/* Add Event Form */}
      {isAdding && (
        <div className="glass-card p-6 space-y-4">
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            placeholder="Event title (e.g., First Date)"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            placeholder="Brief description (optional)"
            rows={2}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
          />
          
          <button
            onClick={addEvent}
            disabled={!newEvent.title || !newEvent.date}
            className="w-full px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Timeline
          </button>
        </div>
      )}

      {/* Events List */}
      {events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="glass-card p-6 group hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Timeline Dot */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => removeEvent(event.id)}
                      className="w-8 h-8 rounded-lg bg-destructive/10 hover:bg-destructive flex items-center justify-center text-destructive hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Remove event"
                    >
                      <Icon name="TrashIcon" size={16} />
                    </button>
                  </div>
                  
                  {event.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center">
          <Icon name="CalendarIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">No timeline events yet</p>
          <p className="text-sm text-muted-foreground">
            Add special moments from your relationship to create a beautiful timeline
          </p>
        </div>
      )}
    </div>
  )
}