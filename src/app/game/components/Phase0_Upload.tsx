"use client";

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function Phase0_Upload() {
    const { setPartnerPhoto, setPartnerName, setPhase } = useGame();
    const [name, setName] = useState('');
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStart = () => {
        if (!name || !preview) return;
        setPartnerName(name);
        setPartnerPhoto(preview);
        setPhase('level1');
    };

    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-2 border-pink-100">
                <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center font-cinzel">Join the Quest!</h1>
                <p className="text-center text-gray-600 mb-6">Your Valentine has prepared a challenge. Upload your photo to become the hero!</p>

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
                        <label className="block text-gray-700 font-bold mb-2">Your Hero Photo</label>
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
                        onClick={handleStart}
                        disabled={!name || !preview}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Start Game 🎮
                    </button>
                </div>
            </div>
        </div>
    );
}
