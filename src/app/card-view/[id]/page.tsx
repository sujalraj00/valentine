'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BookData } from '@/types';
import BookViewer from '@/components/book/BookViewer';
import CardGridView from '@/components/book/CardGridView';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function CardViewPage() {
    const params = useParams();
    const router = useRouter();
    const [bookData, setBookData] = useState<BookData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, fetch from API. For demo, get from localStorage
        const id = params?.id as string;
        if (id) {
            const savedData = localStorage.getItem(`card_${id}`);
            if (savedData) {
                setBookData(JSON.parse(savedData));
            }
        }
        setLoading(false);
    }, [params]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!bookData) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-3xl font-serif font-bold mb-4">Card Not Found</h1>
                <p className="text-muted-foreground mb-8">This card might have expired or doesn't exist.</p>
                <Link href="/create-e-card" className="px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-colors">
                    Create Your Own
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background overflow-hidden flex flex-col">
            {/* Header / Nav */}
            <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
                <Link href="/" className="pointer-events-auto flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                    <Icon name="HomeIcon" size={20} />
                    <span className="font-bold tracking-widest text-sm uppercase">ValentineViral</span>
                </Link>

                <button
                    onClick={() => {
                        const url = window.location.href;
                        navigator.clipboard.writeText(url);
                        alert('Link copied to clipboard!');
                    }}
                    className="pointer-events-auto px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-bold text-white hover:bg-white/20 transition-all flex items-center gap-2"
                >
                    <Icon name="ShareIcon" size={16} />
                    <span>Share This Moment</span>
                </button>
            </header>

            {/* Main Book Area */}
            <main className="flex-grow flex items-center justify-center relative py-20">
                {/* Dynamic Background based on Theme */}
                <div className="absolute inset-0 z-0">
                    {bookData.theme === 'retro' && <div className="absolute inset-0 bg-zinc-950 opacity-100 bg-[linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111),linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111)] bg-[length:20px_20px]" />}
                    {bookData.theme === 'clay' && <div className="absolute inset-0 bg-rose-50" />}
                    {bookData.theme === 'holo' && <div className="absolute inset-0 bg-slate-950 bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.1),transparent_70%)]" />}
                    {bookData.theme === 'meme' && <div className="absolute inset-0 bg-yellow-50 bg-[url('https://www.transparenttextures.com/patterns/comic-dots.png')]" />}
                    {bookData.theme === 'minimal' && <div className="absolute inset-0 bg-stone-50" />}
                    {bookData.theme === 'modern' && <div className="absolute inset-0 bg-neutral-950" />}
                </div>

                <div className="relative z-10 w-full max-w-6xl px-4 h-full flex flex-col justify-center">
                    {bookData.format === 'card' ? (
                        <CardGridView data={bookData} />
                    ) : (
                        <BookViewer data={bookData} />
                    )}
                </div>
            </main>

            {/* Footer CTA */}
            <footer className="fixed bottom-0 left-0 w-full p-6 text-center z-50 pointer-events-none">
                <div className="inline-block pointer-events-auto">
                    <Link href="/create-e-card" className="group flex items-center gap-2 px-6 py-3 bg-black/80 backdrop-blur-md text-white rounded-full font-bold hover:bg-black transition-all hover:scale-105 border border-white/10 shadow-2xl">
                        <Icon name="SparklesIcon" size={16} className="text-yellow-400 group-hover:rotate-12 transition-transform" />
                        <span>Make Your Own Viral Card</span>
                    </Link>
                </div>
            </footer>
        </div>
    );
}
