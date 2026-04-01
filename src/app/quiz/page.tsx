"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { TravelStyle, Interest, GroupType, Duration } from "@/lib/data";

interface Step {
  id: string;
  question: string;
  subtitle: string;
  options: { value: string; label: string; emoji: string; desc: string }[];
}

const steps: Step[] = [
  {
    id: "style",
    question: "What kind of traveler are you?",
    subtitle: "Choose the style that best describes how you like to explore",
    options: [
      {
        value: "adventure",
        label: "Adventure Seeker",
        emoji: "🧗",
        desc: "I thrive on challenging hikes, adrenaline, and the unknown",
      },
      {
        value: "culture",
        label: "Culture Explorer",
        emoji: "🏛️",
        desc: "History, local life, museums, food, and ancient stories",
      },
      {
        value: "nature",
        label: "Nature Lover",
        emoji: "🌿",
        desc: "Wildlife, landscapes, national parks, and wild beauty",
      },
      {
        value: "relaxation",
        label: "Slow Traveler",
        emoji: "☕",
        desc: "Gentle pace, scenic views, good food, and unhurried days",
      },
    ],
  },
  {
    id: "duration",
    question: "How long is your trip?",
    subtitle: "We'll create an itinerary that fits your timeline perfectly",
    options: [
      {
        value: "short",
        label: "Short Escape",
        emoji: "⚡",
        desc: "3–5 days — a highlights-only sprint",
      },
      {
        value: "week",
        label: "One Week",
        emoji: "🗓️",
        desc: "6–8 days — the classic Peru introduction",
      },
      {
        value: "twoweeks",
        label: "Two Weeks",
        emoji: "🌎",
        desc: "9–14 days — deep exploration across regions",
      },
      {
        value: "extended",
        label: "Extended Journey",
        emoji: "🎒",
        desc: "15+ days — immersive, unhurried, off the beaten path",
      },
    ],
  },
  {
    id: "group",
    question: "Who are you traveling with?",
    subtitle: "We'll tailor difficulty, pace, and experiences to your group",
    options: [
      {
        value: "solo",
        label: "Solo Adventurer",
        emoji: "🧍",
        desc: "Flying free — your schedule, your choices",
      },
      {
        value: "couple",
        label: "Romantic Couple",
        emoji: "💑",
        desc: "Sharing sunrises and memorable meals for two",
      },
      {
        value: "family",
        label: "Family with Kids",
        emoji: "👨‍👩‍👧‍👦",
        desc: "Fun for all ages, manageable pace, safe adventures",
      },
      {
        value: "friends",
        label: "Group of Friends",
        emoji: "👥",
        desc: "Shared experiences, group energy, lasting memories",
      },
    ],
  },
  {
    id: "interest",
    question: "What excites you most?",
    subtitle: "Your answer shapes which Peruvian wonders we put first",
    options: [
      {
        value: "history",
        label: "Inca History & Ruins",
        emoji: "🏺",
        desc: "Citadels, temples, legends of the ancient Andean world",
      },
      {
        value: "jungle",
        label: "Jungle & Wildlife",
        emoji: "🦜",
        desc: "Amazon basin, river dolphins, macaws, and canopy walks",
      },
      {
        value: "mountains",
        label: "Mountains & Trekking",
        emoji: "⛰️",
        desc: "High peaks, canyon hikes, rainbow-colored ridges",
      },
      {
        value: "beaches",
        label: "Desert & Coastal Wonders",
        emoji: "🏜️",
        desc: "Sand dunes, Pacific oases, sea lions, and penguins",
      },
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);

  const step = steps[currentStep];
  const progress = ((currentStep) / steps.length) * 100;
  const isLast = currentStep === steps.length - 1;

  function handleSelect(value: string) {
    setSelected(value);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = { ...answers, [step.id]: selected };
    setAnswers(newAnswers);

    if (isLast) {
      const params = new URLSearchParams(newAnswers);
      router.push(`/destinations?${params.toString()}`);
      return;
    }

    setLeaving(true);
    setTimeout(() => {
      setCurrentStep((s) => s + 1);
      setSelected(null);
      setLeaving(false);
    }, 300);
  }

  function handleBack() {
    if (currentStep === 0) return;
    setLeaving(true);
    setTimeout(() => {
      setCurrentStep((s) => s - 1);
      setSelected(answers[steps[currentStep - 1].id] || null);
      setLeaving(false);
    }, 300);
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0a0a0f", fontFamily: "var(--font-body)" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <Link
          href="/"
          className="text-xl font-bold tracking-widest text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          KAMU<span style={{ color: "#c9a84c" }}> UNO</span>
        </Link>
        <div className="text-stone-500 text-sm">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-stone-800">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, background: "#c9a84c" }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div
          className="w-full max-w-2xl transition-all duration-300"
          style={{ opacity: leaving ? 0 : 1, transform: leaving ? "translateY(16px)" : "translateY(0)" }}
        >
          {/* Step indicator dots */}
          <div className="flex gap-2 justify-center mb-10">
            {steps.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === currentStep ? "28px" : "8px",
                  height: "8px",
                  background: i < currentStep ? "#c9a84c" : i === currentStep ? "#c9a84c" : "#2a2a3a",
                }}
              />
            ))}
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold text-white text-center mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {step.question}
          </h2>
          <p className="text-stone-400 text-center mb-10">{step.subtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {step.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="quiz-option text-left p-5 rounded-xl cursor-pointer"
                style={{
                  background: selected === option.value ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.03)",
                  borderColor: selected === option.value ? "#c9a84c" : "rgba(255,255,255,0.08)",
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl mt-0.5">{option.emoji}</span>
                  <div className="flex-1">
                    <div
                      className="font-semibold text-white mb-1"
                      style={{ color: selected === option.value ? "#e8c97a" : "#fff" }}
                    >
                      {option.label}
                    </div>
                    <div className="text-stone-400 text-sm leading-relaxed">{option.desc}</div>
                  </div>
                  {selected === option.value && (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "#c9a84c" }}
                    >
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={handleBack}
              className="text-stone-500 hover:text-white transition-colors text-sm"
              style={{ visibility: currentStep === 0 ? "hidden" : "visible" }}
            >
              ← Back
            </button>

            <button
              onClick={handleNext}
              disabled={!selected}
              className="px-10 py-3 rounded-full font-semibold text-base transition-all"
              style={{
                background: selected ? "#c9a84c" : "#2a2a3a",
                color: selected ? "#000" : "#555",
                cursor: selected ? "pointer" : "not-allowed",
                transform: selected ? "scale(1)" : "scale(0.98)",
              }}
            >
              {isLast ? "Show My Destinations →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
