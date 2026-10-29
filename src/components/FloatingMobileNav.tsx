import React from 'react';
import { BookOpen, Clock, Heart, Sparkles, CircleDot } from 'lucide-react';

interface FloatingMobileNavProps {
  activeTab: 'quran' | 'sholat' | 'doa' | 'asmaul' | 'tasbih';
  setActiveTab: (tab: 'quran' | 'sholat' | 'doa' | 'asmaul' | 'tasbih') => void;
  isAudioBarVisible: boolean;
  nextPrayerName?: string;
}

export const FloatingMobileNav: React.FC<FloatingMobileNavProps> = ({
  activeTab,
  setActiveTab,
  isAudioBarVisible,
  nextPrayerName
}) => {
  // If audio player is active, raise floating nav so they don't collide
  const bottomPositionClass = isAudioBarVisible ? 'bottom-20' : 'bottom-3';

  return (
    <nav
      className={`md:hidden fixed left-4 right-4 ${bottomPositionClass} z-30 transition-all duration-300 pointer-events-auto`}
      aria-label="Navigasi Bawah Melayang"
    >
      <div className="mx-auto max-w-md bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl p-1.5 border border-stone-200/90 dark:border-stone-800 shadow-xl flex items-center justify-around">
        {/* Tab 1: Al-Qur'an */}
        <button
          onClick={() => setActiveTab('quran')}
          className={`flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl transition-all ${
            activeTab === 'quran'
              ? 'bg-emerald-600 text-white font-semibold shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] leading-tight">Al-Qur'an</span>
        </button>

        {/* Tab 2: Jam Sholat */}
        <button
          onClick={() => setActiveTab('sholat')}
          className={`flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl transition-all relative ${
            activeTab === 'sholat'
              ? 'bg-emerald-600 text-white font-semibold shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] leading-tight">Sholat</span>
          {nextPrayerName && activeTab !== 'sholat' && (
            <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          )}
        </button>

        {/* Tab 3: Doa & Dzikir */}
        <button
          onClick={() => setActiveTab('doa')}
          className={`flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl transition-all ${
            activeTab === 'doa'
              ? 'bg-emerald-600 text-white font-semibold shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] leading-tight">Doa</span>
        </button>

        {/* Tab 4: Asmaul Husna */}
        <button
          onClick={() => setActiveTab('asmaul')}
          className={`flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl transition-all ${
            activeTab === 'asmaul'
              ? 'bg-emerald-600 text-white font-semibold shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] leading-tight">Asmaul</span>
        </button>

        {/* Tab 5: Tasbih */}
        <button
          onClick={() => setActiveTab('tasbih')}
          className={`flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl transition-all ${
            activeTab === 'tasbih'
              ? 'bg-emerald-600 text-white font-semibold shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <CircleDot className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] leading-tight">Tasbih</span>
        </button>
      </div>
    </nav>
  );
};
