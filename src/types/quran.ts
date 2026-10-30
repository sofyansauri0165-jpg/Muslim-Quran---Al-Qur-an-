export interface SurahSummary {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull?: Record<string, string>;
}

export interface Ayah {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: Record<string, string>;
}

export interface SurahDetail extends SurahSummary {
  ayat: Ayah[];
  suratSelanjutnya?: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
  } | false;
  suratSebelumnya?: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
  } | false;
}

export interface TafsirAyat {
  ayat: number;
  teks: string;
}

export interface TafsirDetail extends SurahSummary {
  tafsir: TafsirAyat[];
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  ayahArabic: string;
  ayahTranslation: string;
  timestamp: number;
}

export interface LastRead {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
}

export interface Reciter {
  id: string;
  name: string;
  arabicName?: string;
}

export const RECITERS: Reciter[] = [
  { id: '05', name: 'Misyari Rasyid Al-Afasy', arabicName: 'مشاري راشد العفاسي' },
  { id: '03', name: 'Abdurrahman As-Sudais', arabicName: 'عبد الرحمن السديس' },
  { id: '01', name: 'Abdullah Al-Juhany', arabicName: 'عبد الله الجهني' },
  { id: '02', name: 'Abdul Muhsin Al-Qasim', arabicName: 'عبد المحسن القاسم' },
  { id: '04', name: 'Ibrahim Al-Dossari', arabicName: 'إبراهيم الدوسري' },
  { id: '06', name: 'Yasser Al-Dosari', arabicName: 'ياسر الدوسري' },
];

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak?: string;
  date?: string;
  hijri?: string;
}

export interface AsmaulHusnaItem {
  urutan: number;
  latin: string;
  arab: string;
  arti: string;
  keterangan: string;
}

export interface DailyDoaItem {
  id: string;
  title: string;
  category: string;
  arabic: string;
  latin: string;
  translation: string;
  source?: string;
}

export type AppTab = 'home' | 'quran' | 'sholat' | 'tajwid' | 'kiblat' | 'kalender' | 'doa' | 'asmaul' | 'tasbih';
