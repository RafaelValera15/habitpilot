"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import HabitForm from "./HabitForm";
import HabitList from "./HabitList";
import GoalPathGrid from "./GoalPathGrid";
import AIInsights from "./AIInsights";
import {
  createHabit,
  deleteHabit,
  getHabits,
  markHabitComplete,
  updateHabit,
  type Habit,
  type HabitInput,
} from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = getHabits(user.uid, (data) => {
      setHabits(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCreateOrUpdate = async (values: HabitInput) => {
    if (!user) return;

    try {
      if (selectedHabit) {
        await updateHabit(user.uid, selectedHabit.id, values);
        toast.success("Habit updated.");
      } else {
        await createHabit(user.uid, values);
        toast.success("Habit created!");
      }
      setSelectedHabit(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save habit.";
      toast.error(message);
    }
  };

  const handleDelete = async (habitId: string) => {
    if (!user) return;
    try {
      await deleteHabit(user.uid, habitId);
      toast.success("Habit deleted.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to delete habit.";
      toast.error(message);
    }
  };

  const handleComplete = async (habitId: string) => {
    if (!user) return;
    try {
      await markHabitComplete(user.uid, habitId);
      toast.success("Progress recorded! Keep going.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to mark complete.";
      toast.error(message);
    }
  };

  const insightsPayload = useMemo(() => {
    return habits.map((habit) => ({
      title: habit.title,
      goal: habit.goal,
      streak: habit.streak,
      lastCompleted: habit.lastCompleted,
      frequency: habit.frequency,
    }));
  }, [habits]);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-8 text-white shadow-lg">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-wide text-white/70">Welcome back</p>
            <h1 className="text-3xl font-semibold">
              {user?.displayName ? `${user.displayName}, ` : ""}let&apos;s build your habit streak
            </h1>
            <p className="max-w-xl text-white/80">
              Track your routines, monitor streaks, and unlock AI insights tailored to your goals.
            </p>
          </div>
          <div className="w-full max-w-xs">
            <GoalPathGrid />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_minmax(0,0.8fr)]">
        <HabitForm
          initialHabit={selectedHabit}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setSelectedHabit(null)}
        />
        <div className="space-y-6">
          <AIInsights habits={insightsPayload} loading={loading} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Your habits</h2>
          {selectedHabit && (
            <button
              type="button"
              onClick={() => setSelectedHabit(null)}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Create new habit
            </button>
          )}
        </div>
        <HabitList
          habits={habits}
          onEdit={(habit) => setSelectedHabit(habit)}
          onDelete={handleDelete}
          onComplete={handleComplete}
        />
      </section>
    </div>
  );
};

export default Dashboard;
