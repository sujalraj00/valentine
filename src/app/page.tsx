"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Heart } from 'lucide-react';

const QuizController = dynamic(() => import('./homepage/components/QuizController'), { ssr: false });
const CardCreator = dynamic(() => import('./homepage/components/CardCreator'), { ssr: false });

export default function Homepage() {
    const [showQuiz, setShowQuiz] = useState(false);
    const [showCardCreator, setShowCardCreator] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('join')) {
            setShowQuiz(true);
        }
    }, []);

    const features = [
        {
            title: "Create Your Card",
            description: "Design a beautiful digital Valentine's card for your special someone.",
            icon: <Heart className="w-12 h-12 text-pink-500" />,
            bgColor: "bg-pink-100",
            hoverColor: "hover:bg-pink-200",
            borderColor: "border-pink-100",
            hoverBorder: "hover:border-pink-300",
            href: "/create-e-card"
        },
        {
            title: "Play \"Love Quest\"",
            description: "Create a personalized game, share the link, and let your partner play to reach you!",
            icon: <span className="text-4xl">🎮</span>,
            bgColor: "bg-red-100",
            hoverColor: "hover:bg-red-200",
            borderColor: "border-red-100",
            hoverBorder: "hover:border-red-300",
            href: "/game/create"
        },
        {
            title: "Quiz Challenge",
            description: "How well do you know your partner? Play simultaneously and find out!",
            icon: <Icon name="SparklesIcon" size={32} className="text-pink-600" />,
            bgColor: "bg-pink-50",
            hoverColor: "hover:bg-pink-100",
            borderColor: "border-pink-50",
            hoverBorder: "hover:border-pink-200",
            onClick: () => setShowQuiz(true)
        },
        {
            title: "Quick Couple Card",
            description: "Generate a beautiful hosted GlassCard with your photos in seconds.",
            icon: <Icon name="PhotoIcon" size={32} className="text-zinc-600" />,
            bgColor: "bg-zinc-100",
            hoverColor: "hover:bg-zinc-200",
            borderColor: "border-zinc-100",
            hoverBorder: "hover:border-zinc-200",
            onClick: () => setShowCardCreator(true)
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-pink-50">
            <Header />

            <main className="flex-grow flex flex-col items-center justify-center p-4 py-20 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 text-pink-200 animate-bounce delay-100">
                        <Heart size={48} fill="currentColor" />
                    </div>
                    <div className="absolute bottom-20 right-20 text-pink-200 animate-bounce delay-700">
                        <Heart size={64} fill="currentColor" />
                    </div>
                    <div className="absolute top-1/3 right-10 text-pink-100 animate-pulse">
                        <Heart size={32} fill="currentColor" />
                    </div>
                    <div className="absolute bottom-10 left-1/4 text-pink-100 animate-beat">
                        <Heart size={40} fill="currentColor" />
                    </div>
                </div>

                <div className="z-10 text-center max-w-6xl mx-auto space-y-12">
                    <h1 className="text-5xl md:text-7xl font-bold text-pink-600 font-cinzel mb-8 drop-shadow-sm">
                        Celebrate Your Love
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                        {features.map((feature, idx) => {
                            const CardContent = (
                                <>
                                    <div className={`${feature.bgColor} ${feature.hoverColor} p-6 rounded-full mb-6 transition-colors duration-300`}>
                                        {feature.icon}
                                    </div>
                                    <h2 className="text-2xl font-bold text-zinc-800 mb-2 font-cinzel text-center">{feature.title}</h2>
                                    <p className="text-zinc-500 text-sm text-center">{feature.description}</p>
                                </>
                            );

                            if (feature.href) {
                                return (
                                    <Link
                                        key={idx}
                                        href={feature.href}
                                        className={`group relative flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${feature.borderColor} ${feature.hoverBorder} w-full`}
                                    >
                                        {CardContent}
                                    </Link>
                                );
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={feature.onClick}
                                    className={`group relative flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${feature.borderColor} ${feature.hoverBorder} w-full text-left`}
                                >
                                    {CardContent}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </main>

            {showQuiz && <QuizController onClose={() => setShowQuiz(false)} />}
            {showCardCreator && <CardCreator onClose={() => setShowCardCreator(false)} />}


        </div>
    );
}
