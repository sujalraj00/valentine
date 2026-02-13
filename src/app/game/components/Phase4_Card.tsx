"use client";

import React, { useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useSearchParams } from 'next/navigation';
import { Heart, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Phase4_Card() {
    const { state, resetGame } = useGame();
    const cardRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const gameId = searchParams.get('id');

    useEffect(() => {
        if (!gameId) return;

        // Ensure we send the data once we have dateChoices. 
        // If the user rushed and dateChoices is empty, we still want to mark as finished? 
        // Maybe better to wait a moment or send what we have.
        // Let's send even if empty to at least trigger "Proposal Accepted".

        const saveData = async () => {
            try {
                await fetch(`/api/game/${gameId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        finished: true,
                        dateChoices: state.dateChoices,
                        partnerName: state.partnerName || "Partner"
                    })
                });
            } catch (err) {
                console.error("Failed to save game:", err);
            }
        };

        // Debounce slightly to ensure state is settled? 
        // Actually, just calling it when dependency changes is fine.
        if (state.dateChoices.length > 0) {
            saveData();
        } else {
            // Fallback: If for some reason they have no choices (skipped?), still mark finished after a delay
            const timer = setTimeout(saveData, 1000);
            return () => clearTimeout(timer);
        }
    }, [gameId, state.dateChoices, state.partnerName]);

    const handleDownload = async () => {
        if (cardRef.current) {
            const canvas = await html2canvas(cardRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Add margin to "zoom out"
            const margin = 10;
            const availableWidth = pdfWidth - (margin * 2);
            const scaledHeight = (imgProps.height * availableWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', margin, margin, availableWidth, scaledHeight);
            pdf.save('our-valentine-story.pdf');
        }
    };

    return (
        <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 overflow-y-auto">
            <h1 className="text-4xl font-bold text-pink-600 mb-8 font-cinzel text-center">Your Valentine Story ❤️</h1>

            <div
                ref={cardRef}
                className="bg-white p-8 rounded-lg shadow-2xl max-w-2xl w-full border-8 border-pink-300 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"
            >
                {/* Photos (Moved to Top) */}
                <div className="flex justify-center mb-6 space-x-4">
                    <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden shadow-lg transform -rotate-6">
                        {state.partnerPhoto && <img src={state.partnerPhoto} className="w-full h-full object-cover" />}
                    </div>
                    <Heart className="w-10 h-10 text-red-500 self-center animate-beat" fill="currentColor" />
                    <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden shadow-lg transform rotate-6">
                        {state.creatorPhoto && <img src={state.creatorPhoto} className="w-full h-full object-cover" />}
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center space-x-2 mb-4">
                        <Heart className="text-black w-8 h-8 fill-current" />
                        <span className="text-2xl">💌</span>
                        <Heart className="text-black w-8 h-8 fill-current" />
                    </div>
                    <h2 className="text-3xl font-bold text-black font-mono tracking-tighter">My Dearest Valentine</h2>
                </div>

                {/* Body Text */}
                <div className="space-y-6 text-black font-mono text-lg leading-relaxed">
                    <p>
                        Happy Valentine's Day! I've been thinking about how lucky I am to have you in my life, and I couldn't let today pass without telling you how much you mean to me.
                    </p>
                    <p>
                        You have this incredible way of making everything brighter just by being yourself. Your laugh, your kindness, your little quirks, they all make my world so much better.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-xl border-2 border-black my-6">
                        <h3 className="text-xl font-bold text-black mb-4 text-center">Our Perfect Date Plan:</h3>
                        <ul className="grid grid-cols-1 gap-2 text-center">
                            {state.dateChoices.map((choice, index) => (
                                <li key={index} className="flex items-center justify-center space-x-2">
                                    <Heart size={16} className="text-red-500" />
                                    <span className="font-bold text-black">{choice}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p>
                        Thank you for being my person, my comfort, and my joy. I hope this Valentine's Day reminds you how deeply you are loved, not just today, but every day.
                    </p>
                </div>

                {/* Footer / Signature */}
                <div className="mt-12 text-right">
                    <p className="font-bold text-black">Forever yours,</p>
                    <p className="text-2xl font-bold text-black font-cinzel mt-2">{state.creatorName}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex space-x-4">
                <button
                    onClick={resetGame}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all flex items-center space-x-2"
                >
                    <Heart className="w-5 h-5" />
                    <span>Replay Game</span>
                </button>
                <button
                    onClick={handleDownload}
                    className="bg-white hover:bg-gray-50 text-pink-600 font-bold py-3 px-8 rounded-full shadow-lg transition-all flex items-center space-x-2"
                >
                    <Download className="w-5 h-5" />
                    <span>Save Card</span>
                </button>
            </div>

            {/* Footer decoration */}
            <div className="mt-8 flex space-x-2 text-2xl animate-pulse">
                ❤️ 💖 💝 💗 💓 💞 💕
            </div>
        </div>
    );
}
