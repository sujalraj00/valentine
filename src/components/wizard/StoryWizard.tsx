'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookData, BookPage, ThemeType, themes } from '@/types';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { compressImage } from '@/utils/image-utils';
import { cn } from '@/lib/utils';
import { Cinzel, Inter } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

interface WizardProps {
    onComplete: (data: BookData) => void;
}

// Fixed initialPages definition
const initialPages: BookPage[] = [
    { id: 'p1', type: 'content', title: 'The First Spark', text: '', image: '' },
    { id: 'p2', type: 'content', title: 'Our Special Moment', text: '', image: '' },
    { id: 'p3', type: 'content', title: 'Why I Love You', text: '', image: '' },
    { id: 'p4', type: 'content', title: 'The Adventure', text: '', image: '' },
    { id: 'p5', type: 'content', title: 'Little Things', text: '', image: '' },
    { id: 'p6', type: 'content', title: 'Dreaming Big', text: '', image: '' },
];

export default function StoryWizard({ onComplete }: WizardProps) {
    const [step, setStep] = useState(1);
    const [coupleName, setCoupleName] = useState('');
    const [selectedTheme, setSelectedTheme] = useState<ThemeType>('modern');
    const [selectedFormat, setSelectedFormat] = useState<'book' | 'card'>('book');
    const [pages, setPages] = useState<BookPage[]>(initialPages);

    const handlePageUpdate = (id: string, field: keyof BookPage, value: string) => {
        setPages(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleNext = () => {
        if (step === 4) {
            onComplete({
                id: Math.random().toString(36).substr(2, 9),
                coupleName,
                theme: selectedTheme,
                format: selectedFormat,
                pages
            });
        } else {
            setStep(prev => prev + 1);
        }
    };

    return (
        <div className="max-w-3xl mx-auto w-full">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8 px-2 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-secondary/20 -z-10" />
                {[1, 2, 3, 4].map((s) => (
                    <div
                        key={s}
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500",
                            step >= s ? "bg-primary text-white scale-110" : "bg-card text-muted-foreground border border-white/10"
                        )}
                    >
                        {s}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-8 min-h-[500px] flex flex-col"
                >
                    {/* Step 1: Basics */}
                    {step === 1 && (
                        <div className="space-y-6 flex-grow">
                            <h2 className={cn(cinzel.className, "text-3xl font-bold text-center")}>Who is this for?</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-muted-foreground">Couple's Names (e.g., "Miya & Kai")</label>
                                <input
                                    type="text"
                                    value={coupleName}
                                    onChange={(e) => setCoupleName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors"
                                    placeholder="Enter your names..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Content */}
                    {step === 2 && (
                        <div className="space-y-8 flex-grow overflow-y-auto max-h-[60vh] custom-scrollbar pr-2">
                            <h2 className={cn(cinzel.className, "text-3xl font-bold text-center")}>Tell Your Story</h2>
                            {pages.map((page, index) => (
                                <div key={page.id} className="space-y-4 border-b border-white/5 pb-8 last:border-0 last:pb-0">
                                    <h3 className="text-xl font-serif text-primary">Page {index + 1}: {page.title}</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-wider text-muted-foreground">Memory / Quote</label>
                                            <textarea
                                                value={page.text}
                                                onChange={(e) => handlePageUpdate(page.id, 'text', e.target.value)}
                                                className="w-full h-32 px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors resize-none"
                                                placeholder="Write something sweet..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-wider text-muted-foreground">Photo</label>
                                            <div className="relative group">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            try {
                                                                // Use imported compression utility
                                                                const compressedBase64 = await compressImage(file, 800, 0.7);
                                                                handlePageUpdate(page.id, 'image', compressedBase64);
                                                            } catch (error) {
                                                                console.error("Error compressing image:", error);
                                                                alert("Failed to process image. Please try a smaller file.");
                                                            }
                                                        }
                                                    }}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className={cn(
                                                    "w-full h-32 rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-2 transition-all bg-black/20",
                                                    page.image ? "border-primary/50" : "hover:border-white/40 hover:bg-black/30"
                                                )}>
                                                    {page.image ? (
                                                        <div className="relative w-full h-full p-2">
                                                            <img src={page.image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                                                <Icon name="ArrowPathIcon" size={24} className="text-white" />
                                                                <span className="text-xs text-white font-bold ml-2">Change</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <Icon name="PhotoIcon" size={24} className="text-muted-foreground" />
                                                            <span className="text-xs text-muted-foreground font-medium">Click to Upload Photo</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Step 3: Theme */}
                    {step === 3 && (
                        <div className="space-y-6 flex-grow">
                            <h2 className={cn(cinzel.className, "text-3xl font-bold text-center")}>Choose Your Vibe</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {themes.map((theme) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => setSelectedTheme(theme.id)}
                                        className={cn(
                                            "relative p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 text-center group",
                                            selectedTheme === theme.id ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(225,29,72,0.2)]" : "border-white/10 bg-black/20 hover:border-white/30"
                                        )}
                                    >
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: theme.color }}>
                                            <Icon name="SparklesIcon" size={20} className="text-white" />
                                        </div>
                                        <span className="font-serif font-bold text-sm tracking-wide">{theme.name}</span>
                                        {selectedTheme === theme.id && (
                                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Format Selection */}
                    {step === 4 && (
                        <div className="space-y-6 flex-grow">
                            <h2 className={cn(cinzel.className, "text-3xl font-bold text-center")}>Choose Format</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
                                <button
                                    onClick={() => setSelectedFormat('book')}
                                    className={cn(
                                        "relative p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-6 text-center group h-64 justify-center",
                                        selectedFormat === 'book' ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(225,29,72,0.2)] scale-105" : "border-white/10 bg-black/20 hover:border-white/30"
                                    )}
                                >
                                    <Icon name="BookOpenIcon" size={48} className={selectedFormat === 'book' ? "text-primary" : "text-muted-foreground"} />
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold mb-2">Classic 3D Book</h3>
                                        <p className="text-sm text-muted-foreground">Turn pages like a real book. Perfect for storytelling.</p>
                                    </div>
                                    {selectedFormat === 'book' && <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary animate-pulse" />}
                                </button>

                                <button
                                    onClick={() => setSelectedFormat('card')}
                                    className={cn(
                                        "relative p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-6 text-center group h-64 justify-center",
                                        selectedFormat === 'card' ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(225,29,72,0.2)] scale-105" : "border-white/10 bg-black/20 hover:border-white/30"
                                    )}
                                >
                                    <div className="flex gap-2">
                                        <div className="w-8 h-10 bg-white/10 rounded border border-white/20 transform -rotate-6" />
                                        <div className="w-8 h-10 bg-white/10 rounded border border-white/20 transform rotate-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold mb-2">Memory Cards</h3>
                                        <p className="text-sm text-muted-foreground">Interactive grid of flipping cards. Best for galleries.</p>
                                    </div>
                                    {selectedFormat === 'card' && <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary animate-pulse" />}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="pt-8 flex justify-between border-t border-white/10 mt-auto">
                        <button
                            onClick={() => setStep(prev => Math.max(1, prev - 1))}
                            disabled={step === 1}
                            className="px-6 py-3 rounded-full text-sm font-bold text-muted-foreground hover:text-white disabled:opacity-30 transition-colors"
                        >
                            Back
                        </button>
                        {step === 4 ? (
                            <button
                                onClick={handleNext}
                                className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 flex items-center gap-2"
                            >
                                Generate Book
                                <Icon name="SparklesIcon" size={16} />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={step === 1 && !coupleName}
                                className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                Next Step
                                <Icon name="ArrowRightIcon" size={16} />
                            </button>
                        )}
                    </div>

                </motion.div>
            </AnimatePresence>
        </div>
    );
}
