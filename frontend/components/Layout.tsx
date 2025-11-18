'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, LayoutDashboard, Briefcase, User, LogOut } from 'lucide-react';
import { useTheme } from '../app/providers';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await api.get('/api/auth/me');
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await api.post('/api/auth/logout');
    setUser(null);
    router.push('/login');
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['JOB_SEEKER', 'EMPLOYER', 'ADMIN'] },
    { href: '/jobs', label: 'Browse Jobs', icon: Briefcase, roles: ['JOB_SEEKER', 'EMPLOYER', 'ADMIN'] },
    { href: '/profile', label: 'Profile', icon: User, roles: ['JOB_SEEKER', 'EMPLOYER', 'ADMIN'] },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-2">
          <div className="flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-fuchsia-500 shadow-lg shadow-sky-500/40" />
                <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-fuchsia-300 bg-clip-text text-lg font-extrabold tracking-tight text-transparent">
                  JobHub Youth
                </span>
              </Link>
            </motion.div>
            {user && (
              <div className="hidden md:flex items-center gap-1 rounded-2xl border border-slate-800/90 bg-slate-950/80 px-1.5 py-1">
                {navLinks
                  .filter(link => link.roles.includes(user.role))
                  .map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                        pathname === link.href
                          ? 'bg-slate-100 text-slate-900 shadow-sm'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                      }`}
                    >
                      <link.icon className="h-3.5 w-3.5" />
                      <span>{link.label}</span>
                    </Link>
                  ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-950/80 text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right text-xs">
                  <div className="font-medium text-slate-100">{user.name}</div>
                  <div className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
                    {user.role?.replace('_', ' ')}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-[0.72rem] font-medium text-rose-100 hover:bg-rose-500/20 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link href="/login" className="btn-primary text-xs sm:text-sm px-4 py-2">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-2 py-8">
        {children}
      </main>
    </div>
  );
}


