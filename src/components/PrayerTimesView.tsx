import React, { useState, useEffect } from 'react';
import {
  Clock,
  Compass,
  Calendar,
  Navigation,
  RefreshCw,
  Volume2,
  Bell,
  BellOff,
  Headphones,
  Sparkles
} from 'lucide-react';
import {
  INDONESIAN_CITIES,
  CityOption,
  fetchPrayerTimesForCity,
  fetchPrayerTimesByCoords,
  getNextPrayer
} from '../services/prayerTimes';
import { PrayerTimes } from '../types/quran';
import { AdhanAudioPlayerModal } from './AdhanAudioPlayerModal';

export const PrayerTimesView: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityOption>(INDONESIAN_CITIES[0]);
  const [timings, setTimings] = useState<PrayerTimes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentCityLabel, setCurrentCityLabel] = useState<string>(INDONESIAN_CITIES[0].name);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [autoAdhanAlarm, setAutoAdhanAlarm] = useState<boolean>(() => {
    return localStorage.getItem('mq_auto_adhan') === 'true';
  });

  // Adhan modal state
  const [isAdhanModalOpen, setIsAdhanModalOpen] = useState<boolean>(false);
  const [adhanModalPrayerContext, setAdhanModalPrayerContext] = useState<string>('Umum');
  const [adhanModalTrackId, setAdhanModalTrackId] = useState<string>('makkah');

  // Clock tick with second precision
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );

      // Check if current minute matches any prayer time for auto Adhan
      if (autoAdhanAlarm && timings) {
        const currentHHMM = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
        const prayerMatch = [
          { name: 'Subuh', time: timings.Fajr, track: 'fajr' },
          { name: 'Dzuhur', time: timings.Dhuhr, track: 'makkah' },
          { name: 'Ashar', time: timings.Asr, track: 'madinah' },
          { name: 'Maghrib', time: timings.Maghrib, track: 'makkah' },
          { name: 'Isya', time: timings.Isha, track: 'alafasy' }
        ].find((p) => p.time === currentHHMM);

        if (prayerMatch && now.getSeconds() === 0 && !isAdhanModalOpen) {
          setAdhanModalPrayerContext(prayerMatch.name);
          setAdhanModalTrackId(prayerMatch.track);
          setIsAdhanModalOpen(true);
        }
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [autoAdhanAlarm, timings, isAdhanModalOpen]);

  // Save auto adhan preference
  useEffect(() => {
    localStorage.setItem('mq_auto_adhan', autoAdhanAlarm.toString());
  }, [autoAdhanAlarm]);

  // Fetch timings when city changes
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchPrayerTimesForCity(selectedCity).then((data) => {
      if (isMounted) {
        setTimings(data);
        setCurrentCityLabel(selectedCity.name);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      alert('Perangkat Anda tidak mendukung fitur lokasi GPS.');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetchPrayerTimesByCoords(latitude, longitude);
        setTimings(res);
        setCurrentCityLabel(`Lokasi Anda (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`);
        setIsLoading(false);
      },
      (err) => {
        console.warn('Geolocation denied or failed:', err);
        setIsLoading(false);
      }
    );
  };

  const nextPrayer = timings ? getNextPrayer(timings) : null;

  const handleOpenAdhan = (prayerName: string) => {
    setAdhanModalPrayerContext(prayerName);
    if (prayerName.toLowerCase().includes('subuh')) {
      setAdhanModalTrackId('fajr');
    } else if (prayerName.toLowerCase().includes('madinah')) {
      setAdhanModalTrackId('madinah');
    } else {
      setAdhanModalTrackId('makkah');
    }
    setIsAdhanModalOpen(true);
  };

  const prayerCards = timings
    ? [
        { name: 'Imsak', time: timings.Imsak || timings.Fajr, desc: 'Waktu menahan', hasAdhan: false },
        { name: 'Subuh', time: timings.Fajr, desc: 'Fajar Shodiq', hasAdhan: true },
        { name: 'Terbit', time: timings.Sunrise, desc: 'Matahari terbit', hasAdhan: false },
        { name: 'Dzuhur', time: timings.Dhuhr, desc: 'Tergelincir matahari', hasAdhan: true },
        { name: 'Ashar', time: timings.Asr, desc: 'Bayangan sama panjang', hasAdhan: true },
        { name: 'Maghrib', time: timings.Maghrib, desc: 'Matahari terbenam', hasAdhan: true },
        { name: 'Isya', time: timings.Isha, desc: 'Hilang mega merah', hasAdhan: true }
      ]
    : [];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* City & Date selector bar */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Jam Sholat Digital & Jadwal Waktu Ibadah</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
            {currentCityLabel}
          </h2>
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{timings?.date || 'Hari ini'}</span>
            {timings?.hijri && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-emerald-700 dark:text-emerald-400">
                  {timings.hijri}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* City select dropdown */}
          <div className="relative flex-1 md:w-56">
            <select
              value={selectedCity.id}
              onChange={(e) => {
                const found = INDONESIAN_CITIES.find((c) => c.id === e.target.value);
                if (found) setSelectedCity(found);
              }}
              className="w-full pl-3 pr-8 py-2 text-xs font-medium bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {INDONESIAN_CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.province})
                </option>
              ))}
            </select>
          </div>

          {/* GPS auto detect button */}
          <button
            onClick={handleUseGPS}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl hover:bg-emerald-100 transition-colors"
            title="Deteksi Lokasi GPS Anda"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Lokasi Saya</span>
          </button>
        </div>
      </div>

      {/* Mosque-Style Digital Prayer Clock Display */}
      <div className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Digital Clock Section */}
          <div className="text-center lg:text-left space-y-2">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Jam Digital Sholat Waktu Nyata</span>
            </div>
            <div className="text-4xl sm:text-6xl font-mono font-extrabold tracking-wider text-amber-200 drop-shadow-md">
              {currentTimeStr || '00:00:00'}
            </div>
            <div className="text-xs text-stone-300 flex items-center justify-center lg:justify-start gap-2">
              <span>Waktu Indonesia Barat (WIB)</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-300 font-medium">Zona {selectedCity.name}</span>
            </div>
          </div>

          {/* Countdown & Next Prayer Card */}
          {nextPrayer && (
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 text-center lg:text-right space-y-2 w-full lg:w-auto">
              <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold">
                Menuju Waktu Sholat
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {nextPrayer.name} pukul <span className="font-mono text-amber-300">{nextPrayer.time}</span>
              </div>
              <p className="text-xs text-stone-200">
                Tersisa <span className="font-bold text-emerald-300">{nextPrayer.formattedCountdown}</span> lagi menuju azan.
              </p>

              {/* Action Buttons: Play Adhan & Auto Alarm Toggle */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-end gap-2">
                <button
                  onClick={() => handleOpenAdhan(nextPrayer.name)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-amber-200" />
                  <span>Putar Audio Azan</span>
                </button>

                <button
                  onClick={() => setAutoAdhanAlarm(!autoAdhanAlarm)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border transition-colors ${
                    autoAdhanAlarm
                      ? 'bg-amber-500/20 text-amber-200 border-amber-500/40'
                      : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10'
                  }`}
                  title={autoAdhanAlarm ? 'Alarm Azan Otomatis Aktif' : 'Nyalakan Alarm Azan Otomatis'}
                >
                  {autoAdhanAlarm ? (
                    <>
                      <Bell className="w-3.5 h-3.5 text-amber-300" />
                      <span>Alarm Azan: Aktif</span>
                    </>
                  ) : (
                    <>
                      <BellOff className="w-3.5 h-3.5" />
                      <span>Alarm: Nonaktif</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prayer Schedule Cards Grid with Adhan Play Triggers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-stone-400 text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
            <span>Memperbarui jadwal sholat...</span>
          </div>
        ) : (
          prayerCards.map((p) => {
            const isNext = nextPrayer?.name === p.name;
            return (
              <div
                key={p.name}
                className={`p-4 rounded-2xl border transition-all text-center flex flex-col justify-between ${
                  isNext
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/40'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 shadow-xs hover:border-emerald-500/40'
                }`}
              >
                <div>
                  <h3
                    className={`text-sm font-semibold ${
                      isNext ? 'text-white' : 'text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {p.name}
                  </h3>
                  <div
                    className={`font-mono text-xl sm:text-2xl font-bold mt-2 ${
                      isNext ? 'text-amber-200' : 'text-emerald-700 dark:text-emerald-400'
                    }`}
                  >
                    {p.time}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 flex flex-col items-center gap-1">
                  <span
                    className={`text-[10px] ${
                      isNext ? 'text-emerald-100' : 'text-stone-400'
                    }`}
                  >
                    {p.desc}
                  </span>

                  {p.hasAdhan && (
                    <button
                      onClick={() => handleOpenAdhan(p.name)}
                      className={`mt-1 inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                        isNext
                          ? 'bg-white/20 hover:bg-white/30 text-white'
                          : 'bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800'
                      }`}
                      title={`Dengarkan Audio Azan ${p.name}`}
                    >
                      <Headphones className="w-3 h-3" />
                      <span>Audio Azan</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Qibla Direction & Prayer Guidance Card */}
      <div className="bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 text-stone-700 dark:text-stone-300 text-xs space-y-3">
        <div className="flex items-center gap-2 font-semibold text-stone-900 dark:text-stone-100 text-sm">
          <Compass className="w-4 h-4 text-emerald-600" />
          <span>Arah Kiblat & Ketepatan Jam Sholat</span>
        </div>
        <p className="leading-relaxed">
          Di Indonesia, arah kiblat mengarah ke barat laut dengan azimut berkisar antara 290° hingga 295° searah jarum jam dari arah utara sejati (Ka'bah di Makkah Al-Mukarramah, koordinat 21.4225° N, 39.8262° E). Pastikan perangkat Anda terhubung dengan internet untuk sinkronisasi waktu sholat secara tepat waktu.
        </p>
      </div>

      {/* Adhan Audio Player Modal */}
      <AdhanAudioPlayerModal
        isOpen={isAdhanModalOpen}
        onClose={() => setIsAdhanModalOpen(false)}
        defaultTrackId={adhanModalTrackId}
        prayerNameContext={adhanModalPrayerContext}
      />
    </div>
  );
};
