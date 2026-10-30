import React from 'react';
import { Search, Sparkles, BookOpen, Clock, Volume2, Compass, Calendar } from 'lucide-react';
import { LastRead, AppTab } from '../types/quran';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectSurah: (num: number) => void;
  lastRead: LastRead | null;
  onOpenLastRead: () => void;
  onOpenPrayerTimes?: () => void;
  onNavigateTab?: (tab: AppTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onSelectSurah,
  lastRead,
  onOpenLastRead,
  onOpenPrayerTimes,
  onNavigateTab
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100 rounded-2xl sm:rounded-3xl shadow-xl my-6 border border-stone-800">
      {/* Background Hero Image of Madinah (Masjid Nabawi) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/madinah_nabawi_hero_1793347282794.jpg"
          alt="Al-Masjid an-Nabawi Madinah Al-Munawwarah pada waktu senja yang agung"
          className="w-full h-full object-cover object-center brightness-[0.62]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/75 to-stone-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/50"></div>
      </div>

      <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-4xl">
        {/* Subtle kicker with Madinah reference */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-3">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300">
            🕌 Al-Madinah Al-Munawwarah
          </span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span>Mushaf Digital Kemenag RI</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span>114 Surat & 6236 Ayat</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 leading-tight">
          Al-Qur'an Al-Karim
        </h1>

        <p className="font-arabic text-xl sm:text-2xl text-emerald-200/90 mb-4 font-normal" dir="rtl">
          اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
        </p>

        <p className="text-stone-300 text-sm sm:text-base max-w-2xl mb-8 leading-relaxed">
          Tadabburi firman Ilahi dengan teks mushaf terstandar, terjemahan resmi Kemenag RI, transliterasi latin, audio murottal syahdu 6 qari internasional, dan tafsir ringkas.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mb-6">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari surat (contoh: Al-Kahf, Yasin, Al-Mulk, nomor 67, atau arti)..."
            className="w-full pl-11 pr-4 py-3 bg-stone-950/80 backdrop-blur-md text-white placeholder-stone-400 text-sm rounded-xl border border-stone-700/80 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-stone-400 hover:text-white"
            >
              Bersihkan
            </button>
          )}
        </div>

        {/* Quick Recommendation Strip */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-stone-400 font-medium">Surat Populer:</span>
          <button
            onClick={() => onSelectSurah(18)}
            className="px-2.5 py-1 bg-white/10 hover:bg-emerald-600/30 text-stone-200 hover:text-emerald-300 rounded-lg border border-white/10 transition-colors"
          >
            Al-Kahfi
          </button>
          <button
            onClick={() => onSelectSurah(36)}
            className="px-2.5 py-1 bg-white/10 hover:bg-emerald-600/30 text-stone-200 hover:text-emerald-300 rounded-lg border border-white/10 transition-colors"
          >
            Yasin
          </button>
          <button
            onClick={() => onSelectSurah(67)}
            className="px-2.5 py-1 bg-white/10 hover:bg-emerald-600/30 text-stone-200 hover:text-emerald-300 rounded-lg border border-white/10 transition-colors"
          >
            Al-Mulk
          </button>
          <button
            onClick={() => onSelectSurah(55)}
            className="px-2.5 py-1 bg-white/10 hover:bg-emerald-600/30 text-stone-200 hover:text-emerald-300 rounded-lg border border-white/10 transition-colors"
          >
            Ar-Rahman
          </button>
          <button
            onClick={() => onSelectSurah(56)}
            className="px-2.5 py-1 bg-white/10 hover:bg-emerald-600/30 text-stone-200 hover:text-emerald-300 rounded-lg border border-white/10 transition-colors"
          >
            Al-Waqi'ah
          </button>
          <button
            onClick={() => onSelectSurah(1)}
            className="px-2.5 py-1 bg-white/10 hover:bg-emerald-600/30 text-stone-200 hover:text-emerald-300 rounded-lg border border-white/10 transition-colors"
          >
            Al-Fatihah
          </button>

          {onOpenPrayerTimes && (
            <button
              onClick={onOpenPrayerTimes}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 rounded-lg transition-colors font-medium cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Jadwal Sholat</span>
            </button>
          )}

          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab('tajwid')}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 rounded-lg transition-colors font-medium cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Ilmu Tajwid</span>
              </button>

              <button
                onClick={() => onNavigateTab('kiblat')}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 rounded-lg transition-colors font-medium cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-300" />
                <span>Arah Kiblat</span>
              </button>

              <button
                onClick={() => onNavigateTab('kalender')}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-400/30 rounded-lg transition-colors font-medium cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-teal-300" />
                <span>Kalender Hijriah</span>
              </button>
            </>
          )}

          {lastRead && (
            <button
              onClick={onOpenLastRead}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-700/80 hover:bg-emerald-600 text-white font-medium rounded-lg border border-emerald-500/50 transition-colors shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-200" />
              <span>Lanjut Baca: {lastRead.surahName} : {lastRead.ayahNumber}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
