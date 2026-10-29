import { PrayerTimes } from '../types/quran';

export interface CityOption {
  id: string;
  name: string;
  province: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const INDONESIAN_CITIES: CityOption[] = [
  { id: 'jakarta', name: 'DKI Jakarta', province: 'DKI Jakarta', country: 'Indonesia', latitude: -6.2088, longitude: 106.8456 },
  { id: 'surabaya', name: 'Surabaya', province: 'Jawa Timur', country: 'Indonesia', latitude: -7.2575, longitude: 112.7521 },
  { id: 'bandung', name: 'Bandung', province: 'Jawa Barat', country: 'Indonesia', latitude: -6.9175, longitude: 107.6191 },
  { id: 'medan', name: 'Medan', province: 'Sumatera Utara', country: 'Indonesia', latitude: 3.5952, longitude: 98.6722 },
  { id: 'semarang', name: 'Semarang', province: 'Jawa Tengah', country: 'Indonesia', latitude: -6.9667, longitude: 110.4167 },
  { id: 'makassar', name: 'Makassar', province: 'Sulawesi Selatan', country: 'Indonesia', latitude: -5.1477, longitude: 119.4327 },
  { id: 'yogyakarta', name: 'Yogyakarta', province: 'D.I. Yogyakarta', country: 'Indonesia', latitude: -7.7956, longitude: 110.3695 },
  { id: 'palembang', name: 'Palembang', province: 'Sumatera Selatan', country: 'Indonesia', latitude: -2.9761, longitude: 104.7754 },
  { id: 'banda-aceh', name: 'Banda Aceh', province: 'Aceh', country: 'Indonesia', latitude: 5.5483, longitude: 95.3238 },
  { id: 'denpasar', name: 'Denpasar', province: 'Bali', country: 'Indonesia', latitude: -8.6705, longitude: 115.2126 },
  { id: 'balikpapan', name: 'Balikpapan', province: 'Kalimantan Timur', country: 'Indonesia', latitude: -1.2379, longitude: 116.8289 },
  { id: 'padang', name: 'Padang', province: 'Sumatera Barat', country: 'Indonesia', latitude: -0.9471, longitude: 100.4172 },
  { id: 'banjarmasin', name: 'Banjarmasin', province: 'Kalimantan Selatan', country: 'Indonesia', latitude: -3.3167, longitude: 114.5901 }
];

// Fallback timings in case of offline
const FALLBACK_PRAYER_TIMES: PrayerTimes = {
  Fajr: '04:15',
  Sunrise: '05:30',
  Dhuhr: '11:45',
  Asr: '15:00',
  Maghrib: '17:50',
  Isha: '19:00',
  Imsak: '04:05',
  date: 'Kamis, 29 Oktober',
  hijri: '17 Jumadil Ula 1448 H'
};

export async function fetchPrayerTimesForCity(city: CityOption): Promise<PrayerTimes> {
  const today = new Date();
  const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const cacheKey = `mq_prayer_${city.id}_${dateStr}`;

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // ignore
  }

  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city.name)}&country=${encodeURIComponent(city.country)}&method=11`
    );
    if (!res.ok) throw new Error('Prayer API response not ok');
    const data = await res.json();
    if (data && data.data && data.data.timings) {
      const timings = data.data.timings;
      const hijriData = data.data.date?.hijri;
      const hijriStr = hijriData
        ? `${hijriData.day} ${hijriData.month?.en || ''} ${hijriData.year} H`
        : undefined;

      const result: PrayerTimes = {
        Fajr: cleanTime(timings.Fajr),
        Sunrise: cleanTime(timings.Sunrise),
        Dhuhr: cleanTime(timings.Dhuhr),
        Asr: cleanTime(timings.Asr),
        Maghrib: cleanTime(timings.Maghrib),
        Isha: cleanTime(timings.Isha),
        Imsak: cleanTime(timings.Imsak || timings.Fajr),
        date: data.data.date?.readable,
        hijri: hijriStr
      };

      try {
        localStorage.setItem(cacheKey, JSON.stringify(result));
      } catch {
        // ignore
      }

      return result;
    }
  } catch (err) {
    console.warn('Failed to load prayer times from API, calculating fallback:', err);
  }

  return FALLBACK_PRAYER_TIMES;
}

export async function fetchPrayerTimesByCoords(lat: number, lng: number): Promise<PrayerTimes> {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=11`
    );
    if (!res.ok) throw new Error('Coords prayer response not ok');
    const data = await res.json();
    if (data && data.data && data.data.timings) {
      const timings = data.data.timings;
      const hijriData = data.data.date?.hijri;
      const hijriStr = hijriData
        ? `${hijriData.day} ${hijriData.month?.en || ''} ${hijriData.year} H`
        : undefined;

      return {
        Fajr: cleanTime(timings.Fajr),
        Sunrise: cleanTime(timings.Sunrise),
        Dhuhr: cleanTime(timings.Dhuhr),
        Asr: cleanTime(timings.Asr),
        Maghrib: cleanTime(timings.Maghrib),
        Isha: cleanTime(timings.Isha),
        Imsak: cleanTime(timings.Imsak || timings.Fajr),
        date: data.data.date?.readable,
        hijri: hijriStr
      };
    }
  } catch (err) {
    console.warn('Coordinates prayer lookup failed:', err);
  }

  return FALLBACK_PRAYER_TIMES;
}

function cleanTime(timeString?: string): string {
  if (!timeString) return '--:--';
  // extracts "04:15" from "04:15 (WIB)" or "04:15"
  const match = timeString.match(/(\d{1,2}:\d{2})/);
  return match ? match[1] : timeString;
}

export function getNextPrayer(timings: PrayerTimes): {
  name: string;
  time: string;
  diffMinutes: number;
  formattedCountdown: string;
} {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'Subuh', time: timings.Fajr },
    { name: 'Dzuhur', time: timings.Dhuhr },
    { name: 'Ashar', time: timings.Asr },
    { name: 'Maghrib', time: timings.Maghrib },
    { name: 'Isya', time: timings.Isha }
  ];

  for (const p of prayers) {
    const [h, m] = p.time.split(':').map(Number);
    if (!isNaN(h) && !isNaN(m)) {
      const prayerMinutes = h * 60 + m;
      if (prayerMinutes > currentMinutes) {
        const diff = prayerMinutes - currentMinutes;
        const hours = Math.floor(diff / 60);
        const mins = diff % 60;
        return {
          name: p.name,
          time: p.time,
          diffMinutes: diff,
          formattedCountdown: hours > 0 ? `${hours} jam ${mins} menit` : `${mins} menit`
        };
      }
    }
  }

  // If passed Isha, next is tomorrow's Subuh
  const [fajrH, fajrM] = timings.Fajr.split(':').map(Number);
  const tomorrowFajrMinutes = 24 * 60 - currentMinutes + fajrH * 60 + fajrM;
  const hours = Math.floor(tomorrowFajrMinutes / 60);
  const mins = tomorrowFajrMinutes % 60;

  return {
    name: 'Subuh (Besok)',
    time: timings.Fajr,
    diffMinutes: tomorrowFajrMinutes,
    formattedCountdown: hours > 0 ? `${hours} jam ${mins} menit` : `${mins} menit`
  };
}
