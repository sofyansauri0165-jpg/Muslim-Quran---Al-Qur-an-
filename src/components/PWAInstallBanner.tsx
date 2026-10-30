import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface PWAInstallBannerProps {
  onOpenModal: () => void;
  isStandalone: boolean;
  isIOS: boolean;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({
  onOpenModal,
  isStandalone,
  isIOS,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('mq_pwa_banner_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('mq_pwa_banner_dismissed', 'true');
  };

  if (isStandalone || isDismissed) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-4 sm:p-5 shadow-lg border border-emerald-600/30">
      {/* Background Islamic pattern accent */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
        <Smartphone className="w-48 h-48 -mr-12" />
      </div>

      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 p-1 rounded-lg text-emerald-200/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        aria-label="Tutup pemberitahuan"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 pr-8 sm:pr-0">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
            <Smartphone className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                Tersedia untuk Android & iPhone
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-1">
              Pasang Muslim Quran di Layar HP Anda
            </h4>
            <p className="text-xs text-emerald-100/90 mt-0.5 max-w-xl">
              Nikmati akses langsung satu ketukan, tampilan layar penuh tanpa browser, dan baca Al-Qur'an secara offline kapan pun.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            onClick={onOpenModal}
            className="py-2 px-4 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>{isIOS ? 'Pasang di iPhone' : 'Pasang di Android / HP'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-700 hidden sm:inline" />
          </button>
        </div>
      </div>
    </div>
  );
};
