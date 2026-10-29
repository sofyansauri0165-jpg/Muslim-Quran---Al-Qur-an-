import React, { useState } from 'react';
import { Search, Heart, CheckCircle2, RotateCcw, Copy, Check, Sun, Moon } from 'lucide-react';
import { DAILY_DOA_LIST } from '../data/dailyDoa';
import { DZIKIR_PAGI, DZIKIR_PETANG, DzikirItem } from '../data/dzikirData';

export const DoaAndDzikirView: React.FC = () => {
  const [subTab, setSubTab] = useState<'doa' | 'pagi' | 'petang'>('doa');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Counter state for Dzikir items
  const [dzikirCounters, setDzikirCounters] = useState<Record<string, number>>({});

  const categories = ['Semua', ...Array.from(new Set(DAILY_DOA_LIST.map((d) => d.category)))];

  const filteredDoa = DAILY_DOA_LIST.filter((d) => {
    if (selectedCategory !== 'Semua' && d.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        d.title.toLowerCase().includes(q) ||
        d.translation.toLowerCase().includes(q) ||
        d.latin.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const incrementDzikir = (item: DzikirItem) => {
    const current = dzikirCounters[item.id] || 0;
    if (current < item.count) {
      if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(35);
      }
      setDzikirCounters({
        ...dzikirCounters,
        [item.id]: current + 1
      });
    }
  };

  const resetDzikir = (id: string) => {
    setDzikirCounters({
      ...dzikirCounters,
      [id]: 0
    });
  };

  const resetAllDzikir = (items: DzikirItem[]) => {
    const updated = { ...dzikirCounters };
    items.forEach((it) => {
      updated[it.id] = 0;
    });
    setDzikirCounters(updated);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Sub tabs: Doa Harian, Dzikir Pagi, Dzikir Petang */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
          <button
            onClick={() => setSubTab('doa')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              subTab === 'doa'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Doa Harian ({DAILY_DOA_LIST.length})
          </button>
          <button
            onClick={() => setSubTab('pagi')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              subTab === 'pagi'
                ? 'bg-white dark:bg-stone-700 text-amber-700 dark:text-amber-300 shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Dzikir Pagi</span>
          </button>
          <button
            onClick={() => setSubTab('petang')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              subTab === 'petang'
                ? 'bg-white dark:bg-stone-700 text-indigo-700 dark:text-indigo-300 shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dzikir Petang</span>
          </button>
        </div>
      </div>

      {/* Mode A: Doa Harian View */}
      {subTab === 'doa' && (
        <div className="space-y-6">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari doa (contoh: makan, tidur, masjid, orang tua)..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Doa Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDoa.map((doa) => {
              const fullText = `${doa.title}\n\n${doa.arabic}\n\n${doa.latin}\n\n"${doa.translation}"\n\n(${doa.source || ''})`;
              const isCopied = copiedId === doa.id;

              return (
                <div
                  key={doa.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-2 mb-3">
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        {doa.title}
                      </span>
                      <span className="text-[10px] text-stone-400 px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded-md">
                        {doa.category}
                      </span>
                    </div>

                    {/* Arabic text */}
                    <div className="py-2 text-right" dir="rtl">
                      <p className="font-arabic text-xl sm:text-2xl text-stone-900 dark:text-white leading-loose">
                        {doa.arabic}
                      </p>
                    </div>

                    {/* Latin */}
                    <p className="text-xs text-stone-600 dark:text-stone-300 italic pt-2 leading-relaxed">
                      {doa.latin}
                    </p>

                    {/* Meaning */}
                    <p className="text-xs text-stone-800 dark:text-stone-200 pt-2 leading-relaxed">
                      "{doa.translation}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                    <span>{doa.source || 'Hadits Sahih'}</span>
                    <button
                      onClick={() => handleCopy(doa.id, fullText)}
                      className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Doa</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode B: Dzikir Pagi / Petang Interactive Counter */}
      {(subTab === 'pagi' || subTab === 'petang') && (
        <div className="space-y-6">
          <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                {subTab === 'pagi' ? 'Al-Ma’tsurat Dzikir Pagi' : 'Al-Ma’tsurat Dzikir Petang'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Ketuk kartu untuk menghitung bacaan dzikir secara interaktif.
              </p>
            </div>

            <button
              onClick={() => resetAllDzikir(subTab === 'pagi' ? DZIKIR_PAGI : DZIKIR_PETANG)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Semua</span>
            </button>
          </div>

          <div className="space-y-4">
            {(subTab === 'pagi' ? DZIKIR_PAGI : DZIKIR_PETANG).map((item) => {
              const current = dzikirCounters[item.id] || 0;
              const isCompleted = current >= item.count;

              return (
                <div
                  key={item.id}
                  onClick={() => incrementDzikir(item)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer select-none ${
                    isCompleted
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-600/80 shadow-xs'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                    <span className="text-xs font-bold text-stone-900 dark:text-white">
                      {item.title}
                    </span>

                    {/* Counter Pill Button */}
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => incrementDzikir(item)}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-colors flex items-center gap-1 ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-emerald-600 hover:text-white'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Selesai ({item.count}/{item.count})</span>
                          </>
                        ) : (
                          <span>
                            {current} / {item.count}x (Ketuk)
                          </span>
                        )}
                      </button>

                      {current > 0 && (
                        <button
                          onClick={() => resetDzikir(item.id)}
                          className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                          title="Ulangi"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Arabic */}
                  <div className="py-4 text-right" dir="rtl">
                    <p className="font-arabic text-xl sm:text-2xl text-stone-900 dark:text-white leading-loose">
                      {item.arabic}
                    </p>
                  </div>

                  {/* Latin */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 italic leading-relaxed">
                    {item.latin}
                  </p>

                  {/* Translation */}
                  <p className="text-xs text-stone-800 dark:text-stone-200 pt-2 leading-relaxed">
                    "{item.translation}"
                  </p>

                  {/* Virtue note */}
                  {item.note && (
                    <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-emerald-800 dark:text-emerald-300/90 font-medium">
                      Keutamaan: {item.note}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
