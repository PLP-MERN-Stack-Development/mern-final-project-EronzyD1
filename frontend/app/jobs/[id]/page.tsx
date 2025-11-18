import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BadgeCheck, Clock, DollarSign, MapPin, Shield, Sparkles } from 'lucide-react';
import ApplyButton from './ApplyButton';

type EmployerInfo = {
  _id: string;
  name?: string;
  company?: string;
  email?: string;
};

type Job = {
  _id: string;
  title: string;
  description: string;
  requiredSkills?: string[];
  budget?: number;
  rateType?: 'HOURLY' | 'FIXED';
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  deadline?: string;
  status?: 'ACTIVE' | 'CLOSED' | 'FILLED';
  employerId?: EmployerInfo;
  createdAt?: string;
};

async function getJob(id: string): Promise<Job> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  try {
    const res = await fetch(`${baseUrl}/api/jobs/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return notFound();
    }

    const data = (await res.json()) as { job?: Job };
    if (!data.job) {
      return notFound();
    }

    return data.job;
  } catch (error) {
    return notFound();
  }
}

function formatBudget(budget?: number, rateType?: Job['rateType']) {
  if (!budget || Number.isNaN(budget)) {
    return '—';
  }

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(budget);

  return rateType === 'HOURLY' ? `${formatted} / hr` : formatted;
}

function formatDeadline(deadline?: string) {
  if (!deadline) return 'To be announced';

  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(deadline));
  } catch {
    return 'To be announced';
  }
}

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);

  const employerName = job.employerId?.company || job.employerId?.name || 'Verified employer';
  const employerEmail = job.employerId?.email;
  const location = [job.location?.city, job.location?.state, job.location?.country].filter(Boolean).join(', ') || 'Remote / Flexible';
  const budget = formatBudget(job.budget, job.rateType);
  const deadline = formatDeadline(job.deadline);
  const statusLabel = job.status ? job.status.toLowerCase() : 'active';
  const isActive = job.status === 'ACTIVE';

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/jobs" className="btn-secondary text-xs sm:text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </Link>
        <span className="badge badge-info uppercase tracking-[0.18em]">
          Status: {statusLabel}
        </span>
      </div>

      <section className="glass-panel p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/40 bg-slate-950/50 px-3 py-1 text-[0.7rem] font-medium text-sky-100 shadow-lg shadow-sky-900/60">
              <Sparkles className="h-3.5 w-3.5 text-sky-200" />
              Future-ready opportunity
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-slate-50">{job.title}</h1>
              <p className="mt-2 text-sm text-slate-400">
                Posted {job.createdAt ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(job.createdAt)) : 'recently'}
              </p>
            </div>
            <div className="flex flex-wrap gap-5 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-300" />
                {employerName}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-sky-300" />
                {location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-300" />
                Apply by {deadline}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <ApplyButton jobId={job._id} disabled={!isActive} />
            {!isActive && (
              <p className="text-xs text-amber-300">This role is no longer accepting new applications.</p>
            )}
            {employerEmail && (
              <p className="text-xs text-slate-400">
                Questions?{' '}
                <a
                  href={`mailto:${employerEmail}`}
                  className="text-sky-300 hover:text-sky-200"
                >
                  Contact the employer
                </a>
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="card space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">Role overview</h2>
          <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line">
            {job.description}
          </p>
        </section>
        <aside className="card space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Quick facts
          </h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-slate-400">
                <DollarSign className="h-4 w-4 text-emerald-300" />
                Compensation
              </span>
              <span className="font-semibold text-slate-50">{budget}</span>
            </li>
            <li className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-slate-400">
                <Shield className="h-4 w-4 text-indigo-300" />
                Engagement
              </span>
              <span className="font-semibold text-slate-50">
                {job.rateType === 'HOURLY' ? 'Hourly' : 'Fixed project'}
              </span>
            </li>
            <li className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-slate-400">
                <Clock className="h-4 w-4 text-amber-300" />
                Deadline
              </span>
              <span className="font-semibold text-slate-50">{deadline}</span>
            </li>
            <li className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-slate-400">
                <MapPin className="h-4 w-4 text-sky-300" />
                Location
              </span>
              <span className="font-semibold text-slate-50 text-right">{location}</span>
            </li>
          </ul>
        </aside>
      </div>

      {job.requiredSkills && job.requiredSkills.length > 0 && (
        <section className="card space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">Skills & tools</h2>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill) => (
              <span key={skill} className="badge badge-info text-xs">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

