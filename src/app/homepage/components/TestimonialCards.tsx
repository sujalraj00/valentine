import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: string;
  name: string;
  cardTheme: string;
  quote: string;
  cardImage: string;
  cardAlt: string;
  rating: number;
}

const testimonials: Testimonial[] = [
{
  id: 'testimonial_1',
  name: 'Sarah & Michael',
  cardTheme: 'Holographic Shimmer',
  quote: "The AI captured our love story perfectly! The holographic effect made our photos look absolutely magical. Best Valentine's gift ever! ✨",
  cardImage: "https://img.rocket.new/generatedImages/rocket_gen_img_19fcb211f-1767917487370.png",
  cardAlt: 'Sarah and Michael holographic Valentine card with rainbow shimmer effects',
  rating: 5
},
{
  id: 'testimonial_2',
  name: 'Emma & James',
  cardTheme: 'Retro Glitch',
  quote: 'We wanted something unique and playful. The retro glitch style with our silly photos was PERFECT. Everyone loved it on Instagram! 🔥',
  cardImage: "https://img.rocket.new/generatedImages/rocket_gen_img_16efb9c7f-1770911948405.png",
  cardAlt: 'Emma and James retro glitch card with VHS effects and neon colors',
  rating: 5
},
{
  id: 'testimonial_3',
  name: 'Alex & Jordan',
  cardTheme: '3D Clay',
  quote: 'The 3D clay style turned our photos into adorable figurines. The timeline feature with our relationship milestones made us both cry. 💕',
  cardImage: "https://img.rocket.new/generatedImages/rocket_gen_img_13613b20a-1770911953448.png",
  cardAlt: 'Alex and Jordan 3D clay card with cute couple figurines',
  rating: 5
}];


export default function TestimonialCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) =>
      <div
        key={testimonial.id}
        className="glass-card overflow-hidden group hover:scale-105 transition-all duration-500 cursor-pointer reveal"
        style={{ animationDelay: `${index * 150}ms` }}>
        
          {/* Card Preview */}
          <div className="aspect-[3/4] relative overflow-hidden">
            <AppImage
            src={testimonial.cardImage}
            alt={testimonial.cardAlt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Theme Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/90 text-white backdrop-blur-sm">
                {testimonial.cardTheme}
              </span>
            </div>

            {/* Rating */}
            <div className="absolute top-4 right-4 flex gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) =>
            <Icon
              key={`star_${testimonial.id}_${i}`}
              name="StarIcon"
              variant="solid"
              size={16}
              className="text-yellow-400" />

            )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="HeartIcon" variant="solid" size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">Created with love</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>);

}