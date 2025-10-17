"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, LogOut, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const { user, signOutUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isDashboard = pathname?.startsWith("/dashboard");

  const handleAuthAction = async () => {
    if (user) {
      await signOutUser();
      toast.success("Signed out successfully.");
      router.push("/");
    } else {
      router.push("/signin");
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Sparkles className="h-6 w-6 text-blue-600" />
          HabitPilot
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link
            href="/dashboard"
            className={`rounded-full px-4 py-2 transition ${
              isDashboard ? "bg-blue-50 text-blue-600" : "hover:bg-slate-100"
            }`}
          >
            Dashboard
          </Link>
          <button
            type="button"
            onClick={handleAuthAction}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
          >
            {user ? (
              <>
                <LogOut className="h-4 w-4" />
                Sign out
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Sign in
              </>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
