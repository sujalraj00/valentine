import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
    const footerLinks = {
        features: [
            { id: 'footer_ai', label: 'AI Generation', href: '/create-e-card' },
            { id: 'footer_themes', label: 'Card Themes', href: '/homepage#themes' },
            { id: 'footer_timeline', label: 'Timeline Builder', href: '/create-e-card#timeline' },
            { id: 'footer_sharing', label: 'Share & Download', href: '/card-view' },
        ],
        resources: [
            { id: 'footer_gallery', label: 'Card Gallery', href: '/card-view' },
            { id: 'footer_examples', label: 'Examples', href: '/homepage#examples' },
            { id: 'footer_help', label: 'Help Center', href: '#' },
            { id: 'footer_blog', label: 'Love Stories Blog', href: '#' },
        ],
        legal: [
            { id: 'footer_privacy', label: 'Privacy Policy', href: '#' },
            { id: 'footer_terms', label: 'Terms of Service', href: '#' },
            { id: 'footer_cookies', label: 'Cookie Policy', href: '#' },
        ],
    }

    const socialLinks = [
        { id: 'social_instagram', name: 'Instagram', icon: 'CameraIcon', href: '#' },
        { id: 'social_facebook', name: 'Facebook', icon: 'UserGroupIcon', href: '#' },
        { id: 'social_twitter', name: 'Twitter', icon: 'ChatBubbleLeftIcon', href: '#' },
        { id: 'social_pinterest', name: 'Pinterest', icon: 'PhotoIcon', href: '#' },
    ]

    return (
        <footer className="bg-card border-t border-border">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <Icon name="HeartIcon" variant="solid" size={20} className="text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-foreground">
                                ValentineViral<span className="text-primary">Card</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
                            Create stunning AI-powered Valentine's cards with custom photos, timelines, and countdown reveals. Share your love story like never before.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary flex items-center justify-center transition-all hover:scale-110 group"
                                    aria-label={social.name}
                                >
                                    <Icon
                                        name={social.icon as any}
                                        size={18}
                                        className="text-muted-foreground group-hover:text-white transition-colors"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-6 tracking-wide">Features</h4>
                        <ul className="space-y-3">
                            {footerLinks.features.map((link) => (
                                <li key={link.id}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-6 tracking-wide">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.id}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-6 tracking-wide">
                            Stay Updated
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Get Valentine's card inspiration and updates delivered to your inbox.
                        </p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        © 2026 ValentineViralCard. All rights reserved. Made with ❤️ for love stories.
                    </p>
                    <div className="flex items-center gap-6">
                        {footerLinks.legal.map((link) => (
                            <Link
                                key={link.id}
                                href={link.href}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}