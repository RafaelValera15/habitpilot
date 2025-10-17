import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font"; // ✅ import directly
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "HabitPilot",
  description:
    "Build sustainable habits with AI guidance and Firebase-powered progress tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} ${GeistMono.className} bg-slate-50 text-slate-900 antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
