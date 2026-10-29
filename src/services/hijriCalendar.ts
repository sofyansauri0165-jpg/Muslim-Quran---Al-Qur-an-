export interface HijriDate {
  day: number;
  month: number; // 1-12
  monthName: string;
  monthNameArabic: string;
  year: number;
  formatted: string;
}

export interface IslamicEvent {
  title: string;
  arabicTitle: string;
  hijriDay: number;
  hijriMonth: number;
  description: string;
  category: 'wajib' | 'sunnah' | 'peringatan' | 'larangan';
  fastingRecommended?: boolean;
  fastingForbidden?: boolean;
}

export const HIJRI_MONTHS = [
  { number: 1, name: 'Muharram', arabic: 'مُحَرَّم', days: 30 },
  { number: 2, name: 'Safar', arabic: 'صَفَر', days: 29 },
  { number: 3, name: "Rabi'ul Awwal", arabic: 'رَبِيعُ ٱلْأَوَّل', days: 30 },
  { number: 4, name: "Rabi'ul Akhir", arabic: 'رَبِيعُ ٱلْآخِر', days: 29 },
  { number: 5, name: 'Jumadil Ula', arabic: 'جُمَادَىٰ ٱلْأُولَىٰ', days: 30 },
  { number: 6, name: 'Jumadil Akhirah', arabic: 'جُمَادَىٰ ٱلْآخِرَة', days: 29 },
  { number: 7, name: 'Rajab', arabic: 'رَجَب', days: 30 },
  { number: 8, name: "Sya'ban", arabic: 'شَعْبَان', days: 29 },
  { number: 9, name: 'Ramadhan', arabic: 'رَمَضَان', days: 30 },
  { number: 10, name: 'Syawal', arabic: 'شَوَّال', days: 29 },
  { number: 11, name: "Dzulqa'dah", arabic: 'ذُو ٱلْقَعْدَة', days: 30 },
  { number: 12, name: 'Dzulhijjah', arabic: 'ذُو ٱلْحِجَّة', days: 29 }
];

export const ISLAMIC_EVENTS: IslamicEvent[] = [
  {
    title: 'Tahun Baru Islam (1 Muharram)',
    arabicTitle: 'رأس السنة الهجرية',
    hijriDay: 1,
    hijriMonth: 1,
    description: 'Awal tahun baru penanggalan Hijriah, memperingati peristiwa hijrah Rasulullah SAW dari Makkah ke Madinah.',
    category: 'peringatan'
  },
  {
    title: 'Puasa Tasu’a (9 Muharram)',
    arabicTitle: 'صوم تاسوعاء',
    hijriDay: 9,
    hijriMonth: 1,
    description: 'Puasa sunnah pengiring sebelum hari Asyura untuk membedakan dengan tradisi kaum Yahudi.',
    category: 'sunnah',
    fastingRecommended: true
  },
  {
    title: 'Hari Asyura (10 Muharram)',
    arabicTitle: 'يوم عاشوراء',
    hijriDay: 10,
    hijriMonth: 1,
    description: 'Puasa sunnah Asyura yang memiliki keutamaan menghapuskan dosa-dosa kecil setahun yang lalu.',
    category: 'sunnah',
    fastingRecommended: true
  },
  {
    title: 'Maulid Nabi Muhammad SAW (12 Rabi’ul Awwal)',
    arabicTitle: 'مولد النبي',
    hijriDay: 12,
    hijriMonth: 3,
    description: 'Peringatan kelahiran kekasih Allah Nabi Muhammad Shallallahu ‘Alaihi Wa Sallam, rahmatan lil ‘alamin.',
    category: 'peringatan'
  },
  {
    title: 'Isra Mi’raj (27 Rajab)',
    arabicTitle: 'الإسراء والمعراج',
    hijriDay: 27,
    hijriMonth: 7,
    description: 'Perjalanan malam Rasulullah SAW dari Masjidil Haram ke Masjidil Aqsa lalu ke Sidratul Muntaha menerima perintah Sholat 5 waktu.',
    category: 'peringatan'
  },
  {
    title: 'Malam Nisfu Sya’ban (15 Sya’ban)',
    arabicTitle: 'ليلة نصف شعبان',
    hijriDay: 15,
    hijriMonth: 8,
    description: 'Malam penuh ampunan dan rahmat Allah SWT, dianjurkan memperbanyak istighfar, doa, dan tilawah Al-Qur’an.',
    category: 'sunnah'
  },
  {
    title: 'Awal Puasa Ramadhan (1 Ramadhan)',
    arabicTitle: 'أول رمضان المبارك',
    hijriDay: 1,
    hijriMonth: 9,
    description: 'Bulan suci yang di dalamnya diwajibkan berpuasa, pintu-pintu surga dibuka, dan pintu neraka ditutup.',
    category: 'wajib',
    fastingRecommended: true
  },
  {
    title: 'Nuzulul Qur’an (17 Ramadhan)',
    arabicTitle: 'نزول القرآن',
    hijriDay: 17,
    hijriMonth: 9,
    description: 'Peringatan malam pertama kali diturunkannya wahyu Al-Qur’an kepada Nabi Muhammad SAW di Gua Hira.',
    category: 'peringatan'
  },
  {
    title: 'Malam Lailatul Qadr (10 Malam Terakhir)',
    arabicTitle: 'ليلة القدر',
    hijriDay: 27,
    hijriMonth: 9,
    description: 'Malam kemuliaan yang lebih baik daripada seribu bulan. Dianjurkan i’tikaf dan qiyamul lail.',
    category: 'sunnah'
  },
  {
    title: 'Hari Raya Idul Fitri (1 Syawal)',
    arabicTitle: 'عيد الفطر المبارك',
    hijriDay: 1,
    hijriMonth: 10,
    description: 'Hari kemenangan umat Islam setelah sebulan penuh berpuasa Ramadhan. Diharamkan berpuasa pada hari ini.',
    category: 'wajib',
    fastingForbidden: true
  },
  {
    title: 'Puasa Sunnah 6 Hari Syawal (2-30 Syawal)',
    arabicTitle: 'صيام ستة من شوال',
    hijriDay: 2,
    hijriMonth: 10,
    description: 'Berpuasa 6 hari di bulan Syawal pahalanya setara dengan berpuasa sepanjang tahun penuh.',
    category: 'sunnah',
    fastingRecommended: true
  },
  {
    title: 'Hari Tarwiyah (8 Dzulhijjah)',
    arabicTitle: 'يوم التروية',
    hijriDay: 8,
    hijriMonth: 12,
    description: 'Hari persiapan jamaah haji menuju Mina. Dianjurkan puasa sunnah bagi yang tidak sedang berhaji.',
    category: 'sunnah',
    fastingRecommended: true
  },
  {
    title: 'Hari Arafah & Puasa Arafah (9 Dzulhijjah)',
    arabicTitle: 'يوم عرفة',
    hijriDay: 9,
    hijriMonth: 12,
    description: 'Puncak ibadah haji (wukuf di Padang Arafah). Puasa Arafah menghapus dosa 1 tahun lalu dan 1 tahun yang akan datang.',
    category: 'sunnah',
    fastingRecommended: true
  },
  {
    title: 'Hari Raya Idul Adha (10 Dzulhijjah)',
    arabicTitle: 'عيد الأضحى المبارك',
    hijriDay: 10,
    hijriMonth: 12,
    description: 'Hari Raya Kurban mengenang keteladanan Nabi Ibrahim AS & Nabi Ismail AS. Diharamkan berpuasa.',
    category: 'wajib',
    fastingForbidden: true
  },
  {
    title: 'Hari Tasyrik ke-1 (11 Dzulhijjah)',
    arabicTitle: 'أيام التشريق الأول',
    hijriDay: 11,
    hijriMonth: 12,
    description: 'Hari makan, minum, dan berdzikir mengingat Allah SWT. Diharamkan berpuasa.',
    category: 'larangan',
    fastingForbidden: true
  },
  {
    title: 'Hari Tasyrik ke-2 (12 Dzulhijjah)',
    arabicTitle: 'أيام التشريق الثاني',
    hijriDay: 12,
    hijriMonth: 12,
    description: 'Hari Tasyrik kedua, penyembelihan hewan kurban masih berlangsung. Diharamkan berpuasa.',
    category: 'larangan',
    fastingForbidden: true
  },
  {
    title: 'Hari Tasyrik ke-3 (13 Dzulhijjah)',
    arabicTitle: 'أيام التشريق الثالث',
    hijriDay: 13,
    hijriMonth: 12,
    description: 'Hari terakhir Tasyrik dan batas akhir penyembelihan kurban hingga terbenam matahari. Diharamkan berpuasa.',
    category: 'larangan',
    fastingForbidden: true
  }
];

export interface FastingGuide {
  name: string;
  arabicName: string;
  latinIntention: string;
  arabicIntention: string;
  translation: string;
  virtue: string;
  days: string;
}

export const FASTING_GUIDES: FastingGuide[] = [
  {
    name: 'Puasa Sunnah Senin & Kamis',
    arabicName: 'صوم الإثنين والخميس',
    arabicIntention: 'نَوَيْتُ صَوْمَ يَوْمِ الِاثْنَيْنِ سُنَّةً لِلّٰهِ تَعَالَى',
    latinIntention: "Nawaitu shauma yaumil itsnaini sunnatan lillaahi ta'aala.",
    translation: 'Saya berniat puasa sunnah hari Senin karena Allah Ta’ala. (Untuk hari Kamis ganti dengan: yaumil khamiisi)',
    virtue: 'Hari di mana amal perbuatan diangkat dan diperiksa di hadapan Allah SWT, serta hari kelahiran dan turunnya wahyu kepada Nabi Muhammad SAW.',
    days: 'Setiap hari Senin & Kamis sepanjang tahun (kecuali 2 hari raya & hari Tasyrik).'
  },
  {
    name: 'Puasa Ayyamul Bidh (Hari Putih)',
    arabicName: 'صوم أيام البيض',
    arabicIntention: 'نَوَيْتُ صَوْمَ أَيَّامِ الْبِيْضِ سُنَّةً لِلّٰهِ تَعَالَى',
    latinIntention: "Nawaitu shauma ayyaamil biidhi sunnatan lillaahi ta'aala.",
    translation: 'Saya berniat puasa sunnah Ayyamul Bidh (hari-hari putih) karena Allah Ta’ala.',
    virtue: 'Rasulullah SAW bersabda bahwa berpuasa 3 hari setiap bulan (tanggal 13, 14, 15) pahalanya seperti berpuasa sepanjang tahun penuh.',
    days: 'Tanggal 13, 14, dan 15 setiap bulan Hijriah.'
  },
  {
    name: 'Puasa Sunnah Asyura & Tasu’a',
    arabicName: 'صوم عاشوراء وتاسوعاء',
    arabicIntention: 'نَوَيْتُ صَوْمَ عَاشُورَاءَ سُنَّةً لِلّٰهِ تَعَالَى',
    latinIntention: "Nawaitu shauma 'aasyuuraa-a sunnatan lillaahi ta'aala.",
    translation: 'Saya berniat puasa sunnah Asyura karena Allah Ta’ala.',
    virtue: 'Menghapuskan dosa-dosa kecil selama setahun yang telah lalu (HR. Muslim).',
    days: 'Tanggal 9 (Tasu’a) dan 10 (Asyura) bulan Muharram.'
  },
  {
    name: 'Puasa Sunnah Arafah',
    arabicName: 'صوم عرفة',
    arabicIntention: 'نَوَيْتُ صَوْمَ عَرَفَةَ سُنَّةً لِلّٰهِ تَعَالَى',
    latinIntention: "Nawaitu shauma 'arafata sunnatan lillaahi ta'aala.",
    translation: 'Saya berniat puasa sunnah Arafah karena Allah Ta’ala.',
    virtue: 'Menghapus dosa setahun yang lalu dan setahun yang akan datang (HR. Muslim). Sangat dianjurkan bagi umat muslim yang tidak sedang menunaikan ibadah haji.',
    days: 'Tanggal 9 Dzulhijjah.'
  }
];

/**
 * Converts a Gregorian Date to Hijri Date
 * Uses the browser's Intl API with 'islamic-umalqura' calendar and fallback algorithm
 */
export function getHijriDate(date: Date, dayAdjustment: number = 0): HijriDate {
  const adjustedDate = new Date(date);
  if (dayAdjustment !== 0) {
    adjustedDate.setDate(adjustedDate.getDate() + dayAdjustment);
  }

  try {
    const formatter = new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });

    const parts = formatter.formatToParts(adjustedDate);
    let day = 1;
    let month = 1;
    let year = 1447;

    for (const part of parts) {
      if (part.type === 'day') day = parseInt(part.value, 10);
      if (part.type === 'month') month = parseInt(part.value, 10);
      if (part.type === 'year') {
        const parsedYear = parseInt(part.value.replace(/\D/g, ''), 10);
        if (!isNaN(parsedYear)) year = parsedYear;
      }
    }

    // Ensure month is within 1-12
    if (month < 1 || month > 12) month = 1;
    const monthObj = HIJRI_MONTHS[month - 1] || HIJRI_MONTHS[0];

    return {
      day,
      month,
      monthName: monthObj.name,
      monthNameArabic: monthObj.arabic,
      year,
      formatted: `${day} ${monthObj.name} ${year} H`
    };
  } catch {
    // Algorithmic Kuwati fallback if Intl islamic calendar is unavailable
    return kuwaitiAlgorithm(adjustedDate);
  }
}

/**
 * Standard Astronomical algorithm fallback
 */
function kuwaitiAlgorithm(date: Date): HijriDate {
  let day = date.getDate();
  let month = date.getMonth(); // 0-11
  let year = date.getFullYear();

  let m = month + 1;
  let y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  let a = Math.floor(y / 100);
  let b = 2 - a + Math.floor(a / 4);
  if (y < 1583) b = 0;
  if (y === 1582) {
    if (m > 10) b = -10;
    if (m === 10) {
      b = 0;
      if (day > 4) b = -10;
    }
  }

  let jd =
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    b -
    1524;

  b = 0;
  if (jd > 2299160) {
    a = Math.floor((jd - 1867216.25) / 36524.25);
    b = 1 + a - Math.floor(a / 4);
  }
  let bb = jd + b + 1524;
  let cc = Math.floor((bb - 122.1) / 365.25);
  let dd = Math.floor(365.25 * cc);
  let ee = Math.floor((bb - dd) / 30.6001);

  let z = jd - 1948440 + 10632;
  let n = Math.floor((z - 1) / 10631);
  z = z - 10631 * n + 354;
  let j =
    Math.floor((10985 - z) / 5316) * Math.floor((50 * z) / 17719) +
    Math.floor(z / 5670) * Math.floor((43 * z) / 15238);
  z =
    z -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  let hMonth = Math.floor((24 * z) / 709);
  let hDay = z - Math.floor((709 * hMonth) / 24);
  let hYear = 30 * n + j - 30;

  if (hMonth < 1) hMonth = 1;
  if (hMonth > 12) hMonth = 12;

  const monthObj = HIJRI_MONTHS[hMonth - 1] || HIJRI_MONTHS[0];

  return {
    day: hDay,
    month: hMonth,
    monthName: monthObj.name,
    monthNameArabic: monthObj.arabic,
    year: hYear,
    formatted: `${hDay} ${monthObj.name} ${hYear} H`
  };
}

/**
 * Check if a date has any special Islamic event
 */
export function getEventsForHijriDate(hDay: number, hMonth: number): IslamicEvent[] {
  return ISLAMIC_EVENTS.filter((e) => e.hijriDay === hDay && e.hijriMonth === hMonth);
}
