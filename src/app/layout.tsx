import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import '../styles/index.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#0F0A0A',
};

export const metadata: Metadata = {
    title: 'ValentineViralCard - Create Eternal Digital Love Memories',
    description: 'Design breathtaking AI-powered Valentine cards, craft your love timeline, and share your story with elegance.',
    icons: {
        icon: [
            { url: '/favicon.ico', type: 'image/x-icon' }
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
            <body className="font-sans antialiased text-foreground bg-background selection:bg-primary/30 min-h-screen flex flex-col">{children}

                <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fvalentinev7491back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17" />
                <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
                <Analytics />
            </body>
        </html>
    );
}
