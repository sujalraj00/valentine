'use client';
import React, { forwardRef } from 'react';
import { BookPage as PageType } from '@/types';
import { cn } from '@/lib/utils';
import { Cinzel, Inter } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

interface BookPageProps {
    content: any; // Can be PageType or custom object for cover
    pageNumber?: number;
    isCover?: boolean;
    className?: string;
    // react-pageflip passes these
    style?: React.CSSProperties;
}

// react-pageflip requires forwardRef to manipulate the DOM
const BookPage = forwardRef<HTMLDivElement, BookPageProps>((props, ref) => {
    const { content, pageNumber, isCover, className, style } = props;

    return (
        <div
            className={cn("page bg-[#fdfaf7] h-full w-full shadow-inner overflow-hidden border-r border-[#e5e5e5]", className)}
            ref={ref}
            style={style} // MUST pass style from react-pageflip
            data-density={isCover ? 'hard' : 'soft'} // Hard covers for start/end
        >
            <div className={cn(
                "relative h-full w-full flex flex-col p-6 md:p-10",
                isCover ? "justify-center items-center text-center bg-[#8b4513] text-[#f3e5ab] border-4 border-[#5c2e0b]" : ""
            )}>
                {/* Paper Texture Overlay */}
                {!isCover && (
                    <div
                        className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none z-0"
                        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}
                    />
                )}

                {isCover ? (
                    <div className="border-4 border-current p-8 w-full h-full flex flex-col justify-center items-center relative z-10">
                        <h1 className={cn(cinzel.className, "text-3xl md:text-5xl font-bold mb-6 drop-shadow-md")}>{content.title}</h1>
                        <p className="text-sm tracking-[0.3em] uppercase opacity-90 font-serif">{content.text}</p>
                        <div className="mt-16 text-xs opacity-60 font-mono tracking-widest">EST. 2024</div>
                    </div>
                ) : (
                    <div className="relative z-10 h-full flex flex-col">
                        {/* Header/Title */}
                        {content.title && (
                            <div className="mb-4 text-center border-b border-gray-200 pb-2">
                                <h3 className={cn(cinzel.className, "text-lg font-bold text-gray-800")}>{content.title}</h3>
                            </div>
                        )}

                        {/* Image Area - Flexible grow */}
                        <div className="flex-grow relative flex items-center justify-center min-h-0 mb-4 group">
                            {content.image ? (
                                <div className="relative w-full h-full max-h-[50vh] p-2 bg-white shadow-sm rotate-1 transition-transform group-hover:rotate-0 duration-500">
                                    <div className="w-full h-full overflow-hidden border border-gray-100">
                                        <img
                                            src={content.image}
                                            alt="Memory"
                                            className="w-full h-full object-cover"
                                            loading="eager"
                                        />
                                    </div>
                                    {/* Tape effect */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/40 backdrop-blur-sm shadow-sm rotate-[-2deg]" />
                                </div>
                            ) : (
                                content.type !== 'text-only' && (
                                    <div className="w-full h-40 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 text-gray-300 rounded-lg">
                                        <span className="text-xs">No Photo</span>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Text Area */}
                        {content.text && (
                            <div className="mt-auto bg-white/50 p-4 rounded-lg backdrop-blur-sm">
                                <p className={cn(inter.className, "text-sm text-gray-700 font-serif italic leading-relaxed text-center")}>
                                    "{content.text}"
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="absolute bottom-2 left-0 w-full text-center">
                            <span className="text-[10px] text-gray-400 font-mono tracking-widest">- {pageNumber} -</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

BookPage.displayName = 'BookPage';
export default BookPage;
