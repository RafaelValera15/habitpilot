// src/types/habit.ts

export interface Habit {
  id?: string;            // optional because Firebase auto-generates it
  name: string;
  description?: string;
  goal: string;
  category: string;
  frequency: "daily" | "weekly" | "monthly";
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

export interface HabitInput {
  name?: string;
  description?: string;
  goal: string;
  category: string;
  frequency: "daily" | "weekly" | "monthly";
}
