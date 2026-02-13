
'use client';
import { useState, useEffect } from 'react';

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (!isClient) return

        const calculateTimeLeft = (): TimeLeft => {
            const valentinesDay = new Date('2026-02-14T00:00:00')
            const now = new Date()
            const difference = valentinesDay.getTime() - now.getTime()

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                }
            }

            return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }

        setTimeLeft(calculateTimeLeft())

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [isClient])

    if (!isClient) {
        return (
            <div className="grid grid-cols-4 gap-4">
                {[0, 0, 0, 0].map((_, i) => (
                    <div key={`placeholder_${i}`} className="glass-card p-6 text-center">
                        <div className="text-5xl font-bold text-white mb-2">00</div>
                        <div className="text-xs uppercase tracking-widest text-white/60">Loading</div>
                    </div>
                ))}
            </div>
        )
    }

    const timeUnits = [
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Minutes' },
        { value: timeLeft.seconds, label: 'Seconds' },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {timeUnits.map((unit, index) => (
                <div
                    key={unit.label}
                    className="glass-card p-6 text-center backdrop-blur-xl border border-white/10 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                        <div className="text-5xl md:text-7xl font-serif font-bold text-gradient-valentine mb-2 tabular-nums tracking-tight">
                            {String(unit.value).padStart(2, '0')}
                        </div>
                        <div className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium group-hover:text-primary/80 transition-colors">
                            {unit.label}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}