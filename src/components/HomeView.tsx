import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Clock,
  Calendar,
  Sparkles,
  Compass,
  Heart,
  Volume2,
  VolumeX,
  RotateCcw,
  Search,
  ArrowRight,
  ChevronRight,
  Check,
  Copy,
  Flame,
  Award,
  Layers,
  Sun,
  Moon
} from 'lucide-react';
import { AppTab, LastRead, PrayerTimes } from '../types/quran';
import { getHijriDate, ISLAMIC_EVENTS } from '../services/hijriCalendar';
import { fetchPrayerTimesForCity, INDONESIAN_CITIES, getNextPrayer } from '../services/prayerTimes';
import { PWAInstallBanner } from './PWAInstallBanner';

interface HomeViewProps {
  onNavigateTab: (tab: AppTab) => void;
  onSelectSurah: (surahNumber: number, targetAyah?: number) => void;
  lastRead: LastRead | null;
  onOpenLastRead: () => void;
  onOpenAdhanModal: () => void;
  nextPrayerInfo: {
    name: string;
    time: string;
    formattedCountdown: string;
  } | null;
  onSearchInQuran: (query: string) => void;
  onOpenInstallModal?: () => void;
  isStandalone?: boolean;
  isIOS?: boolean;
}

interface DhikrPreset {
  id: string;
  arabic: string;
  latin: string;
  arti: string;
  target: number;
}

const HOME_DHIKR_PRESETS: DhikrPreset[] = [
  { id: 'subhanallah', arabic: 'سُبْحَانَ اللَّهِ', latin: 'Subhanallah', arti: 'Maha Suci Allah', target: 33 },
  { id: 'alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', latin: 'Alhamdulillah', arti: 'Segala Puji Bagi Allah', target: 33 },
  { id: 'allahuakbar', arabic: 'اللَّهُ أَكْبَرُ', latin: 'Allahu Akbar', arti: 'Allah Maha Besar', target: 33 },
  { id: 'astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', latin: 'Astaghfirullah', arti: 'Aku memohon ampun kepada Allah', target: 100 },
  { id: 'tahlil', arabic: 'لَا إِلَهَ إِلَّا اللَّهُ', latin: 'Laa ilaaha illallah', arti: 'Tiada Tuhan selain Allah', target: 100 },
];

const FEATURE_SHORTCUTS: {
  id: AppTab;
  title: string;
  subtitle: string;
  icon: any;
  colorClass: string;
  badge?: string;
}[] = [
  {
    id: 'quran',
    title: "Al-Qur'an",
    subtitle: '114 Surat & 30 Juz',
    icon: BookOpen,
    colorClass: 'from-emerald-600 to-teal-700 text-white',
    badge: 'Mushaf RI'
  },
  {
    id: 'sholat',
    title: 'Jam Sholat',
    subtitle: 'Waktu Azan & Jadwal',
    icon: Clock,
    colorClass: 'from-amber-500 to-orange-600 text-white',
    badge: '5 Waktu'
  },
  {
    id: 'tasbih',
    title: 'Tasbih Digital',
    subtitle: 'Hitung Dzikir & Target',
    icon: Heart,
    colorClass: 'from-rose-500 to-pink-600 text-white',
    badge: 'Interaktif'
  },
  {
    id: 'kalender',
    title: 'Kalender Hijriah',
    subtitle: 'Puasa Sunnah & Event',
    icon: Calendar,
    colorClass: 'from-cyan-600 to-blue-700 text-white',
    badge: '1447 H'
  },
  {
    id: 'tajwid',
    title: 'Belajar Tajwid',
    subtitle: 'Panduan Hukum & Kuis',
    icon: Sparkles,
    colorClass: 'from-violet-600 to-purple-700 text-white',
    badge: 'Berwarna'
  },
  {
    id: 'doa',
    title: 'Doa & Dzikir',
    subtitle: 'Hisnul Muslim Pilihan',
    icon: Award,
    colorClass: 'from-emerald-700 to-green-800 text-white',
    badge: 'Harian'
  },
  {
    id: 'asmaul',
    title: 'Asmaul Husna',
    subtitle: '99 Nama Agung Allah',
    icon: Sun,
    colorClass: 'from-amber-600 to-yellow-700 text-white',
    badge: '99 Nama'
  },
  {
    id: 'kiblat',
    title: 'Arah Kiblat',
    subtitle: 'Kompas Ka’bah Presisi',
    icon: Compass,
    colorClass: 'from-teal-600 to-emerald-700 text-white',
    badge: 'Kompas'
  }
];

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateTab,
  onSelectSurah,
  lastRead,
  onOpenLastRead,
  onOpenAdhanModal,
  nextPrayerInfo,
  onSearchInQuran,
  onOpenInstallModal,
  isStandalone = false,
  isIOS = false,
}) => {
  // Search Bar input on Home
  const [searchInput, setSearchInput] = useState<string>('');

  // Prayer times state on Home
  const [selectedCity, setSelectedCity] = useState(INDONESIAN_CITIES[0]);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);

  // Home interactive Tasbih state
  const [selectedDhikr, setSelectedDhikr] = useState<DhikrPreset>(HOME_DHIKR_PRESETS[0]);
  const [tasbihCount, setTasbihCount] = useState<number>(0);
  const [tasbihRounds, setTasbihRounds] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Copy toast state
  const [copiedDoa, setCopiedDoa] = useState<boolean>(false);

  // Date and Hijri info
  const today = useMemo(() => new Date(), []);
  const todayHijri = useMemo(() => getHijriDate(today), [today]);

  const formattedGregorianDate = useMemo(() => {
    return today.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }, [today]);

  // Load Prayer Times for selected city
  useEffect(() => {
    fetchPrayerTimesForCity(selectedCity).then(setPrayerTimes);
  }, [selectedCity]);

  // Handle Search Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchInQuran(searchInput.trim());
    } else {
      onNavigateTab('quran');
    }
  };

  // Interactive Tasbih click handler
  const handleTasbihTap = () => {
    const nextVal = tasbihCount + 1;

    // Haptic vibration
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(nextVal % selectedDhikr.target === 0 ? [50, 60, 50] : 25);
    }

    // Audio click synth
    if (soundEnabled && typeof window !== 'undefined' && window.AudioContext) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(nextVal % selectedDhikr.target === 0 ? 880 : 520, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.07);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.07);
      } catch {
        // ignore
      }
    }

    if (nextVal >= selectedDhikr.target) {
      setTasbihCount(0);
      setTasbihRounds((prev) => prev + 1);
    } else {
      setTasbihCount(nextVal);
    }
  };

  const handleResetTasbih = () => {
    setTasbihCount(0);
  };

  const progressPercent = Math.min(100, Math.round((tasbihCount / selectedDhikr.target) * 100));

  // Determine today's day of week for fasting hints
  const dayOfWeek = today.getDay(); // 0 = Minggu, 1 = Senin, 4 = Kamis
  const isSenin = dayOfWeek === 1;
  const isKamis = dayOfWeek === 4;
  const isAyyamulBidh = todayHijri.day >= 13 && todayHijri.day <= 15;

  // Copy Daily Dua
  const handleCopyDoa = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDoa(true);
    setTimeout(() => setCopiedDoa(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. HERO BANNER: Foto Madinah Al-Munawwarah & Sambutan Islami */}
      <section className="relative overflow-hidden bg-stone-950 text-stone-100 rounded-3xl shadow-2xl border border-stone-800">
        {/* Background Image of Madinah (Masjid Nabawi) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/madinah_nabawi_hero_1793347282794.jpg"
            alt="Masjid Nabawi Madinah Al-Munawwarah"
            className="w-full h-full object-cover object-center brightness-[0.55]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/60"></div>
        </div>

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-4xl">
          {/* Top Kicker: Lokasi & Kalender */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 shadow-xs">
              🕌 Al-Madinah Al-Munawwarah
            </span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span className="text-stone-300">{formattedGregorianDate}</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span className="text-amber-300 font-medium">{todayHijri.formatted}</span>
          </div>

          {/* Greeting & Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            Assalamu’alaikum Warahmatullahi Wabarakatuh
          </h1>

          <p className="font-arabic text-xl sm:text-2xl text-emerald-300/90 mb-4" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mb-6 leading-relaxed">
            Selamat datang di Muslim Quran. Pusat ibadah harian lengkap: Al-Qur'an 30 Juz Kemenag RI, jadwal sholat presisi, kalender Hijriah & puasa sunnah, tasbih digital interaktif, dan panduan ilmu tajwid.
          </p>

          {/* Quick Search Quran Input */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-xl mb-6">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search className="w-5 h-5 text-emerald-400" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari surat atau ayat (Al-Kahf, Yasin, Al-Mulk, juz, atau arti)..."
              className="w-full pl-11 pr-28 py-3 bg-stone-950/85 backdrop-blur-md text-white placeholder-stone-400 text-sm rounded-xl border border-stone-700/80 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-inner"
            />
            <button
              type="submit"
              className="absolute inset-y-1.5 right-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Cari Surat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Action Badges & Popular Surahs */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-400 font-medium">Surat Populer:</span>
            {[
              { num: 18, name: 'Al-Kahfi' },
              { num: 36, name: 'Yasin' },
              { num: 67, name: 'Al-Mulk' },
              { num: 55, name: 'Ar-Rahman' },
              { num: 56, name: 'Al-Waqi’ah' }
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => onSelectSurah(s.num)}
                className="px-2.5 py-1 bg-white/10 hover:bg-emerald-600/40 text-stone-200 hover:text-emerald-200 rounded-lg border border-white/10 transition-colors cursor-pointer"
              >
                {s.name}
              </button>
            ))}

            {lastRead && (
              <button
                onClick={onOpenLastRead}
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors shadow-md cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-200" />
                <span>Lanjut: {lastRead.surahName} : {lastRead.ayahNumber}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* PWA Install Banner for Mobile Android & iPhone */}
      {onOpenInstallModal && !isStandalone && (
        <PWAInstallBanner
          onOpenModal={onOpenInstallModal}
          isStandalone={isStandalone}
          isIOS={isIOS}
        />
      )}

      {/* 2. FITUR UTAMA ISLAMI (Grid 8 Menu Navigasi Cepat) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Fitur Islami Lengkap</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Akses cepat seluruh panduan ibadah dan fitur penunjang keseharian Muslim
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {FEATURE_SHORTCUTS.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                onClick={() => onNavigateTab(f.id)}
                className="group relative flex flex-col items-start p-4 bg-white dark:bg-stone-800/90 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700/80 shadow-xs hover:shadow-md transition-all text-left cursor-pointer"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.colorClass} flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {f.title}
                    </span>
                    {f.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300">
                        {f.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 truncate">
                    {f.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. DUA WIDGET UTAMA SEJAJAR: JAM SHOLAT & TASBIH DIGITAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* WIDGET 1: JAM SHOLAT & HITUNG MUNDUR (7 Kolom di Desktop) */}
        <section className="lg:col-span-7 bg-white dark:bg-stone-800/90 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-700/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white">
                    Jadwal Sholat Hari Ini
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Kota: {selectedCity.name} · Waktu Setempat
                  </p>
                </div>
              </div>

              {/* City Switcher */}
              <select
                value={selectedCity.id}
                onChange={(e) => {
                  const c = INDONESIAN_CITIES.find((city) => city.id === e.target.value);
                  if (c) setSelectedCity(c);
                }}
                className="text-xs bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-lg px-2.5 py-1.5 border border-stone-200 dark:border-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {INDONESIAN_CITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Countdown Hero Banner */}
            {nextPrayerInfo && (
              <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-950/40 dark:to-orange-950/20 border border-amber-500/30 rounded-xl p-3.5 mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                    Waktu Sholat Mendatang
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xl font-bold text-stone-900 dark:text-white">
                      {nextPrayerInfo.name}
                    </span>
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                      pk {nextPrayerInfo.time}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Menuju Azan</span>
                  <div className="text-base font-bold text-amber-600 dark:text-amber-400 font-mono">
                    {nextPrayerInfo.formattedCountdown}
                  </div>
                </div>
              </div>
            )}

            {/* Timetable Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center mb-4">
              {[
                { name: 'Subuh', time: prayerTimes?.Fajr || '04:15' },
                { name: 'Terbit', time: prayerTimes?.Sunrise || '05:30' },
                { name: 'Dzuhur', time: prayerTimes?.Dhuhr || '11:45' },
                { name: 'Ashar', time: prayerTimes?.Asr || '15:00' },
                { name: 'Maghrib', time: prayerTimes?.Maghrib || '17:50' },
                { name: 'Isya', time: prayerTimes?.Isha || '19:00' }
              ].map((item) => {
                const isNext = nextPrayerInfo?.name.toLowerCase() === item.name.toLowerCase();
                return (
                  <div
                    key={item.name}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isNext
                        ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-400 dark:border-amber-500/50 ring-2 ring-amber-400/30'
                        : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700/60'
                    }`}
                  >
                    <span className={`block text-xs font-semibold ${isNext ? 'text-amber-700 dark:text-amber-300' : 'text-stone-600 dark:text-stone-400'}`}>
                      {item.name}
                    </span>
                    <span className="block text-sm font-bold text-stone-900 dark:text-white mt-0.5">
                      {item.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
            <button
              onClick={onOpenAdhanModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan Azan</span>
            </button>
            <button
              onClick={() => onNavigateTab('sholat')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              <span>Jadwal Bulanan & Kiblat</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* WIDGET 2: TASBIH DIGITAL INTERAKTIF LANGSUNG DI HOME (5 Kolom di Desktop) */}
        <section className="lg:col-span-5 bg-white dark:bg-stone-800/90 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-700/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white">
                    Tasbih Digital
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    Sentuh lingkaran untuk berdzikir
                  </p>
                </div>
              </div>

              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                  soundEnabled
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                    : 'bg-stone-100 dark:bg-stone-700 text-stone-400 border-stone-200 dark:border-stone-600'
                }`}
                title={soundEnabled ? 'Suara aktif' : 'Suara dimatikan'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Dhikr Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
              {HOME_DHIKR_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedDhikr(p);
                    setTasbihCount(0);
                  }}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    selectedDhikr.id === p.id
                      ? 'bg-rose-600 text-white font-semibold shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-700/70 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {p.latin} ({p.target})
                </button>
              ))}
            </div>

            {/* Dhikr Arabic & Meaning */}
            <div className="text-center py-2 px-3 bg-stone-50 dark:bg-stone-900/50 rounded-xl mb-3 border border-stone-100 dark:border-stone-800">
              <span className="font-arabic text-xl sm:text-2xl text-stone-900 dark:text-stone-100 block mb-0.5" dir="rtl">
                {selectedDhikr.arabic}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 italic">
                "{selectedDhikr.arti}"
              </span>
            </div>

            {/* Big Interactive Touch Button with Ring */}
            <div className="flex flex-col items-center justify-center my-1">
              <button
                onClick={handleTasbihTap}
                className="group relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-rose-500 via-rose-600 to-pink-700 text-white shadow-xl shadow-rose-600/25 active:scale-95 transition-all select-none cursor-pointer border-4 border-white dark:border-stone-800"
              >
                {/* SVG Progress Circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="transparent"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeDasharray="276"
                    strokeDashoffset={276 - (276 * progressPercent) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-150"
                  />
                </svg>

                <span className="text-3xl font-extrabold tracking-tight font-mono leading-none">
                  {tasbihCount}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-200 mt-1">
                  / {selectedDhikr.target}
                </span>
              </button>
            </div>
          </div>

          {/* Reset & Navigation Footer */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs mt-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleResetTasbih}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 rounded-lg text-stone-600 dark:text-stone-300 transition-colors cursor-pointer"
                title="Reset hitungan ke 0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
              {tasbihRounds > 0 && (
                <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                  {tasbihRounds} putaran selesai
                </span>
              )}
            </div>

            <button
              onClick={() => onNavigateTab('tasbih')}
              className="inline-flex items-center gap-1 font-semibold text-rose-700 dark:text-rose-400 hover:underline cursor-pointer"
            >
              <span>Tasbih Layar Penuh</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>

      {/* 4. DUA WIDGET BERIKUTNYA: KALENDER HIJRIAH & BELAJAR TAJWID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* WIDGET 3: KALENDER HIJRIAH & JADWAL PUASA SUNNAH (6 Kolom) */}
        <section className="lg:col-span-6 bg-white dark:bg-stone-800/90 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-700/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white">
                    Kalender Hijriah & Puasa Sunnah
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Bulan {todayHijri.monthName} ({todayHijri.monthNameArabic}) {todayHijri.year} H
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                Tgl {todayHijri.day}
              </span>
            </div>

            {/* Fasting Notice Badges */}
            <div className="space-y-2.5 mb-4">
              {/* Puasa Senin-Kamis Card */}
              <div className={`p-3 rounded-xl border transition-all ${
                isSenin || isKamis
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700'
                  : 'bg-stone-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-700/60'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Puasa Sunnah Senin & Kamis
                  </span>
                  {isSenin ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white animate-pulse">
                      Hari Ini Senin!
                    </span>
                  ) : isKamis ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white animate-pulse">
                      Hari Ini Kamis!
                    </span>
                  ) : (
                    <span className="text-[10px] text-stone-500 dark:text-stone-400">
                      Disunnahkan
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  "Segala amal perbuatan dipersembahkan pada hari Senin dan Kamis. Maka aku menyukai amalku dipersembahkan saat aku berpuasa." (HR. Tirmidzi)
                </p>
              </div>

              {/* Puasa Ayyamul Bidh Card */}
              <div className={`p-3 rounded-xl border transition-all ${
                isAyyamulBidh
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700'
                  : 'bg-stone-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-700/60'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Puasa Ayyamul Bidh (13, 14, 15 Hijriah)
                  </span>
                  {isAyyamulBidh ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white animate-pulse">
                      Hari Ke-{todayHijri.day} Bidh
                    </span>
                  ) : (
                    <span className="text-[10px] text-stone-500 dark:text-stone-400">
                      Tengah Bulan
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  Puasa 3 hari di tengah bulan laksana berpuasa sepanjang tahun.
                </p>
              </div>
            </div>

            {/* Upcoming Islamic Events Highlight */}
            <div className="p-3 bg-stone-50 dark:bg-stone-900/40 rounded-xl border border-stone-200 dark:border-stone-700/60 mb-2">
              <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block mb-1">
                Agenda & Hari Besar Terdekat:
              </span>
              <ul className="text-xs space-y-1 text-stone-600 dark:text-stone-400">
                <li className="flex items-center justify-between">
                  <span>• Puasa Ramadhan & Malam Lailatul Qadar</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">1 Ramadhan</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>• Hari Raya Idul Fitri (1 Syawal)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">1 Syawal</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>• Hari Raya Idul Adha & Hari Tasyrik</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">10 Dzulhijjah</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Konverter Masehi & Hijriah
            </span>
            <button
              onClick={() => onNavigateTab('kalender')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 dark:text-cyan-400 hover:underline cursor-pointer"
            >
              <span>Buka Kalender Lengkap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* WIDGET 4: BELAJAR TAJWID HIGHLIGHT (6 Kolom) */}
        <section className="lg:col-span-6 bg-white dark:bg-stone-800/90 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-700/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white">
                    Belajar Ilmu Tajwid
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Warna panduan standar mushaf Al-Qur'an
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                Tajwid Interaktif
              </span>
            </div>

            {/* Color-coded rules preview matching Quran reader colors */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    Ikhfa’ Haqiqi
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 mb-1.5">
                  Samar disertai dengung 2 harakat.
                </p>
                <div className="bg-white dark:bg-stone-900 px-2 py-1 rounded-md text-center">
                  <span className="font-arabic text-sm text-emerald-600 dark:text-emerald-400 font-bold" dir="rtl">
                    مِن قَبْلِكُمْ
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span className="text-xs font-bold text-rose-800 dark:text-rose-300">
                    Idgham Bighunnah
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 mb-1.5">
                  Melebur dengan dengung (ي ن م و).
                </p>
                <div className="bg-white dark:bg-stone-900 px-2 py-1 rounded-md text-center">
                  <span className="font-arabic text-sm text-rose-600 dark:text-rose-400 font-bold" dir="rtl">
                    مَن يَقُولُ
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  <span className="text-xs font-bold text-sky-800 dark:text-sky-300">
                    Qalqalah
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 mb-1.5">
                  Memantul saat sukun (ق ط ب ج د).
                </p>
                <div className="bg-white dark:bg-stone-900 px-2 py-1 rounded-md text-center">
                  <span className="font-arabic text-sm text-sky-600 dark:text-sky-400 font-bold" dir="rtl">
                    قُلْ هُوَ اللَّهُ أَحَدٌ
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                    Mad Thabi’i
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 mb-1.5">
                  Dipanjangkan 2 harakat (alif, wau, ya).
                </p>
                <div className="bg-white dark:bg-stone-900 px-2 py-1 rounded-md text-center">
                  <span className="font-arabic text-sm text-amber-600 dark:text-amber-400 font-bold" dir="rtl">
                    نُوحِيهَا
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Tersedia Kuis Uji Pemahaman
            </span>
            <button
              onClick={() => onNavigateTab('tajwid')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-violet-700 dark:text-violet-400 hover:underline cursor-pointer"
            >
              <span>Pelajari Semua Hukum & Kuis</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>

      {/* 5. DOA HARIAN PILIHAN & MUTIARA HADITS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Doa Pilihan Hari Ini */}
        <section className="lg:col-span-7 bg-white dark:bg-stone-800/90 rounded-2xl p-5 sm:p-6 border border-stone-200 dark:border-stone-700/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white">
                    Doa Harian Pilihan: Doa Sapu Jagad
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Kebaikan Dunia dan Kebaikan Akhirat (QS. Al-Baqarah: 201)
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  handleCopyDoa(
                    'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ - Rabbanaa aatinaa fid-dunyaa hasanah wa fil aakhirati hasanah wa qinaa adzaaban-naar'
                  )
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors cursor-pointer"
                title="Salin doa"
              >
                {copiedDoa ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40 mb-3">
              <p className="font-arabic text-xl sm:text-2xl text-stone-900 dark:text-stone-100 text-right leading-loose mb-2" dir="rtl">
                رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
              </p>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium italic mb-1.5">
                Rabbanaa aatinaa fid-dunyaa hasanah, wa fil-aakhirati hasanah, wa qinaa ‘adzaaban-naar.
              </p>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka."
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Kumpulan Doa Hisnul Muslim Lengkap
            </span>
            <button
              onClick={() => onNavigateTab('doa')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              <span>Buka Semua Doa</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Mutiara Hadits Harian */}
        <section className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-2xl p-5 sm:p-6 border border-stone-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-semibold border border-amber-500/30">
                Mutiara Hadits
              </span>
              <span className="text-xs text-stone-400">Keutamaan Al-Qur'an</span>
            </div>

            <p className="font-arabic text-lg sm:text-xl text-amber-200/90 text-right leading-relaxed mb-3" dir="rtl">
              خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
            </p>

            <blockquote className="text-xs sm:text-sm text-stone-200 leading-relaxed italic mb-3">
              "Sebaik-baik kalian adalah orang yang belajar Al-Qur’an dan mengajarkannya."
            </blockquote>

            <p className="text-[11px] text-stone-400">
              — HR. Bukhari no. 5027 dari Utsman bin Affan radhiyallahu ‘anhu
            </p>
          </div>

          <div className="pt-3 mt-4 border-t border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-400">Mulai membaca Al-Qur'an</span>
            <button
              onClick={() => onNavigateTab('quran')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Baca Mushaf</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
