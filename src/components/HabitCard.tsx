"use client";

import { CheckCircle2, Edit3, Flame, Trash2 } from "lucide-react";

import { type Habit } from "@/lib/firestore";
import { formatDate, getGoalLabel } from "@/utils/helpers";

interface HabitCardProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
  onComplete: (habitId: string) => void;
}

const HabitCard = ({ habit, onEdit, onDelete, onComplete }: HabitCardProps) => {
  const isActiveToday = habit.lastCompleted
    ? new Date(habit.lastCompleted).toDateString() === new Date().toDateString()
    : false;

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{habit.name}</h3>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
            {habit.category}
          </span>
        </div>
        {habit.description && <p className="text-sm text-slate-600">{habit.description}</p>}
        <p className="text-sm text-slate-500">{getGoalLabel(habit.frequency)}</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Flame className={`h-5 w-5 ${habit.streak ? "text-orange-500" : "text-slate-300"}`} />
          <div>
            <p className="font-semibold text-slate-900">{habit.streak} day streak</p>
            <p>Last check-in: {formatDate(habit.lastCompleted)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onComplete(habit.id)}
            className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition ${
              isActiveToday
                ? "border-green-200 bg-green-50 text-green-600"
                : "border-slate-200 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            {isActiveToday ? "Completed" : "Mark complete"}
          </button>
          <button
            type="button"
            onClick={() => onEdit(habit)}
            className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-sm transition hover:bg-slate-100"
          >
            <Edit3 className="h-4 w-4" />
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(habit.id)}
            className="flex items-center gap-1 rounded-full border border-rose-200 px-3 py-1 text-sm text-rose-600 transition hover:bg-rose-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default HabitCard;
