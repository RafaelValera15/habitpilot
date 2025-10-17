import Link from "next/link";

import AuthForm from "@/components/AuthForm";

export default function SignUpPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-10 text-center">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">Create your HabitPilot account</h1>
        <p className="text-sm text-slate-600">
          Already have an account? <Link href="/signin" className="font-semibold text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div>
      <div className="w-full max-w-xl">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
