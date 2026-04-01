"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1600&q=85&fit=crop",
    alt: "Machu Picchu",
    label: "Machu Picchu",
  },
  {
    src: "https://images.unsplash.com/photo-1547149694-e51ce8b5b3fa?w=1600&q=85&fit=crop",
    alt: "Rainbow Mountain",
    label: "Rainbow Mountain",
  },
  {
    src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=85&fit=crop",
    alt: "Amazon Rainforest",
    label: "Amazon Rainforest",
  },
  {
    src: "https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=1600&q=85&fit=crop",
    alt: "Huacachina Oasis",
    label: "Huacachina Oasis",
  },
];

const highlights = [
  { icon: "🏔️", title: "Machu Picchu", desc: "Lost City of the Incas" },
  { icon: "🌿", title: "Amazon Jungle", desc: "Wildlife & Adventure" },
  { icon: "🏜️", title: "Desert Oasis", desc: "Huacachina Dunes" },
  { icon: "🦙", title: "Sacred Valley", desc: "Ancient Inca Culture" },
  { icon: "🐧", title: "Ballestas Islands", desc: "Coastal Wildlife" },
  { icon: "🎨", title: "Rainbow Mountain", desc: "Vinicunca Colors" },
];

const marqueeItems =
  "Machu Picchu · Rainbow Mountain · Amazon Rainforest · Lake Titicaca · Colca Canyon · Huacachina · Nazca Lines · Sacred Valley · ";

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((i) => (i + 1) % heroImages.length);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen" style={{ fontFamily: "var(--font-body)" }}>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: fade ? 1 : 0 }}
        >
          <Image
            src={heroImages[currentImage].src}
            alt={heroImages[currentImage].alt}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

        {/* Nav */}
        <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-20">
          <div
            className="text-2xl font-bold tracking-widest text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            KAMU<span style={{ color: "#c9a84c" }}> UNO</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-white/80 tracking-wide items-center">
            <a href="#destinations-preview" className="hover:text-white transition-colors">
              Destinations
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <Link
              href="/quiz"
              className="px-4 py-2 rounded text-sm font-semibold transition-all"
              style={{ border: "1px solid #c9a84c", color: "#c9a84c" }}
            >
              Plan My Trip
            </Link>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p
            className="text-sm uppercase tracking-widest mb-4 animate-fade-in-up"
            style={{ color: "#c9a84c", letterSpacing: "0.35em" }}
          >
            Peru Travel Agency
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 animate-fade-in-up animate-delay-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Discover the
            <br />
            <span className="text-gold-gradient">Soul of Peru</span>
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up animate-delay-200">
            From ancient Inca citadels to Amazon jungles and desert oases —
            answer a few questions and we build your perfect Peruvian adventure.
            No account needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
            <Link
              href="/quiz"
              className="px-10 py-4 font-semibold rounded-full text-base transition-all hover:scale-105"
              style={{ background: "#c9a84c", color: "#000" }}
            >
              Start Planning My Trip →
            </Link>
            <a
              href="#destinations-preview"
              className="px-10 py-4 border border-white/40 text-white rounded-full text-base hover:border-white hover:bg-white/10 transition-all"
            >
              Explore Destinations
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-8 animate-fade-in-up animate-delay-300">
            <div
              className="inline-flex flex-wrap gap-x-6 gap-y-2 justify-center px-6 py-3 rounded-full text-sm font-medium"
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              <span>12 Destinations</span>
              <span style={{ color: "#c9a84c" }}>·</span>
              <span>No Registration</span>
              <span style={{ color: "#c9a84c" }}>·</span>
              <span>Free Planning</span>
              <span style={{ color: "#c9a84c" }}>·</span>
              <span>Instant Results</span>
            </div>
          </div>
        </div>

        {/* Image dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFade(false);
                setTimeout(() => { setCurrentImage(i); setFade(true); }, 300);
              }}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: i === currentImage ? "24px" : "8px",
                  height: "8px",
                  background: i === currentImage ? "#c9a84c" : "rgba(255,255,255,0.4)",
                }}
              />
            </button>
          ))}
        </div>
        <div className="absolute bottom-8 right-8 text-white/60 text-sm tracking-wide z-20">
          {heroImages[currentImage].label}
        </div>
      </section>

      {/* Scrolling marquee ticker */}
      <div
        className="overflow-hidden py-3 border-y"
        style={{
          background: "#0d0d10",
          borderColor: "rgba(201,168,76,0.2)",
        }}
      >
        <div
          className="whitespace-nowrap inline-block"
          style={{
            animation: "marquee 30s linear infinite",
            color: "#c9a84c",
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            fontWeight: 500,
          }}
        >
          {marqueeItems.repeat(4)}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-stone-950">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#c9a84c", letterSpacing: "0.3em" }}>
            Simple Process
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your Trip in 3 Steps
          </h2>
          <p className="text-stone-400 mb-16 max-w-xl mx-auto">
            No registration, no emails, no credit cards. Just tell us about yourself and receive a personalized Peru travel plan.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "✍️",
                title: "Answer a Few Questions",
                desc: "Tell us your travel style, trip length, who you're traveling with, and what excites you most. Takes under 2 minutes.",
              },
              {
                step: "02",
                icon: "🗺️",
                title: "Browse Destinations",
                desc: "See stunning destinations ranked for you, with photos and full descriptions. Select the ones that call to you.",
              },
              {
                step: "03",
                icon: "📋",
                title: "Get Your Travel Plan",
                desc: "Receive a complete day-by-day itinerary with activities, accommodation suggestions, and local tips.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-8 rounded-2xl bg-stone-900 border border-stone-800 hover:border-yellow-700/40 transition-all"
              >
                <div
                  className="text-5xl font-bold text-stone-800 absolute top-4 right-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className="text-xl font-semibold text-white mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/quiz"
              className="inline-block px-12 py-4 font-semibold rounded-full text-base transition-all hover:scale-105"
              style={{ background: "#c9a84c", color: "#000" }}
            >
              Begin Your Journey →
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section id="destinations-preview" className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#c9a84c", letterSpacing: "0.3em" }}>
              Explore Peru
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              12 Extraordinary Destinations
            </h2>
            <p className="text-stone-400 max-w-xl mx-auto">
              Ancient ruins, jungle rivers, towering canyons, desert oases — Peru holds more wonders per square kilometer than almost anywhere on Earth.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl bg-stone-900 border border-stone-800 flex items-center gap-4 hover:border-yellow-700/50 hover:bg-stone-800 transition-all"
              >
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <div className="text-white font-semibold text-sm">{item.title}</div>
                  <div className="text-stone-500 text-xs mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/quiz"
              className="inline-block px-12 py-4 font-semibold rounded-full text-base transition-all"
              style={{ border: "1px solid #c9a84c", color: "#c9a84c" }}
            >
              Find My Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-stone-950 border-t border-stone-800 text-center text-stone-600 text-sm">
        <div
          className="text-xl font-bold text-stone-400 mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          KAMU <span style={{ color: "#c9a84c" }}>UNO</span>
        </div>
        <p>Peru Travel Agency — Crafting unforgettable Andean journeys</p>
      </footer>
    </main>
  );
}
