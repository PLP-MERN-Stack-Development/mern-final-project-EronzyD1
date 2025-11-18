'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check } from 'lucide-react';
import api from '@/lib/api';

interface ApplyButtonProps {
  jobId: string;
  disabled?: boolean;
}

export default function ApplyButton({ jobId, disabled }: ApplyButtonProps) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleApply = async () => {
    if (disabled || status === 'loading') return;

    setStatus('loading');
    setMessage(null);

    try {
      await api.post('/api/applications', { jobId });
      setStatus('success');
      setMessage('Application submitted! We’ll keep you posted.');
      router.refresh();
    } catch (error: any) {
      const responseMessage = error.response?.data?.message;

      if (error.response?.status === 401) {
        router.push(`/login?redirect=/jobs/${jobId}`);
        return;
      }

      if (responseMessage === 'Already applied') {
        setStatus('success');
        setMessage('You have already applied to this job.');
        return;
      }

      setStatus('error');
      setMessage(responseMessage || 'Unable to apply right now.');
    }
  };

  return (
    <div className="space-y-2 w-full lg:w-auto">
      <button
        type="button"
        onClick={handleApply}
        disabled={disabled || status === 'loading'}
        className={`btn-primary justify-center ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        {status === 'loading' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : status === 'success' ? (
          <>
            <Check className="h-4 w-4" />
            Applied
          </>
        ) : (
          'Apply Now'
        )}
      </button>
      {message && (
        <p className={`text-xs ${status === 'error' ? 'text-rose-300' : 'text-emerald-300'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

