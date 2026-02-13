'use client';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface AIVariant {
  id: string;
  url: string;
  alt: string;
}

const mockVariants: AIVariant[] = [
{
  id: 'variant_1',
  url: "https://img.rocket.new/generatedImages/rocket_gen_img_15f62beb8-1767102429512.png",
  alt: 'AI generated Valentine card variant 1 with romantic styling'
},
{
  id: 'variant_2',
  url: "https://img.rocket.new/generatedImages/rocket_gen_img_105a09ca9-1770911952813.png",
  alt: 'AI generated Valentine card variant 2 with holographic effects'
},
{
  id: 'variant_3',
  url: "https://img.rocket.new/generatedImages/rocket_gen_img_1587795ce-1770911954093.png",
  alt: 'AI generated Valentine card variant 3 with retro glitch style'
},
{
  id: 'variant_4',
  url: "https://img.rocket.new/generatedImages/rocket_gen_img_10a9b8149-1770911954654.png",
  alt: 'AI generated Valentine card variant 4 with modern aesthetic'
}];


interface AIPreviewProps {
  isGenerating: boolean;
  selectedVariant: string | null;
  onSelectVariant: (variantId: string) => void;
}

export default function AIPreview({ isGenerating, selectedVariant, onSelectVariant }: AIPreviewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="SparklesIcon" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">AI Generated Variants</h3>
        </div>
        {isGenerating &&
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Generating...
          </div>
        }
      </div>

      {/* Variants Grid */}
      {isGenerating ?
      <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) =>
        <div
          key={`loading_${i}`}
          className="aspect-[3/4] rounded-xl bg-muted animate-pulse shimmer" />

        )}
        </div> :

      <div className="grid grid-cols-2 gap-4">
          {mockVariants.map((variant) => {
          const isSelected = selectedVariant === variant.id;
          return (
            <button
              key={variant.id}
              onClick={() => onSelectVariant(variant.id)}
              className={`relative aspect-[3/4] rounded-xl overflow-hidden group transition-all ${
              isSelected ? 'ring-4 ring-primary scale-105' : 'hover:scale-105'}`
              }>
              
                <AppImage
                src={variant.url}
                alt={variant.alt}
                className="w-full h-full object-cover" />
              
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Icon name="EyeIcon" size={32} className="text-white mx-auto" />
                    <p className="text-white font-semibold text-sm">Preview</p>
                  </div>
                </div>

                {/* Selected Badge */}
                {isSelected &&
              <div className="absolute top-3 right-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Icon name="CheckIcon" size={24} className="text-white" />
                    </div>
                  </div>
              }
              </button>);

        })}
        </div>
      }

      {/* Info Card */}
      <div className="glass-card p-4 flex items-start gap-3">
        <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">AI Generation</p>
          <p>Select your favorite variant. You can further edit it in the next step with crop, rotate, and text overlay options.</p>
        </div>
      </div>
    </div>);

}