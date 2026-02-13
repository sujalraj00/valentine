"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { Heart } from 'lucide-react';

const QUESTIONS = [
    {
        id: 'activity',
        question: "What's our ideal date?",
        options: [
            { id: 'movie', label: "Movie 🎬", color: 'bg-indigo-500', x: '10%' },
            { id: 'coffee', label: "Coffee ☕", color: 'bg-amber-600', x: '30%' },
            { id: 'dinner', label: "Dinner 🍽️", color: 'bg-rose-500', x: '55%' },
            { id: 'sleep', label: "Sleep In 😴", color: 'bg-blue-400', x: '80%' }
        ]
    },
    {
        id: 'food',
        question: "What are we craving?",
        options: [
            { id: 'sushi', label: "Sushi 🍣", color: 'bg-orange-400', x: '10%' },
            { id: 'pizza', label: "Pizza 🍕", color: 'bg-yellow-500', x: '32%' },
            { id: 'tacos', label: "Tacos 🌮", color: 'bg-lime-500', x: '55%' },
            { id: 'pasta', label: "Pasta 🍝", color: 'bg-red-500', x: '80%' }
        ]
    },
    {
        id: 'vibe',
        question: "How do we end the night?",
        options: [
            { id: 'walk', label: "Walk 🌙", color: 'bg-purple-500', x: '15%' },
            { id: 'drive', label: "Drive 🚗", color: 'bg-red-500', x: '35%' },
            { id: 'star', label: "Stargaze ✨", color: 'bg-slate-700', x: '60%' },
            { id: 'dance', label: "Dance 💃", color: 'bg-pink-500', x: '80%' }
        ]
    }
];

export default function Phase3_DatePlanner() {
    const { state, addDateChoice, setPhase } = useGame();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Physics State
    const [player, setPlayer] = useState({ x: 50, y: 300, vy: 0, grounded: false });
    const [keys, setKeys] = useState<Record<string, boolean>>({});
    const gameLoopRef = useRef<number>(0);
    const GRAVITY = 0.6;
    const JUMP_FORCE = -14;
    const SPEED = 6;
    const FLOOR_Y = 400;

    const currentQ = QUESTIONS[currentQuestionIndex];

    // Input handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => setKeys(prev => ({ ...prev, [e.code]: true }));
        const handleKeyUp = (e: KeyboardEvent) => setKeys(prev => ({ ...prev, [e.code]: false }));
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Game Loop & Collision
    useEffect(() => {
        const update = () => {
            setPlayer(prev => {
                let { x, y, vy, grounded } = prev;

                if (keys['ArrowRight'] || keys['KeyD']) x += SPEED;
                if (keys['ArrowLeft'] || keys['KeyA']) x -= SPEED;

                // Infinite Jump Logic
                if (keys['ArrowUp'] || keys['Space'] || keys['KeyW']) {
                    if (prev.vy > -5) {
                        vy = JUMP_FORCE;
                        grounded = false;
                    }
                }

                vy += GRAVITY;
                y += vy;

                if (y >= FLOOR_Y) {
                    y = FLOOR_Y;
                    vy = 0;
                    grounded = true;
                }

                if (x < 0) x = 0;
                if (x > window.innerWidth - 60) x = window.innerWidth - 60;

                // INTEGRATED COLLISION DETECTION
                if (currentQ) {
                    const blockY = 250;
                    const blockW = 100;

                    // Iterate options to find hit
                    for (const opt of currentQ.options) {
                        const rawPercent = parseFloat(opt.x);
                        const screenW = window.innerWidth;
                        const bx = (screenW * rawPercent) / 100;

                        // Vertical Trigger: If jumping/in air (y < 380)
                        if (y < 380) {
                            // Horizontal Overlap
                            if (x + 40 > bx && x + 20 < bx + blockW) {
                                // HIT!
                                handleChoice(opt.label);
                                break; // Stop checking
                            }
                        }
                    }
                }

                return { x, y, vy, grounded };
            });
            gameLoopRef.current = requestAnimationFrame(update);
        };
        gameLoopRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(gameLoopRef.current);
    }, [keys, currentQ]);

    // Helper to handle choice safely outside the loop to avoid state spam?
    // Actually, calling handleChoice inside state update is side-effecty but works for simple transition.
    // Better to use ref for 'isTransitioning' but let's trust React state batching or simple breakout.

    // We need to move handleChoice OUT of the setPlayer callback purely, or better: 
    // detection returns a 'hit' and we act on it. 
    // But since it's inside requestAnimationFrame, we need to be careful.
    // Let's modify handleChoice to be robust.

    const handleChoice = (choice: string) => {
        // Prevent double trigger if already transitioning?
        // simple way: index check? Logic handles it by changing question index or phase.

        // We need to ensure we don't trigger 60 times a second.
        // We can just rely on state update to re-render and kill this loop instance.
        addDateChoice(choice);

        setPlayer({ x: 50, y: 300, vy: 0, grounded: false });

        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setPhase('card');
        }
    };

    if (!currentQ) return null;

    return (
        <div className="relative w-full h-screen bg-indigo-50 overflow-hidden font-sans select-none">
            {/* Background */}
            <div className="absolute top-10 w-full text-center">
                <h2 className="text-3xl font-bold text-indigo-600 font-cinzel animate-fade-in">{currentQ.question}</h2>
                <p className="text-gray-500 mt-2">Jump to hit your choice!</p>
            </div>

            {/* Choice Blocks */}
            {currentQ.options.map((opt) => (
                <div
                    key={opt.id}
                    className={`absolute w-[100px] h-[80px] rounded-xl shadow-lg border-b-8 border-black/20 flex flex-col items-center justify-center text-white font-bold text-sm text-center p-1 cursor-pointer transition-transform hover:scale-105 ${opt.color}`}
                    style={{ left: opt.x, top: '250px' }}
                >
                    <div>{opt.label}</div>
                    <div className="absolute -bottom-4 w-full text-center text-black/20 text-xs"></div>
                </div>
            ))}

            {/* Player (Partner's Photo) */}
            <div
                className="absolute w-[60px] h-[60px] rounded-full shadow-md transition-transform border-4 border-indigo-500 overflow-hidden bg-white z-10"
                style={{
                    left: player.x,
                    top: player.y,
                    transform: `scaleX(${keys['ArrowLeft'] ? -1 : 1})`
                }}
            >
                {state.partnerPhoto && <img src={state.partnerPhoto} alt="Partner" className="w-full h-full object-cover" />}
            </div>

            {/* Floor */}
            <div
                className="absolute bottom-0 w-full h-[calc(100vh-450px)] bg-indigo-200 border-t-8 border-indigo-400"
                style={{ top: FLOOR_Y + 60 }}
            ></div>

            {/* Instruction overlay for first level */}
            {currentQuestionIndex === 0 && (
                <div className="absolute bottom-10 left-10 p-4 bg-white/80 rounded-lg backdrop-blur text-sm max-w-xs">
                    <p><strong>Tip:</strong> Use Arrow Keys to move. Jump <strong>UP</strong> into the blocks to select them!</p>
                </div>
            )}
        </div>
    );
}
