"use client";

import { useMemo, useState } from "react";
import { BrainCircuit, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface AIHabitSummary {
  title: string;
  name: string;
  goal: string;
  streak: number;
  lastCompleted: string | null;
  frequency: string;
}

interface AIInsightsProps {
  habits: AIHabitSummary[];
  loading?: boolean;
}

const AIInsights = ({ habits, loading = false }: AIInsightsProps) => {
  const [insight, setInsight] = useState<string>("");
  const [isRequesting, setIsRequesting] = useState(false);

  const disabled = loading || !habits.length || isRequesting;

  const prompt = useMemo(() => {
    if (!habits.length) return "";
    const summary = habits
      .map((habit) => {
        const lastCompleted = habit.lastCompleted ? new Date(habit.lastCompleted).toDateString() : "never";
        return `${habit.title} (goal: ${habit.goal}, frequency: ${habit.frequency}, streak: ${habit.streak}, last completed: ${lastCompleted})`;
        return `${habit.name} (goal: ${habit.goal}, frequency: ${habit.frequency}, streak: ${habit.streak}, last completed: ${lastCompleted})`;
      })
      .join("; ");
    return `You are HabitPilot, a motivational coach. Analyse these habits: ${summary}. Respond with a short paragraph of encouragement plus one actionable improvement.`;
  }, [habits]);

  const fetchInsights = async () => {
    if (!prompt) return;
    setIsRequesting(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Unable to generate AI insight right now.");
      }

      const data = await response.json();
      setInsight(data.message ?? "Keep up the great work!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "AI request failed.";
      toast.error(message);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <BrainCircuit className="h-6 w-6 text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold text-slate-900">AI habit coach</h3>
          <p className="text-sm text-slate-500">
            Summarizes your progress and shares one focused improvement idea.
          </p>
        </div>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={fetchInsights}
        className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
        <RefreshCw className={`h-4 w-4 ${isRequesting ? "animate-spin" : ""}`} />
        Generate insight
      </button>
      <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50 p-4 text-sm text-indigo-700">
        {insight || "Insights will appear here once generated."}
      </div>
    </div>
  );
};

export default AIInsights;
