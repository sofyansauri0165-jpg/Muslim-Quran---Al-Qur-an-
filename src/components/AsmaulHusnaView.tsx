import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { ASMAUL_HUSNA } from '../data/asmaulHusna';

export const AsmaulHusnaView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = ASMAUL_HUSNA.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.latin.toLowerCase().includes(q) ||
      item.arti.toLowerCase().includes(q) ||
      item.urutan.toString() === q ||
      item.arab.includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header banner */}
      <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>99 Nama Allah Yang Maha Indah</span>
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
            Asmaul Husna
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            "Hanya milik Allah asma-ul husna, maka bermohonlah kepada-Nya dengan menyebut asma-ul husna itu..." (QS. Al-A'raf: 180)
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau arti..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Grid of 99 Names */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.urutan}
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs hover:border-emerald-500/60 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center font-mono font-bold text-emerald-700 dark:text-emerald-400 text-xs shrink-0">
                {item.urutan}
              </span>

              <div className="text-right" dir="rtl">
                <span className="font-arabic text-2xl font-bold text-stone-900 dark:text-white">
                  {item.arab}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                {item.latin}
              </h3>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mt-0.5">
                {item.arti}
              </p>
              <p className="text-[11px] text-stone-500 dark:text-stone-300 mt-2 leading-relaxed">
                {item.keterangan}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
