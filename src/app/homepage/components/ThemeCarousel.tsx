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
  color: string;
}

const themes: Theme[] = [
{
  id: 'theme_retro',
  name: 'Retro Glitch',
  description: 'VHS-inspired with neon glitch effects and 80s vibes',
  preview: "https://images.unsplash.com/photo-1636882337136-847953c51c53",
  alt: 'Retro VHS style card with pink and blue glitch effects',
  color: '#EC4899'
},
{
  id: 'theme_3d',
  name: '3D Clay',
  description: 'Soft pastel clay figures with charming 3D depth',
  preview: "https://img.rocket.new/generatedImages/rocket_gen_img_1f43516f8-1766922268790.png",
  alt: '3D clay style card with cute couple figurines in soft colors',
  color: '#F472B6'
},
{
  id: 'theme_holo',
  name: 'Holographic Shimmer',
  description: 'Iridescent rainbow effects with futuristic glow',
  preview: "https://img.rocket.new/generatedImages/rocket_gen_img_19fcb211f-1767917487370.png",
  alt: 'Holographic card with rainbow shimmer and metallic effects',
  color: '#A78BFA'
},
{
  id: 'theme_meme',
  name: 'Meme Style',
  description: 'Playful internet meme aesthetic with bold text',
  preview: "https://img.rocket.new/generatedImages/rocket_gen_img_1f6a78848-1765047261384.png",
  alt: 'Meme style card with funny text overlays and comic elements',
  color: '#FBBF24'
},
{
  id: 'theme_minimal',
  name: 'Romantic Minimalist',
  description: 'Elegant simplicity with delicate typography',
  preview: "https://img.rocket.new/generatedImages/rocket_gen_img_1f893987f-1765793748907.png",
  alt: 'Minimalist card with elegant typography and subtle heart accents',
  color: '#F87171'
},
{
  id: 'theme_modern',
  name: 'Modern Aesthetic',
  description: 'Contemporary design with bold colors and geometry',
  preview: "https://images.unsplash.com/photo-1708516680374-ca7f7e7684e1",
  alt: 'Modern aesthetic card with geometric shapes and vibrant colors',
  color: '#DC2626'
}];


export default function ThemeCarousel() {
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme, index) =>
        <div
          key={theme.id}
          className="group relative overflow-hidden rounded-2xl cursor-pointer reveal"
          style={{ animationDelay: `${index * 100}ms` }}
          onMouseEnter={() => setHoveredTheme(theme.id)}
          onMouseLeave={() => setHoveredTheme(null)}>
          
            {/* Theme Preview */}
            <div className="aspect-[4/5] relative overflow-hidden">
              <AppImage
              src={theme.preview}
              alt={theme.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Theme Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500 group-hover:-translate-y-2">
                <div
                className="w-12 h-1 rounded-full mb-4 transition-all duration-300 group-hover:w-20"
                style={{ backgroundColor: theme.color }} />
              
                <h3 className="text-2xl font-bold text-white mb-2">{theme.name}</h3>
                <p className="text-sm text-white/70 line-clamp-2">{theme.description}</p>
              </div>

              {/* Hover Overlay */}
              <div
              className={`absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              hoveredTheme === theme.id ? 'opacity-100' : 'opacity-0'}`
              }>
              
                <div className="text-center space-y-4">
                  <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                  style={{ backgroundColor: theme.color }}>
                  
                    <Icon name="SparklesIcon" size={32} className="text-white" />
                  </div>
                  <p className="text-white font-semibold">Preview {theme.name}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

}