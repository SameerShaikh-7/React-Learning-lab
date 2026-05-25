"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

type Slide = {
  id: number;
  label: string;
  headline: string;
  sub: string;
  image: string;
  cta: string;
};

const slides: Slide[] = [
  {
    id: 1,
    label: "Studio Shoot",
    headline: "Own the Frame.",
    sub: "Cinematic headshots crafted for professionals who lead. Authentic. Original. Unforgettable.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1400&q=80",
    cta: "Book Your Session",
  },
  {
    id: 2,
    label: "Photo Editing",
    headline: "Natural. Refined.",
    sub: "Subtle enhancements that preserve who you are. No heavy filters. No artificial looks.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80",
    cta: "Start Editing",
  },
  {
    id: 3,
    label: "LinkedIn Ready",
    headline: "First Impressions Win.",
    sub: "Optimised for LinkedIn, corporate websites, press kits and beyond. One shot, every platform.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1400&q=80",
    cta: "Explore Packages",
  },
  {
    id: 4,
    label: "Corporate Teams",
    headline: "Unified. Professional.",
    sub: "Consistent brand look across your entire team. Bulk sessions with priority delivery.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80",
    cta: "Team Booking",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (next: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 400);
  };

  const next = () => go((current + 1) % slides.length);
  const prev = () => go((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ background: "#0a0a0a" }}>
      {/* Background image */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ opacity: animating ? 0 : 1 }}
      >
        <img
          src={slide.image}
          alt={slide.headline}
          className="h-full w-full object-cover object-center"
          style={{ filter: "brightness(0.35) saturate(0.6)" }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.3) 100%)",
        }}
      />

      {/* Gold grain texture overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.4,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-8 md:px-16">
          <div
            className="max-w-2xl space-y-8 transition-all duration-500"
            style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(16px)" : "translateY(0)" }}
          >
            {/* Label chip */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase"
              style={{
                background: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.3)",
                color: "#d4af37",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#d4af37" }}
              />
              {slide.label}
            </div>

            {/* Headline */}
            <h1
              className="text-6xl md:text-8xl font-bold italic leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#ffffff",
                textShadow: "0 4px 40px rgba(0,0,0,0.8)",
              }}
            >
              {slide.headline}
            </h1>

            {/* Subtext */}
            <p
              className="text-lg leading-relaxed max-w-xl"
              style={{ color: "#a0a0a0", fontWeight: 300 }}
            >
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/addBooking"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #b8962e)",
                  color: "#0a0a0a",
                  letterSpacing: "0.05em",
                  boxShadow: "0 8px 32px rgba(212,175,55,0.25)",
                }}
              >
                {slide.cta} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#e0e0e0",
                }}
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-10 right-10 z-30 flex items-center gap-3">
        <span
          className="text-4xl font-bold italic"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#d4af37" }}
        >
          0{current + 1}
        </span>
        <div className="flex flex-col gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "24px" : "4px",
                height: "4px",
                background: i === current ? "#d4af37" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}