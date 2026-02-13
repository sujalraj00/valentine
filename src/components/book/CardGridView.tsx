'use client';
import { BookData } from '@/types';
import { FlippingCard } from '@/components/ui/flipping-card';
import AppImage from '@/components/ui/AppImage';
import { cn } from '@/lib/utils';
import { Cinzel, Inter } from 'next/font/google';
import Icon from '@/components/ui/AppIcon';

const cinzel = Cinzel({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

interface CardGridViewProps {
    data: BookData;
}

export default function CardGridView({ data }: CardGridViewProps) {
    return (
        <div className="w-full h-full overflow-y-auto custom-scrollbar p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className={cn(cinzel.className, "text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg")}>{data.coupleName}</h1>
                    <p className="text-white/80 font-serif italic text-lg">Our Memories</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center pb-20">
                    {data.pages.map((page, index) => (
                        <FlippingCard
                            key={page.id}
                            width={320}
                            height={400}
                            className="bg-transparent border-none shadow-none"
                            frontContent={
                                <div className="w-full h-full flex flex-col bg-white p-3 shadow-2xl rounded-xl relative overflow-hidden group-hover/flipping-card:border-primary/50 transition-colors border-2 border-transparent">
                                    {page.image ? (
                                        <div className="relative w-full flex-grow mb-2 rounded-lg overflow-hidden bg-gray-100">
                                            <AppImage src={page.image} alt="Memory" className="object-cover w-full h-full" />
                                            <div className="absolute inset-0 bg-black/0 group-hover/flipping-card:bg-black/10 transition-colors" />
                                        </div>
                                    ) : (
                                        <div className="relative w-full flex-grow mb-2 rounded-lg overflow-hidden bg-gray-100">
                                            <AppImage
                                                src={`https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop`}
                                                alt="Memory Placeholder"
                                                className="object-cover w-full h-full opacity-80 grayscale group-hover/flipping-card:grayscale-0 transition-all"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                <span className="text-white text-xs font-medium backdrop-blur-sm px-2 py-1 rounded">No Photo</span>
                                            </div>
                                        </div>
                                    )}
                                    {page.title && (
                                        <h3 className={cn(cinzel.className, "text-xl font-bold text-center text-gray-800 py-4 border-t border-dashed border-gray-200")}>{page.title}</h3>
                                    )}
                                    <div className="absolute top-3 right-3 opacity-0 group-hover/flipping-card:opacity-100 transition-opacity">
                                        <span className="bg-black/60 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-md font-bold shadow-lg">Tap to Flip</span>
                                    </div>
                                </div>
                            }
                            backContent={
                                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-white shadow-2xl text-center border-2 border-dashed border-primary/20 rounded-xl relative">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                                    <div className="mb-6 text-primary p-4 bg-primary/5 rounded-full ring-1 ring-primary/20">
                                        <Icon name="HeartIcon" size={32} className="animate-pulse-slow" />
                                    </div>
                                    <div className="flex-grow flex items-center justify-center">
                                        {page.text ? (
                                            <p className={cn(inter.className, "text-base text-gray-600 font-serif italic leading-relaxed")}>
                                                &ldquo;{page.text}&rdquo;
                                            </p>
                                        ) : (
                                            <p className="text-gray-400 text-sm italic">No details added.</p>
                                        )}
                                    </div>
                                    <div className="mt-auto w-full pt-6 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 font-mono uppercase tracking-widest">
                                        <span>Memory {index + 1}</span>
                                        <Icon name="SparklesIcon" size={12} className="text-yellow-400" />
                                    </div>
                                </div>
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
