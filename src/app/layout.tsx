import type { Metadata } from "next";

import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "HabitPilot",
  description: "Build sustainable habits with AI guidance and Firebase-powered progress tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
