import React from 'react';
import { Home, BookOpen, Clock } from 'lucide-react';
import { AppTab } from '../types/quran';

interface FloatingMobileNavProps {
  activeTab: AppTab;
  isSurahOpen: boolean;
  onSelectMode: (mode: 'quran' | 'home' | 'sholat') => void;
  isAudioBarVisible: boolean;
  nextPrayerName?: string;
  nextPrayerTime?: string;
}

export const FloatingMobileNav: React.FC<FloatingMobileNavProps> = ({
  activeTab,
  isSurahOpen,
  onSelectMode,
  isAudioBarVisible,
  nextPrayerName,
  nextPrayerTime
}) => {
  // If audio player is active, raise floating nav so they don't collide
  const bottomPositionClass = isAudioBarVisible ? 'bottom-22 sm:bottom-24' : 'bottom-4 sm:bottom-5';

  const isQuranActive = activeTab === 'quran';
  const isHomeActive = activeTab === 'home';
  const isSholatActive = activeTab === 'sholat';

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 ${bottomPositionClass} z-30 transition-all duration-300 pointer-events-auto w-[calc(100%-2rem)] max-w-sm sm:max-w-md px-1`}
      aria-label="Navigasi Tiga Mode: Quran, Home, Jam Sholat"
    >
      <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl rounded-2xl p-1.5 border border-stone-200/90 dark:border-stone-800 shadow-2xl shadow-stone-900/10 dark:shadow-black/40 flex items-center justify-around gap-1.5 ring-1 ring-black/5 dark:ring-white/10">
        {/* Mode 1: Quran (Al-Qur'an) */}
        <button
          onClick={() => onSelectMode('quran')}
          className={`flex-1 py-2 px-2 flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer relative ${
            isQuranActive
              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30 scale-[1.02]'
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100/70 dark:hover:bg-stone-800/60'
          }`}
          title="Baca Al-Qur'an & Daftar Surat"
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] leading-tight font-medium">Quran</span>
          {isQuranActive && (
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white dark:bg-emerald-200 shadow-xs" />
          )}
        </button>

        {/* Mode 2: Home (Beranda Utama) */}
        <button
          onClick={() => onSelectMode('home')}
          className={`flex-1 py-2 px-2 flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer relative ${
            isHomeActive
              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30 scale-[1.02]'
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100/70 dark:hover:bg-stone-800/60'
          }`}
          title="Beranda Utama"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] leading-tight font-medium">Home</span>
          {isHomeActive && (
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white dark:bg-emerald-200 shadow-xs" />
          )}
        </button>

        {/* Mode 3: Jam Sholat */}
        <button
          onClick={() => onSelectMode('sholat')}
          className={`flex-1 py-2 px-2 flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer relative ${
            isSholatActive
              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30 scale-[1.02]'
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100/70 dark:hover:bg-stone-800/60'
          }`}
          title="Jadwal Sholat & Waktu Azan"
        >
          <Clock className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] leading-tight font-medium">Jam Sholat</span>
          {nextPrayerName && !isSholatActive && (
            <span
              className="absolute top-1.5 right-4 w-2 h-2 rounded-full bg-amber-500 animate-pulse ring-2 ring-white dark:ring-stone-900"
              title={`Waktu sholat berikutnya: ${nextPrayerName} ${nextPrayerTime || ''}`}
            />
          )}
          {isSholatActive && (
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white dark:bg-emerald-200 shadow-xs" />
          )}
        </button>
      </div>
    </nav>
  );
};
