'use client';
import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  alt: string;
  badge: string;
}

const themes: Theme[] = [
{
  id: 'retro_glitch',
  name: 'Retro Glitch',
  description: 'VHS-inspired with neon glitch effects',
  preview: "https://img.rocket.new/generatedImages/rocket_gen_img_1124b6857-1766758588519.png",
  alt: 'Retro VHS glitch effect preview with pink and blue neon colors',
  badge: 'Popular'
},
{
  id: '3d_clay',
  name: '3D Clay',
  description: 'Soft pastel clay figures with depth',
  preview: "https://img.rocket.new/generatedImages/rocket_gen_img_13f1b1cc9-1770911949008.png",
  alt: '3D clay style preview with cute pastel figurines',
  badge: 'Cute'
},
{
  id: 'holographic',
  name: 'Holographic Shimmer',
  description: 'Iridescent rainbow effects',
  preview: "https://images.unsplash.com/photo-1711885417374-960fa23bfa1e",
  alt: 'Holographic shimmer preview with rainbow metallic effects',
  badge: 'Premium'
},
{
  id: 'meme',
  name: 'Meme Style',
  description: 'Playful internet meme aesthetic',
  preview: "https://img.rocket.new/generatedImages/rocket_gen_img_1af386fe1-1768729714916.png",
  alt: 'Meme style preview with bold text and comic elements',
  badge: 'Fun'
},
{
  id: 'minimalist',
  name: 'Romantic Minimalist',
  description: 'Elegant simplicity with delicate type',
  preview: "https://img.rocket.new/generatedImages/rocket_gen_img_1687919e7-1768302912157.png",
  alt: 'Minimalist preview with elegant typography and soft colors',
  badge: 'Elegant'
},
{
  id: 'modern',
  name: 'Modern Aesthetic',
  description: 'Bold colors and geometric shapes',
  preview: "https://images.unsplash.com/photo-1708516680374-ca7f7e7684e1",
  alt: 'Modern aesthetic preview with vibrant colors and geometry',
  badge: 'Trendy'
}];


interface ThemeSelectorProps {
  selectedTheme: string | null;
  onSelectTheme: (themeId: string) => void;
}

export default function ThemeSelector({ selectedTheme, onSelectTheme }: ThemeSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredThemes = themes.filter((theme) =>
  theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  theme.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Icon
          name="MagnifyingGlassIcon"
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        
        <input
          type="text"
          placeholder="Search themes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
        
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredThemes.map((theme) => {
          const isSelected = selectedTheme === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
              isSelected ?
              'ring-4 ring-primary scale-105' : 'hover:scale-105'}`
              }>
              
              {/* Preview Image */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <AppImage
                  src={theme.preview}
                  alt={theme.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary text-white">
                    {theme.badge}
                  </span>
                </div>

                {/* Selected Indicator */}
                {isSelected &&
                <div className="absolute top-3 left-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Icon name="CheckIcon" size={24} className="text-white" />
                    </div>
                  </div>
                }

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{theme.name}</h3>
                  <p className="text-sm text-white/70">{theme.description}</p>
                </div>
              </div>
            </button>);

        })}
      </div>

      {filteredThemes.length === 0 &&
      <div className="text-center py-12">
          <Icon name="MagnifyingGlassIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No themes found matching "{searchTerm}"</p>
        </div>
      }
    </div>);

}