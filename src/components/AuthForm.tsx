"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useAuth } from "@/contexts/AuthContext";

const authSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter at least 2 characters")
    .optional(),
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export type AuthFormValues = z.infer<typeof authSchema>;

interface AuthFormProps {
  mode: "signin" | "signup";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const { signIn, signUp, user } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(
      authSchema.refine((values) => (mode === "signup" ? Boolean(values.name) : true), {
        path: ["name"],
        message: "Name is required",
      }),
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [router, user]);

  const onSubmit = async (values: AuthFormValues) => {
    try {
      if (mode === "signup") {
        await signUp(values.email, values.password, values.name);
        toast.success("Account created! Welcome to HabitPilot.");
      } else {
        await signIn(values.email, values.password);
        toast.success("Signed in successfully.");
      }
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-6 rounded-xl border border-slate-200 bg-white/80 p-8 shadow-lg backdrop-blur"
    >
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          {mode === "signup" ? "Create your HabitPilot account" : "Welcome back"}
        </h2>
        <p className="text-sm text-slate-600">
          {mode === "signup"
            ? "Set your goals and start building unstoppable habits."
            : "Sign in to continue tracking your progress."}
        </p>
      </div>

      {mode === "signup" && (
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Alex Habit"
          />
          {errors.name && <p className="text-sm text-rose-500">{errors.name.message}</p>}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-sm text-rose-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          {...register("password")}
          className="w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="••••••••"
        />
        {errors.password && <p className="text-sm text-rose-500">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {isSubmitting ? "Loading..." : mode === "signup" ? "Create account" : "Sign in"}
      </button>
    </form>
  );
};

export default AuthForm;
