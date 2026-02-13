import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 text-pink-200 animate-bounce delay-100">
                    <Heart size={48} fill="currentColor" />
                </div>
                <div className="absolute bottom-20 right-20 text-pink-200 animate-bounce delay-700">
                    <Heart size={64} fill="currentColor" />
                </div>
                <div className="absolute top-1/3 right-10 text-pink-100 animate-pulse">
                    <Heart size={32} fill="currentColor" />
                </div>
            </div>

            <main className="z-10 text-center max-w-4xl mx-auto space-y-12">
                <h1 className="text-4xl md:text-6xl font-bold text-pink-600 font-cinzel mb-8 drop-shadow-sm">
                    Celebrate Your Love
                </h1>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center justify-center">
                    {/* Option 1: Create Card */}
                    <Link
                        href="/create-e-card"
                        className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-pink-100 hover:border-pink-300 w-full md:w-80 aspect-square"
                    >
                        <div className="bg-pink-100 p-6 rounded-full mb-6 group-hover:bg-pink-200 transition-colors">
                            <Heart className="w-12 h-12 text-pink-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-cinzel">Create Your Card</h2>
                        <p className="text-gray-500 text-sm">Design a beautiful digital Valentine's card for your special someone.</p>
                    </Link>

                    {/* Option 2: Play Game */}
                    <Link
                        href="/game/create"
                        className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-pink-100 hover:border-pink-300 w-full md:w-80 aspect-square"
                    >
                        <div className="bg-red-100 p-6 rounded-full mb-6 group-hover:bg-red-200 transition-colors">
                            <span className="text-4xl">🎮</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-cinzel">Play "Love Quest"</h2>
                        <p className="text-gray-500 text-sm">Create a personalized game, share the link, and let your partner play to reach you!</p>
                    </Link>
                </div>
            </main>

            <footer className="absolute bottom-4 text-pink-400 text-sm">
                Made with ❤️ for Valentine's Day
            </footer>
        </div>
    );
}
