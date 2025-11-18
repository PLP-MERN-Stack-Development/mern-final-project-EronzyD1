'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import Link from 'next/link';
import { Clock, DollarSign, MapPin, Briefcase, Filter, Search } from 'lucide-react';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredJobs(
        jobs.filter((job: any) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.description?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredJobs(jobs);
    }
  }, [search, jobs]);

  const loadJobs = async () => {
    try {
      const res = await api.get('/api/jobs');
      setJobs(res.data.jobs);
      setFilteredJobs(res.data.jobs);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
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
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">
              Browse opportunities
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Explore curated gigs, part-time roles, and early-career opportunities.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 px-3 py-1 text-[0.7rem] text-slate-400">
            <Filter className="h-3.5 w-3.5 text-slate-500" />
            Smart filters help you find roles that match your skills.
          </div>
        </div>

        <div className="glass-panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by role, company, or skills..."
              className="input-field pl-9 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 text-[0.7rem] text-slate-400">
            <span className="badge badge-info">Remote-friendly</span>
            <span className="badge badge-success">Paid gigs</span>
            <span className="badge badge-warning">Flexible hours</span>
          </div>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-16">
          <Briefcase className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No jobs found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job: any, index: number) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="card cursor-pointer"
            >
              <Link href={`/jobs/${job._id}`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <span className="badge badge-success text-xs">Active</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.requiredSkills?.slice(0, 3).map((skill: string) => (
                    <span
                      key={skill}
                      className="badge badge-info text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>${job.budget?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location?.city}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}


