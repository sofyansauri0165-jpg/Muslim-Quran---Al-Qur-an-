import React from 'react';
import { WifiOff, CheckCircle2 } from 'lucide-react';

interface OfflineIndicatorProps {
  isOnline: boolean;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-amber-600/95 dark:bg-amber-700/95 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-md border border-amber-400/40 text-xs font-medium flex items-center gap-2 max-w-[90vw] animate-fade-in"
    >
      <WifiOff className="w-4 h-4 shrink-0 text-amber-200" />
      <span className="truncate">
        Anda sedang offline — Teks Al-Qur'an dan data tersimpan tetap dapat diakses
      </span>
    </div>
  );
};
