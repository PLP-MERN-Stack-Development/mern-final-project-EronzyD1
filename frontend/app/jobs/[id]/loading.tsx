import { Loader2 } from 'lucide-react';

export default function JobDetailsLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center space-y-3 text-center text-slate-400">
        <Loader2 className="h-10 w-10 animate-spin text-sky-300" />
        <p className="text-sm">Loading job...</p>
      </div>
    </div>
  );
}

