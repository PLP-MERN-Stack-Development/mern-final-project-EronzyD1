import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobHub Youth - Connect Young Talent with Opportunities",
  description:
    "A modern platform connecting young job-seekers with local gig opportunities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {/* Site header with brand */}
          <header className="w-full border-b border-white/10 bg-slate-950/60 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <Link href="/" className="inline-block">
                <span className="bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-xl font-extrabold tracking-tight">
                  JobHub Youth
                </span>
              </Link>
            </div>
          </header>

          {/* Main content */}
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
