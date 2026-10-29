import React from 'react';
import { BookOpen, Bookmark, Moon, Sun, Compass, Clock, Volume2 } from 'lucide-react';
import { LastRead } from '../types/quran';

interface NavbarProps {
  activeTab: 'quran' | 'sholat' | 'doa' | 'asmaul' | 'tasbih';
  setActiveTab: (tab: 'quran' | 'sholat' | 'doa' | 'asmaul' | 'tasbih') => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  themeMode: 'light' | 'dark' | 'sepia';
  setThemeMode: (mode: 'light' | 'dark' | 'sepia') => void;
  lastRead: LastRead | null;
  onOpenLastRead: () => void;
  onOpenBookmarks: () => void;
  bookmarksCount: number;
  onOpenAdhanModal?: () => void;
  nextPrayerName?: string;
  nextPrayerTime?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  themeMode,
  setThemeMode,
  lastRead,
  onOpenLastRead,
  onOpenBookmarks,
  bookmarksCount,
  onOpenAdhanModal,
  nextPrayerName,
  nextPrayerTime
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md transition-colors border-b border-stone-200/80 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setActiveTab('quran')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus:outline-none"
        >
          <img
            src="/assets/aistudio/IMG_3954_7eb1552b.png"
            alt="Muslim Quran Logo"
            className="w-9 h-9 rounded-xl object-contain shadow-xs group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
          />
          <div className="leading-tight">
            <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              Muslim Quran
            </span>
          </div>
        </button>

        {/* Zone 2: Clean 4–5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('quran')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'quran'
                ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Al-Qur'an
          </button>
          <button
            onClick={() => setActiveTab('sholat')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'sholat'
                ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Jam Sholat & Azan
          </button>
          <button
            onClick={() => setActiveTab('doa')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'doa'
                ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Doa & Dzikir
          </button>
          <button
            onClick={() => setActiveTab('asmaul')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'asmaul'
                ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Asmaul Husna
          </button>
          <button
            onClick={() => setActiveTab('tasbih')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'tasbih'
                ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Tasbih Digital
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area & Quick Utilities */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Jam Sholat & Audio Azan Pill in Navbar */}
          {nextPrayerName && (
            <button
              onClick={() => {
                if (onOpenAdhanModal) {
                  onOpenAdhanModal();
                } else {
                  setActiveTab('sholat');
                }
              }}
              title={`Waktu Sholat Berikutnya: ${nextPrayerName} pukul ${nextPrayerTime || ''} (Klik untuk Audio Azan)`}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800 rounded-lg hover:bg-amber-100 transition-colors whitespace-nowrap shrink-0"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{nextPrayerName} {nextPrayerTime ? `: ${nextPrayerTime}` : ''}</span>
              <Volume2 className="w-3 h-3 text-amber-500 ml-0.5 opacity-80" />
            </button>
          )}

          {/* Quick Last Read Button */}
          {lastRead && (
            <button
              onClick={onOpenLastRead}
              title={`Lanjutkan baca: ${lastRead.surahName} ayat ${lastRead.ayahNumber}`}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors whitespace-nowrap shrink-0"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="truncate max-w-36">Terakhir: {lastRead.surahName}:{lastRead.ayahNumber}</span>
            </button>
          )}

          {/* Bookmarks toggle button */}
          <button
            onClick={onOpenBookmarks}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors relative"
            title="Penanda & Favorit"
            aria-label="Penanda"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white dark:ring-stone-900"></span>
            )}
          </button>

          {/* Theme Mode Toggle (Light / Dark / Sepia) */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs shadow-2xs">
            <button
              onClick={() => setThemeMode('light')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                themeMode === 'light'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
              }`}
              title="Aktifkan Mode Terang"
              aria-label="Mode Terang"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline text-[11px]">Terang</span>
            </button>
            <button
              onClick={() => setThemeMode('sepia')}
              className={`px-2 py-1 font-serif text-[11px] rounded-lg transition-all ${
                themeMode === 'sepia'
                  ? 'bg-[#e8decb] text-amber-950 font-bold shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
              }`}
              title="Aktifkan Mode Kertas Sepia"
              aria-label="Mode Sepia"
            >
              Sepia
            </button>
            <button
              onClick={() => setThemeMode('dark')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                themeMode === 'dark'
                  ? 'bg-stone-700 text-amber-300 shadow-xs font-semibold'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
              }`}
              title="Aktifkan Mode Gelap (Malam)"
              aria-label="Mode Gelap"
            >
              <Moon className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline text-[11px]">Gelap</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
