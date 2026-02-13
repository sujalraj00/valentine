"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { Heart } from 'lucide-react';

export default function Phase1_Platformer() {
    const { state, setPhase } = useGame();
    // Game Physics State (Same logic as before, just separate component)
    const [player, setPlayer] = useState({ x: 50, y: 300, vy: 0, grounded: false });
    const [keys, setKeys] = useState<Record<string, boolean>>({});
    const gameLoopRef = useRef<number>(0);
    const GRAVITY = 0.6;
    const JUMP_FORCE = -12;
    const SPEED = 5;
    const FLOOR_Y = 400;

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

    // Game Loop
    useEffect(() => {
        const update = () => {
            setPlayer(prev => {
                let { x, y, vy, grounded } = prev;
                if (keys['ArrowRight'] || keys['KeyD']) x += SPEED;
                if (keys['ArrowLeft'] || keys['KeyA']) x -= SPEED;
                if ((keys['ArrowUp'] || keys['Space'] || keys['KeyW']) && grounded) {
                    vy = JUMP_FORCE;
                    grounded = false;
                }
                vy += GRAVITY;
                y += vy;
                if (y >= FLOOR_Y) {
                    y = FLOOR_Y;
                    vy = 0;
                    grounded = true;
                }
                if (x < 0) x = 0;

                // Block Collision (Trigger Phase 2)
                const blockX = window.innerWidth * 0.7;
                const blockY = 250;
                const blockW = 80; // Size of destination photo
                const blockH = 80;

                if (
                    x + 40 > blockX && x < blockX + blockW &&
                    y <= blockY + blockH + 10 && y >= blockY + blockH - 10 &&
                    vy < 0
                ) {
                    setPhase('question');
                }

                return { x, y, vy, grounded };
            });
            gameLoopRef.current = requestAnimationFrame(update);
        };
        gameLoopRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(gameLoopRef.current);
    }, [keys, setPhase]);

    return (
        <div className="relative w-full h-screen bg-pink-100 overflow-hidden font-sans">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-20 left-20 text-pink-300"><Heart size={100} /></div>
                <div className="absolute bottom-40 right-40 text-pink-300"><Heart size={80} /></div>
            </div>

            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-pink-600 font-bold text-xl animate-pulse">
                Jump to reach your Valentine!
            </div>

            {/* Destination (Creator's Photo) */}
            <div
                className="absolute w-[80px] h-[80px] rounded-full shadow-lg border-4 border-white overflow-hidden animate-bounce flex items-center justify-center bg-red-100"
                style={{ left: '70%', top: '250px' }}
            >
                {state.creatorPhoto ? (
                    <img src={state.creatorPhoto} alt="Creator" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-3xl">?</span>
                )}
            </div>

            {/* Player (Partner's Photo) */}
            <div
                className="absolute w-[60px] h-[60px] rounded-full shadow-md transition-transform border-4 border-pink-500 overflow-hidden bg-white"
                style={{
                    left: player.x,
                    top: player.y,
                    transform: `scaleX(${keys['ArrowLeft'] ? -1 : 1})`
                }}
            >
                {state.partnerPhoto ? (
                    <img src={state.partnerPhoto} alt="Partner" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-pink-600"></div>
                )}
            </div>

            {/* Floor */}
            <div
                className="absolute bottom-0 w-full h-[calc(100vh-450px)] bg-green-300 border-t-8 border-green-500"
                style={{ top: FLOOR_Y + 60 }}
            ></div>
        </div>
    );
}
