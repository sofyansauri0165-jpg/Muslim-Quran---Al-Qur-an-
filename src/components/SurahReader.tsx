import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Share2,
  BookText,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Compass,
  Volume2
} from 'lucide-react';
import { Ayah, RECITERS, Reciter, SurahDetail } from '../types/quran';

interface SurahReaderProps {
  surah: SurahDetail;
  onBack: () => void;
  onSelectSurah: (surahNumber: number) => void;
  onOpenTafsir: (surahNumber: number, ayahNumber?: number) => void;
  // Audio state
  currentlyPlayingSurah: number | null;
  currentlyPlayingAyah: number | null;
  isPlayingAudio: boolean;
  onPlayAyahAudio: (surahNumber: number, ayah: Ayah, reciterId: string) => void;
  onPlayFullSurah: (surah: SurahDetail, reciterId: string) => void;
  onPauseAudio: () => void;
  selectedReciter: string;
  setSelectedReciter: (id: string) => void;
  // Bookmarks & Last Read
  isBookmarked: (surahNumber: number, ayahNumber: number) => boolean;
  onToggleBookmark: (surah: SurahDetail, ayah: Ayah) => void;
  onSetLastRead: (surahNumber: number, surahName: string, ayahNumber: number) => void;
  initialAyahToScroll?: number | null;
}

export const SurahReader: React.FC<SurahReaderProps> = ({
  surah,
  onBack,
  onSelectSurah,
  onOpenTafsir,
  currentlyPlayingSurah,
  currentlyPlayingAyah,
  isPlayingAudio,
  onPlayAyahAudio,
  onPlayFullSurah,
  onPauseAudio,
  selectedReciter,
  setSelectedReciter,
  isBookmarked,
  onToggleBookmark,
  onSetLastRead,
  initialAyahToScroll
}) => {
  // Reading preferences
  const [arabicFontSize, setArabicFontSize] = useState<number>(() => {
    return Number(localStorage.getItem('mq_font_size') || 30);
  });
  const [showLatin, setShowLatin] = useState<boolean>(() => {
    return localStorage.getItem('mq_show_latin') !== 'false';
  });
  const [showTranslation, setShowTranslation] = useState<boolean>(() => {
    return localStorage.getItem('mq_show_trans') !== 'false';
  });
  const [showSettingsDrawer, setShowSettingsDrawer] = useState<boolean>(false);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [targetAyahInput, setTargetAyahInput] = useState<string>('');

  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    localStorage.setItem('mq_font_size', arabicFontSize.toString());
  }, [arabicFontSize]);

  useEffect(() => {
    localStorage.setItem('mq_show_latin', showLatin.toString());
  }, [showLatin]);

  useEffect(() => {
    localStorage.setItem('mq_show_trans', showTranslation.toString());
  }, [showTranslation]);

  // Scroll to requested ayah if opened from Last Read or Bookmark
  useEffect(() => {
    if (initialAyahToScroll && ayahRefs.current[initialAyahToScroll]) {
      setTimeout(() => {
        ayahRefs.current[initialAyahToScroll]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 350);
    }
  }, [initialAyahToScroll]);

  // Auto scroll to currently playing ayah if playing
  useEffect(() => {
    if (
      currentlyPlayingSurah === surah.nomor &&
      currentlyPlayingAyah &&
      ayahRefs.current[currentlyPlayingAyah]
    ) {
      ayahRefs.current[currentlyPlayingAyah]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [currentlyPlayingSurah, currentlyPlayingAyah, surah.nomor]);

  const handleCopyAyah = (ayah: Ayah) => {
    const textToCopy = `${ayah.teksArab}\n\n${ayah.teksLatin}\n\n"${ayah.teksIndonesia}"\n\n(QS. ${surah.namaLatin} ${surah.nomor}:${ayah.nomorAyat})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyah(ayah.nomorAyat);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  const handleShareAyah = (ayah: Ayah) => {
    const text = `QS. ${surah.namaLatin} ${surah.nomor}:${ayah.nomorAyat}\n\n${ayah.teksArab}\n\n"${ayah.teksIndonesia}"`;
    if (navigator.share) {
      navigator.share({
        title: `QS. ${surah.namaLatin} : ${ayah.nomorAyat}`,
        text
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedAyah(ayah.nomorAyat);
      setTimeout(() => setCopiedAyah(null), 2000);
    }
  };

  const handleJumpToAyah = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(targetAyahInput, 10);
    if (!isNaN(target) && target >= 1 && target <= surah.jumlahAyat) {
      ayahRefs.current[target]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      setTargetAyahInput('');
    }
  };

  const isPlayingThisSurahFull =
    currentlyPlayingSurah === surah.nomor && currentlyPlayingAyah === null && isPlayingAudio;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top sticky navigation toolbar */}
      <div className="sticky top-16 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Daftar Surat</span>
          </button>

          <span className="text-sm font-semibold text-stone-900 dark:text-white">
            {surah.nomor}. {surah.namaLatin}
          </span>
          <span className="hidden sm:inline text-xs text-stone-500">
            ({surah.arti})
          </span>
        </div>

        {/* Action Controls cluster */}
        <div className="flex items-center gap-2">
          {/* Jump to Ayah */}
          <form onSubmit={handleJumpToAyah} className="flex items-center gap-1">
            <input
              type="number"
              min="1"
              max={surah.jumlahAyat}
              value={targetAyahInput}
              onChange={(e) => setTargetAyahInput(e.target.value)}
              placeholder={`Ayat 1-${surah.jumlahAyat}`}
              className="w-24 px-2 py-1 text-xs bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-stone-900 dark:text-white"
            />
            <button
              type="submit"
              className="px-2 py-1 text-xs bg-stone-200 dark:bg-stone-700 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors text-stone-700 dark:text-stone-200 font-medium"
            >
              Lompat
            </button>
          </form>

          {/* Tafsir button */}
          <button
            onClick={() => onOpenTafsir(surah.nomor)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-100 transition-colors"
          >
            <BookText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Tafsir</span>
          </button>

          {/* Settings Drawer Toggle */}
          <button
            onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
            className={`p-1.5 rounded-lg border transition-colors ${
              showSettingsDrawer
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
            }`}
            title="Pengaturan Bacaan"
            aria-label="Pengaturan Bacaan"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reading Settings Drawer (expandable) */}
      {showSettingsDrawer && (
        <div className="bg-stone-50 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 rounded-xl p-4 shadow-sm space-y-4">
          <div className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
            Pengaturan Tampilan & Qari
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Font Size slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-stone-600 dark:text-stone-400 font-medium">
                <span>Ukuran Font Arab</span>
                <span className="font-mono">{arabicFontSize}px</span>
              </div>
              <input
                type="range"
                min="22"
                max="44"
                step="2"
                value={arabicFontSize}
                onChange={(e) => setArabicFontSize(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Reciter selector */}
            <div className="space-y-1.5">
              <label className="text-stone-600 dark:text-stone-400 font-medium block">
                Pilihan Qari (Murottal)
              </label>
              <select
                value={selectedReciter}
                onChange={(e) => setSelectedReciter(e.target.value)}
                className="w-full p-1.5 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
              >
                {RECITERS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-4 pt-4 sm:pt-0">
              <label className="flex items-center gap-2 cursor-pointer text-stone-700 dark:text-stone-300">
                <input
                  type="checkbox"
                  checked={showLatin}
                  onChange={(e) => setShowLatin(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Transliterasi Latin</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-stone-700 dark:text-stone-300">
                <input
                  type="checkbox"
                  checked={showTranslation}
                  onChange={(e) => setShowTranslation(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Terjemahan Kemenag</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Surah Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 to-stone-900 text-white rounded-2xl p-6 sm:p-8 text-center shadow-lg border border-emerald-700/50">
        <div className="relative z-10 space-y-3">
          <div className="text-xs uppercase tracking-widest text-emerald-300 font-medium">
            Surat ke-{surah.nomor} · {surah.tempatTurun} · {surah.jumlahAyat} Ayat
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {surah.namaLatin}
          </h1>

          <p className="text-sm text-emerald-100 max-w-lg mx-auto">
            "{surah.arti}"
          </p>

          <div className="font-arabic text-3xl sm:text-4xl text-amber-200 pt-1 pb-2">
            {surah.nama}
          </div>

          {/* Full Surah Audio Button */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                if (isPlayingThisSurahFull) {
                  onPauseAudio();
                } else {
                  onPlayFullSurah(surah, selectedReciter);
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-xs shadow-md transition-colors"
            >
              {isPlayingThisSurahFull ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Jeda Murottal Penuh</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Putar Murottal Surat Penuh</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bismillah Header (except Surah 9 At-Taubah and Surah 1 Al-Fatihah where it's already verse 1) */}
      {surah.nomor !== 9 && surah.nomor !== 1 && (
        <div className="text-center py-6 border-b border-stone-200 dark:border-stone-800">
          <p className="font-arabic text-2xl sm:text-3xl text-stone-800 dark:text-stone-200 leading-loose" dir="rtl">
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 italic">
            Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang
          </p>
        </div>
      )}

      {/* Ayahs Stream */}
      <div className="space-y-6">
        {surah.ayat.map((ayah) => {
          const isCurrentActiveAyah =
            currentlyPlayingSurah === surah.nomor &&
            currentlyPlayingAyah === ayah.nomorAyat &&
            isPlayingAudio;

          const bookmarked = isBookmarked(surah.nomor, ayah.nomorAyat);

          return (
            <div
              key={ayah.nomorAyat}
              ref={(el) => {
                ayahRefs.current[ayah.nomorAyat] = el;
              }}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
                isCurrentActiveAyah
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 shadow-sm ring-1 ring-emerald-400/50'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              {/* Header bar of Ayah: Number badge and verse action buttons */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800/80 text-xs text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-2">
                  {/* Ayah number badge */}
                  <span className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center font-mono font-bold text-emerald-800 dark:text-emerald-300 text-xs">
                    {ayah.nomorAyat}
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">
                    {surah.nomor}:{ayah.nomorAyat}
                  </span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  {/* Play Ayah Audio */}
                  <button
                    onClick={() => {
                      if (isCurrentActiveAyah) {
                        onPauseAudio();
                      } else {
                        onPlayAyahAudio(surah.nomor, ayah, selectedReciter);
                      }
                    }}
                    title={isCurrentActiveAyah ? 'Jeda Audio' : 'Dengarkan Ayat Ini'}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isCurrentActiveAyah
                        ? 'bg-emerald-600 text-white'
                        : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
                    }`}
                    aria-label="Putar Ayat"
                  >
                    {isCurrentActiveAyah ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>

                  {/* Bookmark Toggle */}
                  <button
                    onClick={() => onToggleBookmark(surah, ayah)}
                    title={bookmarked ? 'Hapus dari Tersimpan' : 'Simpan Penanda'}
                    className={`p-1.5 rounded-lg transition-colors ${
                      bookmarked
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                        : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
                    }`}
                    aria-label="Tandai Ayat"
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>

                  {/* Mark as Last Read */}
                  <button
                    onClick={() => onSetLastRead(surah.nomor, surah.namaLatin, ayah.nomorAyat)}
                    title="Tandai Terakhir Dibaca"
                    className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-lg transition-colors"
                    aria-label="Tandai Terakhir Dibaca"
                  >
                    <Compass className="w-4 h-4" />
                  </button>

                  {/* Tafsir modal for this ayah */}
                  <button
                    onClick={() => onOpenTafsir(surah.nomor, ayah.nomorAyat)}
                    title="Baca Tafsir Ayat"
                    className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-lg transition-colors"
                    aria-label="Tafsir Ayat"
                  >
                    <BookText className="w-4 h-4" />
                  </button>

                  {/* Copy Ayah text */}
                  <button
                    onClick={() => handleCopyAyah(ayah)}
                    title="Salin Ayat & Terjemahan"
                    className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-lg transition-colors"
                    aria-label="Salin Ayat"
                  >
                    {copiedAyah === ayah.nomorAyat ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Share Ayah */}
                  <button
                    onClick={() => handleShareAyah(ayah)}
                    title="Bagikan Ayat"
                    className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-lg transition-colors"
                    aria-label="Bagikan Ayat"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Arabic Text */}
              <div className="py-5 text-right" dir="rtl">
                <p
                  className="font-arabic text-stone-900 dark:text-white leading-loose font-normal"
                  style={{ fontSize: `${arabicFontSize}px` }}
                >
                  {ayah.teksArab}
                  <span className="inline-block mr-2 text-emerald-700 dark:text-emerald-300 font-mono text-sm opacity-90 select-none">
                    ﴿{ayah.nomorAyat}﴾
                  </span>
                </p>
              </div>

              {/* Latin Transliteration */}
              {showLatin && (
                <div className="pt-2 pb-1 text-sm text-stone-700 dark:text-emerald-300/95 italic font-sans leading-relaxed">
                  {ayah.teksLatin}
                </div>
              )}

              {/* Indonesian Translation */}
              {showTranslation && (
                <div className="pt-2 text-sm text-stone-800 dark:text-stone-100 leading-relaxed font-normal">
                  {ayah.teksIndonesia}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Surah Navigation */}
      <div className="pt-8 pb-16 flex items-center justify-between gap-4 border-t border-stone-200 dark:border-stone-800">
        {surah.suratSebelumnya ? (
          <button
            onClick={() => onSelectSurah((surah.suratSebelumnya as any).nomor)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl hover:border-emerald-500 text-stone-800 dark:text-stone-200 text-xs font-semibold shadow-xs hover:shadow-sm transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-emerald-600" />
            <div className="text-left">
              <span className="block text-[10px] text-stone-400 font-normal">Surat Sebelumnya</span>
              <span>{(surah.suratSebelumnya as any).namaLatin}</span>
            </div>
          </button>
        ) : (
          <div></div>
        )}

        <button
          onClick={onBack}
          className="px-4 py-2 text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
        >
          Kembali ke Daftar Surat
        </button>

        {surah.suratSelanjutnya ? (
          <button
            onClick={() => onSelectSurah((surah.suratSelanjutnya as any).nomor)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl hover:border-emerald-500 text-stone-800 dark:text-stone-200 text-xs font-semibold shadow-xs hover:shadow-sm transition-all text-right"
          >
            <div className="text-right">
              <span className="block text-[10px] text-stone-400 font-normal">Surat Selanjutnya</span>
              <span>{(surah.suratSelanjutnya as any).namaLatin}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-600" />
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
