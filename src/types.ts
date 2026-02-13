export type ThemeType = 'retro' | 'clay' | 'holo' | 'meme' | 'minimal' | 'modern';

export interface BookPage {
    id: string;
    type: 'cover' | 'content' | 'back';
    image?: string;
    title?: string;
    text?: string;
    layout?: 'full' | 'split' | 'centered';
}

export interface BookData {
    id: string;
    coupleName: string;
    theme: ThemeType;
    format: 'book' | 'card';
    pages: BookPage[];
    music?: string;
}

export const themes: { id: ThemeType; name: string; color: string; bgClass: string }[] = [
    { id: 'retro', name: 'Retro Glitch', color: '#EC4899', bgClass: 'bg-zinc-900' },
    { id: 'clay', name: '3D Clay', color: '#F472B6', bgClass: 'bg-rose-50' },
    { id: 'holo', name: 'Holographic', color: '#A78BFA', bgClass: 'bg-slate-900' },
    { id: 'meme', name: 'Meme Style', color: '#FBBF24', bgClass: 'bg-yellow-50' },
    { id: 'minimal', name: 'Minimalist', color: '#F87171', bgClass: 'bg-stone-50' },
    { id: 'modern', name: 'Modern', color: '#DC2626', bgClass: 'bg-zinc-950' },
];
