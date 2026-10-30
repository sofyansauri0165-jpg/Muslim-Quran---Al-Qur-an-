import React from 'react';
import { Smartphone, Download, Check } from 'lucide-react';

interface PWAInstallButtonProps {
  onOpenModal: () => void;
  isInstalled: boolean;
  isStandalone: boolean;
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  onOpenModal,
  isInstalled,
  isStandalone,
  className = '',
}) => {
  if (isStandalone) {
    return null; // Don't show install button if already running in standalone PWA window
  }

  return (
    <button
      onClick={onOpenModal}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs border bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-800/80 active:scale-95 ${className}`}
      title="Pasang aplikasi di HP Android atau iPhone"
      aria-label="Pasang Aplikasi Muslim Quran di HP"
    >
      <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
      <span className="whitespace-nowrap">Pasang di HP</span>
      <span className="hidden xl:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-600 text-white leading-none">
        PWA
      </span>
    </button>
  );
};
