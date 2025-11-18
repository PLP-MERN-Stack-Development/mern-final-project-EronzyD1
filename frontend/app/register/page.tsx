'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'JOB_SEEKER',
    company: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/api/auth/register', formData);
      const user = res.data.user;

      // Redirect based on role
      if (user.role === 'EMPLOYER') {
        router.push('/employer/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center py-10 sm:py-14">
      <div className="hero-orbit -top-24 right-4 h-60 w-60" />
      <div className="hero-orbit bottom-4 left-0 h-72 w-72" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="mb-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            Join the JobHub Youth network
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-50 sm:text-4xl">
            Create your free account
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Whether you&apos;re seeking gigs or hiring talent, it starts with a profile.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="glass-panel p-6 sm:p-8"
        >
        {error && (
            <div className="mb-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                I am a
              </label>
            <select
              className="input-field"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            >
              <option value="JOB_SEEKER">Job Seeker</option>
              <option value="EMPLOYER">Employer</option>
            </select>
          </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Full name
              </label>
            <input
              type="text"
              className="input-field"
                placeholder="Alex Rivera"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Email
              </label>
            <input
              type="email"
              className="input-field"
                placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {formData.role === 'EMPLOYER' && (
              <div className="space-y-2">
                <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Company
                </label>
              <input
                type="text"
                className="input-field"
                  placeholder="Company name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          )}

            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Password
              </label>
            <input
              type="password"
              className="input-field"
                placeholder="Create a secure password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
              {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

          <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
            <Link href="/login" className="font-medium text-sky-300 hover:text-sky-200">
            Login
            </Link>
        </p>
        </motion.div>
      </motion.div>
    </div>
  );
}


