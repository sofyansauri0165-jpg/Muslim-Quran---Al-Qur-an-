import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Compass } from 'lucide-react';
import { Bookmark as BookmarkType, LastRead } from '../types/quran';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkType[];
  onRemoveBookmark: (id: string) => void;
  onOpenAyah: (surahNumber: number, ayahNumber: number) => void;
  lastRead: LastRead | null;
  onOpenLastRead: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onOpenAyah,
  lastRead,
  onOpenLastRead
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 w-full max-w-md h-full flex flex-col shadow-2xl border-l border-stone-200 dark:border-stone-800 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              Penanda & Riwayat Baca
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Last Read Section */}
          {lastRead && (
            <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  Terakhir Dibaca
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                  {new Date(lastRead.timestamp).toLocaleDateString('id-ID')}
                </span>
              </div>

              <div className="text-sm font-bold text-stone-900 dark:text-white">
                QS. {lastRead.surahName} : Ayat {lastRead.ayahNumber}
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenLastRead();
                }}
                className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-xl transition-colors"
              >
                <span>Lanjutkan Membaca</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Bookmarks Section */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
              Daftar Ayat Ditandai ({bookmarks.length})
            </div>

            {bookmarks.length === 0 ? (
              <div className="text-center py-10 text-stone-400 text-xs">
                Belum ada ayat yang ditandai. Tandai ayat saat membaca untuk menyimpannya di sini.
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarks.map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 rounded-xl space-y-2 hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenAyah(b.surahNumber, b.ayahNumber);
                        }}
                        className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>QS. {b.surahName} : {b.ayahNumber}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => onRemoveBookmark(b.id)}
                        className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                        title="Hapus Penanda"
                        aria-label="Hapus Penanda"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="font-arabic text-sm text-right text-stone-800 dark:text-stone-200 truncate" dir="rtl">
                      {b.ayahArabic}
                    </p>

                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                      "{b.ayahTranslation}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
