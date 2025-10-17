import Link from "next/link";
import { ArrowRight, BarChart3, HeartPulse, ShieldCheck } from "lucide-react";

import GoalPathGrid from "@/components/GoalPathGrid";

const features = [
  {
    title: "Track habits with clarity",
    description: "Stay on top of streaks, completions, and the rituals that keep you moving forward.",
    icon: BarChart3,
  },
  {
    title: "AI-powered coaching",
    description: "Get personalised motivation and progress reports powered by OpenAI or Gemini.",
    icon: HeartPulse,
  },
  {
    title: "Secure and synced",
    description: "Authentication and data backed by Firebase so your habits travel with you everywhere.",
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <div className="space-y-16 pb-20">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-8 text-white shadow-lg">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <span className="rounded-full bg-white/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-white/90">
              Meet HabitPilot
            </span>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Design habits that stick—with AI insights and laser-focused analytics.
            </h1>
            <p className="text-lg text-white/80">
              HabitPilot gives you a guided dashboard, motivational nudges, and data-driven feedback. Build routines with confidence and watch your streaks soar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg transition hover:bg-slate-100"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View dashboard
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-inner backdrop-blur">
            <GoalPathGrid />
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">Everything you need to stay consistent</h2>
          <p className="text-base text-slate-600">
            HabitPilot combines thoughtful design with real-time data so you never lose momentum.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
              <feature.icon className="h-10 w-10 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
