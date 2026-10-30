import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Volume2,
  Layers,
  GraduationCap,
  ArrowRight,
  RotateCcw,
  Info,
  Clock,
  Compass
} from 'lucide-react';
import {
  TAJWID_RULES,
  TAJWID_CATEGORIES,
  TAJWID_QUIZ,
  TajwidRule
} from '../data/tajwidData';

export const TajwidView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'belajar' | 'kuis'>('belajar');

  // Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Filtered Tajwid rules
  const filteredRules = useMemo(() => {
    return TAJWID_RULES.filter((rule) => {
      const matchCat = selectedCategory === 'all' || rule.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        rule.title.toLowerCase().includes(q) ||
        rule.arabicTitle.includes(q) ||
        rule.definition.toLowerCase().includes(q) ||
        rule.letters.some((l) => l.includes(q)) ||
        rule.examples.some(
          (ex) =>
            ex.surah.toLowerCase().includes(q) ||
            ex.arabicText.includes(q) ||
            ex.latinText.toLowerCase().includes(q)
        );
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Quiz handlers
  const handleSelectQuizOption = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleConfirmQuizAnswer = () => {
    if (selectedAnswer === null) return;
    setQuizSubmitted(true);
    if (selectedAnswer === TAJWID_QUIZ[currentQuizIdx].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIdx + 1 < TAJWID_QUIZ.length) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setQuizSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizSubmitted(false);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Panduan Lengkap Ilmu Tajwid Mushaf</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-white mb-2">
          Belajar Hukum Tajwid Al-Qur'an
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto">
          Membaguskan dan memfasihkan bacaan kalamullah sesuai kaidah ilmu tajwid: nun sukun & tanwin, mim sukun, ragam mad, qalqalah, alif lam, serta tanda waqaf.
        </p>
      </div>

      {/* Main Tabs: Modul Belajar vs Kuis Interaktif */}
      <div className="flex items-center justify-center mb-8">
        <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-2xs text-xs font-semibold">
          <button
            onClick={() => setActiveTab('belajar')}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'belajar'
                ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Materi & Kaidah Tajwid ({TAJWID_RULES.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('kuis')}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'kuis'
                ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Kuis Cepat Tajwid ({TAJWID_QUIZ.length} Soal)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MATERI & KAIDAH TAJWID */}
      {activeTab === 'belajar' && (
        <div className="space-y-6">
          {/* Search Bar & Category Filter */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 sm:p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari hukum tajwid, huruf hijaiyah, contoh surat, atau penjelasan..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  Hapus
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {TAJWID_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="text-xs text-stone-500 dark:text-stone-400 px-1 flex items-center justify-between">
            <span>
              Menampilkan <strong>{filteredRules.length}</strong> hukum tajwid
            </span>
            <span className="italic">Disusun sesuai kaidah tajwid Al-Qur'an riwayat Hafsh 'an 'Ashim</span>
          </div>

          {/* Tajwid Cards List */}
          {filteredRules.length === 0 ? (
            <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
              <Sparkles className="w-8 h-8 mx-auto text-stone-400 mb-2" />
              <h3 className="text-base font-bold text-stone-900 dark:text-white">Hukum Tajwid Tidak Ditemukan</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Silakan coba kata kunci lain atau pilih kategori "Semua Hukum".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredRules.map((rule) => (
                <div
                  key={rule.id}
                  className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-7 shadow-sm hover:border-emerald-300 dark:hover:border-emerald-700/80 transition-all space-y-5"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                          {rule.categoryLabel}
                        </span>
                        {rule.duration && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                            <Clock className="w-3 h-3" />
                            <span>{rule.duration}</span>
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                        {rule.title}
                      </h2>
                    </div>

                    <div className="text-right" dir="rtl">
                      <span className="font-arabic text-2xl sm:text-3xl text-emerald-700 dark:text-emerald-400 font-bold">
                        {rule.arabicTitle}
                      </span>
                    </div>
                  </div>

                  {/* Letter Badges (Huruf-huruf Terkait) */}
                  <div>
                    <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 block mb-2">
                      Huruf Terkait ({rule.letters.length} huruf):
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {rule.letters.map((letter, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center gap-2"
                        >
                          <span className="font-arabic text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-300 leading-none">
                            {letter}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Definition & How to read */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-stone-50 dark:bg-stone-850/60 p-4 rounded-2xl border border-stone-100 dark:border-stone-800">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white uppercase tracking-wider block mb-1">
                        Pengertian Kaidah:
                      </span>
                      <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                        {rule.definition}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white uppercase tracking-wider block mb-1">
                        Cara Membaca:
                      </span>
                      <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed font-medium">
                        {rule.howToRead}
                      </p>
                    </div>
                  </div>

                  {/* Real Quran Examples */}
                  <div>
                    <span className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Contoh Penerapan dalam Ayat Al-Qur'an:</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {rule.examples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700/80 space-y-2 flex flex-col justify-between"
                        >
                          <div>
                            {/* Surah reference header */}
                            <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500 dark:text-stone-400 mb-2">
                              <span className="text-emerald-700 dark:text-emerald-400">
                                QS. {ex.surah} : Ayat {ex.ayahNumber}
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-mono text-[10px]">
                                {ex.highlightPart}
                              </span>
                            </div>

                            {/* Arabic Verse */}
                            <p
                              className="font-arabic text-xl sm:text-2xl text-stone-900 dark:text-white text-right leading-loose mb-1"
                              dir="rtl"
                            >
                              {ex.arabicText}
                            </p>

                            {/* Latin */}
                            <p className="text-xs text-emerald-800 dark:text-emerald-300 italic font-medium">
                              "{ex.latinText}"
                            </p>

                            {/* Translation */}
                            <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                              {ex.translation}
                            </p>
                          </div>

                          {/* Tajwid Note */}
                          <div className="pt-2 border-t border-stone-100 dark:border-stone-700 text-[11px] text-stone-500 dark:text-stone-400 flex items-start gap-1.5">
                            <Info className="w-3.5 h-3.5 shrink-0 text-emerald-600 mt-0.5" />
                            <span>{ex.note}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: KUIS CEPAT TAJWID */}
      {activeTab === 'kuis' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xl">
          {!quizFinished ? (
            <div>
              {/* Quiz Header */}
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Soal {currentQuizIdx + 1} dari {TAJWID_QUIZ.length}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5">
                    Uji Pengetahuan Tajwid
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 dark:text-stone-400 block">Skor Saat Ini</span>
                  <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {score} / {TAJWID_QUIZ.length}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQuizIdx + 1) / TAJWID_QUIZ.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="mb-6">
                <p className="text-base sm:text-lg font-semibold text-stone-900 dark:text-white leading-relaxed">
                  {TAJWID_QUIZ[currentQuizIdx].question}
                </p>
                {TAJWID_QUIZ[currentQuizIdx].arabicSnippet && (
                  <div className="mt-3 p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl text-center">
                    <span className="font-arabic text-2xl font-bold text-stone-900 dark:text-white">
                      {TAJWID_QUIZ[currentQuizIdx].arabicSnippet}
                    </span>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {TAJWID_QUIZ[currentQuizIdx].options.map((opt, oIdx) => {
                  const isSelected = selectedAnswer === oIdx;
                  const isCorrect = oIdx === TAJWID_QUIZ[currentQuizIdx].correctIndex;

                  let styleClass =
                    'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 hover:border-stone-300';

                  if (quizSubmitted) {
                    if (isCorrect) {
                      styleClass =
                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/40';
                    } else if (isSelected && !isCorrect) {
                      styleClass =
                        'border-rose-400 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 line-through';
                    }
                  } else if (isSelected) {
                    styleClass =
                      'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold ring-2 ring-emerald-600/30';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectQuizOption(oIdx)}
                      disabled={quizSubmitted}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${styleClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 flex items-center justify-center text-xs font-bold font-mono">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="text-sm font-medium">{opt}</span>
                      </div>

                      {quizSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {quizSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (if submitted) */}
              {quizSubmitted && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 mb-6 space-y-1">
                  <span className="font-bold block">Penjelasan:</span>
                  <p className="leading-relaxed">
                    {TAJWID_QUIZ[currentQuizIdx].explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                {!quizSubmitted ? (
                  <button
                    onClick={handleConfirmQuizAnswer}
                    disabled={selectedAnswer === null}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    Kirim Jawaban
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuiz}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{currentQuizIdx + 1 < TAJWID_QUIZ.length ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed Results */
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <GraduationCap className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-stone-900 dark:text-white">
                  Kuis Tajwid Selesai!
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Alhamdulillah, berikut adalah hasil pemahaman ilmu tajwid Anda:
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 max-w-sm mx-auto">
                <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  {score} / {TAJWID_QUIZ.length}
                </div>
                <div className="text-xs font-semibold text-stone-600 dark:text-stone-300 mt-1">
                  Nilai: {Math.round((score / TAJWID_QUIZ.length) * 100)}%
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                  {score === TAJWID_QUIZ.length
                    ? 'Mumtaz! Pemahaman kaidah tajwid Anda sangat luar biasa sempurna.'
                    : score >= 3
                    ? 'Jayyid Jiddan! Pemahaman tajwid Anda sangat baik, terus perdalam bacaan Al-Qur’an.'
                    : 'Terus semangat belajar dan mengulang materi kaidah tajwid di tab Materi.'}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetQuiz}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Kuis</span>
                </button>
                <button
                  onClick={() => setActiveTab('belajar')}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold cursor-pointer"
                >
                  Kembali ke Materi
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
