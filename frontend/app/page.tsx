"use client";

import Link from 'next/link';
import { Briefcase, Users, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const features = [
    {
      icon: Briefcase,
      title: 'Browse Jobs',
      description: 'Discover amazing opportunities from top employers',
    },
    {
      icon: Users,
      title: 'Connect with Employers',
      description: 'Build professional relationships and grow your network',
    },
    {
      icon: Zap,
      title: 'Quick Apply',
      description: 'Apply to jobs with just one click',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data is protected with industry-leading security',
    },
  ];

  return (
    <div className="relative space-y-20">
      {/* Decorative background orbits */}
      <div className="hero-orbit -top-32 -left-10 h-72 w-72" />
      <div className="hero-orbit top-40 -right-24 h-80 w-80" />

      {/* Hero Section */}
      <section className="relative grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-slate-900/80 px-4 py-1.5 text-xs font-medium text-sky-100 shadow-lg shadow-sky-500/30"
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-300" />
            <span className="uppercase tracking-[0.16em] text-[0.68rem]">
              Launch your next opportunity
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight"
          >
            <span className="bg-gradient-to-br from-sky-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
              Youth jobs,
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent">
              reimagined for the future.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-xl text-base sm:text-lg text-slate-300/90 leading-relaxed"
          >
            JobHub Youth connects ambitious students and young professionals with
            flexible gigs and early-career roles at forward-thinking employers.
            Build experience, earn confidently, and grow your network — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href="/register" className="btn-primary text-sm sm:text-base">
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/jobs" className="btn-secondary text-sm sm:text-base">
              Browse jobs
            </Link>
            <p className="text-xs sm:text-sm text-slate-400">
              No long forms. Create a profile in under 60 seconds.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-6 pt-4 text-xs text-slate-400"
          >
            <div>
              <p className="font-semibold text-slate-200">2k+ youth hired</p>
              <p className="text-slate-500">from campuses & communities</p>
            </div>
            <div>
              <p className="font-semibold text-slate-200">Top local employers</p>
              <p className="text-slate-500">hand-reviewed and verified</p>
            </div>
          </motion.div>
        </div>

        {/* Right side hero visual */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-panel relative mx-auto max-w-md w-full p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/15 via-transparent to-fuchsia-500/15" />
          <div className="relative space-y-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Snapshot
                </p>
                <p className="text-lg font-semibold text-slate-50">
                  Your week at a glance
                </p>
              </div>
              <div className="rounded-full bg-slate-900/80 px-3 py-1 text-[0.68rem] font-medium text-slate-300 border border-slate-700/70">
                Live applications
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="card p-3 sm:p-4">
                <p className="text-[0.7rem] text-slate-400 mb-1">Applied</p>
                <p className="text-2xl font-bold text-sky-300">12</p>
                <p className="mt-1 text-[0.7rem] text-emerald-300/80">
                  +4 this week
                </p>
              </div>
              <div className="card p-3 sm:p-4">
                <p className="text-[0.7rem] text-slate-400 mb-1">Interviews</p>
                <p className="text-2xl font-bold text-indigo-300">3</p>
                <p className="mt-1 text-[0.7rem] text-indigo-200/80">
                  2 upcoming
                </p>
              </div>
              <div className="card p-3 sm:p-4">
                <p className="text-[0.7rem] text-slate-400 mb-1">Saved gigs</p>
                <p className="text-2xl font-bold text-fuchsia-300">9</p>
                <p className="mt-1 text-[0.7rem] text-fuchsia-200/80">
                  new matches
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  Smart matching enabled
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  We’ll surface gigs based on your skills, schedule, and interests.
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-500/60 via-indigo-500/70 to-fuchsia-500/70 flex items-center justify-center shadow-lg shadow-sky-500/40">
                <Zap className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
              Built for how youth actually work today.
            </h2>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-slate-400">
              From quick weekend gigs to longer term internships, JobHub Youth
              gives you a clear, simple view of what’s possible.
            </p>
          </div>
          <div className="text-xs sm:text-sm text-slate-500">
            Curated roles. No spam. Just opportunities that fit.
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="card group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-sky-500/10 via-transparent to-fuchsia-500/10" />
              <div className="relative">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/90 border border-slate-700/70 shadow-lg shadow-slate-950/70">
                  <feature.icon className="h-5 w-5 text-sky-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-50 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative overflow-hidden rounded-3xl border border-sky-500/25 bg-gradient-to-br from-sky-500/25 via-indigo-600/40 to-slate-900 px-6 py-10 sm:px-10 sm:py-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,250,252,0.28),_transparent_55%)] opacity-70" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
              Ready to unlock your next opportunity?
            </h2>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-slate-100/80">
              Create a free profile, explore roles that match your skills, and
              apply in just a few taps — straight from your dashboard.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <Link
              href="/register"
              className="btn-primary text-sm sm:text-base bg-white/95 text-slate-900 hover:text-slate-950 hover:bg-white"
            >
              Create your account
            </Link>
            <Link
              href="/login"
              className="btn-secondary text-xs sm:text-sm border-white/40 bg-slate-950/40"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}


