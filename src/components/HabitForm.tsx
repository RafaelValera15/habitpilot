"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "@/lib/firebase"; // 👈 adjust path if needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext"; // 👈 optional if you have user context
import { valibotResolver } from "@hookform/resolvers/valibot";

// ================================
// 🧠 SCHEMA SETUP
// ================================
const CATEGORY_OPTIONS = [
  "Mindfulness",
  "Productivity",
  "Learning",
  "Nutrition",
  "Wellness",
  "Other",
] as const;

const CATEGORY_SET = new Set<string>(CATEGORY_OPTIONS);

const habitSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z
    .string()
    .max(200, "Keep it brief")
    .optional()
    .or(z.literal("")),
  goal: z.string().min(2, "Goal must be at least 2 characters"),
  category: z
    .string()
    .refine((value) => CATEGORY_SET.has(value), {
      message: "Choose a valid category",
    }),
  frequency: z
  .enum(["daily", "weekly", "monthly"])
  .refine((val) => !!val, { message: "Choose a valid frequency" })
  });

export type HabitFormValues = z.infer<typeof habitSchema>;

// ================================
// 🧩 PROPS INTERFACE
// ================================
interface HabitFormProps {
  onCancel: () => void;
}

// ================================
// 🚀 COMPONENT
// ================================
const HabitForm: React.FC<HabitFormProps> = ({ onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      name: "",
      description: "",
      goal: "",
      category: "",
      frequency: "daily",
    },
  });

  // 👇 If using AuthContext for current user
  const { user } = useAuth?.() || {}; // fallback if no context

  const submitHandler = async (values: HabitFormValues) => {
    try {
      if (!user) {
        alert("You must be logged in to create a habit.");
        return;
      }

      await addDoc(collection(db, "users", user.uid, "habits"), {
        ...values,
        createdAt: serverTimestamp(),
        completedDays: [],
      });

      alert("✅ Habit successfully added!");
      reset();
    } catch (error) {
      console.error("Error adding habit:", error);
      alert("⚠️ Failed to add habit. Check console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md"
    >
      {/* 🧱 Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          {...register("name")}
          className="border border-gray-300 rounded p-2 w-full"
          placeholder="Habit name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* 🧱 Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          className="border border-gray-300 rounded p-2 w-full"
          placeholder="Optional short description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* 🧱 Goal */}
      <div>
        <label className="block text-sm font-medium mb-1">Goal</label>
        <input
          {...register("goal")}
          className="border border-gray-300 rounded p-2 w-full"
          placeholder="e.g., Meditate 10 minutes daily"
        />
        {errors.goal && (
          <p className="text-red-500 text-sm">{errors.goal.message}</p>
        )}
      </div>

      {/* 🧱 Category */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          {...register("category")}
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="">Select category</option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* 🧱 Frequency */}
      <div>
        <label className="block text-sm font-medium mb-1">Frequency</label>
        <select
          {...register("frequency")}
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {errors.frequency && (
          <p className="text-red-500 text-sm">{errors.frequency.message}</p>
        )}
      </div>

      {/* 🧱 Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Habit
        </button>
      </div>
    </form>
  );
};

export default HabitForm;
