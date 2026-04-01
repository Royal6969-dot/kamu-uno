"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  destinations,
  scoreDestinations,
  getDurationLabel,
  type QuizAnswers,
  type Destination,
} from "@/lib/data";

const difficultyColors = {
  easy: { bg: "#1a3a1a", text: "#4ade80" },
  moderate: { bg: "#3a2a0a", text: "#f59e0b" },
  challenging: { bg: "#3a1a1a", text: "#f87171" },
};

function DestinationCard({
  destination,
  isSelected,
  onToggle,
  rank,
}: {
  destination: Destination;
  isSelected: boolean;
  onToggle: () => void;
  rank: number;
}) {
  const [imgError, setImgError] = useState(false);
  const diff = difficultyColors[destination.difficulty];

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer card-hover transition-all duration-300"
      style={{
        background: "#141418",
        border: isSelected ? "2px solid #c9a84c" : "2px solid transparent",
        boxShadow: isSelected ? "0 0 30px rgba(201,168,76,0.15)" : "none",
      }}
      onClick={onToggle}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-stone-800">
        {!imgError ? (
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-800 text-stone-600 text-4xl">
            🏔️
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Rank badge */}
        <div
          className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: "rgba(0,0,0,0.7)", color: rank <= 3 ? "#c9a84c" : "#888" }}
        >
          #{rank}
        </div>

        {/* Selected overlay */}
        {isSelected && (
          <div
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#c9a84c" }}
          >
            <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
              <path d="M1 5.5L5 9.5L13 1.5" stroke="black" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        {/* Region tag */}
        <div className="absolute bottom-3 left-3 text-white/70 text-xs tracking-wide">
          📍 {destination.region}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3
              className="text-white text-lg font-bold leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {destination.name}
            </h3>
            <p className="text-stone-500 text-xs mt-0.5">{destination.tagline}</p>
          </div>
          <div
            className="text-xs px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0"
            style={{ background: diff.bg, color: diff.text }}
          >
            {destination.difficulty}
          </div>
        </div>

        <p className="text-stone-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {destination.description}
        </p>

        {/* Highlights */}
        <div className="space-y-1.5 mb-4">
          {destination.highlights.slice(0, 2).map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-stone-400">
              <span style={{ color: "#c9a84c" }} className="mt-0.5">✦</span>
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-800">
          <div className="text-xs text-stone-500">
            ⏱ {destination.daysNeeded} day{destination.daysNeeded > 1 ? "s" : ""}
            {destination.altitude && <span className="ml-2">🏔 {destination.altitude}</span>}
          </div>
          <div
            className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
            style={{
              background: isSelected ? "#c9a84c" : "rgba(201,168,76,0.1)",
              color: isSelected ? "#000" : "#c9a84c",
              border: "1px solid #c9a84c",
            }}
          >
            {isSelected ? "✓ Selected" : "+ Add to Trip"}
          </div>
        </div>
      </div>
    </div>
  );
}

function DestinationsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const answers: QuizAnswers = {
    style: (searchParams.get("style") as QuizAnswers["style"]) || "culture",
    duration: (searchParams.get("duration") as QuizAnswers["duration"]) || "week",
    group: (searchParams.get("group") as QuizAnswers["group"]) || "couple",
    interest: (searchParams.get("interest") as QuizAnswers["interest"]) || "history",
  };

  const ranked = scoreDestinations(destinations, answers);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleCreatePlan() {
    const params = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      destinations: Array.from(selected).join(","),
    });
    router.push(`/plan?${params.toString()}`);
  }

  const styleLabels: Record<string, string> = {
    adventure: "Adventure Seeker 🧗",
    culture: "Culture Explorer 🏛️",
    nature: "Nature Lover 🌿",
    relaxation: "Slow Traveler ☕",
  };

  const interestLabels: Record<string, string> = {
    history: "Inca History & Ruins 🏺",
    jungle: "Jungle & Wildlife 🦜",
    mountains: "Mountains & Trekking ⛰️",
    beaches: "Desert & Coastal 🏜️",
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0a0a0f", fontFamily: "var(--font-body)" }}
    >
      {/* Nav */}
      <div className="sticky top-0 z-40 border-b border-white/5" style={{ background: "rgba(10,10,15,0.95)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-widest text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            KAMU<span style={{ color: "#c9a84c" }}> UNO</span>
          </Link>
          <div className="flex items-center gap-4">
            {selected.size > 0 && (
              <span className="text-stone-400 text-sm">
                {selected.size} destination{selected.size > 1 ? "s" : ""} selected
              </span>
            )}
            <button
              onClick={handleCreatePlan}
              disabled={selected.size === 0}
              className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all"
              style={{
                background: selected.size > 0 ? "#c9a84c" : "#2a2a3a",
                color: selected.size > 0 ? "#000" : "#555",
                cursor: selected.size > 0 ? "pointer" : "not-allowed",
              }}
            >
              Create My Travel Plan →
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-4">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#c9a84c", letterSpacing: "0.3em" }}>
            Your Curated Destinations
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Destinations Matched for You
          </h1>
          <p className="text-stone-400 max-w-xl mx-auto mb-6">
            Based on your preferences, we ranked all 12 Peruvian destinations
            especially for you. Select the ones that speak to your soul.
          </p>

          {/* Quiz summary tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-xs px-3 py-1.5 rounded-full bg-stone-800 text-stone-300">
              {styleLabels[answers.style]}
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-stone-800 text-stone-300">
              📅 {getDurationLabel(answers.duration)}
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-stone-800 text-stone-300">
              {answers.group === "solo" && "🧍 Solo"}
              {answers.group === "couple" && "💑 Couple"}
              {answers.group === "family" && "👨‍👩‍👧‍👦 Family"}
              {answers.group === "friends" && "👥 Group"}
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-stone-800 text-stone-300">
              {interestLabels[answers.interest]}
            </span>
            <Link
              href="/quiz"
              className="text-xs px-3 py-1.5 rounded-full border border-stone-700 text-stone-500 hover:text-white transition-colors"
            >
              ✏️ Change Answers
            </Link>
          </div>
        </div>

        {/* Instruction */}
        <div
          className="flex items-center gap-3 max-w-lg mx-auto mt-8 mb-10 p-4 rounded-xl text-sm"
          style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c" }}
        >
          <span className="text-xl">👆</span>
          <span>Click any destination to select it for your trip. Select as many as you like — we&apos;ll build the perfect route.</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ranked.map((dest, i) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isSelected={selected.has(dest.id)}
              onToggle={() => toggle(dest.id)}
              rank={i + 1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        {selected.size > 0 && (
          <div className="mt-16 text-center">
            <p className="text-stone-400 text-sm mb-4">
              You&apos;ve selected <strong className="text-white">{selected.size}</strong> destination{selected.size > 1 ? "s" : ""}. Ready to see your plan?
            </p>
            <button
              onClick={handleCreatePlan}
              className="px-14 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
              style={{ background: "#c9a84c", color: "#000" }}
            >
              Create My {getDurationLabel(answers.duration)} Travel Plan →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0f" }}>
        <div className="text-stone-500 text-lg">Loading destinations...</div>
      </div>
    }>
      <DestinationsContent />
    </Suspense>
  );
}
