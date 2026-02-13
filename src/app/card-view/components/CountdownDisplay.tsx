'use client';
import { useState, useEffect } from 'react';
 import Icon from'@/components/ui/AppIcon';

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownDisplay() {
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
    return null
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ]

  return (
    <div className="glass-card p-8 backdrop-blur-xl">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Icon name="ClockIcon" size={24} className="text-primary" />
        <h3 className="text-xl font-bold text-foreground">Countdown to Reveal</h3>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="text-center">
            <div className="text-4xl font-bold text-gradient-valentine mb-2">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Your special message will be revealed on Valentine's Day at midnight! 💕
      </p>
    </div>
  )
}