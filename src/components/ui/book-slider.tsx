'use client';
import React, { useCallback, useRef, useState, useEffect } from 'react';
// @ts-ignore - react-pageflip lacks types
import HTMLFlipBook from 'react-pageflip';
import { cn } from '@/lib/utils';
import Icon from '../ui/AppIcon';

interface BookSliderProps {
    children: React.ReactNode;
    width?: number;
    height?: number;
    className?: string;
    onFlip?: (e: any) => void;
}

const BookSlider = ({ children, width = 400, height = 600, className, onFlip }: BookSliderProps) => {
    const bookRef = useRef<any>(null);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        setPageCount(React.Children.count(children));
    }, [children]);

    const nextFlip = useCallback(() => {
        bookRef.current?.pageFlip()?.flipNext();
    }, []);

    const prevFlip = useCallback(() => {
        bookRef.current?.pageFlip()?.flipPrev();
    }, []);

    return (
        <div className={cn("relative flex items-center justify-center w-full h-full", className)}>
            {/* Navigation Buttons for Accessibility/Desktop */}
            <button
                onClick={prevFlip}
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hidden md:flex"
            >
                <Icon name="ArrowLeftIcon" size={24} />
            </button>

            <button
                onClick={nextFlip}
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hidden md:flex"
            >
                <Icon name="ArrowRightIcon" size={24} />
            </button>

            <HTMLFlipBook
                width={width}
                height={height}
                size="stretch"
                minWidth={300}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1533}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                ref={bookRef}
                onFlip={onFlip}
                className="shadow-2xl"
                flippingTime={1000}
                usePortrait={false}
                startZIndex={0}
                autoSize={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
            >
                {children}
            </HTMLFlipBook>
        </div>
    );
};

export default BookSlider;
