'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import StoryWizard from '@/components/wizard/StoryWizard';
import { BookData } from '@/types';
import Icon from '@/components/ui/AppIcon';

export default function CreateECardPage() {
    const router = useRouter();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleWizardComplete = async (data: BookData) => {
        setIsGenerating(true);

        try {
            // Simulate generation delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In a real app, we'd save to DB here. For demo, we'll store in localStorage
            // Optimization: Remove image data if it's too large, or handle error
            try {
                localStorage.setItem(`card_${data.id}`, JSON.stringify(data));
                router.push(`/card-view/${data.id}`);
            } catch (e) {
                console.error("Storage error:", e);
                alert("Your story is too big for this browser's demo storage! Please try using fewer photos or a different device.");
                setIsGenerating(false);
            }
        } catch (error) {
            console.error("Generation error:", error);
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" />
            </div>

            <div className="absolute top-6 left-6 z-20">
                <button onClick={() => router.push('/')} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Icon name="HomeIcon" size={20} />
                    <span>Home</span>
                </button>
            </div>

            <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col flex-grow">
                <motion.div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gradient-valentine">
                        Create Your Love Story
                    </h1>
                    <p className="text-lg text-muted-foreground font-light">
                        Turn your favorite memories into a viral 3D flip-book.
                    </p>
                </motion.div>

                <div className="flex-grow flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {isGenerating ? (
                            <motion.div
                                key="generating"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-20"
                            >
                                <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-8" />
                                <h2 className="text-2xl font-serif font-bold animate-pulse">Designing your book...</h2>
                                <p className="text-muted-foreground mt-2">Applying magic dust ✨</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="wizard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="w-full"
                            >
                                <StoryWizard onComplete={handleWizardComplete} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}