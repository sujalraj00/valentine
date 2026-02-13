"use client";

import React, { useState } from 'react';
import { Heart, Upload, Sparkles, Copy, Check, X } from 'lucide-react';
import ValentineQuizCard from '@/components/ui/valentine-quiz-card';

interface CardCreatorProps {
    onClose: () => void;
}

export default function CardCreator({ onClose }: CardCreatorProps) {
    const [p1Image, setP1Image] = useState<string | null>(null);
    const [p2Image, setP2Image] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [cardLink, setCardLink] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const PREDEFINED_MESSAGES = [
        "In your arms is where I belong forever. Happy Valentine's Day! ❤️",
        "Every moment with you is a beautiful dream come true. ✨",
        "You are my favorite notification. I love you! 💌",
        "Thank you for being my person and my greatest adventure. 🏔️",
        "Life is better with you by my side. Happy Valentine's! 🌹"
    ];

    const generateAIPremiumMessage = () => {
        const randomIndex = Math.floor(Math.random() * PREDEFINED_MESSAGES.length);
        setMessage(PREDEFINED_MESSAGES[randomIndex]);
    };

    const resizeImage = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_SIZE = 600;
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        }
                    } else {
                        if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
            };
        });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setImg: (val: string) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            const resized = await resizeImage(file);
            setImg(resized);
        }
    };

    const createCard = async () => {
        if (!p1Image || !p2Image || !message) return;
        setLoading(true);
        try {
            const res = await fetch('/api/couple-card', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    partner1Image: p1Image,
                    partner2Image: p2Image,
                    romanticMessage: message
                })
            });
            const data = await res.json();
            if (data.success) {
                // Using hardcoded production domain
                const prodDomain = "https://valentine-eight-alpha-77.vercel.app";
                setCardLink(`${prodDomain}/card/${data.cardId}`);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to create card. Try again!");
        } finally {
            setLoading(false);
        }
    };

    const copyLink = () => {
        if (cardLink) {
            navigator.clipboard.writeText(cardLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className={`bg-zinc-900 border border-white/10 p-8 rounded-[40px] ${cardLink ? 'max-w-2xl' : 'max-w-lg'} w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[90vh]`}>
                <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-20">
                    <X size={24} />
                </button>

                {!cardLink && (
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic italic">Create Couple Card</h2>
                        <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mt-2">Generate a unique moment</p>
                    </div>
                )}

                {!cardLink ? (
                    <div className="space-y-8">
                        <div className="flex justify-center items-center gap-6">
                            {[1, 2].map((num) => (
                                <div key={num} className="relative group">
                                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center bg-white/5 overflow-hidden transition-all group-hover:border-white/40">
                                        {(num === 1 ? p1Image : p2Image) ? (
                                            <img src={(num === 1 ? p1Image : p2Image)!} className="w-full h-full object-cover" />
                                        ) : (
                                            <Upload className="text-white/20 group-hover:text-white/40 transition-colors" />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => handleFileUpload(e, num === 1 ? setP1Image : setP2Image)}
                                        />
                                    </div>
                                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-black text-zinc-600 uppercase tracking-tighter bg-zinc-900 px-1">Partner {num}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">Your Romantic Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-sans min-h-[100px]"
                                placeholder="Write something beautiful..."
                            />
                            <button
                                onClick={generateAIPremiumMessage}
                                className="flex items-center gap-2 text-[10px] font-black text-pink-500 uppercase tracking-widest hover:text-pink-400 transition-colors"
                            >
                                <Sparkles size={12} />
                                Generate AI Message
                            </button>
                        </div>

                        <button
                            onClick={createCard}
                            disabled={loading || !p1Image || !p2Image || !message}
                            className="w-full py-5 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
                        >
                            {loading ? "Crafting..." : "Generate Magic Link"}
                        </button>
                    </div>
                ) : (
                    <div className="text-center space-y-8 animate-in zoom-in duration-300">
                        <div className="flex flex-col items-center">
                            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic italic mb-4">Your Card is Live!</h2>

                            {/* GlassCard Reveal Immediately */}
                            <div className="relative mb-10 transform scale-90 md:scale-100 origin-center">
                                <ValentineQuizCard
                                    shareUrl={cardLink}
                                    className="mx-auto"
                                    title="Our Valentine Moment"
                                    description="A special memory captured just for us. ❤️"
                                    partner1Image={p1Image!}
                                    partner2Image={p2Image!}
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-black rounded-2xl border border-white/10 flex items-center justify-between gap-4">
                            <span className="text-zinc-400 text-[10px] font-mono truncate">{cardLink}</span>
                            <button
                                onClick={copyLink}
                                className="flex-shrink-0 p-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={copyLink} className="py-4 bg-pink-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-pink-700 transition-all">
                                {copied ? "Copied!" : "Copy Link"}
                            </button>
                            <button onClick={onClose} className="py-4 bg-white/5 border border-white/10 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
