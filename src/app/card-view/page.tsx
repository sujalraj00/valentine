import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/common/Header';
import CardDisplay from './components/CardDisplay';
import CountdownDisplay from './components/CountdownDisplay';
import SharePanel from './components/SharePanel';
import TimelineSidebar from './components/TimelineSidebar';
import MusicPlayer from './components/MusicPlayer';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'Your Valentine Card - ValentineViralCard',
  description: 'View and share your personalized AI-generated Valentine\'s Day e-card with countdown and reveal features.'
};

export default function CardViewPage() {
  // Mock data - in real app, fetch from database/API
  const cardData = {
    cardImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1a8fe92d5-1769800970904.png",
    cardAlt: 'Personalized Valentine card with couple photo and romantic styling',
    recipientName: 'Sarah',
    senderName: 'Michael',
    isRevealed: false // Change to true on Feb 14
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section with Card Display */}
        <section className="py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Timeline */}
              <div className="lg:order-1">
                <TimelineSidebar />
              </div>

              {/* Center: Card Display */}
              <div className="lg:order-2 space-y-6">
                <CardDisplay
                  cardImage={cardData.cardImage}
                  cardAlt={cardData.cardAlt}
                  recipientName={cardData.recipientName}
                  senderName={cardData.senderName}
                  isRevealed={cardData.isRevealed} />


                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href="/create-e-card"
                    className="flex-1 px-6 py-3 rounded-xl bg-muted text-foreground font-semibold hover:bg-muted/80 transition-all flex items-center justify-center gap-2">

                    <Icon name="PencilIcon" size={20} />
                    Edit Card
                  </Link>
                  <button className="flex-1 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                    <Icon name="ArrowDownTrayIcon" size={20} />
                    Download
                  </button>
                </div>
              </div>

              {/* Right: Share & Music */}
              <div className="lg:order-3 space-y-6">
                <SharePanel />
                <MusicPlayer />
              </div>
            </div>
          </div>
        </section>

        {/* Countdown Section (only show if not revealed) */}
        {!cardData.isRevealed &&
          <section className="py-12 border-b border-border">
            <div className="max-w-4xl mx-auto px-6">
              <CountdownDisplay />
            </div>
          </section>
        }

        {/* Revealed Message Section (only show if revealed) */}
        {cardData.isRevealed &&
          <section className="py-20 border-b border-border">
            <div className="max-w-4xl mx-auto px-6">
              <div className="glass-card p-12 backdrop-blur-xl text-center space-y-6 relative overflow-hidden">
                {/* Confetti Animation Container */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 20 }).map((_, i) =>
                    <div
                      key={`confetti_${i}`}
                      className="confetti absolute w-3 h-3 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: '-10%',
                        backgroundColor: ['#DC2626', '#EC4899', '#F472B6'][Math.floor(Math.random() * 3)],
                        animationDelay: `${Math.random() * 2}s`
                      }} />

                  )}
                </div>

                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center heart-pulse">
                    <Icon name="HeartIcon" variant="solid" size={40} className="text-white" />
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                    <span className="text-gradient-valentine">Happy Valentine's Day!</span>
                  </h2>

                  <div className="max-w-2xl mx-auto space-y-4">
                    <p className="text-xl text-foreground leading-relaxed">
                      "You make every day feel like Valentine's Day. Here's to many more years of love, laughter, and unforgettable memories together. I love you more than words can express. ❤️"
                    </p>
                    <p className="text-lg text-muted-foreground italic">
                      - With all my love, Michael
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        }

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Create Your Own
              <span className="block text-gradient-valentine mt-2">Valentine Card</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Make someone's Valentine's Day unforgettable with a personalized AI-powered card
            </p>

            <Link
              href="/create-e-card"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-white font-bold text-xl hover:bg-primary/90 transition-all hover:scale-105 romantic-glow">

              <Icon name="SparklesIcon" size={24} />
              <span>Start Creating</span>
              <Icon name="ArrowRightIcon" size={24} />
            </Link>
          </div>
        </section>
      </main>


    </>);

}