import React from 'react';
import { BookOpen } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'quran' | 'sholat' | 'doa' | 'asmaul' | 'tasbih') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-16 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top zone: Brand & Navigation */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-200 dark:border-stone-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/aistudio/IMG_3954_7eb1552b.png"
                alt="Muslim Quran Logo"
                className="w-8 h-8 rounded-lg object-contain shadow-xs"
                referrerPolicy="no-referrer"
              />
              <span className="font-bold text-lg text-stone-900 dark:text-white">
                Muslim Quran
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md leading-relaxed">
              Platform Al-Qur'an digital dan pendamping ibadah harian berstandar Kementerian Agama Republik Indonesia dengan audio murottal, jadwal sholat akurat, serta doa harian.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-5 text-xs font-medium text-stone-600 dark:text-stone-300">
            <button
              onClick={() => onSelectTab('quran')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Al-Qur'an
            </button>
            <button
              onClick={() => onSelectTab('sholat')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Jam Sholat & Azan
            </button>
            <button
              onClick={() => onSelectTab('doa')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Doa & Dzikir
            </button>
            <button
              onClick={() => onSelectTab('asmaul')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Asmaul Husna
            </button>
            <button
              onClick={() => onSelectTab('tasbih')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Tasbih Digital
            </button>
          </nav>
        </div>

        {/* Middle zone: 3 Logos Section (Hanya Foto Logo Saja Tanpa Teks) */}
        <div className="py-8 border-b border-stone-200 dark:border-stone-800">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {/* Logo 1: BBPVP BEKASI */}
            <div className="h-16 w-36 sm:w-44 p-2.5 bg-white rounded-2xl border border-stone-200 dark:border-stone-700/80 shadow-xs flex items-center justify-center hover:scale-105 transition-all">
              <img
                src="/assets/aistudio/IMG_3982_5c3cd058.png"
                alt="Logo BBPVP Bekasi"
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Logo 2: EMBI TECH COMPUTINDO */}
            <div className="h-16 w-36 sm:w-44 p-2 bg-white rounded-2xl border border-stone-200 dark:border-stone-700/80 shadow-xs flex items-center justify-center hover:scale-105 transition-all">
              <img
                src="/assets/aistudio/IMG_3980_d2d7f416.png"
                alt="Logo Embi Tech Computindo"
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Logo 3: YAYASAN KARYA PONDOK MANDIRI */}
            <div className="h-16 w-36 sm:w-44 p-2 bg-white rounded-2xl border border-stone-200 dark:border-stone-700/80 shadow-xs flex items-center justify-center hover:scale-105 transition-all">
              <img
                src="/assets/aistudio/IMG_3981_1a1a1424.png"
                alt="Logo Yayasan Karya Pondok Mandiri"
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400">
          <div>
            © {new Date().getFullYear()} Muslim Quran. Didedikasikan untuk kemudahan membaca & mentadaburi Al-Qur'an.
          </div>
          <div className="flex items-center gap-2">
            <span>Rujukan data: Kemenag RI, EQuran.id & Aladhan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
