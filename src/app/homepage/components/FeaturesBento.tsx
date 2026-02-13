import Icon from '@/components/ui/AppIcon';

interface Feature {
  id: string
  icon: string
  title: string
  description: string
  highlight: string
}

const features: Feature[] = [
  {
    id: 'feature_ai',
    icon: 'SparklesIcon',
    title: 'AI-Powered Generation',
    description: 'Upload your photos and let our AI transform them into stunning Valentine cards with custom styles and effects.',
    highlight: 'Smart photo enhancement',
  },
  {
    id: 'feature_timeline',
    icon: 'ClockIcon',
    title: 'Relationship Timeline',
    description: 'Add milestone dates and special moments to create a visual journey of your love story.',
    highlight: 'Beautiful memories',
  },
  {
    id: 'feature_countdown',
    icon: 'CalendarIcon',
    title: 'Countdown & Reveal',
    description: 'Set a countdown to February 14th with a hidden message that reveals at midnight.',
    highlight: 'Surprise moment',
  },
  {
    id: 'feature_share',
    icon: 'ShareIcon',
    title: 'Easy Sharing',
    description: 'Share your card via social media, generate QR codes, or download high-resolution images.',
    highlight: 'Multiple formats',
  },
]

export default function FeaturesBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className="glass-card p-8 group hover:border-primary/50 transition-all duration-500 cursor-pointer reveal"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <Icon
              name={feature.icon as any}
              size={32}
              className="text-primary group-hover:text-secondary transition-colors"
            />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-foreground group-hover:text-gradient-valentine transition-all">
              {feature.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <span>{feature.highlight}</span>
              <Icon
                name="ArrowRightIcon"
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}