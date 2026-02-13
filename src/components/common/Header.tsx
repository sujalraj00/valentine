'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { id: 'nav_home', label: 'Home', href: '/homepage' },
        { id: 'nav_create', label: 'Create Card', href: '/create-e-card' },
        { id: 'nav_gallery', label: 'Gallery', href: '/card-view' },
    ]

    const isActive = (href: string) => pathname === href

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/homepage" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon name="HeartIcon" variant="solid" size={20} className="text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        Valentine<span className="text-primary">Card</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.id}
                            href={link.href}
                            className={`text-sm font-semibold transition-colors ${isActive(link.href)
                                ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/create-e-card"
                        className="px-6 py-2.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all hover:scale-105 romantic-glow"
                    >
                        Create Your Card
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    aria-label="Toggle menu"
                >
                    <Icon
                        name={isMenuOpen ? 'XMarkIcon' : 'Bars3Icon'}
                        size={24}
                        className="text-foreground"
                    />
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border">
                    <div className="px-6 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.id}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block py-3 text-base font-semibold transition-colors ${isActive(link.href)
                                    ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/create-e-card"
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full px-6 py-3 rounded-full bg-primary text-white font-bold text-center hover:bg-primary/90 transition-all"
                        >
                            Create Your Card
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}