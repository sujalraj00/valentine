import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroGallery from './components/HeroGallery';
import CountdownTimer from './components/CountdownTimer';
import ThemeCarousel from './components/ThemeCarousel';
import FeaturesBento from './components/FeaturesBento';
import TestimonialCards from './components/TestimonialCards';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
    title: 'ValentineViralCard - Create AI-Powered Valentine E-Cards',
    description: 'Create stunning AI-generated Valentine\'s Day e-cards with custom photos, relationship timelines, and countdown reveals. Share your love story like never before.',
}

export default function Homepage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow bg-background text-foreground overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
                    {/* Background Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-20 left-[10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float" />
                        <div className="absolute bottom-20 right-[10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-float delay-1000" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.05)_0%,transparent_70%)]" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content */}
                            <div className="space-y-10 text-center lg:text-left relative">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm shadow-[0_0_15px_rgba(225,29,72,0.1)]">
                                        <Icon name="SparklesIcon" size={16} className="text-primary animate-pulse" />
                                        <span className="text-sm font-semibold text-primary tracking-wide">AI-Powered Card Generator</span>
                                    </div>

                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-[1.1]">
                                        Create Your
                                        <span className="block text-gradient-valentine mt-2 drop-shadow-sm">Perfect Valentine</span>
                                        <span className="block mt-2">Card</span>
                                    </h1>

                                    <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                                        Transform your photos into stunning AI-generated Valentine cards with custom themes, relationship timelines, and countdown reveals.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                                    <Link
                                        href="/create-e-card"
                                        className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 romantic-glow inline-flex items-center justify-center gap-2 group shadow-lg shadow-primary/25"
                                    >
                                        <span>Create Your Card Now</span>
                                        <Icon name="ArrowRightIcon" size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href="/card-view"
                                        className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-foreground font-bold text-lg hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2 backdrop-blur-sm"
                                    >
                                        <Icon name="PhotoIcon" size={20} />
                                        <span>View Examples</span>
                                    </Link>
                                </div>

                                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                                    <div className="text-center lg:text-left">
                                        <div className="text-3xl font-serif font-bold text-white">2.8k+</div>
                                        <div className="text-sm text-muted-foreground uppercase tracking-wider">Cards Created</div>
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <div className="text-3xl font-serif font-bold text-white">6+</div>
                                        <div className="text-sm text-muted-foreground uppercase tracking-wider">Unique Themes</div>
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <div className="text-3xl font-serif font-bold text-white">4.9/5</div>
                                        <div className="text-sm text-muted-foreground uppercase tracking-wider">User Rating</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Gallery */}
                            <div className="relative h-[500px] lg:h-[700px] perspective-1000">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-[80px] -z-10 rounded-full animate-pulse-slow" />
                                <HeroGallery />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Countdown Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="text-center lg:text-left lg:max-w-md space-y-6">
                                <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
                                    Valentine's Day <span className="text-gradient-valentine block mt-2">Countdown</span>
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    The moment of romance is approaching. Create your card now and set it to reveal at midnight on February 14th for the ultimate romantic surprise.
                                </p>
                            </div>
                            <div className="w-full lg:w-auto flex-grow">
                                <CountdownTimer />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center space-y-6 mb-20">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
                                Powerful Features for <span className="text-gradient-valentine">Perfect Cards</span>
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
                                Everything you need to create a memorable Valentine's Day experience, from AI generation to surprise reveals.
                            </p>
                        </div>
                        <FeaturesBento />
                    </div>
                </section>

                {/* Themes Section */}
                <section id="themes" className="py-32 bg-white/2 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center space-y-6 mb-20">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
                                Choose Your <span className="text-gradient-valentine">Perfect Style</span>
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                                6 unique AI-powered themes to match your love story's vibe, crafted by digital artists.
                            </p>
                        </div>
                        <ThemeCarousel />
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-32 relative overflow-hidden">
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="text-center space-y-6 mb-20">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
                                Love Stories <span className="text-gradient-valentine">Created</span>
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                                See how couples around the world are using ValentineViralCard to celebrate their love.
                            </p>
                        </div>
                        <TestimonialCards />
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
                    <div className="max-w-5xl mx-auto px-6 text-center space-y-10 relative z-10">
                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center heart-pulse shadow-[0_0_30px_rgba(225,29,72,0.4)]">
                            <Icon name="HeartIcon" variant="solid" size={48} className="text-white" />
                        </div>

                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-none">
                            Ready to Create
                            <span className="block text-gradient-valentine mt-4">Your Love Story?</span>
                        </h2>

                        <p className="text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
                            Join thousands of couples creating unforgettable Valentine's Day moments with AI-powered cards.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                            <Link
                                href="/create-e-card"
                                className="px-12 py-6 rounded-full bg-primary text-white font-bold text-xl hover:bg-primary/90 transition-all hover:scale-105 romantic-glow inline-flex items-center justify-center gap-3 group shadow-xl"
                            >
                                <Icon name="SparklesIcon" size={24} />
                                <span>Start Creating Free</span>
                                <Icon name="ArrowRightIcon" size={24} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <p className="text-sm text-muted-foreground opacity-60">
                            ✨ No credit card required • 🎨 6 AI themes • ⏱️ Countdown timer included
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}