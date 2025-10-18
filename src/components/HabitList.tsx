"use client";

import { Compass } from "lucide-react";

import HabitCard from "./HabitCard";
import { type Habit } from "@/types/habit";

interface HabitListProps {
  habits: Habit[];
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
  onComplete: (habitId: string) => void;
}

const HabitList = ({ habits, onEdit, onDelete, onComplete }: HabitListProps) => {
  if (!habits.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-12 text-center">
        <Compass className="h-10 w-10 text-slate-300" />
        <h3 className="mt-4 text-xl font-semibold text-slate-800">No habits yet</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Start by creating a habit. We will help you stay accountable with streak tracking and AI insights.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onEdit={onEdit} onDelete={onDelete} onComplete={onComplete} />
      ))}
    </div>
  );
};

export default HabitList;
