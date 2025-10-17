"use client";

import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <Navigation />
      <main className="mx-auto min-h-screen max-w-5xl px-4 pb-16 pt-8">{children}</main>
      <Toaster position="top-right" />
    </AuthProvider>
  );
};

export default Providers;
