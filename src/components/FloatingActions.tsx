import React, { useState, useEffect } from 'react';
import {
  ArrowUp,
  Volume2,
  BookOpen,
  Clock,
  Compass,
  X,
  Plus,
  Sparkles,
  CircleDot,
  Moon,
  Sun
} from 'lucide-react';
import { LastRead } from '../types/quran';

interface FloatingActionsProps {
  onOpenLastRead: () => void;
  lastRead: LastRead | null;
  onOpenAdhan: () => void;
  onNavigateTab: (tab: 'quran' | 'sholat' | 'doa' | 'asmaul' | 'tasbih') => void;
  isAudioBarVisible: boolean;
  nextPrayerName?: string;
  nextPrayerCountdown?: string;
  themeMode?: 'light' | 'dark' | 'sepia';
  onToggleTheme?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenLastRead,
  lastRead,
  onOpenAdhan,
  onNavigateTab,
  isAudioBarVisible,
  nextPrayerName,
  nextPrayerCountdown,
  themeMode = 'light',
  onToggleTheme
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Monitor scroll for Scroll-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Adjust bottom offset if audio player bar is open
  const bottomOffsetClass = isAudioBarVisible
    ? 'bottom-20 sm:bottom-22'
    : 'bottom-5 sm:bottom-6';

  return (
    <div className={`fixed right-4 sm:right-6 ${bottomOffsetClass} z-40 flex flex-col items-end gap-2.5 transition-all duration-300`}>
      {/* Scroll to Top floating button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 shadow-lg hover:shadow-xl hover:bg-stone-50 dark:hover:bg-stone-700 flex items-center justify-center transition-all active:scale-95 animate-in fade-in zoom-in duration-200"
          title="Kembali ke atas"
          aria-label="Kembali ke atas"
        >
          <ArrowUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </button>
      )}

      {/* Expanded Speed-Dial Action Buttons */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Action 0: Toggle Mode Gelap / Terang */}
          {onToggleTheme && (
            <button
              onClick={() => {
                onToggleTheme();
                setIsOpen(false);
              }}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-white border border-stone-200 dark:border-stone-700 shadow-xl hover:bg-emerald-50 dark:hover:bg-stone-700 transition-all text-xs font-semibold group"
            >
              <span className="text-stone-600 dark:text-stone-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                Mode {themeMode === 'dark' ? 'Terang' : 'Malam (Gelap)'}
              </span>
              <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-700 text-amber-500 dark:text-amber-300 flex items-center justify-center shadow-xs">
                {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </div>
            </button>
          )}

          {/* Action 1: Putar Audio Azan */}
          <button
            onClick={() => {
              onOpenAdhan();
              setIsOpen(false);
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-white border border-stone-200 dark:border-stone-700 shadow-xl hover:bg-emerald-50 dark:hover:bg-stone-700 transition-all text-xs font-semibold group"
          >
            <span className="text-stone-600 dark:text-stone-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
              Putar Audio Azan
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shadow-xs">
              <Volume2 className="w-4 h-4" />
            </div>
          </button>

          {/* Action 2: Jam Sholat & Jadwal */}
          <button
            onClick={() => {
              onNavigateTab('sholat');
              setIsOpen(false);
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-white border border-stone-200 dark:border-stone-700 shadow-xl hover:bg-emerald-50 dark:hover:bg-stone-700 transition-all text-xs font-semibold group"
          >
            <span className="text-stone-600 dark:text-stone-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
              Jam Sholat Digital
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center shadow-xs">
              <Clock className="w-4 h-4" />
            </div>
          </button>

          {/* Action 3: Lanjut Baca (Last Read) if available */}
          {lastRead && (
            <button
              onClick={() => {
                onOpenLastRead();
                setIsOpen(false);
              }}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-white border border-stone-200 dark:border-stone-700 shadow-xl hover:bg-emerald-50 dark:hover:bg-stone-700 transition-all text-xs font-semibold group"
            >
              <span className="text-stone-600 dark:text-stone-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate max-w-44">
                Terakhir: {lastRead.surahName}:{lastRead.ayahNumber}
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <BookOpen className="w-4 h-4 text-amber-200" />
              </div>
            </button>
          )}

          {/* Action 4: Tasbih Digital */}
          <button
            onClick={() => {
              onNavigateTab('tasbih');
              setIsOpen(false);
            }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-white border border-stone-200 dark:border-stone-700 shadow-xl hover:bg-emerald-50 dark:hover:bg-stone-700 transition-all text-xs font-semibold group"
          >
            <span className="text-stone-600 dark:text-stone-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
              Tasbih Digital
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-400 flex items-center justify-center shadow-xs">
              <CircleDot className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {/* Next Prayer Pill Chip attached to Floating Button on Desktop */}
        {!isOpen && nextPrayerName && nextPrayerCountdown && (
          <button
            onClick={() => onNavigateTab('sholat')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-stone-850/95 backdrop-blur-md border border-stone-200 dark:border-stone-700 shadow-lg hover:shadow-xl text-xs transition-all hover:scale-102"
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold text-stone-800 dark:text-stone-100">{nextPrayerName}</span>
            <span className="text-stone-400 text-[11px]">{nextPrayerCountdown}</span>
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-2xl transition-all active:scale-95 cursor-pointer border ${
            isOpen
              ? 'bg-stone-800 text-white border-stone-700 rotate-45'
              : 'bg-gradient-to-tr from-emerald-700 to-teal-500 text-white border-emerald-400/40 hover:from-emerald-600 hover:to-teal-400 hover:shadow-emerald-500/25'
          }`}
          title={isOpen ? 'Tutup Menu Melayang' : 'Menu Cepat Melayang (Floating)'}
          aria-label="Menu Cepat Melayang"
        >
          {isOpen ? (
            <Plus className="w-6 h-6" />
          ) : (
            <img
              src="/assets/aistudio/IMG_3954_7eb1552b.png"
              alt="Icon"
              className="w-8 h-8 rounded-xl object-contain drop-shadow-xs"
              referrerPolicy="no-referrer"
            />
          )}
        </button>
      </div>
    </div>
  );
};
