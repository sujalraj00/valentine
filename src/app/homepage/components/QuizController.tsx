"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Trophy, Users, Send, Check, X, Sparkles, Clock } from 'lucide-react';

interface QuizControllerProps {
    onClose: () => void;
}

export default function QuizController({ onClose }: QuizControllerProps) {
    const [phase, setPhase] = useState<'start' | 'waiting' | 'ready' | 'quiz' | 'results'>('start');
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [playerId, setPlayerId] = useState<string | null>(null);
    const [partnerJoined, setPartnerJoined] = useState(false);
    const [p1Ready, setP1Ready] = useState(false);
    const [p2Ready, setP2Ready] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [partnerScore, setPartnerScore] = useState(0);
    const [questions, setQuestions] = useState<any[]>([]);
    const [finished, setFinished] = useState(false);
    const [partnerFinished, setPartnerFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isP1, setIsP1] = useState(false);
    const [startTime, setStartTime] = useState<number>(0);

    const pollSession = useCallback(async () => {
        if (!sessionId) return;
        try {
            const res = await fetch(`/api/quiz?id=${sessionId}`);
            const data = await res.json();

            if (data.player2Id) setPartnerJoined(true);
            setP1Ready(data.p1Ready);
            setP2Ready(data.p2Ready);

            if (isP1) {
                setPartnerScore(data.p2Score);
                setPartnerFinished(data.p2Finished);
            } else {
                setPartnerScore(data.p1Score);
                setPartnerFinished(data.p1Finished);
            }

            if (phase === 'waiting' && data.player2Id) setPhase('ready');
            if (phase === 'ready' && data.p1Ready && data.p2Ready) {
                setQuestions(data.questions);
                setPhase('quiz');
                setStartTime(Date.now());
            }
            if (phase === 'quiz' && finished && data.p1Finished && data.p2Finished) {
                setPhase('results');
            }
        } catch (err) {
            console.error("Polling error:", err);
        }
    }, [sessionId, phase, isP1, finished]);

    useEffect(() => {
        const interval = setInterval(pollSession, 2000);
        return () => clearInterval(interval);
    }, [pollSession]);

    const startSession = async () => {
        const res = await fetch('/api/quiz', {
            method: 'POST',
            body: JSON.stringify({ action: 'create' })
        });
        const data = await res.json();
        setSessionId(data.sessionId);
        setPlayerId(data.playerId);
        setIsP1(true);
        setPhase('waiting');
    };

    const markReady = async () => {
        await fetch('/api/quiz', {
            method: 'POST',
            body: JSON.stringify({ action: 'update', sessionId, playerId, ready: true })
        });
    };

    const submitAnswer = async (option: string) => {
        const q = questions[currentQuestionIndex];
        let newScore = score;
        if (option === q.correctAnswer) {
            const timeTaken = (Date.now() - startTime) / 1000;
            newScore += 10;
            if (timeTaken < 5) newScore += 5; // Speed bonus
        }
        setScore(newScore);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setStartTime(Date.now());
            await fetch('/api/quiz', {
                method: 'POST',
                body: JSON.stringify({ action: 'update', sessionId, playerId, score: newScore })
            });
        } else {
            setFinished(true);
            await fetch('/api/quiz', {
                method: 'POST',
                body: JSON.stringify({ action: 'update', sessionId, playerId, score: newScore, finished: true })
            });
        }
    };

    const copyLink = () => {
        const url = `${window.location.origin}/?join=${sessionId}`;
        navigator.clipboard.writeText(url);
        alert("Link copied! Share it with your partner.");
    };

    // Auto-join if URL has join param (Simulated here, in real app handle in useEffect/URL)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const joinId = params.get('join');
        if (joinId && phase === 'start') {
            const join = async () => {
                const res = await fetch('/api/quiz', {
                    method: 'POST',
                    body: JSON.stringify({ action: 'join', sessionId: joinId })
                });
                const data = await res.json();
                if (data.success) {
                    setSessionId(joinId);
                    setPlayerId(data.playerId);
                    setIsP1(false);
                    setPhase('ready');
                }
            };
            join();
        }
    }, [phase]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500">
            <div className="bg-zinc-900 border border-white/5 p-8 rounded-[50px] max-w-lg w-full relative shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                <button onClick={onClose} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors">
                    <X size={24} />
                </button>

                {phase === 'start' && (
                    <div className="text-center py-10 space-y-8">
                        <div className="w-20 h-20 bg-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
                            <Sparkles className="text-pink-500" size={32} />
                        </div>
                        <div>
                            <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic italic">Quiz Challenge</h2>
                            <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mt-2 px-10">How well do you know your partner? Play simultaneously and find out.</p>
                        </div>
                        <button
                            onClick={startSession}
                            className="w-full py-6 bg-white text-black rounded-full font-black uppercase tracking-widest hover:bg-zinc-200 transition-all transform hover:scale-105"
                        >
                            Start Live Challenge
                        </button>
                    </div>
                )}

                {phase === 'waiting' && (
                    <div className="text-center py-10 space-y-8 animate-in slide-in-from-bottom duration-500">
                        <div className="relative mx-auto w-24 h-24 mb-6">
                            <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-pink-500 rounded-full border-t-transparent animate-spin"></div>
                            <Users className="absolute inset-0 m-auto text-white/50" />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic italic">Waiting for Partner...</h2>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[10px] text-zinc-500 uppercase font-black mb-2">Share this invite link</p>
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-400 text-[10px] truncate max-w-[200px]">{window.location.origin}/?join={sessionId}</span>
                                <button onClick={copyLink} className="p-2 bg-white text-black rounded-lg hover:bg-zinc-200"><Send size={12} /></button>
                            </div>
                        </div>
                    </div>
                )}

                {phase === 'ready' && (
                    <div className="text-center py-10 space-y-8 animate-in zoom-in duration-500">
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic italic">Both Connected!</h2>
                        <div className="flex justify-center gap-10">
                            <div className="text-center">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${p1Ready ? 'border-pink-500 bg-pink-500/20' : 'border-white/10'}`}>
                                    {p1Ready ? <Check className="text-pink-500" /> : <div className="text-white/20">...</div>}
                                </div>
                                <span className="text-[10px] font-black text-zinc-500 mt-2 block uppercase">Partner 1</span>
                            </div>
                            <div className="text-center">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${p2Ready ? 'border-pink-500 bg-pink-500/20' : 'border-white/10'}`}>
                                    {p2Ready ? <Check className="text-pink-500" /> : <div className="text-white/20">...</div>}
                                </div>
                                <span className="text-[10px] font-black text-zinc-500 mt-2 block uppercase">Partner 2</span>
                            </div>
                        </div>
                        <button
                            disabled={(isP1 && p1Ready) || (!isP1 && p2Ready)}
                            onClick={markReady}
                            className="w-full py-6 bg-pink-600 text-white rounded-full font-black uppercase tracking-widest hover:bg-pink-700 transition-all disabled:opacity-50"
                        >
                            {(isP1 && p1Ready) || (!isP1 && p2Ready) ? "Waiting for other..." : "I'm Ready!"}
                        </button>
                    </div>
                )}

                {phase === 'quiz' && (
                    <div className="py-6 space-y-8">
                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                            <div className="text-center">
                                <span className="text-[10px] font-black text-zinc-500 uppercase block mb-1">Your Score</span>
                                <span className="text-2xl font-black text-white italic">{score}</span>
                            </div>
                            <div className="text-pink-600 animate-pulse">
                                <Heart fill="currentColor" />
                            </div>
                            <div className="text-center">
                                <span className="text-[10px] font-black text-zinc-500 uppercase block mb-1">Partner Score</span>
                                <span className="text-2xl font-black text-white italic opacity-50">{partnerScore}</span>
                            </div>
                        </div>

                        {!finished ? (
                            <div className="animate-in fade-in slide-in-from-right duration-300">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Question {currentQuestionIndex + 1}/10</span>
                                    <div className="flex items-center gap-2 text-pink-500">
                                        <Clock size={16} />
                                        <span className="text-xs font-black tabular-nums">{timeLeft}s</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-8 tracking-tight leading-snug">
                                    {questions[currentQuestionIndex]?.question}
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {questions[currentQuestionIndex]?.options.map((opt: string) => (
                                        <button
                                            key={opt}
                                            onClick={() => submitAnswer(opt)}
                                            className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl text-left text-zinc-300 font-bold hover:bg-white/10 hover:border-pink-500/50 transition-all"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20 animate-pulse">
                                <h3 className="text-2xl font-black text-white uppercase italic italic">Awaiting Partner...</h3>
                                <p className="text-zinc-500 font-bold text-[10px] mt-4 uppercase">They are still answering!</p>
                            </div>
                        )}
                    </div>
                )}

                {phase === 'results' && (
                    <div className="text-center py-10 space-y-10 animate-in zoom-in duration-700">
                        <div className="relative inline-block">
                            <Trophy className="w-20 h-20 text-yellow-400 mx-auto" />
                            <Heart className="absolute -top-2 -right-2 text-pink-500 animate-beat" fill="currentColor" />
                        </div>

                        <div>
                            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-2">
                                {score > partnerScore ? "You Win!" : score < partnerScore ? "Partner Wins!" : "Matched Perfectly!"}
                            </h2>
                            <p className="text-pink-500 font-black text-sm uppercase tracking-widest">The Results are in</p>
                        </div>

                        <div className="flex justify-center gap-1 w-full bg-white/5 p-8 rounded-[40px] border border-white/10">
                            <div className="flex-1 text-center">
                                <span className="text-[10px] font-black text-zinc-500 uppercase block mb-2">You</span>
                                <span className="text-4xl font-black text-white italic italic">{score}</span>
                            </div>
                            <div className="w-px h-16 bg-white/10 self-center"></div>
                            <div className="flex-1 text-center">
                                <span className="text-[10px] font-black text-zinc-500 uppercase block mb-2">Partner</span>
                                <span className="text-4xl font-black text-white italic italic opacity-50">{partnerScore}</span>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full py-6 bg-white text-black rounded-full font-black uppercase tracking-widest hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-[0_15px_30px_rgba(255,255,255,0.1)]"
                            >
                                Generate Couple Card
                            </button>
                            <button onClick={onClose} className="text-zinc-600 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">Back to Homepage</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
