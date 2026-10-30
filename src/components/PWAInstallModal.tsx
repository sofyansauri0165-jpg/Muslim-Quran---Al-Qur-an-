import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Share2,
  PlusSquare,
  CheckCircle2,
  Sparkles,
  Download,
  WifiOff,
  BatteryCharging,
  Maximize2,
  ExternalLink
} from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDirectInstall?: () => void;
  isIOS: boolean;
  canDirectInstall: boolean;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  onDirectInstall,
  isIOS,
  canDirectInstall,
}) => {
  const [activeTab, setActiveTab] = useState<'android' | 'ios'>(isIOS ? 'ios' : 'android');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden transform transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with App Branding */}
        <div className="relative bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white p-5 sm:p-6 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white/90 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <img
              src="/pwa-192x192.png"
              alt="Muslim Quran Logo"
              className="w-14 h-14 rounded-2xl object-cover shadow-lg border border-white/20 bg-emerald-900"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-100 border border-emerald-400/30">
                  Aplikasi Web Progresif (PWA)
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight mt-1 text-white">
                Pasang Muslim Quran di HP
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90">
                Gunakan seperti aplikasi resmi di Android & iPhone
              </p>
            </div>
          </div>

          {/* Quick Features Row */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center text-[11px] text-emerald-100 font-medium">
            <div className="flex items-center justify-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Layar Penuh</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <WifiOff className="w-3.5 h-3.5 text-emerald-300" />
              <span>Bisa Offline</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-300" />
              <span>Ringan & Cepat</span>
            </div>
          </div>
        </div>

        {/* Device Switcher Tab */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 p-2 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'android'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>HP Android (Chrome)</span>
          </button>
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>iPhone / iPad (Safari)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-stone-800 dark:text-stone-200 text-sm">
          {activeTab === 'android' ? (
            <div className="space-y-4 animate-fade-in">
              {canDirectInstall && onDirectInstall && (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-4 text-center">
                  <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-medium mb-3">
                    Browser Anda mendukung instalasi instan 1-klik!
                  </p>
                  <button
                    onClick={() => {
                      onDirectInstall();
                      onClose();
                    }}
                    className="w-full py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Pasang Aplikasi Sekarang</span>
                  </button>
                </div>
              )}

              <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                Cara Pemasangan di HP Android:
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200/70 dark:border-stone-800">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-white">Buka di Browser Chrome / Samsung Internet</span>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                      Pastikan tautan aplikasi ini dibuka di Google Chrome atau browser bawaan Android.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200/70 dark:border-stone-800">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-white">Ketuk Menu Titik Tiga (⋮)</span>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                      Ketuk menu titik tiga (⋮) di pojok kanan atas browser Anda.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200/70 dark:border-stone-800">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-white">Pilih "Instal aplikasi" atau "Tambahkan ke Layar Utama"</span>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                      Ketuk <strong>Instal</strong>. Ikon Muslim Quran akan langsung muncul di beranda dan laci aplikasi ponsel Anda.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl p-3.5 text-xs text-amber-900 dark:text-amber-200">
                <span className="font-semibold block mb-0.5">Catatan untuk Pengguna iPhone & iPad:</span>
                Apple iOS mewajibkan pemasangan aplikasi dilakukan melalui peramban <strong>Safari</strong> bawaan Apple.
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                Langkah Mudah Pasang di iPhone:
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200/70 dark:border-stone-800">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-white flex items-center gap-1.5">
                      Buka di Safari & Ketuk Ikon Bagikan
                      <span className="inline-flex p-1 bg-stone-200 dark:bg-stone-700 rounded-md">
                        <Share2 className="w-3.5 h-3.5 text-blue-500" />
                      </span>
                    </span>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                      Ketuk tombol <strong>Share / Bagikan</strong> (ikon kotak dengan tanda panah ke atas) di bilah bawah Safari.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200/70 dark:border-stone-800">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-white flex items-center gap-1.5">
                      Pilih "Tambah ke Layar Utama"
                      <span className="inline-flex p-1 bg-stone-200 dark:bg-stone-700 rounded-md">
                        <PlusSquare className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
                      </span>
                    </span>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                      Gulir sedikit ke bawah di menu opsi lalu ketuk <strong>"Tambah ke Layar Utama" (Add to Home Screen)</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200/70 dark:border-stone-800">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-white">Ketuk "Tambah" (Add) di Kanan Atas</span>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                      Selesai! Ikon <strong>Muslim Quran</strong> akan langsung berada di Home Screen iPhone Anda dan terbuka layar penuh tanpa bar Safari.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Benefits summary list */}
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
            <h4 className="text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
              Keuntungan Menginstal Aplikasi Ini:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Tanpa makan kuota unduh berlebih</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Audio Murottal tersimpan otomatis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Arah kiblat & jadwal sholat cepat dibuka</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Bebas iklan yang mengganggu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-stone-50 dark:bg-stone-950/80 border-t border-stone-200 dark:border-stone-800 flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            Tutup
          </button>
          {activeTab === 'android' && canDirectInstall && onDirectInstall && (
            <button
              onClick={() => {
                onDirectInstall();
                onClose();
              }}
              className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Pasang Sekarang</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
