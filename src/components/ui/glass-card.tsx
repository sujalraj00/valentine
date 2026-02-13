"use client";

import * as React from "react";
import { Instagram, Twitter, Heart } from "lucide-react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    shareUrl?: string;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, shareUrl, ...props }, ref) => {
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
                <div className="relative h-full rounded-[50px] bg-gradient-to-br from-zinc-900 to-black shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.3)_30px_50px_25px_-40px,rgba(0,0,0,0.1)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,30deg)] font-sans">

                    {/* Glass Overlay */}
                    <div className="absolute inset-2 rounded-[55px] border-b border-l border-white/20 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)] flex items-center justify-center">
                        {/* Center Heart Icon */}
                        <div className="[transform:translate3d(0,0,30px)]">
                            <Heart className="w-24 h-24 text-white/90 drop-shadow-lg" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Social Icons - Bottom Center */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center [transform-style:preserve-3d] [transform:translate3d(0,0,26px)]">
                        <div className="flex gap-4 [transform-style:preserve-3d]">
                            {[
                                { icon: Instagram, platform: "instagram" as const, delay: "400ms" },
                                { icon: Twitter, platform: "twitter" as const, delay: "600ms" },
                            ].map(({ icon: Icon, platform, delay }, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleShare(platform);
                                    }}
                                    className="group/social grid h-[40px] w-[40px] place-content-center rounded-full border-none bg-white shadow-[0px_5px_10px_rgba(0,0,0,0.3)] transition-all duration-200 ease-in-out hover:scale-110 active:scale-95"
                                    style={{ transitionDelay: delay }}
                                >
                                    <Icon className="h-5 w-5 stroke-black fill-transparent transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Top Right Decoration with Heart Icon */}
                    <div className="absolute top-0 right-0 [transform-style:preserve-3d]">
                        {[
                            { size: "170px", pos: "8px", z: "20px", delay: "0s" },
                            { size: "140px", pos: "10px", z: "40px", delay: "0.4s" },
                            { size: "110px", pos: "17px", z: "60px", delay: "0.8s" },
                            { size: "80px", pos: "23px", z: "80px", delay: "1.2s" },
                        ].map((circle, index) => (
                            <div
                                key={index}
                                className="absolute aspect-square rounded-full bg-white/5 shadow-[rgba(255,255,255,0.1)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out"
                                style={{
                                    width: circle.size,
                                    top: circle.pos,
                                    right: circle.pos,
                                    transform: `translate3d(0, 0, ${circle.z})`,
                                    transitionDelay: circle.delay,
                                }}
                            ></div>
                        ))}
                        {/* White Circle with Small Black Heart */}
                        <div
                            className="absolute grid aspect-square w-[50px] place-content-center rounded-full bg-white shadow-[0px_5px_15px_rgba(0,0,0,0.2)] transition-all duration-500 ease-in-out [transform:translate3d(0,0,100px)] [transition-delay:1.6s] group-hover:[transform:translate3d(0,0,120px)]"
                            style={{ top: "30px", right: "30px" }}
                        >
                            <Heart className="w-6 h-6 text-black fill-black" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
