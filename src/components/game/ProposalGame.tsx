"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Trophy, Users, Send, Check, X, Sparkles, Copy, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Default Template
const DEFAULT_QUESTIONS = [
    { id: 'q1', text: "Where is my ideal date night?", options: ["Fancy Dinner", "Cozy Movie Night", "Adventure/Hike", "Beach Sunset"], correctAnswer: "Fancy Dinner" },
    { id: 'q2', text: "What is my love language?", options: ["Words of Affirmation", "Acts of Service", "Gifts", "Quality Time", "Physical Touch"], correctAnswer: "Quality Time" },
    { id: 'q3', text: "What food could I eat forever?", options: ["Pizza", "Sushi", "Tacos", "Burgers", "Salad"], correctAnswer: "Pizza" },
    { id: 'q4', text: "What do I value most in us?", options: ["Trust", "Humor", "Support", "Communication"], correctAnswer: "Trust" },
    { id: 'q5', text: "When did I know I liked you?", options: ["First Sight", "First Date", "After a while", "Instantly"], correctAnswer: "First Sight" },
];

interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
}

interface ProposalGameProps {
    onClose: () => void;
}

export default function ProposalGame({ onClose }: ProposalGameProps) {
    const [mode, setMode] = useState<'intro' | 'create' | 'share' | 'play' | 'result'>('intro');
    const [role, setRole] = useState<'creator' | 'player'>('creator');

    // Creator State
    const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS); // Start with defaults
    const [editingQ, setEditingQ] = useState<string | null>(null); // ID of question being edited
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [playerId, setPlayerId] = useState<string | null>(null);
    const [shareUrl, setShareUrl] = useState('');

    // Player State
    const [currentPlayIdx, setCurrentPlayIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [playerAnswers, setPlayerAnswers] = useState<Record<string, string>>({});
    const [quizQuestions, setQuizQuestions] = useState<any[]>([]);

    // Polling Result
    const [creatorFeedback, setCreatorFeedback] = useState<any>(null);

    useEffect(() => {
        // Check URL for join param
        const params = new URLSearchParams(window.location.search);
        const joinId = params.get('join');
        if (joinId) {
            setRole('player');
            setMode('intro');
            setSessionId(joinId);
        }
    }, []);

    // --- Creator Flow ---

    const addNewQuestion = () => {
        const newId = `q-${Date.now()}`;
        setQuestions(prev => [...prev, {
            id: newId,
            text: "New Question",
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correctAnswer: "Option 1"
        }]);
        setEditingQ(newId);
    };

    const removeQuestion = (id: string) => {
        setQuestions(prev => prev.filter(q => q.id !== id));
    };

    const updateQuestion = (id: string, field: keyof Question, value: any) => {
        setQuestions(prev => prev.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const updateOption = (qId: string, optIdx: number, value: string) => {
        setQuestions(prev => prev.map(q => {
            if (q.id !== qId) return q;
            const newOptions = [...q.options];
            newOptions[optIdx] = value;
            // If the changed option was the correct answer, update correct answer text too? 
            // Better strategy: simply check if old correct answer matches old option value.
            const oldOpt = q.options[optIdx];
            let newCorrect = q.correctAnswer;
            if (q.correctAnswer === oldOpt) newCorrect = value;

            return { ...q, options: newOptions, correctAnswer: newCorrect };
        }));
    };

    const createSession = async () => {
        // Construct questions payload
        const questionsPayload = questions.map(q => ({
            question: q.text,
            options: q.options,
            correctAnswer: q.correctAnswer
        }));

        try {
            const res = await fetch('/api/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'create', questions: questionsPayload })
            });
            const data = await res.json();
            if (data.success) {
                setSessionId(data.sessionId);
                setPlayerId(data.playerId);
                setShareUrl(`${window.location.origin}/?join=${data.sessionId}`);
                setMode('share');

                // Start polling for completion
                startPolling(data.sessionId, true);
            }
        } catch (error) {
            console.error("Failed to create session", error);
        }
    };

    // --- Player Flow ---

    const joinSession = async () => {
        if (!sessionId) return;
        try {
            const res = await fetch(`/api/quiz?id=${sessionId}`); // Get session data
            const sessionData = await res.json();

            if (sessionData.error) {
                alert("Session not found!");
                return;
            }

            setQuizQuestions(sessionData.questions);

            const joinRes = await fetch('/api/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'join', sessionId })
            });
            const joinData = await joinRes.json();

            if (joinData.success) {
                setPlayerId(joinData.playerId);
                setMode('play');
            }
        } catch (error) {
            console.error("Failed to join", error);
        }
    };

    const handlePlayAnswer = (answer: string) => {
        const currentQ = quizQuestions[currentPlayIdx];
        const isCorrect = answer === currentQ.correctAnswer;
        let currentScore = score;

        // Store the answer
        setPlayerAnswers(prev => ({ ...prev, [currentQ._id || currentQ.id]: answer }));

        if (isCorrect) {
            currentScore += 1;
            setScore(currentScore);
        }

        if (currentPlayIdx < quizQuestions.length - 1) {
            setCurrentPlayIdx(prev => prev + 1);
        } else {
            finishQuiz(isCorrect ? score + 1 : score, { ...playerAnswers, [currentQ._id || currentQ.id]: answer });
        }
    };

    const finishQuiz = async (finalScore: number, finalAnswers: Record<string, string>) => {
        setScore(finalScore);
        // Send score and answers
        await fetch('/api/quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'update',
                sessionId,
                playerId,
                score: finalScore * 10,
                finished: true,
                p2Answers: finalAnswers
            })
        });
        setMode('result');
    };

    // --- Polling (For Creator to see result) ---
    const startPolling = (sid: string, isCreator: boolean) => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch(`/api/quiz?id=${sid}`);
                const data = await res.json();

                if (isCreator) {
                    if (data.p2Finished) {
                        setCreatorFeedback(data);
                    }
                }
            } catch (e) { console.error(e); }
        }, 3000);
        return () => clearInterval(interval);
    };


    // --- RENDER ---

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500 overflow-y-auto">
            <div className="bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-[40px] max-w-2xl w-full relative shadow-2xl min-h-[500px] flex flex-col my-10">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20">
                    <X size={20} className="text-zinc-400" />
                </button>

                {/* HEADER */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-500/20 text-pink-500 mb-2 animate-pulse">
                        <Heart fill="currentColor" size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase">Valentine Proposal</h2>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-grow flex flex-col">

                    {/* 1. INTRO */}
                    {mode === 'intro' && (
                        <div className="space-y-8 text-center my-auto">
                            {role === 'creator' ? (
                                <>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-white">Challenge Your Partner</h3>
                                        <p className="text-zinc-400 max-w-sm mx-auto">Create a custom quiz to test how well they know you. Add your own questions!</p>
                                    </div>
                                    <button
                                        onClick={() => setMode('create')}
                                        className="w-full py-4 bg-pink-600 text-white rounded-2xl font-bold text-lg hover:bg-pink-700 transition-all shadow-lg shadow-pink-500/20 hover:scale-105 transform"
                                    >
                                        Create Proposal Quiz
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-white">You've Been Challenged!</h3>
                                        <p className="text-zinc-400 max-w-sm mx-auto">Your partner sent you a quiz. Let's see how much you really know!</p>
                                    </div>
                                    <button
                                        onClick={joinSession}
                                        className="w-full py-4 bg-pink-600 text-white rounded-2xl font-bold text-lg hover:bg-pink-700 transition-all shadow-lg shadow-pink-500/20 hover:scale-105 transform"
                                    >
                                        Play Now
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {/* 2. CREATE (Builder) */}
                    {mode === 'create' && (
                        <div className="space-y-6 flex flex-col h-full">
                            <div className="flex-grow space-y-4 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
                                {questions.map((q, idx) => (
                                    <div key={q.id} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Question {idx + 1}</span>
                                            <button onClick={() => removeQuestion(q.id)} className="text-zinc-600 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                        </div>

                                        <input
                                            type="text"
                                            value={q.text}
                                            onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                                            placeholder="Enter your question..."
                                            className="w-full bg-transparent text-lg font-bold text-white placeholder:text-zinc-600 outline-none border-b border-white/10 focus:border-pink-500 pb-2 transition-colors"
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {q.options.map((opt, optIdx) => (
                                                <div key={optIdx} className="relative group">
                                                    <input
                                                        value={opt}
                                                        onChange={(e) => updateOption(q.id, optIdx, e.target.value)}
                                                        className={`w-full p-2 pl-4 rounded-lg bg-black/20 border outline-none text-sm transition-all ${q.correctAnswer === opt ? 'border-green-500 text-green-400' : 'border-white/10 text-zinc-300 focus:border-pink-500/50'}`}
                                                    />
                                                    <button
                                                        onClick={() => updateQuestion(q.id, 'correctAnswer', opt)}
                                                        className={`absolute right-2 top-2 h-5 w-5 rounded-full border flex items-center justify-center transition-all ${q.correctAnswer === opt ? 'bg-green-500 border-green-500 text-black' : 'border-zinc-600 hover:border-green-500 text-transparent hover:text-green-500'}`}
                                                        title="Mark as correct answer"
                                                    >
                                                        <Check size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-4 border-t border-white/10">
                                <button onClick={addNewQuestion} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-dashed border-zinc-600 hover:border-zinc-400 text-zinc-400 hover:text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                                    <Plus size={16} /> Add Question
                                </button>

                                <button onClick={createSession} className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-pink-500/20 transition-all">
                                    Finish & Share Quiz
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 3. SHARE (Creator) */}
                    {mode === 'share' && (
                        <div className="space-y-8 text-center my-auto animate-in zoom-in duration-300">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Quiz Ready!</h3>
                                <p className="text-zinc-400 text-sm">Send this link to your partner & keep this tab open.</p>
                            </div>

                            <div className="p-4 bg-black/30 rounded-2xl border border-white/10 flex items-center gap-3">
                                <code className="flex-grow text-left text-xs md:text-sm text-pink-400 truncate font-mono">{shareUrl}</code>
                                <button
                                    onClick={() => { navigator.clipboard.writeText(shareUrl); alert('Copied!'); }}
                                    className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors shrink-0"
                                >
                                    <Copy size={18} className="text-white" />
                                </button>
                            </div>

                            {creatorFeedback?.p2Finished ? (
                                <div className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-2xl animate-bounce">
                                    <h4 className="text-xl font-bold text-green-400 mb-4">Partner Completed It!</h4>
                                    <div className="text-5xl font-black text-white italic tracking-tighter mb-4">{creatorFeedback.p2Score / 10}/{questions.length}</div>
                                    <p className="text-zinc-400 text-xs uppercase tracking-widest mb-6">Correct Answers</p>

                                    {/* Show Partner's Answers, specifically date night if available */}
                                    <div className="text-left bg-black/20 p-4 rounded-xl max-h-[200px] overflow-y-auto">
                                        <p className="text-xs font-bold text-pink-500 uppercase mb-2">Their Choices:</p>
                                        <ul className="space-y-2 text-sm text-zinc-300">
                                            {creatorFeedback.questions && creatorFeedback.questions.map((q: any, idx: number) => {
                                                const answer = creatorFeedback.p2Answers ? creatorFeedback.p2Answers[q._id || q.id] : 'No answer';
                                                return (
                                                    <li key={idx} className="border-b border-white/5 pb-1">
                                                        <span className="block text-xs text-zinc-500">{q.question}</span>
                                                        <span className="font-bold text-white">{answer}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4 py-8">
                                    <div className="relative w-16 h-16">
                                        <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-pink-500 rounded-full border-t-transparent animate-spin"></div>
                                    </div>
                                    <span className="text-zinc-500 text-sm font-bold animate-pulse">Waiting for them to play...</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 4. PLAY (Partner) */}
                    {mode === 'play' && quizQuestions.length > 0 && (
                        <div className="space-y-6 animate-in slide-in-from-right duration-300 my-auto">
                            <div className="flex justify-between items-end pb-4 border-b border-white/10">
                                <span className="text-5xl font-black text-white/10 italic leading-none absolute -top-4 right-0">{currentPlayIdx + 1}</span>
                                <span className="text-sm font-bold text-pink-500 uppercase tracking-widest">Question {currentPlayIdx + 1}/{quizQuestions.length}</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white min-h-[80px]">
                                {quizQuestions[currentPlayIdx].question}
                            </h3>

                            <div className="grid gap-3">
                                {quizQuestions[currentPlayIdx].options.map((opt: string) => (
                                    <button
                                        key={opt}
                                        onClick={() => handlePlayAnswer(opt)}
                                        className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-pink-600 hover:border-pink-600 transition-all text-left"
                                    >
                                        <span className="font-semibold text-zinc-300 group-hover:text-white transition-colors">{opt}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 5. RESULT (Partner) */}
                    {mode === 'result' && (
                        <div className="text-center space-y-8 animate-in zoom-in duration-500 my-auto">
                            <h3 className="text-xl font-bold text-zinc-400">All Done!</h3>

                            <div className="p-8 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-[30px]">
                                <div className="text-7xl font-black text-white italic tracking-tighter mb-2">{score}/{quizQuestions.length}</div>
                                <p className="text-pink-500 font-bold text-sm uppercase tracking-widest">Your Score</p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-zinc-400 text-sm">Your partner can now see your score!</p>
                                <Link
                                    href="/"
                                    className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all"
                                >
                                    Create Your Own Quiz
                                </Link>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
