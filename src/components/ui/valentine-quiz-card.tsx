import * as React from "react";
import { Instagram, Twitter, Heart } from "lucide-react";

export interface ValentineQuizCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
}

const ValentineQuizCard = React.forwardRef<HTMLDivElement, ValentineQuizCardProps>(
    ({ className, title = "Test Your Love", description = "Challenge your partner and discover how well you truly know each other. Take the quiz together!", shareUrl, partner1Image, partner2Image, ...props }, ref) => {

        const handleShare = (platform: "twitter" | "instagram") => {
            const url = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
            const text = "Check out our Valentine Moment! ❤️";

            if (platform === "twitter") {
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
            } else if (platform === "instagram") {
                if (typeof navigator !== 'undefined' && navigator.clipboard) {
                    navigator.clipboard.writeText(url);
                    alert("Link copied! Share it on your Instagram Story or Bio. ❤️");
                }
            }
        };

        return (
            <div
                ref={ref}
                className={`group h-[300px] w-[290px] [perspective:1000px] ${className}`}
                {...props}
            >
                <div className="relative h-full rounded-[50px] bg-gradient-to-br from-pink-600 via-purple-600 to-pink-500 shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(236,72,153,0.3)_30px_50px_25px_-40px,rgba(168,85,247,0.1)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,30deg)]">
                    <div className="absolute inset-2 rounded-[55px] border-b border-l border-white/30 bg-gradient-to-b from-white/40 to-white/20 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]"></div>
                    <div className="absolute inset-0 flex flex-col justify-start pt-10 px-6 [transform:translate3d(0,0,26px)] text-center">
                        <span className="block text-xl font-black text-white drop-shadow-md">
                            {title}
                        </span>

                        {partner1Image && partner2Image ? (
                            <div className="mt-4 flex justify-center items-center -space-x-4 [transform-style:preserve-3d] [transform:translate3d(0,0,30px)]">
                                <div className="z-10 w-20 h-20 rounded-full border-4 border-white/50 bg-zinc-800 overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.6)] transform -rotate-6 transition-transform group-hover:scale-110">
                                    <img src={partner1Image} alt="Partner 1" className="w-full h-full object-cover" />
                                </div>
                                <div className="z-20 w-20 h-20 rounded-full border-4 border-white/50 bg-zinc-800 overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.6)] transform rotate-6 transition-transform group-hover:scale-110">
                                    <img src={partner2Image} alt="Partner 2" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        ) : (
                            <span className="mt-5 block text-[15px] text-white/90">
                                {description}
                            </span>
                        )}

                        {/* Description below images if they exist, smaller */}
                        {partner1Image && partner2Image && (
                            <p className="mt-4 text-xs font-bold text-white/80 uppercase tracking-widest bg-black/20 rounded-full py-1 px-3">
                                Captured Forever
                            </p>
                        )}
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 flex items-center justify-center [transform-style:preserve-3d] [transform:translate3d(0,0,26px)]">
                        <div className="flex gap-4 [transform-style:preserve-3d]">
                            {[
                                { icon: Instagram, platform: 'instagram' as const, delay: "400ms" },
                                { icon: Twitter, platform: 'twitter' as const, delay: "600ms" },
                            ].map(({ icon: Icon, platform, delay }, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleShare(platform);
                                    }}
                                    className="group/social grid h-[40px] w-[40px] place-content-center rounded-full border-none bg-white shadow-[0px_5px_15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                                    style={{ transitionDelay: delay }}
                                >
                                    <Icon className="h-5 w-5 stroke-pink-600 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 [transform-style:preserve-3d] pointer-events-none">
                        {[
                            { size: "170px", pos: "8px", z: "20px", delay: "0s" },
                            { size: "140px", pos: "10px", z: "40px", delay: "0.4s" },
                            { size: "110px", pos: "17px", z: "60px", delay: "0.8s" },
                            { size: "80px", pos: "23px", z: "80px", delay: "1.2s" },
                        ].map((circle, index) => (
                            <div
                                key={index}
                                className="absolute aspect-square rounded-full bg-white/10 shadow-[rgba(236,72,153,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out"
                                style={{
                                    width: circle.size,
                                    top: circle.pos,
                                    right: circle.pos,
                                    transform: `translate3d(0, 0, ${circle.z})`,
                                    transitionDelay: circle.delay,
                                }}
                            ></div>
                        ))}
                        <div
                            className="absolute grid aspect-square w-[40px] place-content-center rounded-full bg-white/20 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-500 ease-in-out [transform:translate3d(0,0,100px)] group-hover:[transform:translate3d(0,0,120px)]"
                            style={{ top: "20px", right: "20px" }}
                        >
                            <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

ValentineQuizCard.displayName = "ValentineQuizCard";

export default ValentineQuizCard;
