'use client';
import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { motion, AnimatePresence } from 'framer-motion';

interface CardExample {
    id: string;
    title: string;
    theme: string;
    image: string;
    alt: string;
}

const cardExamples: CardExample[] = [
    {
        id: 'card_retro',
        title: 'Retro Glitch Love',
        theme: 'Retro Glitch',
        image: "https://images.unsplash.com/photo-1615663961487-045c090ff637",
        alt: 'Couple embracing with retro VHS glitch effect and pink neon hearts'
    },
    {
        id: 'card_3d',
        title: '3D Clay Romance',
        theme: '3D Clay',
        image: "https://images.unsplash.com/photo-1704123298617-bae9f478ee63",
        alt: 'Couple silhouettes transformed into 3D clay figures with soft pastel colors'
    },
    {
        id: 'card_holo',
        title: 'Holographic Dreams',
        theme: 'Holographic',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dfae889d-1764651016664.png",
        alt: 'Couple portrait with iridescent holographic shimmer and rainbow light effects'
    },
    {
        id: 'card_meme',
        title: 'Meme Magic',
        theme: 'Meme Style',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1aa64573c-1770911954838.png",
        alt: 'Funny couple photo with meme-style text overlay and comic speech bubbles'
    }];


export default function HeroGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % cardExamples.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToPrevious = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + cardExamples.length) % cardExamples.length);
    };

    const goToNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % cardExamples.length);
    };

    return (
        <div className="relative w-full h-full group">
            {/* Slides */}
            <div className="relative w-full h-full overflow-hidden rounded-[2rem] shadow-2xl border border-white/5">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={cardExamples[currentIndex].id}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0"
                    >
                        <AppImage
                            src={cardExamples[currentIndex].image}
                            alt={cardExamples[currentIndex].alt}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    </motion.div>
                </AnimatePresence>

                {/* Card Info */}
                <div className="absolute bottom-8 left-8 right-8 z-10">
                    <motion.div
                        key={`info-${currentIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="glass-card px-8 py-6 max-w-lg"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
                                {cardExamples[currentIndex].theme}
                            </span>
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-white mb-2">{cardExamples[currentIndex].title}</h3>
                        <p className="text-sm text-white/80 font-light leading-relaxed">
                            AI-generated Valentine's card with custom photo styling
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4">
                {/* Pagination */}
                <div className="px-5 py-2.5 rounded-full glass-card border border-white/10 text-sm font-mono text-white shadow-lg backdrop-blur-xl bg-black/30">
                    <span className="font-bold text-primary">{String(currentIndex + 1).padStart(2, '0')}</span>
                    <span className="text-white/40 mx-2">/</span>
                    <span className="text-white/60">{String(cardExamples.length).padStart(2, '0')}</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={goToPrevious}
                        className="w-12 h-12 rounded-full glass-card border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all shadow-lg group/btn backdrop-blur-xl bg-black/30"
                        aria-label="Previous card">

                        <Icon
                            name="ChevronLeftIcon"
                            size={20}
                            className="group-hover/btn:-translate-x-0.5 transition-transform" />

                    </button>
                    <button
                        onClick={goToNext}
                        className="w-12 h-12 rounded-full glass-card border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all shadow-lg group/btn backdrop-blur-xl bg-black/30"
                        aria-label="Next card">

                        <Icon
                            name="ChevronRightIcon"
                            size={20}
                            className="group-hover/btn:translate-x-0.5 transition-transform" />

                    </button>
                </div>
            </div>

            {/* Dots Indicator */}
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 flex flex-col gap-3 z-20">
                {cardExamples.map((_, index) =>
                    <button
                        key={`dot_${index}`}
                        onClick={() => {
                            setIsAutoPlaying(false);
                            setCurrentIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ?
                                'h-8 bg-primary shadow-[0_0_10px_rgba(225,29,72,0.5)]' : 'bg-white/20 hover:bg-white/40'}`
                        }
                        aria-label={`Go to slide ${index + 1}`} />

                )}
            </div>
        </div>);
}