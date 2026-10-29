import React, { useState } from 'react';
import { X, BookOpen, Search, ArrowRight } from 'lucide-react';
import { TafsirDetail } from '../types/quran';

interface TafsirModalProps {
  tafsir: TafsirDetail | null;
  isLoading: boolean;
  onClose: () => void;
  selectedAyahNumber?: number;
}

export const TafsirModal: React.FC<TafsirModalProps> = ({
  tafsir,
  isLoading,
  onClose,
  selectedAyahNumber
}) => {
  const [activeAyah, setActiveAyah] = useState<number>(selectedAyahNumber || 1);
  const [filterQuery, setFilterQuery] = useState<string>('');

  if (!tafsir && !isLoading) return null;

  const currentAyahTafsir = tafsir?.tafsir.find((t) => t.ayat === activeAyah);

  const filteredAyahs = tafsir?.tafsir.filter((t) => {
    if (!filterQuery.trim()) return true;
    return (
      t.ayat.toString() === filterQuery.trim() ||
      t.teks.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-white">
                Tafsir Ringkas Kemenag RI
              </h3>
              {tafsir && (
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Surat {tafsir.namaLatin} ({tafsir.nomor}) · {tafsir.jumlahAyat} Ayat
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isLoading ? (
          <div className="p-12 text-center text-stone-500 dark:text-stone-400 space-y-3">
            <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs">Memuat data tafsir Kementerian Agama RI...</p>
          </div>
        ) : !tafsir ? (
          <div className="p-8 text-center text-stone-500 text-xs">
            Gagal memuat tafsir. Silakan coba lagi.
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Ayah selector column (Left on desktop) */}
            <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900 flex flex-col max-h-48 md:max-h-full">
              <div className="p-2 border-b border-stone-200 dark:border-stone-800">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Cari ayat..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="w-full pl-8 pr-2 py-1.5 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="overflow-y-auto p-2 space-y-1 flex-1">
                {filteredAyahs.map((item) => (
                  <button
                    key={item.ayat}
                    onClick={() => setActiveAyah(item.ayat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      activeAyah === item.ayat
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>Ayat ke-{item.ayat}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tafsir reading pane (Right) */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Penjelasan Ayat {activeAyah}
                </span>
                <span className="text-xs text-stone-400">
                  Sumber: Kemenag RI
                </span>
              </div>

              {currentAyahTafsir ? (
                <div className="text-stone-800 dark:text-stone-200 text-sm leading-relaxed whitespace-pre-line font-sans space-y-3">
                  {currentAyahTafsir.teks}
                </div>
              ) : (
                <div className="text-xs text-stone-500 py-4">
                  Tafsir untuk ayat ini belum tersedia.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
