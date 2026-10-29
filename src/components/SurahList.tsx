import React, { useState, useMemo } from 'react';
import { Play, Pause, BookmarkCheck, ArrowRight, Sparkles } from 'lucide-react';
import { SurahSummary } from '../types/quran';

interface SurahListProps {
  surahs: SurahSummary[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectSurah: (surahNumber: number) => void;
  currentlyPlayingSurah: number | null;
  isPlayingAudio: boolean;
  onTogglePlaySurah: (surah: SurahSummary) => void;
  bookmarkedSurahNumbers: number[];
}

type FilterTab = 'all' | 'makkiyah' | 'madaniyah' | 'juzamma' | 'bookmarked';

export const SurahList: React.FC<SurahListProps> = ({
  surahs,
  searchQuery,
  setSearchQuery,
  onSelectSurah,
  currentlyPlayingSurah,
  isPlayingAudio,
  onTogglePlaySurah,
  bookmarkedSurahNumbers
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filteredSurahs = useMemo(() => {
    return surahs.filter((s) => {
      // Tab filter
      if (activeFilter === 'makkiyah' && s.tempatTurun.toLowerCase() !== 'mekah') return false;
      if (activeFilter === 'madaniyah' && s.tempatTurun.toLowerCase() !== 'madinah') return false;
      if (activeFilter === 'juzamma' && (s.nomor < 78 || s.nomor > 114)) return false;
      if (activeFilter === 'bookmarked' && !bookmarkedSurahNumbers.includes(s.nomor)) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = s.namaLatin.toLowerCase().includes(q);
        const matchesArabic = s.nama.includes(q);
        const matchesArti = s.arti.toLowerCase().includes(q);
        const matchesNumber = s.nomor.toString() === q;
        return matchesName || matchesArabic || matchesArti || matchesNumber;
      }

      return true;
    });
  }, [surahs, activeFilter, searchQuery, bookmarkedSurahNumbers]);

  return (
    <div className="space-y-6">
      {/* Filter Tabs / Segmented Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Semua (114)
          </button>
          <button
            onClick={() => setActiveFilter('makkiyah')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeFilter === 'makkiyah'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Makkiyah (86)
          </button>
          <button
            onClick={() => setActiveFilter('madaniyah')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeFilter === 'madaniyah'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Madaniyah (28)
          </button>
          <button
            onClick={() => setActiveFilter('juzamma')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeFilter === 'juzamma'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Juz 'Amma (37)
          </button>
          <button
            onClick={() => setActiveFilter('bookmarked')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeFilter === 'bookmarked'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Tersimpan ({bookmarkedSurahNumbers.length})
          </button>
        </div>

        {/* Count indicator */}
        <div className="text-xs text-stone-500 dark:text-stone-400">
          Menampilkan <span className="font-semibold text-stone-800 dark:text-stone-200">{filteredSurahs.length}</span> dari 114 Surat
        </div>
      </div>

      {/* Grid of Surah Cards */}
      {filteredSurahs.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-stone-800/40 rounded-2xl border border-stone-200 dark:border-stone-800">
          <Sparkles className="w-8 h-8 mx-auto text-stone-400 mb-2" />
          <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200">Surat Tidak Ditemukan</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Coba cari dengan kata kunci lain atau bersihkan pencarian.
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 px-3.5 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Reset Pencarian
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSurahs.map((surah) => {
            const isPlayingThis = currentlyPlayingSurah === surah.nomor && isPlayingAudio;
            const isBookmarked = bookmarkedSurahNumbers.includes(surah.nomor);

            return (
              <div
                key={surah.nomor}
                onClick={() => onSelectSurah(surah.nomor)}
                className="group relative bg-white dark:bg-stone-800/90 rounded-xl p-4 border border-stone-200 dark:border-stone-700/80 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left: Number & Titles */}
                  <div className="flex items-center gap-3">
                    {/* Number Medallion */}
                    <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-700/70 border border-stone-200 dark:border-stone-600 flex items-center justify-center text-xs font-bold font-mono text-emerald-800 dark:text-emerald-300 shrink-0 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/60 group-hover:border-emerald-300 transition-colors">
                      {surah.nomor}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-base font-semibold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {surah.namaLatin}
                        </h2>
                        {isBookmarked && (
                          <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {surah.arti}
                      </p>
                    </div>
                  </div>

                  {/* Right: Arabic calligraphy */}
                  <div className="text-right">
                    <span className="font-arabic text-xl font-bold text-stone-800 dark:text-stone-200 leading-tight">
                      {surah.nama}
                    </span>
                  </div>
                </div>

                {/* Bottom metadata & actions */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-700/50 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="capitalize">{surah.tempatTurun}</span>
                    <span aria-hidden="true">·</span>
                    <span>{surah.jumlahAyat} Ayat</span>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onTogglePlaySurah(surah)}
                      title={isPlayingThis ? 'Jeda Audio Murottal' : 'Putar Murottal Penuh'}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isPlayingThis
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 hover:text-emerald-600'
                      }`}
                      aria-label="Putar Surat"
                    >
                      {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => onSelectSurah(surah.nomor)}
                      className="p-1.5 text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                      title="Buka Bacaan Surat"
                      aria-label="Buka Bacaan"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
