'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import Link from 'next/link';
import { Briefcase, CheckCircle, Clock, FileText, Sparkles } from 'lucide-react';

export default function JobSeekerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userRes, appsRes] = await Promise.all([
        api.get('/api/auth/me'),
        api.get('/api/applications/my-applications/list'),
      ]);

      setUser(userRes.data.user);
      setApplications(appsRes.data.applications || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter((app: any) => app.status === 'PENDING').length,
    accepted: applications.filter((app: any) => app.status === 'ACCEPTED').length,
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-sky-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-sky-500/25 bg-gradient-to-br from-sky-500/30 via-indigo-600/40 to-slate-950 px-6 py-8 sm:px-10 sm:py-10 text-slate-50"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(248,250,252,0.3),_transparent_55%)] opacity-80" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-300/50 bg-slate-950/40 px-3 py-1 text-[0.7rem] font-medium text-sky-100 shadow-lg shadow-sky-900/70">
              <Sparkles className="h-3.5 w-3.5 text-sky-200" />
              <span className="uppercase tracking-[0.18em]">
                Job seeker dashboard
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold">
              Welcome back, {user?.name}!
            </h1>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-slate-100/80">
              Track your applications, stay on top of deadlines, and find new roles tailored to your skills.
            </p>
          </div>
          <div className="glass-panel flex min-w-[220px] flex-col gap-2 p-4 sm:max-w-xs">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
              Today&apos;s snapshot
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-200">Active applications</span>
              <span className="font-semibold text-sky-200">{stats.total}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-200">Pending review</span>
              <span className="font-semibold text-amber-200">{stats.pending}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-200">Accepted offers</span>
              <span className="font-semibold text-emerald-200">{stats.accepted}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-3xl font-bold">{stats.pending}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
              <p className="text-3xl font-bold">{stats.accepted}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Applications */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Applications</h2>
          <Link href="/jobs" className="btn-primary">
            Browse Jobs
          </Link>
        </div>

        {applications.length === 0 ? (
          <div className="card text-center py-12">
            <Briefcase className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You haven't applied to any jobs yet
            </p>
            <Link href="/jobs" className="btn-primary">
              Find Opportunities
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app: any, index: number) => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      {app.jobId?.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {app.jobId?.description?.substring(0, 150)}...
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {app.jobId?.requiredSkills?.slice(0, 4).map((skill: string) => (
                        <span key={skill} className="badge badge-info text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Applied on {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`badge ${
                    app.status === 'ACCEPTED' ? 'badge-success' :
                    app.status === 'REJECTED' ? 'badge-error' :
                    app.status === 'PENDING' ? 'badge-warning' : 'badge-info'
                  }`}>
                    {app.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


