import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export default function JobNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
      <div className="glass-panel px-8 py-10 max-w-md w-full">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-900/70 text-slate-200 mb-4">
          <Briefcase className="h-7 w-7 text-slate-300" />
        </div>
        <h1 className="text-2xl font-semibold text-slate-50">Job not found</h1>
        <p className="mt-2 text-sm text-slate-400">
          This job may have been removed or is no longer accepting applications. Explore other opportunities tailored for you.
        </p>
        <div className="mt-6">
          <Link href="/jobs" className="btn-primary">
            Back to jobs
          </Link>
        </div>
      </div>
    </div>
  );
}

