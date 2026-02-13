'use client';
import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { BookData } from '@/types';
import BookPage from './BookPage';
import BookSlider from '../ui/book-slider';
import Icon from '../ui/AppIcon';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface BookViewerProps {
    data: BookData;
    isEditable?: boolean;
}

export default function BookViewer({ data, isEditable = false }: BookViewerProps) {
    const [isExporting, setIsExporting] = useState(false);
    const bookContainerRef = useRef<HTMLDivElement>(null);

    const handleExportPDF = async () => {
        setIsExporting(true);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = 210;
        const pdfHeight = 297;

        // Container for temporary rendering
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '-9999px';
        container.style.left = '-9999px';
        // A4 Dimensions at approx 2x density for better quality
        container.style.width = '794px'; // ~210mm @ 96dpi
        container.style.height = '1123px'; // ~297mm @ 96dpi
        document.body.appendChild(container);

        try {
            const pagesToRender = [
                // Front Cover
                <BookPage
                    key="front-cover"
                    isCover={true}
                    content={{
                        title: data.coupleName,
                        text: 'Our Love Story',
                        theme: data.theme
                    }}
                    className="w-full h-full"
                />,
                // Content Pages
                ...data.pages.map((page, i) => (
                    <BookPage
                        key={page.id}
                        pageNumber={i + 1}
                        content={page}
                        className="w-full h-full"
                    />
                )),
                // Back Cover
                <BookPage
                    key="back-cover"
                    isCover={true}
                    content={{ type: 'back', title: 'The End', text: `Created with love for ${data.coupleName}` }}
                    className="w-full h-full"
                />
            ];

            // Render each page one by one, capture, and add to PDF
            for (let i = 0; i < pagesToRender.length; i++) {
                if (i > 0) pdf.addPage();

                // Clear previous content
                container.innerHTML = '';
                const root = createRoot(container);

                // Synchronously render the page
                await new Promise<void>((resolve) => {
                    flushSync(() => {
                        root.render(pagesToRender[i]);
                    });
                    // Give a small buffer for images to "paint" (though html2canvas handles most loading)
                    setTimeout(resolve, 500);
                });

                // Capture
                const canvas = await html2canvas(container, {
                    scale: 2, // Higher quality
                    useCORS: true,
                    logging: false
                });

                const imgData = canvas.toDataURL('image/jpeg', 0.8);
                pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

                // Cleanup root (important to avoid leaks/warnings, though typically unmount is enough)
                root.unmount();
            }

            pdf.save(`${data.coupleName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_story.pdf`);

        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export PDF. Please try again.");
        } finally {
            document.body.removeChild(container);
            setIsExporting(false);
        }
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center py-4 md:py-10 px-2 group" ref={bookContainerRef}>

            <div className="relative w-full max-w-4xl aspect-[1.4/1] h-auto max-h-[85vh] z-10">
                <BookSlider width={550} height={733}>
                    {/* Front Cover */}
                    <BookPage
                        isCover={true}
                        content={{
                            title: data.coupleName,
                            text: 'Our Love Story',
                            theme: data.theme
                        }}
                    />

                    {/* Content Pages */}
                    {data.pages.map((page, i) => (
                        <BookPage
                            key={page.id}
                            pageNumber={i + 1}
                            content={page}
                        />
                    ))}

                    {/* Back Cover */}
                    <BookPage
                        isCover={true}
                        content={{ type: 'back', title: 'The End', text: `Created with love for ${data.coupleName}` }}
                    />
                </BookSlider>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 right-4 z-50 flex gap-2">
                <button
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    className="p-3 bg-white/90 hover:bg-white backdrop-blur-md border border-white/20 rounded-full text-black transition-all shadow-lg flex items-center gap-2"
                    title="Export as PDF"
                >
                    {isExporting ? (
                        <div className="w-5 h-5 border-2 border-black/50 border-t-black rounded-full animate-spin" />
                    ) : (
                        <Icon name="DocumentArrowDownIcon" size={20} />
                    )}
                    <span className="hidden md:inline font-bold text-sm">Save PDF</span>
                </button>
            </div>

            {/* Mobile Hint */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/50 text-xs animate-pulse md:hidden pointer-events-none">
                Tap corners to flip
            </div>
        </div>
    );
}
