import React from 'react';
import { Search, BookOpen, Layers, Sparkles } from 'lucide-react';
import { LastRead } from '../types/quran';

interface QuranHeroHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectSurah: (num: number) => void;
  lastRead: LastRead | null;
  onOpenLastRead: () => void;
}

export const QuranHeroHeader: React.FC<QuranHeroHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onSelectSurah,
  lastRead,
  onOpenLastRead
}) => {
  return (
    <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 mb-6 shadow-xl border border-emerald-800/60 relative overflow-hidden">
      {/* Decorative Islamic Geometric Pattern Overlay */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute right-6 top-6 opacity-10 hidden sm:block pointer-events-none">
        <span className="font-arabic text-8xl">القرآن</span>
      </div>

      <div className="relative z-10 max-w-3xl">
        {/* Kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
            📖 Mushaf Digital Standar Kemenag RI
          </span>
          <span>·</span>
          <span>114 Surat & 30 Juz</span>
        </div>

        {/* Display Title */}
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-1.5 flex items-center gap-3">
          <span>Al-Qur'an Al-Karim</span>
          <span className="font-arabic text-2xl sm:text-3xl font-normal text-emerald-300" dir="rtl">
            القرآن الكريم
          </span>
        </h1>

        <p className="text-stone-300 text-xs sm:text-sm mb-5 leading-relaxed">
          Tadabburi firman Allah SWT dengan mushaf terstandar, tajwid berwarna, terjemahan resmi, audio murottal 6 qari internasional berputar otomatis, serta tafsir ringkas Kemenag RI.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mb-4">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-5 h-5 text-emerald-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari surat (Al-Kahf, Yasin, Al-Mulk, nomor surat, atau arti)..."
            className="w-full pl-11 pr-20 py-2.5 bg-stone-950/80 backdrop-blur-md text-white placeholder-stone-400 text-sm rounded-xl border border-emerald-700/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-inner"
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

        {/* Popular Surahs Strip & Last Read */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-stone-300 font-medium">Surat Populer:</span>
          {[
            { num: 18, name: 'Al-Kahfi' },
            { num: 36, name: 'Yasin' },
            { num: 67, name: 'Al-Mulk' },
            { num: 55, name: 'Ar-Rahman' },
            { num: 56, name: 'Al-Waqi’ah' },
            { num: 1, name: 'Al-Fatihah' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => onSelectSurah(s.num)}
              className="px-2.5 py-1 bg-white/10 hover:bg-emerald-600/50 text-stone-100 hover:text-white rounded-lg border border-white/10 transition-colors cursor-pointer"
            >
              {s.name}
            </button>
          ))}

          {lastRead && (
            <button
              onClick={onOpenLastRead}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-stone-950" />
              <span>Lanjut: {lastRead.surahName} : {lastRead.ayahNumber}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
