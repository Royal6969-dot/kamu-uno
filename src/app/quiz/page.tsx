"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { TravelStyle, Interest, GroupType, Duration } from "@/lib/data";

interface QuizStep {
  id: string;
  question: string;
  subtitle: string;
  options: { value: string; label: string; emoji: string; desc: string }[];
}

const quizSteps: QuizStep[] = [
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

const backgroundImages = [
  "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1600&q=85&fit=crop", // Name step — Machu Picchu
  "https://images.unsplash.com/photo-1547149694-e51ce8b5b3fa?w=1600&q=85&fit=crop",    // Style step — Rainbow Mountain
  "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=1600&q=85&fit=crop", // Duration step — Sacred Valley
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85&fit=crop",    // Group step — Lake Titicaca
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=85&fit=crop", // Interest step — Amazon
];

// Total steps: 0 = name, 1-4 = quiz questions
const TOTAL_STEPS = 5;

export default function QuizPage() {
  const router = useRouter();
  // -1 = name step, 0-3 = quiz steps
  const [phase, setPhase] = useState<"name" | "quiz">("name");
  const [name, setName] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);

  // Overall progress: name=step0 complete = 20%, quiz steps 1-4 = 40-100%
  const stepIndex = phase === "name" ? 0 : currentStep + 1;
  const progress = (stepIndex / TOTAL_STEPS) * 100;

  const step = quizSteps[currentStep];
  const isLastQuiz = currentStep === quizSteps.length - 1;

  const bgImage = backgroundImages[stepIndex] ?? backgroundImages[0];
  const prevBgImage = backgroundImages[Math.max(0, stepIndex - 1)];

  function handleNameContinue() {
    if (!name.trim()) return;
    transitionToNext(() => setPhase("quiz"));
  }

  function handleNameSkip() {
    transitionToNext(() => { setName(""); setPhase("quiz"); });
  }

  function handleSelect(value: string) {
    setSelected(value);
  }

  function transitionToNext(fn: () => void) {
    setLeaving(true);
    setTimeout(() => {
      fn();
      setLeaving(false);
    }, 350);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = { ...answers, [step.id]: selected };
    setAnswers(newAnswers);

    if (isLastQuiz) {
      const params = new URLSearchParams({ ...newAnswers, name });
      router.push(`/destinations?${params.toString()}`);
      return;
    }

    transitionToNext(() => {
      setCurrentStep((s) => s + 1);
      setSelected(null);
    });
  }

  function handleBack() {
    if (phase === "quiz" && currentStep === 0) {
      transitionToNext(() => { setPhase("name"); setSelected(null); });
      return;
    }
    if (phase === "quiz" && currentStep > 0) {
      transitionToNext(() => {
        setCurrentStep((s) => s - 1);
        setSelected(answers[quizSteps[currentStep - 1].id] || null);
      });
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: "var(--font-body)" }}>
      {/* Background images — crossfade */}
      {backgroundImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: src === bgImage ? 1 : 0, zIndex: 0 }}
        >
          <Image
            src={src}
            alt={`Background ${i}`}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/10">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, background: "#c9a84c" }}
        />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-5">
        <Link
          href="/"
          className="text-xl font-bold tracking-widest text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          KAMU<span style={{ color: "#c9a84c" }}> UNO</span>
        </Link>
        <div className="text-white/50 text-sm">
          Step {stepIndex + 1} of {TOTAL_STEPS}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <div
          className="w-full max-w-2xl transition-all duration-350"
          style={{
            opacity: leaving ? 0 : 1,
            transform: leaving ? "translateY(20px)" : "translateY(0)",
          }}
        >
          {/* Step dots */}
          <div className="flex gap-2 justify-center mb-10">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === stepIndex ? "28px" : "8px",
                  height: "8px",
                  background: i < stepIndex ? "#c9a84c" : i === stepIndex ? "#c9a84c" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          {/* Glass card */}
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {phase === "name" ? (
              /* ── NAME STEP ── */
              <>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white text-center mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Welcome to Kamu Uno
                </h2>
                <p className="text-white/65 text-center mb-8">
                  Let&apos;s plan your perfect Peru adventure. What&apos;s your name?
                </p>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) handleNameContinue(); }}
                  placeholder="Your first name…"
                  className="w-full px-5 py-4 rounded-xl text-white text-base outline-none mb-6"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                  }}
                />

                <button
                  onClick={handleNameContinue}
                  disabled={!name.trim()}
                  className="w-full py-4 rounded-full font-semibold text-base transition-all mb-4"
                  style={{
                    background: name.trim() ? "#c9a84c" : "rgba(201,168,76,0.3)",
                    color: name.trim() ? "#000" : "rgba(255,255,255,0.4)",
                    cursor: name.trim() ? "pointer" : "not-allowed",
                  }}
                >
                  Continue →
                </button>

                <div className="text-center">
                  <button
                    onClick={handleNameSkip}
                    className="text-sm transition-colors"
                    style={{ color: "#78716c" }}
                  >
                    Skip for now →
                  </button>
                </div>
              </>
            ) : (
              /* ── QUIZ STEPS ── */
              <>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white text-center mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.question}
                </h2>
                <p className="text-white/65 text-center mb-8">{step.subtitle}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {step.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className="text-left p-5 rounded-xl cursor-pointer transition-all duration-200"
                      style={{
                        background: selected === option.value
                          ? "rgba(201,168,76,0.18)"
                          : "rgba(255,255,255,0.07)",
                        borderColor: selected === option.value ? "#c9a84c" : "rgba(255,255,255,0.12)",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl mt-0.5">{option.emoji}</span>
                        <div className="flex-1">
                          <div
                            className="font-semibold mb-1"
                            style={{ color: selected === option.value ? "#e8c97a" : "#fff" }}
                          >
                            {option.label}
                          </div>
                          <div className="text-white/55 text-sm leading-relaxed">{option.desc}</div>
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
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={handleBack}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!selected}
                    className="px-10 py-3 rounded-full font-semibold text-base transition-all"
                    style={{
                      background: selected ? "#c9a84c" : "rgba(201,168,76,0.25)",
                      color: selected ? "#000" : "rgba(255,255,255,0.3)",
                      cursor: selected ? "pointer" : "not-allowed",
                    }}
                  >
                    {isLastQuiz ? "Show My Destinations →" : "Next →"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
