"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Copy, Check } from 'lucide-react';
import { useGame } from '../context/GameContext'; // Adjust path as needed

export default function CreatorPage() {
    const { setCreatorPhoto, setCreatorName } = useGame();
    const [name, setName] = useState('');
    const [preview, setPreview] = useState<string | null>(null);
    const [link, setLink] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPreview(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateLink = async () => {
        if (!name || !preview) return;

        setLoading(true);
        // Save to Context
        setCreatorName(name);
        setCreatorPhoto(preview);

        try {
            const res = await fetch('/api/game/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ creatorName: name, creatorPhoto: preview })
            });

            if (!res.ok) {
                if (res.status === 413) throw new Error("Image too large");
                throw new Error("Failed to create game");
            }

            const data = await res.json();
            const generatedLink = `${window.location.origin}/game/play?id=${data.gameId}`;
            setLink(generatedLink);
        } catch (e) {
            alert("Error creating game! Image might be too large (max 4MB) or server issue.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (link) {
            navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-2 border-pink-100">
                <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center font-cinzel">Create Your Quest</h1>

                {!link ? (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Your Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Your Photo (Mario's Destination)</label>
                            <div className="relative border-2 border-dashed border-pink-300 rounded-lg p-4 flex flex-col items-center justify-center bg-pink-50 hover:bg-pink-100 transition-colors cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md" />
                                ) : (
                                    <div className="text-center text-pink-500">
                                        <Upload className="w-12 h-12 mx-auto mb-2" />
                                        <p>Click to upload photo</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleGenerateLink}
                            disabled={!name || !preview || loading}
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
                        >
                            {loading ? "Generating..." : "Generate Magic Link ✨"}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6 text-center animate-in fade-in zoom-in duration-300">
                        <div className="bg-green-100 p-4 rounded-lg text-green-700 mb-4">
                            Details Saved! Share this link with your Valentine.
                        </div>

                        <div className="p-4 bg-gray-100 rounded-lg break-all text-sm font-mono border border-gray-300 text-gray-900">
                            {link}
                        </div>

                        <button
                            onClick={copyToClipboard}
                            className="w-full flex items-center justify-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all"
                        >
                            {copied ? <Check /> : <Copy />}
                            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                        </button>

                        <p className="text-xs text-gray-500 mt-4">
                            *Note: Data is saved securely. You can share this link across devices!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
