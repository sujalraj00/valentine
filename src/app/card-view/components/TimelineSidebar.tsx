import Icon from '@/components/ui/AppIcon';

interface TimelineEvent {
  id: string
  title: string
  date: string
  description: string
}

const mockEvents: TimelineEvent[] = [
  {
    id: 'event_1',
    title: 'First Date',
    date: '2024-03-15',
    description: 'Coffee at the park, talked for hours',
  },
  {
    id: 'event_2',
    title: 'First Kiss',
    date: '2024-04-20',
    description: 'Under the stars at the beach',
  },
  {
    id: 'event_3',
    title: 'Anniversary',
    date: '2025-03-15',
    description: 'One amazing year together',
  },
  {
    id: 'event_4',
    title: 'Moving In',
    date: '2025-08-01',
    description: 'Started our life together',
  },
]

export default function TimelineSidebar() {
  return (
    <div className="glass-card p-6 backdrop-blur-xl space-y-6">
      <div className="flex items-center gap-2">
        <Icon name="HeartIcon" size={20} className="text-primary" />
        <h3 className="text-lg font-bold text-foreground">Our Story</h3>
      </div>

      <div className="space-y-6 relative">
        {/* Timeline Line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />

        {/* Events */}
        {mockEvents.map((event, index) => (
          <div key={event.id} className="relative pl-12 space-y-2">
            {/* Dot */}
            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>

            {/* Content */}
            <div>
              <h4 className="font-semibold text-foreground">{event.title}</h4>
              <p className="text-xs text-muted-foreground mb-1">
                {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}