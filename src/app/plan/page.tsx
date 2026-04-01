"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { destinations, getDurationLabel, type QuizAnswers } from "@/lib/data";
import { generatePlan, type PlanDay } from "@/lib/planGenerator";

function DayCard({ day, isTravel }: { day: PlanDay; isTravel?: boolean }) {
  return (
    <div
      className="flex gap-6"
      style={{ opacity: isTravel ? 0.7 : 1 }}
    >
      {/* Timeline */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{
            background: isTravel ? "#1a1a2a" : "rgba(201,168,76,0.15)",
            border: isTravel ? "2px solid #2a2a3a" : "2px solid #c9a84c",
            color: isTravel ? "#555" : "#c9a84c",
          }}
        >
          {day.day}
        </div>
        <div
          className="flex-1 w-0.5 mt-2"
          style={{ background: "rgba(201,168,76,0.1)", minHeight: "40px" }}
        />
      </div>

      {/* Content */}
      <div
        className="flex-1 pb-10 rounded-2xl p-6 mb-2"
        style={{
          background: isTravel ? "#0e0e16" : "#141418",
          border: `1px solid ${isTravel ? "#1a1a2a" : "#1e1e26"}`,
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: isTravel ? "#555" : "#c9a84c", letterSpacing: "0.2em" }}
            >
              {isTravel ? "✈️ Travel Day" : `📍 ${day.location}`}
            </p>
            <h3
              className="text-white font-bold text-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {day.title}
            </h3>
          </div>
        </div>

        <p className="text-stone-400 text-sm leading-relaxed mb-5">
          {day.description}
        </p>

        {/* Activities */}
        <div className="space-y-2.5 mb-5">
          {day.activities.map((act, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                style={{ background: isTravel ? "#1a1a2a" : "rgba(201,168,76,0.15)", color: "#c9a84c" }}
              >
                {i + 1}
              </span>
              <span className="text-stone-300 leading-relaxed">{act}</span>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-stone-800/50">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <span>🏨</span>
            <span>{day.accommodation}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <span>🍽️</span>
            <span>{day.meal}</span>
          </div>
        </div>

        {day.tip && (
          <div
            className="mt-3 px-4 py-3 rounded-xl text-xs leading-relaxed"
            style={{ background: "rgba(201,168,76,0.06)", color: "#a88a4a" }}
          >
            💡 {day.tip}
          </div>
        )}
      </div>
    </div>
  );
}

function PlanContent() {
  const searchParams = useSearchParams();

  const answers: QuizAnswers = {
    style: (searchParams.get("style") as QuizAnswers["style"]) || "culture",
    duration: (searchParams.get("duration") as QuizAnswers["duration"]) || "week",
    group: (searchParams.get("group") as QuizAnswers["group"]) || "couple",
    interest: (searchParams.get("interest") as QuizAnswers["interest"]) || "history",
  };

  const destIds = (searchParams.get("destinations") || "").split(",").filter(Boolean);
  const selectedDestinations = destinations.filter((d) => destIds.includes(d.id));

  if (selectedDestinations.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-6"
        style={{ background: "#0a0a0f" }}
      >
        <div className="text-5xl">🗺️</div>
        <h2
          className="text-3xl font-bold text-white text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          No destinations selected
        </h2>
        <p className="text-stone-400 text-center max-w-sm">
          Head back to browse and select the Peruvian destinations you want to visit.
        </p>
        <Link
          href={`/destinations?${searchParams.toString()}`}
          className="px-10 py-3 rounded-full font-semibold"
          style={{ background: "#c9a84c", color: "#000" }}
        >
          ← Browse Destinations
        </Link>
      </div>
    );
  }

  const plan = generatePlan(selectedDestinations, answers);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0a0a0f", fontFamily: "var(--font-body)" }}
    >
      {/* Nav */}
      <div className="sticky top-0 z-40 border-b border-white/5" style={{ background: "rgba(10,10,15,0.95)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-widest text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            KAMU<span style={{ color: "#c9a84c" }}> UNO</span>
          </Link>
          <div className="flex gap-3">
            <Link
              href={`/destinations?${new URLSearchParams({
                style: answers.style,
                duration: answers.duration,
                group: answers.group,
                interest: answers.interest,
              }).toString()}`}
              className="text-sm text-stone-400 hover:text-white transition-colors px-4 py-2"
            >
              ← Edit Destinations
            </Link>
            <button
              onClick={() => window.print()}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
              style={{ border: "1px solid #c9a84c", color: "#c9a84c" }}
            >
              🖨 Save Plan
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        {selectedDestinations[0] && (
          <Image
            src={selectedDestinations[0].image}
            alt={selectedDestinations[0].name}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#c9a84c", letterSpacing: "0.3em" }}>
            Your Personalized Plan
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {plan.totalDays}-Day Peru Adventure
          </h1>
          <p className="text-white/70 max-w-2xl text-base">{plan.summary}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { icon: "📅", label: "Duration", value: getDurationLabel(answers.duration) },
            { icon: "📍", label: "Destinations", value: `${selectedDestinations.length} Places` },
            {
              icon: "👤",
              label: "Travelers",
              value:
                answers.group === "solo" ? "Solo" :
                answers.group === "couple" ? "Couple" :
                answers.group === "family" ? "Family" : "Friends",
            },
            {
              icon: "🎯",
              label: "Style",
              value:
                answers.style === "adventure" ? "Adventure" :
                answers.style === "culture" ? "Culture" :
                answers.style === "nature" ? "Nature" : "Relaxed",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="p-5 rounded-2xl text-center"
              style={{ background: "#141418", border: "1px solid #1e1e26" }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">{item.label}</div>
              <div className="text-white font-semibold">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Top highlights */}
        <div
          className="p-6 rounded-2xl mb-14"
          style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)" }}
        >
          <h2
            className="text-white font-bold text-lg mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#e8c97a" }}
          >
            ✦ Trip Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {plan.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span style={{ color: "#c9a84c" }} className="mt-0.5 flex-shrink-0">→</span>
                <span className="text-stone-300">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Destination image strip */}
        <div className="mb-14">
          <h2
            className="text-2xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your Destinations
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
            {selectedDestinations.map((dest) => (
              <div
                key={dest.id}
                className="relative flex-shrink-0 w-52 h-32 rounded-xl overflow-hidden"
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-3 text-white text-xs font-semibold">
                  {dest.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day-by-day plan */}
        <div className="mb-12">
          <h2
            className="text-2xl font-bold text-white mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Day-by-Day Itinerary
          </h2>
          <div className="space-y-0">
            {plan.days.map((day) => (
              <DayCard key={day.day} day={day} isTravel={day.isTravel} />
            ))}
          </div>
        </div>

        {/* Start over */}
        <div
          className="text-center py-12 rounded-2xl"
          style={{ background: "#141418", border: "1px solid #1e1e26" }}
        >
          <div className="text-4xl mb-4">🦙</div>
          <h3
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready for the Adventure?
          </h3>
          <p className="text-stone-400 max-w-md mx-auto mb-8 text-sm">
            This plan is crafted just for you. Want to adjust your destinations or try a different travel style?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/destinations?${new URLSearchParams({
                style: answers.style,
                duration: answers.duration,
                group: answers.group,
                interest: answers.interest,
              }).toString()}`}
              className="px-8 py-3 rounded-full font-semibold text-sm transition-all"
              style={{ border: "1px solid #c9a84c", color: "#c9a84c" }}
            >
              ← Adjust Destinations
            </Link>
            <Link
              href="/quiz"
              className="px-8 py-3 rounded-full font-semibold text-sm transition-all"
              style={{ background: "#c9a84c", color: "#000" }}
            >
              Start a New Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0f" }}>
        <div className="text-stone-500 text-lg">Generating your travel plan...</div>
      </div>
    }>
      <PlanContent />
    </Suspense>
  );
}
