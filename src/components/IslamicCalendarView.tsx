import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Bookmark,
  Heart,
  Info,
  CalendarCheck,
  CheckCircle,
  HelpCircle,
  ArrowRightLeft
} from 'lucide-react';
import {
  getHijriDate,
  getEventsForHijriDate,
  ISLAMIC_EVENTS,
  FASTING_GUIDES,
  HIJRI_MONTHS,
  HijriDate,
  IslamicEvent
} from '../services/hijriCalendar';

const DAY_NAMES = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum’at', 'Sabtu'];
const MONTH_NAMES_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export const IslamicCalendarView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'kalender' | 'haribesar' | 'puasa' | 'konverter'>('kalender');
  
  // Current calendar month view
  const today = useMemo(() => new Date(), []);
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth()); // 0-11
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  // Date Converter State
  const [convertDateInput, setConvertDateInput] = useState<string>(
    today.toISOString().split('T')[0]
  );
  const convertedHijri = useMemo(() => {
    try {
      const d = new Date(convertDateInput);
      if (isNaN(d.getTime())) return null;
      return getHijriDate(d);
    } catch {
      return null;
    }
  }, [convertDateInput]);

  // Today's Hijri info
  const todayHijri = useMemo(() => getHijriDate(today), [today]);

  // Selected date info
  const selectedHijri = useMemo(() => getHijriDate(selectedDate), [selectedDate]);
  const selectedEvents = useMemo(
    () => getEventsForHijriDate(selectedHijri.day, selectedHijri.month),
    [selectedHijri]
  );

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleJumpToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDate(today);
  };

  // Generate calendar days for the current view
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday
    const totalDays = lastDayOfMonth.getDate();

    const days = [];

    // Blank cells before the 1st
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Actual days of current month
    for (let day = 1; day <= totalDays; day++) {
      const d = new Date(currentYear, currentMonth, day);
      const h = getHijriDate(d);
      const isMon = d.getDay() === 1;
      const isThu = d.getDay() === 4;
      const isAyyamulBidh = h.day === 13 || h.day === 14 || h.day === 15;
      const events = getEventsForHijriDate(h.day, h.month);
      const isTodayDate =
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear();

      days.push({
        date: d,
        dayNumber: day,
        hijri: h,
        isMondayThursday: isMon || isThu,
        isAyyamulBidh,
        events,
        isToday: isTodayDate
      });
    }

    return days;
  }, [currentYear, currentMonth, today]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Kalender Hijriah & Masehi Nusantara</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-white mb-2">
          Kalender Islam & Puasa Sunnah
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto">
          Hari ini: <strong className="text-emerald-700 dark:text-emerald-400">{todayHijri.formatted}</strong> ({today.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })})
        </p>
      </div>

      {/* Sub Tabs Navigation */}
      <div className="flex items-center justify-center mb-8">
        <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-2xs text-xs font-semibold overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveSubTab('kalender')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === 'kalender'
                ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Kalender Bulanan
          </button>
          <button
            onClick={() => setActiveSubTab('haribesar')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === 'haribesar'
                ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Hari Besar Islam
          </button>
          <button
            onClick={() => setActiveSubTab('puasa')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === 'puasa'
                ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Niat & Puasa Sunnah
          </button>
          <button
            onClick={() => setActiveSubTab('konverter')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === 'konverter'
                ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Konverter Tanggal
          </button>
        </div>
      </div>

      {/* VIEW 1: KALENDER BULANAN */}
      {activeSubTab === 'kalender' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Calendar Grid */}
          <div className="lg:col-span-8 bg-white dark:bg-stone-900 rounded-3xl p-5 sm:p-7 border border-stone-200 dark:border-stone-700 shadow-xl">
            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition-colors cursor-pointer"
                  title="Bulan Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition-colors cursor-pointer"
                  title="Bulan Berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white ml-2">
                  {MONTH_NAMES_ID[currentMonth]} {currentYear}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleJumpToToday}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  Hari Ini
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2">
              {DAY_NAMES.map((name, idx) => (
                <div
                  key={name}
                  className={`py-2 rounded-lg ${
                    idx === 5 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : idx === 0 ? 'text-rose-500 font-bold' : ''
                  }`}
                >
                  {name}
                </div>
              ))}
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {calendarDays.map((item, index) => {
                if (!item) {
                  return <div key={`empty-${index}`} className="min-h-[72px] sm:min-h-[84px] rounded-xl bg-transparent" />;
                }

                const isSelected =
                  selectedDate.getDate() === item.date.getDate() &&
                  selectedDate.getMonth() === item.date.getMonth() &&
                  selectedDate.getFullYear() === item.date.getFullYear();

                const hasEvent = item.events.length > 0;

                return (
                  <button
                    key={`day-${item.dayNumber}`}
                    onClick={() => setSelectedDate(item.date)}
                    className={`min-h-[72px] sm:min-h-[84px] p-1.5 sm:p-2 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/50 shadow-md'
                        : item.isToday
                        ? 'border-amber-400 dark:border-amber-500/80 bg-amber-50/40 dark:bg-amber-950/20'
                        : 'border-stone-100 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/60 dark:bg-stone-800/40'
                    }`}
                  >
                    {/* Top Row: Gregorian Day & Hijri Day */}
                    <div className="flex items-start justify-between w-full">
                      <span
                        className={`text-sm sm:text-base font-bold ${
                          item.isToday
                            ? 'text-amber-600 dark:text-amber-400'
                            : isSelected
                            ? 'text-emerald-700 dark:text-emerald-300'
                            : 'text-stone-800 dark:text-stone-100'
                        }`}
                      >
                        {item.dayNumber}
                      </span>
                      <span className="text-[10px] sm:text-xs font-medium text-emerald-600 dark:text-emerald-400/90 font-mono">
                        {item.hijri.day}
                      </span>
                    </div>

                    {/* Middle/Bottom: Badges for Fasting or Events */}
                    <div className="mt-1 flex flex-col gap-0.5">
                      {hasEvent && (
                        <div
                          title={item.events[0].title}
                          className="px-1 py-0.5 rounded text-[9px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 truncate"
                        >
                          {item.events[0].title.split('(')[0]}
                        </div>
                      )}

                      {!hasEvent && item.isAyyamulBidh && (
                        <div
                          title="Puasa Sunnah Ayyamul Bidh"
                          className="px-1 py-0.5 rounded text-[8px] font-semibold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 truncate"
                        >
                          Ayyamul Bidh
                        </div>
                      )}

                      {!hasEvent && !item.isAyyamulBidh && item.isMondayThursday && (
                        <div
                          title="Sunnah Puasa Senin/Kamis"
                          className="hidden sm:block px-1 py-0.5 rounded text-[8px] text-stone-500 dark:text-stone-400 bg-stone-200/60 dark:bg-stone-700/60 truncate"
                        >
                          Puasa Sunnah
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full border border-amber-400 bg-amber-100 dark:bg-amber-900" />
                <span>Hari Ini</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-teal-100 dark:bg-teal-900 border border-teal-300" />
                <span>Ayyamul Bidh (13-15 Hijriah)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-200 dark:bg-amber-800" />
                <span>Hari Besar Islam</span>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Day Detail Panel */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-700 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                <CalendarCheck className="w-4 h-4" />
                <span>Rincian Tanggal Pilihan</span>
              </div>

              {/* Main Date Display */}
              <div className="border-b border-stone-100 dark:border-stone-800 pb-4 mb-4">
                <div className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                  {selectedDate.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="text-base sm:text-lg font-semibold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center justify-between">
                  <span>{selectedHijri.formatted}</span>
                  <span className="font-arabic text-stone-400 text-sm">{selectedHijri.monthNameArabic}</span>
                </div>
              </div>

              {/* Islamic Events on Selected Date */}
              {selectedEvents.length > 0 ? (
                <div className="space-y-3 mb-4">
                  {selectedEvents.map((ev, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800"
                    >
                      <div className="font-bold text-sm text-amber-900 dark:text-amber-200 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>{ev.title}</span>
                      </div>
                      <p className="text-xs text-amber-800/90 dark:text-amber-300 leading-relaxed">
                        {ev.description}
                      </p>
                      {ev.fastingRecommended && (
                        <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Dianjurkan Berpuasa Sunnah</span>
                        </div>
                      )}
                      {ev.fastingForbidden && (
                        <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                          <Info className="w-3.5 h-3.5" />
                          <span>Diharamkan Berpuasa pada Hari Ini</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mb-4 text-xs text-stone-500 dark:text-stone-400">
                  Tidak ada perayaan hari besar khusus pada tanggal ini.
                </div>
              )}

              {/* Sunnah Fasting Status for Selected Day */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 space-y-2">
                <div className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Amalan Puasa Hari Ini</span>
                </div>

                {selectedHijri.day >= 13 && selectedHijri.day <= 15 ? (
                  <p className="text-xs text-teal-700 dark:text-teal-300 leading-relaxed font-medium">
                    ✨ Hari ini bertepatan dengan <strong>Puasa Sunnah Ayyamul Bidh</strong> (tanggal {selectedHijri.day} {selectedHijri.monthName}).
                  </p>
                ) : selectedDate.getDay() === 1 ? (
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed font-medium">
                    ✨ Hari ini adalah <strong>Senin</strong>, hari utama disunnahkannya berpuasa dan amal perbuatan diangkat ke hadapan Allah.
                  </p>
                ) : selectedDate.getDay() === 4 ? (
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed font-medium">
                    ✨ Hari ini adalah <strong>Kamis</strong>, hari utama disunnahkannya berpuasa mingguan.
                  </p>
                ) : (
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    Hari biasa. Perbanyak dzikir, sholawat, dan tilawah Al-Qur'an.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: HARI BESAR ISLAM LENGKAP */}
      {activeSubTab === 'haribesar' && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-700 shadow-xl">
          <div className="max-w-2xl mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-2">
              Daftar Hari Besar & Peristiwa Islam
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Peringatan hari bersejarah, peristiwa penting kenabian, dan momentum ibadah agung sepanjang tahun Hijriah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ISLAMIC_EVENTS.map((event, index) => {
              const monthObj = HIJRI_MONTHS[event.hijriMonth - 1];
              return (
                <div
                  key={index}
                  className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {event.hijriDay} {monthObj?.name}
                      </span>
                      <span className="font-arabic text-stone-400 text-sm" dir="rtl">
                        {event.arabicTitle}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 dark:text-white mb-1.5">
                      {event.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {event.fastingRecommended && (
                    <div className="mt-3 pt-2.5 border-t border-stone-200 dark:border-stone-700 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Sunnah Berpuasa</span>
                    </div>
                  )}

                  {event.fastingForbidden && (
                    <div className="mt-3 pt-2.5 border-t border-stone-200 dark:border-stone-700 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold">
                      <Info className="w-3.5 h-3.5" />
                      <span>Diharamkan Puasa (Hari Raya/Tasyrik)</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: NIAT & PANDUAN PUASA SUNNAH */}
      {activeSubTab === 'puasa' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-700 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-2">
              Panduan & Bacaan Niat Puasa Sunnah
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-6">
              Lafaz niat puasa sunnah, keutamaan, dan jadwal pelaksanaannya sesuai tuntunan Rasulullah SAW.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FASTING_GUIDES.map((guide, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-base text-stone-900 dark:text-white">
                        {guide.name}
                      </h3>
                      <span className="font-arabic text-emerald-600 dark:text-emerald-400 text-sm">
                        {guide.arabicName}
                      </span>
                    </div>

                    {/* Arabic Intention */}
                    <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-right mb-3">
                      <p className="font-arabic text-lg sm:text-xl text-stone-900 dark:text-stone-100 leading-loose" dir="rtl">
                        {guide.arabicIntention}
                      </p>
                    </div>

                    {/* Latin & Translation */}
                    <div className="text-xs space-y-1.5 mb-4">
                      <p className="font-medium italic text-emerald-700 dark:text-emerald-300">
                        "{guide.latinIntention}"
                      </p>
                      <p className="text-stone-600 dark:text-stone-300">
                        Artinya: {guide.translation}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-200 dark:border-stone-700 text-xs text-stone-500 dark:text-stone-400">
                    <p className="mb-1">
                      <strong className="text-stone-700 dark:text-stone-300">Keutamaan:</strong> {guide.virtue}
                    </p>
                    <p>
                      <strong className="text-stone-700 dark:text-stone-300">Waktu:</strong> {guide.days}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: KONVERTER TANGGAL MASEHI <-> HIJRIAH */}
      {activeSubTab === 'konverter' && (
        <div className="max-w-xl mx-auto bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-700 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider">
            <ArrowRightLeft className="w-4 h-4" />
            <span>Kalkulator Konversi Tanggal</span>
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">
            Konversi Masehi ke Hijriah
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-6">
            Pilih tanggal Masehi apa pun untuk mengetahui tanggal, bulan, dan tahun Hijriah yang setara.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Pilih Tanggal Masehi
              </label>
              <input
                type="date"
                value={convertDateInput}
                onChange={(e) => setConvertDateInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {convertedHijri && (
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center animate-in fade-in duration-200">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-300">
                  Hasil Tanggal Hijriah
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
                  {convertedHijri.formatted}
                </div>
                <div className="font-arabic text-xl text-emerald-700 dark:text-emerald-400 mt-2">
                  {convertedHijri.day} {convertedHijri.monthNameArabic} {convertedHijri.year} هـ
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
