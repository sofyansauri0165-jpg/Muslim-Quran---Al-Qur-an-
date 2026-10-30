import React from 'react';
import { X, Sparkles, BookOpen, Volume2, Info } from 'lucide-react';
import { TAJWID_COLOR_LEGEND } from '../utils/tajwidColorizer';

interface TajwidLegendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TajwidLegendModal: React.FC<TajwidLegendModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/70 dark:bg-stone-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white">
                Panduan Warna Tajwid
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Pewarnaan ayat Al-Qur'an mempermudah tartil & makhraj yang benar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="mx-6 mt-4 p-3.5 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl flex items-start gap-3">
          <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            Warna tajwid disesuaikan dengan standar mushaf Kemenag RI dan Madinah. Anda dapat menyalakan atau mematikan warna tajwid kapan saja melalui tombol <span className="font-semibold underline">Warna Tajwid</span> di pembaca surat.
          </p>
        </div>

        {/* Legend Cards List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3.5">
          {TAJWID_COLOR_LEGEND.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className={`w-3.5 h-3.5 rounded-full ${item.dotColor} shadow-xs ring-2 ring-white dark:ring-stone-900 shrink-0`} />
                  <span className="font-bold text-sm text-stone-900 dark:text-white">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-stone-200/80 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                    {item.colorName}
                  </span>
                </div>

                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50 w-fit">
                  {item.duration}
                </div>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
                {item.description}
              </p>

              {/* Example and Letters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-stone-200/60 dark:border-stone-800/80">
                <div className="text-[11px] text-stone-500 dark:text-stone-400">
                  <span className="font-medium text-stone-700 dark:text-stone-300">Huruf/Tanda: </span>
                  <span className="font-mono">{item.letters}</span>
                </div>

                <div className="font-arabic text-lg tracking-wide text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900/90 px-3 py-1 rounded-xl border border-stone-200 dark:border-stone-700" dir="rtl">
                  <span className={item.colorClass}>{item.exampleArabic}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md transition-colors"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
