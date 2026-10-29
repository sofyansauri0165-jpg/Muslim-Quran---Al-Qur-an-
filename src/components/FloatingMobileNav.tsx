import React from 'react';
import {
  BookOpen,
  Clock,
  Compass,
  Calendar,
  Heart,
  Sparkles,
  CircleDot
} from 'lucide-react';
import { AppTab } from '../types/quran';

interface FloatingMobileNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
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

  const navItems: { tab: AppTab; label: string; icon: React.ReactNode; hasBadge?: boolean }[] = [
    { tab: 'quran', label: "Al-Qur'an", icon: <BookOpen className="w-4 h-4 mb-0.5" /> },
    {
      tab: 'sholat',
      label: 'Sholat',
      icon: <Clock className="w-4 h-4 mb-0.5" />,
      hasBadge: Boolean(nextPrayerName && activeTab !== 'sholat')
    },
    { tab: 'kiblat', label: 'Kiblat', icon: <Compass className="w-4 h-4 mb-0.5" /> },
    { tab: 'kalender', label: 'Kalender', icon: <Calendar className="w-4 h-4 mb-0.5" /> },
    { tab: 'doa', label: 'Doa', icon: <Heart className="w-4 h-4 mb-0.5" /> },
    { tab: 'asmaul', label: 'Asmaul', icon: <Sparkles className="w-4 h-4 mb-0.5" /> },
    { tab: 'tasbih', label: 'Tasbih', icon: <CircleDot className="w-4 h-4 mb-0.5" /> }
  ];

  return (
    <nav
      className={`md:hidden fixed left-2 right-2 sm:left-4 sm:right-4 ${bottomPositionClass} z-30 transition-all duration-300 pointer-events-auto`}
      aria-label="Navigasi Bawah Melayang"
    >
      <div className="mx-auto max-w-lg bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl p-1 border border-stone-200/90 dark:border-stone-800 shadow-xl flex items-center justify-between gap-0.5 overflow-x-auto scrollbar-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex-1 min-w-[50px] py-1.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all relative shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-[10px] leading-tight font-medium truncate max-w-full">
                {item.label}
              </span>
              {item.hasBadge && (
                <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-amber-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
