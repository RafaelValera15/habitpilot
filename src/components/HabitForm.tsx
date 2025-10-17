"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { type Habit, type HabitInput } from "@/lib/firestore";

const habitSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().max(200, "Keep it brief").optional().or(z.literal("")),
  goal: z.string().min(2, "Goal must be at least 2 characters"),
  category: z.string().min(2, "Category required"),
  frequency: z.enum(["daily", "weekly", "monthly"], {
    message: "Choose a frequency",
  }),
});

export type HabitFormValues = z.infer<typeof habitSchema>;

interface HabitFormProps {
  initialHabit?: Habit | null;
  onSubmit: (values: HabitInput) => Promise<void>;
  onCancel?: () => void;
}

const HabitForm = ({ initialHabit, onSubmit, onCancel }: HabitFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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

  useEffect(() => {
    if (initialHabit) {
      reset({
        name: initialHabit.name,
        description: initialHabit.description ?? "",
        goal: initialHabit.goal,
        category: initialHabit.category,
        frequency: (initialHabit.frequency as HabitFormValues["frequency"]) ?? "daily",
      });
    }
  }, [initialHabit, reset]);

  const submitHandler = async (values: HabitFormValues) => {
    await onSubmit({
      ...values,
      description: values.description || undefined,
    });
    if (!initialHabit) {
      reset({
        name: "",
        description: "",
        goal: "",
        category: "",
        frequency: "daily",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          {initialHabit ? "Update habit" : "Create a new habit"}
        </h3>
        <p className="text-sm text-slate-500">
          Define what success looks like and we&apos;ll guide your progress automatically.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Morning Run"
          />
          {errors.name && <p className="text-xs text-rose-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium text-slate-700">
            Category
          </label>
          <input
            id="category"
            type="text"
            {...register("category")}
            className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Fitness"
          />
          {errors.category && <p className="text-xs text-rose-500">{errors.category.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="goal" className="text-sm font-medium text-slate-700">
          Goal
        </label>
        <input
          id="goal"
          type="text"
          {...register("goal")}
          className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Run 5km before 8am"
        />
        {errors.goal && <p className="text-xs text-rose-500">{errors.goal.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          {...register("description")}
          className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Add any notes that will help you stay motivated."
        />
        {errors.description && <p className="text-xs text-rose-500">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="frequency" className="text-sm font-medium text-slate-700">
          Frequency
        </label>
        <select
          id="frequency"
          {...register("frequency")}
          className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {errors.frequency && <p className="text-xs text-rose-500">{errors.frequency.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isSubmitting ? "Saving..." : initialHabit ? "Update habit" : "Create habit"}
        </button>
        {initialHabit && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default HabitForm;
