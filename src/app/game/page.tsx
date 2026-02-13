"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import Confetti from 'react-confetti';

export default function GamePage() {
    const [gameState, setGameState] = useState<'playing' | 'question' | 'success'>('playing');
    const [noBtnPosition, setNoBtnPosition] = useState({ top: '50%', left: '60%' });
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    // Game Physics State
    const [player, setPlayer] = useState({ x: 50, y: 300, vy: 0, grounded: false });
    const [keys, setKeys] = useState<Record<string, boolean>>({});
    const blockRef = useRef<HTMLDivElement>(null);
    const gameLoopRef = useRef<number>(0);

    // Constants
    const GRAVITY = 0.6;
    const JUMP_FORCE = -12;
    const SPEED = 5;
    const FLOOR_Y = 400;

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        if (gameState !== 'playing') {
            cancelAnimationFrame(gameLoopRef.current);
            return;
        }

        const update = () => {
            setPlayer(prev => {
                let { x, y, vy, grounded } = prev;

                // Horizontal Movement
                if (keys['ArrowRight'] || keys['KeyD']) x += SPEED;
                if (keys['ArrowLeft'] || keys['KeyA']) x -= SPEED;

                // Jumping
                if ((keys['ArrowUp'] || keys['Space'] || keys['KeyW']) && grounded) {
                    vy = JUMP_FORCE;
                    grounded = false;
                }

                // Physics
                vy += GRAVITY;
                y += vy;

                // Floor Collision
                if (y >= FLOOR_Y) {
                    y = FLOOR_Y;
                    vy = 0;
                    grounded = true;
                }

                // Boundaries
                if (x < 0) x = 0;
                // Simple right boundary for demo
                if (x > window.innerWidth - 50) x = window.innerWidth - 50;

                // Block Collision (Trigger Question)
                // Block position approx: Left 70%, Top 250px
                // Ideally we get this from refs, but hardcoding for simplicity of the first pass
                const blockX = window.innerWidth * 0.7;
                const blockY = 250;
                const blockW = 60;
                const blockH = 60;

                // Check if player hits block from bottom
                if (
                    x + 50 > blockX && x < blockX + blockW && // Horizontal overlap
                    y <= blockY + blockH + 30 && y >= blockY + blockH - 30 && // Vertical hit range
                    vy < 0 // Moving up
                ) {
                    setGameState('question');
                }

                return { x, y, vy, grounded };
            });

            gameLoopRef.current = requestAnimationFrame(update);
        };

        gameLoopRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(gameLoopRef.current);
    }, [keys, gameState]);


    const moveNoButton = () => {
        const randomX = Math.random() * 60 + 20; // 20% to 80%
        const randomY = Math.random() * 80 + 20; // 20% to 80%
        setNoBtnPosition({ top: `${randomY}%`, left: `${randomX}%` });
    };

    return (
        <div className="relative w-full h-screen bg-pink-100 overflow-hidden font-sans">

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-20 left-20 text-pink-300"><Heart size={100} /></div>
                <div className="absolute bottom-40 right-40 text-pink-300"><Heart size={80} /></div>
            </div>

            {gameState === 'playing' && (
                <>
                    {/* Instructions */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 text-pink-600 font-bold text-xl animate-pulse">
                        Jump to hit the block!
                    </div>

                    {/* The Block */}
                    <div
                        ref={blockRef}
                        className="absolute w-[60px] h-[60px] bg-red-500 rounded-md shadow-lg flex items-center justify-center animate-bounce"
                        style={{ left: '70%', top: '250px' }}
                    >
                        <span className="text-white text-3xl font-bold">?</span>
                    </div>

                    {/* The Player */}
                    <div
                        className="absolute w-[40px] h-[50px] bg-pink-600 rounded-lg shadow-md transition-transform"
                        style={{
                            left: player.x,
                            top: player.y,
                            transform: `scaleX(${keys['ArrowLeft'] ? -1 : 1})`
                        }}
                    >
                        {/* Simple Face */}
                        <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-2 left-1 w-2 h-2 bg-white rounded-full opacity-60"></div>
                    </div>

                    {/* The Floor */}
                    <div
                        className="absolute bottom-0 w-full h-[calc(100vh-450px)] bg-green-300 border-t-8 border-green-500"
                        style={{ top: FLOOR_Y + 50 }}
                    ></div>
                </>
            )}

            {gameState === 'question' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4 border-4 border-pink-300 animate-in zoom-in duration-300">
                        <Heart className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
                        <h2 className="text-3xl font-bold text-pink-600 mb-8 font-cinzel">Will you be my Valentine?</h2>

                        <div className="relative h-20">
                            <button
                                onClick={() => setGameState('success')}
                                className="absolute left-10 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-110 transition-all text-xl"
                            >
                                Yes 💖
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
            )}

            {gameState === 'success' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-pink-500 z-50">
                    <Confetti width={windowSize.width} height={windowSize.height} />
                    <div className="text-center text-white animate-in slide-in-from-bottom duration-1000">
                        <h1 className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-lg">YAY! 🎉</h1>
                        <p className="text-2xl md:text-4xl">I knew you would say yes! ❤️</p>
                        <Heart className="w-32 h-32 text-red-200 mx-auto mt-8 animate-pulse" fill="currentColor" />

                        <button
                            onClick={() => window.location.href = '/create-e-card'}
                            className="mt-12 bg-white text-pink-600 font-bold py-4 px-10 rounded-full shadow-xl hover:bg-pink-100 transition-all transform hover:scale-105"
                        >
                            <span className="text-xl">Make a Card Now 💌</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
