"use client";

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Heart } from 'lucide-react';

export default function Phase2_Question() {
    const { state, setPhase } = useGame();
    const [noBtnPosition, setNoBtnPosition] = useState({ top: '50%', left: '60%' });

    const moveNoButton = () => {
        const randomX = Math.random() * 60 + 20; // 20% to 80%
        const randomY = Math.random() * 60 + 20; // 20% to 80%
        setNoBtnPosition({ top: `${randomY}%`, left: `${randomX}%` });
    };

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-50 backdrop-blur-md animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-lg w-full mx-4 border-4 border-pink-300 relative overflow-hidden">
                {/* Decorative hearts */}
                <Heart className="absolute top-2 left-2 text-pink-200 w-12 h-12 -rotate-12" />
                <Heart className="absolute bottom-2 right-2 text-pink-200 w-12 h-12 rotate-12" />

                {/* Avatar Display */}
                <div className="flex justify-center items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-500">
                        {state.partnerPhoto && <img src={state.partnerPhoto} className="w-full h-full object-cover" />}
                    </div>
                    <Heart className="text-red-500 animate-pulse" fill="currentColor" />
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-500">
                        {state.creatorPhoto && <img src={state.creatorPhoto} className="w-full h-full object-cover" />}
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-pink-600 mb-2 font-cinzel">My Dearest {state.partnerName || 'Love'},</h2>
                <h3 className="text-2xl font-bold text-gray-800 mb-8">Will you be my Valentine?</h3>

                <div className="relative h-32">
                    <button
                        onClick={() => setPhase('level2')}
                        className="absolute left-10 top-1/2 -translate-y-1/2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-110 transition-all text-xl"
                    >
                        Yes! 💖
                    </button>

                    <button
                        onMouseEnter={moveNoButton}
                        onClick={moveNoButton}
                        style={{ top: noBtnPosition.top, left: noBtnPosition.left, position: 'absolute' }}
                        className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200"
                    >
                        No 😢
                    </button>
                </div>
            </div>
        </div>
    );
}
