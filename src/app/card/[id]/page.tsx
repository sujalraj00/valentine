"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ValentineQuizCard from '@/components/ui/valentine-quiz-card';
import { Heart, Loader2 } from 'lucide-react';

interface CardData {
    cardId: string;
    partner1Image: string;
    partner2Image: string;
    romanticMessage: string;
    theme: string;
}

export default function HostedCardPage() {
    const params = useParams();
    const [card, setCard] = useState<CardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const res = await fetch(`/api/couple-card?id=${params.id}`);
                const data = await res.json();
                if (res.ok) {
                    setCard(data);
                } else {
                    setError(data.error || "Card not found");
                }
            } catch (err) {
                setError("Failed to load your romantic moment.");
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchCard();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-pink-50 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
            </div>
        );
    }

    if (error || !card) {
        return (
            <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 text-center">
                <Heart className="w-16 h-16 text-zinc-300 mb-4" />
                <h2 className="text-2xl font-bold text-zinc-800 tracking-tight">Oops! Moment not found.</h2>
                <p className="text-zinc-500 mt-2">The romantic link might have expired or is incorrect.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
            <Header />

            <main className="flex-grow flex items-center justify-center p-6 relative">
                {/* Romantic Background Decoration */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000" />
                </div>

                <div className="relative z-10 flex flex-col items-center max-w-lg w-full">
                    {/* The Refined Glass Card */}
                    <div className="relative mb-12 transform hover:scale-105 transition-transform duration-500 origin-center">
                        <ValentineQuizCard
                            className="shadow-2xl"
                            title="Couple's Moment"
                            description=""
                            partner1Image={card.partner1Image}
                            partner2Image={card.partner2Image}
                        />
                    </div>

                    <div className="text-center space-y-6 px-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <Heart size={16} className="text-pink-500 animate-beat" fill="currentColor" />
                            <span className="text-xs font-black text-white/80 uppercase tracking-widest">A Romantic Moment Captured</span>
                        </div>

                        <p className="text-xl md:text-2xl font-serif text-white leading-relaxed italic">
                            "{card.romanticMessage}"
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
