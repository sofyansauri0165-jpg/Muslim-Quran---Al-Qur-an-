import React, { useState, useMemo } from 'react';
import {
  Play,
  Pause,
  BookmarkCheck,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { SurahSummary } from '../types/quran';
import { QURAN_JUZ_LIST, JuzInfo, getJuzForAyah } from '../data/juzData';

interface SurahListProps {
  surahs: SurahSummary[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectSurah: (surahNumber: number, targetAyah?: number) => void;
  currentlyPlayingSurah: number | null;
  isPlayingAudio: boolean;
  onTogglePlaySurah: (surah: SurahSummary) => void;
  bookmarkedSurahNumbers: number[];
}

type ViewMode = 'surah' | 'juz';
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
  const [viewMode, setViewMode] = useState<ViewMode>('surah');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  // Filtered Surahs for "Berdasarkan Surat" view
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

  // Filtered Juz for "Berdasarkan Juz" view
  const filteredJuzList = useMemo(() => {
    if (!searchQuery.trim()) return QURAN_JUZ_LIST;

    const q = searchQuery.toLowerCase().trim();
    return QURAN_JUZ_LIST.filter((juz) => {
      const matchJuzNum = juz.juzNumber.toString() === q || `juz ${juz.juzNumber}`.includes(q);
      const matchNameLatin = juz.nameLatin.toLowerCase().includes(q);
      const matchNameArabic = juz.nameArabic.includes(q);
      const matchSurah = juz.surahsInJuz.some((s) =>
        s.surahName.toLowerCase().includes(q) || s.arabicName.includes(q) || s.surahNumber.toString() === q
      );
      const matchStartEnd =
        juz.startSurahName.toLowerCase().includes(q) || juz.endSurahName.toLowerCase().includes(q);
      return matchJuzNum || matchNameLatin || matchNameArabic || matchSurah || matchStartEnd;
    });
  }, [searchQuery]);

  return (
    <div id="surah-list-section" className="space-y-6 scroll-mt-24">
      {/* Primary Switcher: Urutan Surat vs Urutan Juz */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-stone-800/90 p-2 sm:p-2.5 rounded-2xl border border-stone-200 dark:border-stone-700/80 shadow-xs">
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-xl">
          <button
            onClick={() => setViewMode('surah')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              viewMode === 'surah'
                ? 'bg-white dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Urutan Surat (1 - 114)</span>
          </button>

          <button
            onClick={() => setViewMode('juz')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              viewMode === 'juz'
                ? 'bg-white dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Urutan Juz (Juz 1 - 30)</span>
          </button>
        </div>

        <div className="text-xs text-stone-500 dark:text-stone-400 px-2 flex items-center justify-between sm:justify-end gap-2">
          {viewMode === 'surah' ? (
            <span>
              Menampilkan <strong className="text-stone-800 dark:text-stone-200">{filteredSurahs.length}</strong> dari 114 Surat
            </span>
          ) : (
            <span>
              Menampilkan <strong className="text-stone-800 dark:text-stone-200">{filteredJuzList.length}</strong> dari 30 Juz
            </span>
          )}
        </div>
      </div>

      {/* View Mode 1: URUTAN SURAT */}
      {viewMode === 'surah' && (
        <>
          {/* Sub Filter Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-3">
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
                const juzNumber = getJuzForAyah(surah.nomor, 1);

                return (
                  <div
                    key={surah.nomor}
                    onClick={() => onSelectSurah(surah.nomor)}
                    className="group relative bg-white dark:bg-stone-800/90 rounded-2xl p-4 sm:p-5 border border-stone-200 dark:border-stone-700/80 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
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
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-medium text-[11px]">
                          Juz {juzNumber}
                        </span>
                        <span aria-hidden="true">·</span>
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
        </>
      )}

      {/* View Mode 2: URUTAN JUZ (JUZ 1 - 30) */}
      {viewMode === 'juz' && (
        <div className="space-y-4">
          {/* Guide Banner */}
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="font-semibold text-xs text-emerald-900 dark:text-emerald-200">
                Al-Qur'an Berdasarkan 30 Juz
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Pilih juz yang ingin dibaca untuk langsung membuka surat dan ayat permulaan juz tersebut. Cocok untuk tilawah harian (One Day One Juz / ODOJ) dan hafalan.
              </p>
            </div>
          </div>

          {filteredJuzList.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-stone-800/40 rounded-2xl border border-stone-200 dark:border-stone-800">
              <Sparkles className="w-8 h-8 mx-auto text-stone-400 mb-2" />
              <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200">Juz Tidak Ditemukan</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Gunakan nomor juz (1-30) atau nama surat dalam pencarian.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJuzList.map((juz) => (
                <div
                  key={juz.juzNumber}
                  className="bg-white dark:bg-stone-800/90 rounded-2xl p-5 border border-stone-200 dark:border-stone-700/80 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  {/* Header: Badge, Title & Arabic */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex flex-col items-center justify-center font-bold shadow-md shadow-emerald-600/20 shrink-0">
                        <span className="text-[10px] uppercase tracking-wider opacity-85">Juz</span>
                        <span className="text-base font-mono leading-none">{juz.juzNumber}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-stone-900 dark:text-white">
                            Juz {juz.juzNumber}
                          </h3>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50">
                            {juz.totalVerses} Ayat
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                          {juz.nameLatin}
                        </p>
                      </div>
                    </div>

                    {/* Arabic calligraphic header */}
                    <div className="text-right">
                      <span className="font-arabic text-2xl font-bold text-stone-800 dark:text-stone-200">
                        {juz.nameArabic}
                      </span>
                    </div>
                  </div>

                  {/* Range indicator */}
                  <div className="bg-stone-50 dark:bg-stone-900/60 rounded-xl p-3 border border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                    <div className="text-stone-700 dark:text-stone-300">
                      <span className="font-semibold text-emerald-800 dark:text-emerald-400">Awal: </span>
                      <span>QS. {juz.startSurahName} : {juz.startAyahNumber}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    <div className="text-stone-700 dark:text-stone-300">
                      <span className="font-semibold text-emerald-800 dark:text-emerald-400">Akhir: </span>
                      <span>QS. {juz.endSurahName} : {juz.endAyahNumber}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2">
                    {juz.description}
                  </p>

                  {/* Surahs inside this Juz */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      Surat dalam Juz Ini ({juz.surahsInJuz.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                      {juz.surahsInJuz.map((surahItem) => (
                        <button
                          key={surahItem.surahNumber}
                          onClick={() => {
                            // If it's the starting surah of the juz, scroll to starting ayah, else to ayah 1
                            const targetAyah = surahItem.surahNumber === juz.startSurahNumber ? juz.startAyahNumber : 1;
                            onSelectSurah(surahItem.surahNumber, targetAyah);
                          }}
                          className="px-2.5 py-1 text-[11px] bg-stone-100 dark:bg-stone-700/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-stone-700 dark:text-stone-200 hover:text-emerald-800 dark:hover:text-emerald-300 rounded-lg transition-colors flex items-center gap-1 border border-stone-200/60 dark:border-stone-600/50"
                          title={`Buka QS. ${surahItem.surahName} (${surahItem.ayahRange})`}
                        >
                          <span className="font-medium">{surahItem.surahName}</span>
                          <span className="text-[10px] opacity-75 font-mono">({surahItem.ayahRange})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action: Baca Juz Ini */}
                  <div className="pt-2">
                    <button
                      onClick={() => onSelectSurah(juz.startSurahNumber, juz.startAyahNumber)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>Mulai Baca Juz {juz.juzNumber}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
