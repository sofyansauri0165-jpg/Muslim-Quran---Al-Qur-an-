export interface JuzInfo {
  juzNumber: number;
  nameArabic: string;
  nameLatin: string;
  startSurahNumber: number;
  startSurahName: string;
  startAyahNumber: number;
  endSurahNumber: number;
  endSurahName: string;
  endAyahNumber: number;
  totalVerses: number;
  description: string;
  surahsInJuz: {
    surahNumber: number;
    surahName: string;
    arabicName: string;
    ayahRange: string;
  }[];
}

export const QURAN_JUZ_LIST: JuzInfo[] = [
  {
    juzNumber: 1,
    nameArabic: 'آلم',
    nameLatin: 'Alif Lam Mim',
    startSurahNumber: 1,
    startSurahName: 'Al-Fatihah',
    startAyahNumber: 1,
    endSurahNumber: 2,
    endSurahName: 'Al-Baqarah',
    endAyahNumber: 141,
    totalVerses: 148,
    description: 'Diawali surat pembuka Al-Fatihah dan permulaan Al-Baqarah tentang petunjuk bagi orang bertakwa, kisah penciptaan Nabi Adam AS, dan Bani Israil.',
    surahsInJuz: [
      { surahNumber: 1, surahName: 'Al-Fatihah', arabicName: 'الفاتحة', ayahRange: 'Ayat 1 - 7' },
      { surahNumber: 2, surahName: 'Al-Baqarah', arabicName: 'البقرة', ayahRange: 'Ayat 1 - 141' }
    ]
  },
  {
    juzNumber: 2,
    nameArabic: 'سَيَقُولُ',
    nameLatin: 'Sayaqūl',
    startSurahNumber: 2,
    startSurahName: 'Al-Baqarah',
    startAyahNumber: 142,
    endSurahNumber: 2,
    endSurahName: 'Al-Baqarah',
    endAyahNumber: 252,
    totalVerses: 111,
    description: 'Memuat hukum pemindahan kiblat ke Ka\'bah di Masjidil Haram, puasa Ramadhan, perang, haji, dan hukum qishash.',
    surahsInJuz: [
      { surahNumber: 2, surahName: 'Al-Baqarah', arabicName: 'البقرة', ayahRange: 'Ayat 142 - 252' }
    ]
  },
  {
    juzNumber: 3,
    nameArabic: 'تِلْكَ الرُّسُلُ',
    nameLatin: 'Tilkar-Rusul',
    startSurahNumber: 2,
    startSurahName: 'Al-Baqarah',
    startAyahNumber: 253,
    endSurahNumber: 3,
    endSurahName: "Ali 'Imran",
    endAyahNumber: 92,
    totalVerses: 126,
    description: 'Memuat Ayat Kursi yang agung, hukum sedekah dan larangan riba, serta permulaan surat Ali \'Imran tentang keluarga Imran dan Maryam.',
    surahsInJuz: [
      { surahNumber: 2, surahName: 'Al-Baqarah', arabicName: 'البقرة', ayahRange: 'Ayat 253 - 286' },
      { surahNumber: 3, surahName: "Ali 'Imran", arabicName: 'آل عمران', ayahRange: 'Ayat 1 - 92' }
    ]
  },
  {
    juzNumber: 4,
    nameArabic: 'لَنْ تَنَالُوا',
    nameLatin: 'Lan Tanālū',
    startSurahNumber: 3,
    startSurahName: "Ali 'Imran",
    startAyahNumber: 93,
    endSurahNumber: 4,
    endSurahName: "An-Nisa'",
    endAyahNumber: 23,
    totalVerses: 131,
    description: 'Kelanjutan Ali \'Imran mengenai Perang Uhud dan permulaan An-Nisa\' tentang hak anak yatim, warisan, dan hukum pernikahan.',
    surahsInJuz: [
      { surahNumber: 3, surahName: "Ali 'Imran", arabicName: 'آل عمران', ayahRange: 'Ayat 93 - 200' },
      { surahNumber: 4, surahName: "An-Nisa'", arabicName: 'النساء', ayahRange: 'Ayat 1 - 23' }
    ]
  },
  {
    juzNumber: 5,
    nameArabic: 'وَالْمُحْصَنَاتُ',
    nameLatin: "Wal-Muhsanāt",
    startSurahNumber: 4,
    startSurahName: "An-Nisa'",
    startAyahNumber: 24,
    endSurahNumber: 4,
    endSurahName: "An-Nisa'",
    endAyahNumber: 147,
    totalVerses: 124,
    description: 'Hukum wanita yang diharamkan untuk dinikahi, tata krama keluarga, ketaatan pada ulil amri, dan hukum jihad fii sabilillah.',
    surahsInJuz: [
      { surahNumber: 4, surahName: "An-Nisa'", arabicName: 'النساء', ayahRange: 'Ayat 24 - 147' }
    ]
  },
  {
    juzNumber: 6,
    nameArabic: 'لَا يُحِبُّ اللّٰهُ',
    nameLatin: 'Lā Yuhibbullāh',
    startSurahNumber: 4,
    startSurahName: "An-Nisa'",
    startAyahNumber: 148,
    endSurahNumber: 5,
    endSurahName: "Al-Ma'idah",
    endAyahNumber: 81,
    totalVerses: 110,
    description: 'Larangan berkata buruk secara terang-terangan kecuali terzalimi, kemunafikan, dan permulaan surat Al-Ma\'idah mengenai makanan halal dan wudhu.',
    surahsInJuz: [
      { surahNumber: 4, surahName: "An-Nisa'", arabicName: 'النساء', ayahRange: 'Ayat 148 - 176' },
      { surahNumber: 5, surahName: "Al-Ma'idah", arabicName: 'المائدة', ayahRange: 'Ayat 1 - 81' }
    ]
  },
  {
    juzNumber: 7,
    nameArabic: 'وَإِذَا سَمِعُوا',
    nameLatin: "Wa Idzā Sami'ū",
    startSurahNumber: 5,
    startSurahName: "Al-Ma'idah",
    startAyahNumber: 82,
    endSurahNumber: 6,
    endSurahName: "Al-An'am",
    endAyahNumber: 110,
    totalVerses: 149,
    description: 'Kesaksian ahli kitab terhadap kebenaran Al-Qur\'an, larangan khamr dan judi, serta tauhid murni dalam surat Al-An\'am.',
    surahsInJuz: [
      { surahNumber: 5, surahName: "Al-Ma'idah", arabicName: 'المائدة', ayahRange: 'Ayat 82 - 120' },
      { surahNumber: 6, surahName: "Al-An'am", arabicName: 'الأنعام', ayahRange: 'Ayat 1 - 110' }
    ]
  },
  {
    juzNumber: 8,
    nameArabic: 'وَلَوْ أَنَّنَا',
    nameLatin: 'Walau Annanā',
    startSurahNumber: 6,
    startSurahName: "Al-An'am",
    startAyahNumber: 111,
    endSurahNumber: 7,
    endSurahName: "Al-A'raf",
    endAyahNumber: 87,
    totalVerses: 142,
    description: 'Bukti-bukti kebesaran Allah di alam semesta, penciptaan manusia, iblis dan godaannya, serta kisah para Nabi terdahulu di surat Al-A\'raf.',
    surahsInJuz: [
      { surahNumber: 6, surahName: "Al-An'am", arabicName: 'الأنعام', ayahRange: 'Ayat 111 - 165' },
      { surahNumber: 7, surahName: "Al-A'raf", arabicName: 'الأعراف', ayahRange: 'Ayat 1 - 87' }
    ]
  },
  {
    juzNumber: 9,
    nameArabic: 'قَالَ الْمَلَأُ',
    nameLatin: "Qālal-Mala'u",
    startSurahNumber: 7,
    startSurahName: "Al-A'raf",
    startAyahNumber: 88,
    endSurahNumber: 8,
    endSurahName: 'Al-Anfal',
    endAyahNumber: 40,
    totalVerses: 159,
    description: 'Kisah Nabi Syu\'aib, Nabi Musa dengan Fir\'aun, perjanjian bani Adam, dan permulaan hukum perang dan harta rampasan perang dalam Al-Anfal.',
    surahsInJuz: [
      { surahNumber: 7, surahName: "Al-A'raf", arabicName: 'الأعراف', ayahRange: 'Ayat 88 - 206' },
      { surahNumber: 8, surahName: 'Al-Anfal', arabicName: 'الأنفال', ayahRange: 'Ayat 1 - 40' }
    ]
  },
  {
    juzNumber: 10,
    nameArabic: 'وَاعْلَمُوا',
    nameLatin: "Wa'lamū",
    startSurahNumber: 8,
    startSurahName: 'Al-Anfal',
    startAyahNumber: 41,
    endSurahNumber: 9,
    endSurahName: 'At-Taubah',
    endAyahNumber: 92,
    totalVerses: 127,
    description: 'Pembagian ghanimah, pertolongan malaikat pada Perang Badar, dan surat At-Taubah tentang kaum musyrikin dan zakat fitrah.',
    surahsInJuz: [
      { surahNumber: 8, surahName: 'Al-Anfal', arabicName: 'الأنفال', ayahRange: 'Ayat 41 - 75' },
      { surahNumber: 9, surahName: 'At-Taubah', arabicName: 'التوبة', ayahRange: 'Ayat 1 - 92' }
    ]
  },
  {
    juzNumber: 11,
    nameArabic: 'يَعْتَذِرُونَ',
    nameLatin: "Ya'tazirūn",
    startSurahNumber: 9,
    startSurahName: 'At-Taubah',
    startAyahNumber: 93,
    endSurahNumber: 11,
    endSurahName: 'Hud',
    endAyahNumber: 5,
    totalVerses: 151,
    description: 'Sikap orang munafik saat Perang Tabuk, tobat tiga sahabat, kemuliaan surat Yunus, dan permulaan kisah kaum \'Ad dan Tsamud di surat Hud.',
    surahsInJuz: [
      { surahNumber: 9, surahName: 'At-Taubah', arabicName: 'التوبة', ayahRange: 'Ayat 93 - 129' },
      { surahNumber: 10, surahName: 'Yunus', arabicName: 'يونس', ayahRange: 'Ayat 1 - 109' },
      { surahNumber: 11, surahName: 'Hud', arabicName: 'هود', ayahRange: 'Ayat 1 - 5' }
    ]
  },
  {
    juzNumber: 12,
    nameArabic: 'وَمَا مِنْ دَابَّةٍ',
    nameLatin: 'Wa Mā Min Dābbatin',
    startSurahNumber: 11,
    startSurahName: 'Hud',
    startAyahNumber: 6,
    endSurahNumber: 12,
    endSurahName: 'Yusuf',
    endAyahNumber: 52,
    totalVerses: 170,
    description: 'Jaminan rezeki seluruh makhluk melata, kisah Nabi Nuh dan bahtera, Nabi Hud, Nabi Saleh, serta awal kisah terindah (Ahsanul Qashash) Nabi Yusuf AS.',
    surahsInJuz: [
      { surahNumber: 11, surahName: 'Hud', arabicName: 'هود', ayahRange: 'Ayat 6 - 123' },
      { surahNumber: 12, surahName: 'Yusuf', arabicName: 'يوسف', ayahRange: 'Ayat 1 - 52' }
    ]
  },
  {
    juzNumber: 13,
    nameArabic: 'وَمَا أُبَرِّئُ',
    nameLatin: "Wa Mā Ubarri'u",
    startSurahNumber: 12,
    startSurahName: 'Yusuf',
    startAyahNumber: 53,
    endSurahNumber: 14,
    endSurahName: 'Ibrahim',
    endAyahNumber: 52,
    totalVerses: 155,
    description: 'Kelanjutan Nabi Yusuf di istana Mesir hingga bertemu kembali saudaranya, surat Ar-Ra\'d (guruh yang bertasbih), dan doa-doa mulia Nabi Ibrahim AS.',
    surahsInJuz: [
      { surahNumber: 12, surahName: 'Yusuf', arabicName: 'يوسف', ayahRange: 'Ayat 53 - 111' },
      { surahNumber: 13, surahName: "Ar-Ra'd", arabicName: 'الرعد', ayahRange: 'Ayat 1 - 43' },
      { surahNumber: 14, surahName: 'Ibrahim', arabicName: 'إبراهيم', ayahRange: 'Ayat 1 - 52' }
    ]
  },
  {
    juzNumber: 14,
    nameArabic: 'رُبَمَا',
    nameLatin: 'Rubamā',
    startSurahNumber: 15,
    startSurahName: 'Al-Hijr',
    startAyahNumber: 1,
    endSurahNumber: 16,
    endSurahName: 'An-Nahl',
    endAyahNumber: 128,
    totalVerses: 227,
    description: 'Jaminan pemeliharaan Al-Qur\'an dari perubahan, penciptaan manusia dari tanah liat, dan surat An-Nahl yang merinci kenikmatan-kenikmatan Allah.',
    surahsInJuz: [
      { surahNumber: 15, surahName: 'Al-Hijr', arabicName: 'الحجر', ayahRange: 'Ayat 1 - 99' },
      { surahNumber: 16, surahName: 'An-Nahl', arabicName: 'النحل', ayahRange: 'Ayat 1 - 128' }
    ]
  },
  {
    juzNumber: 15,
    nameArabic: 'سُبْحَانَ الَّذِي',
    nameLatin: 'Subhānal-Ladzī',
    startSurahNumber: 17,
    startSurahName: "Al-Isra'",
    startAyahNumber: 1,
    endSurahNumber: 18,
    endSurahName: 'Al-Kahf',
    endAyahNumber: 74,
    totalVerses: 185,
    description: 'Peristiwa agung Isra\' Mi\'raj Nabi Muhammad SAW, adab berbakti kepada orang tua, dan kisah Ashabul Kahfi yang tidur 309 tahun di dalam gua.',
    surahsInJuz: [
      { surahNumber: 17, surahName: "Al-Isra'", arabicName: 'الإسراء', ayahRange: 'Ayat 1 - 111' },
      { surahNumber: 18, surahName: 'Al-Kahf', arabicName: 'الكهف', ayahRange: 'Ayat 1 - 74' }
    ]
  },
  {
    juzNumber: 16,
    nameArabic: 'قَالَ أَلَمْ',
    nameLatin: 'Qāla Alam',
    startSurahNumber: 18,
    startSurahName: 'Al-Kahf',
    startAyahNumber: 75,
    endSurahNumber: 20,
    endSurahName: 'Ta Ha',
    endAyahNumber: 135,
    totalVerses: 269,
    description: 'Kisah Nabi Musa dan Nabi Khidir, Dzulqarnain dan Ya\'juj Ma\'juj, kelahiran mukjizat Nabi Isa AS dalam surat Maryam, dan dakwah Nabi Musa di surat Ta Ha.',
    surahsInJuz: [
      { surahNumber: 18, surahName: 'Al-Kahf', arabicName: 'الكهف', ayahRange: 'Ayat 75 - 110' },
      { surahNumber: 19, surahName: 'Maryam', arabicName: 'مريم', ayahRange: 'Ayat 1 - 98' },
      { surahNumber: 20, surahName: 'Ta Ha', arabicName: 'طه', ayahRange: 'Ayat 1 - 135' }
    ]
  },
  {
    juzNumber: 17,
    nameArabic: 'اقْتَرَبَ لِلنَّاسِ',
    nameLatin: 'Iqtaraba Lin-Nās',
    startSurahNumber: 21,
    startSurahName: 'Al-Anbiya\'',
    startAyahNumber: 1,
    endSurahNumber: 22,
    endSurahName: 'Al-Hajj',
    endAyahNumber: 78,
    totalVerses: 190,
    description: 'Peringatan hari perhitungan hisab yang kian mendekat, kisah kesabaran para nabi, serta panggilan ibadah Haji dan pengorbanan kurban di tanah suci.',
    surahsInJuz: [
      { surahNumber: 21, surahName: 'Al-Anbiya\'', arabicName: 'الأنبياء', ayahRange: 'Ayat 1 - 112' },
      { surahNumber: 22, surahName: 'Al-Hajj', arabicName: 'الحج', ayahRange: 'Ayat 1 - 78' }
    ]
  },
  {
    juzNumber: 18,
    nameArabic: 'قَدْ أَفْلَحَ',
    nameLatin: 'Qad Aflaha',
    startSurahNumber: 23,
    startSurahName: 'Al-Mu\'minun',
    startAyahNumber: 1,
    endSurahNumber: 25,
    endSurahName: 'Al-Furqan',
    endAyahNumber: 20,
    totalVerses: 202,
    description: 'Ciri-ciri orang mukmin yang beruntung, hukum menjaga kehormatan dan adab hijab dalam surat An-Nur, dan Ayat Cahaya (Ayatun Nur).',
    surahsInJuz: [
      { surahNumber: 23, surahName: 'Al-Mu\'minun', arabicName: 'المؤمنون', ayahRange: 'Ayat 1 - 118' },
      { surahNumber: 24, surahName: 'An-Nur', arabicName: 'النور', ayahRange: 'Ayat 1 - 64' },
      { surahNumber: 25, surahName: 'Al-Furqan', arabicName: 'الفرقان', ayahRange: 'Ayat 1 - 20' }
    ]
  },
  {
    juzNumber: 19,
    nameArabic: 'وَقَالَ الَّذِينَ',
    nameLatin: 'Wa Qālal-Ladzīna',
    startSurahNumber: 25,
    startSurahName: 'Al-Furqan',
    startAyahNumber: 21,
    endSurahNumber: 27,
    endSurahName: 'An-Naml',
    endAyahNumber: 55,
    totalVerses: 339,
    description: 'Sifat mulia \'Ibadurrahman (hamba-hamba Allah Yang Maha Pengasih), keajaiban susunan kata dalam Asy-Syu\'ara\', dan kisah Nabi Sulaiman dengan Ratu Bilqis.',
    surahsInJuz: [
      { surahNumber: 25, surahName: 'Al-Furqan', arabicName: 'الفرقان', ayahRange: 'Ayat 21 - 77' },
      { surahNumber: 26, surahName: 'Asy-Syu\'ara\'', arabicName: 'الشعراء', ayahRange: 'Ayat 1 - 227' },
      { surahNumber: 27, surahName: 'An-Naml', arabicName: 'النمل', ayahRange: 'Ayat 1 - 55' }
    ]
  },
  {
    juzNumber: 20,
    nameArabic: 'أَمَّنْ خَلَقَ',
    nameLatin: 'Amman Khalaqa',
    startSurahNumber: 27,
    startSurahName: 'An-Naml',
    startAyahNumber: 56,
    endSurahNumber: 29,
    endSurahName: 'Al-\'Ankabut',
    endAyahNumber: 45,
    totalVerses: 171,
    description: 'Pertanyaan retoris tentang pencipta langit dan bumi, kisah masa kecil Nabi Musa hingga diutus kembali ke Fir\'aun dalam Al-Qashash, dan ujian keimanan di Al-\'Ankabut.',
    surahsInJuz: [
      { surahNumber: 27, surahName: 'An-Naml', arabicName: 'النمل', ayahRange: 'Ayat 56 - 93' },
      { surahNumber: 28, surahName: 'Al-Qashas', arabicName: 'القصص', ayahRange: 'Ayat 1 - 88' },
      { surahNumber: 29, surahName: 'Al-\'Ankabut', arabicName: 'العنكبوت', ayahRange: 'Ayat 1 - 45' }
    ]
  },
  {
    juzNumber: 21,
    nameArabic: 'اتْلُ مَا أُوحِيَ',
    nameLatin: 'Utlu Mā Ūhiya',
    startSurahNumber: 29,
    startSurahName: 'Al-\'Ankabut',
    startAyahNumber: 46,
    endSurahNumber: 33,
    endSurahName: 'Al-Ahzab',
    endAyahNumber: 30,
    totalVerses: 178,
    description: 'Perintah membaca wahyu dan mendirikan shalat, kabar kemenangan bangsa Romawi (Ar-Rum), wasiat Luqman Al-Hakim kepada anaknya, dan permulaan Al-Ahzab.',
    surahsInJuz: [
      { surahNumber: 29, surahName: 'Al-\'Ankabut', arabicName: 'العنكبوت', ayahRange: 'Ayat 46 - 69' },
      { surahNumber: 30, surahName: 'Ar-Rum', arabicName: 'الروم', ayahRange: 'Ayat 1 - 60' },
      { surahNumber: 31, surahName: 'Luqman', arabicName: 'لقمان', ayahRange: 'Ayat 1 - 34' },
      { surahNumber: 32, surahName: 'As-Sajdah', arabicName: 'السجدة', ayahRange: 'Ayat 1 - 30' },
      { surahNumber: 33, surahName: 'Al-Ahzab', arabicName: 'الأحزاب', ayahRange: 'Ayat 1 - 30' }
    ]
  },
  {
    juzNumber: 22,
    nameArabic: 'وَمَنْ يَّقْنُتْ',
    nameLatin: 'Wa May Yaqnut',
    startSurahNumber: 33,
    startSurahName: 'Al-Ahzab',
    startAyahNumber: 31,
    endSurahNumber: 36,
    endSurahName: 'Ya Sin',
    endAyahNumber: 27,
    totalVerses: 169,
    description: 'Keutamaan istri-istri Nabi (Ummahatul Mukminin), penutup para Nabi (Khatamun Nabiyyin), surat Saba\', Fatir, dan permulaan surat Ya Sin yang agung.',
    surahsInJuz: [
      { surahNumber: 33, surahName: 'Al-Ahzab', arabicName: 'الأحزاب', ayahRange: 'Ayat 31 - 73' },
      { surahNumber: 34, surahName: 'Saba\'', arabicName: 'سبإ', ayahRange: 'Ayat 1 - 54' },
      { surahNumber: 35, surahName: 'Fatir', arabicName: 'فاطر', ayahRange: 'Ayat 1 - 45' },
      { surahNumber: 36, surahName: 'Ya Sin', arabicName: 'يس', ayahRange: 'Ayat 1 - 27' }
    ]
  },
  {
    juzNumber: 23,
    nameArabic: 'وَمَا أَنْزَلْنَا',
    nameLatin: 'Wa Mā Anzalnā',
    startSurahNumber: 36,
    startSurahName: 'Ya Sin',
    startAyahNumber: 28,
    endSurahNumber: 39,
    endSurahName: 'Az-Zumar',
    endAyahNumber: 31,
    totalVerses: 357,
    description: 'Kelanjutan surat Ya Sin tentang bukti kebangkitan alam kubur, barisan malaikat dalam Ash-Shaffat, surat Shad, dan permulaan rombongan surga di Az-Zumar.',
    surahsInJuz: [
      { surahNumber: 36, surahName: 'Ya Sin', arabicName: 'يس', ayahRange: 'Ayat 28 - 83' },
      { surahNumber: 37, surahName: 'As-Saffat', arabicName: 'الصافات', ayahRange: 'Ayat 1 - 182' },
      { surahNumber: 38, surahName: 'Sad', arabicName: 'ص', ayahRange: 'Ayat 1 - 88' },
      { surahNumber: 39, surahName: 'Az-Zumar', arabicName: 'الزمر', ayahRange: 'Ayat 1 - 31' }
    ]
  },
  {
    juzNumber: 24,
    nameArabic: 'فَمَنْ أَظْلَمُ',
    nameLatin: 'Faman Azlamu',
    startSurahNumber: 39,
    startSurahName: 'Az-Zumar',
    startAyahNumber: 32,
    endSurahNumber: 41,
    endSurahName: 'Fussilat',
    endAyahNumber: 46,
    totalVerses: 175,
    description: 'Harapan rahmat Allah bagi yang melampaui batas, doa malaikat pemikul \'Arsy di Ghafir, dan penjelasan rinci mukjizat Al-Qur\'an di Fussilat.',
    surahsInJuz: [
      { surahNumber: 39, surahName: 'Az-Zumar', arabicName: 'الزمر', ayahRange: 'Ayat 32 - 75' },
      { surahNumber: 40, surahName: 'Gafir', arabicName: 'غافر', ayahRange: 'Ayat 1 - 85' },
      { surahNumber: 41, surahName: 'Fussilat', arabicName: 'فصلت', ayahRange: 'Ayat 1 - 46' }
    ]
  },
  {
    juzNumber: 25,
    nameArabic: 'إِلَيْهِ يُرَدُّ',
    nameLatin: 'Ilaihi Yuraddu',
    startSurahNumber: 41,
    startSurahName: 'Fussilat',
    startAyahNumber: 47,
    endSurahNumber: 45,
    endSurahName: 'Al-Jasiyah',
    endAyahNumber: 37,
    totalVerses: 246,
    description: 'Kelompok surat Ha Mim: Asy-Syura (musyawarah kaum mukmin), Az-Zukhruf (perhiasan dunia yang fana), Ad-Dukhan (asap akhir zaman), dan Al-Jasiyah.',
    surahsInJuz: [
      { surahNumber: 41, surahName: 'Fussilat', arabicName: 'فصلت', ayahRange: 'Ayat 47 - 54' },
      { surahNumber: 42, surahName: 'Asy-Syura', arabicName: 'الشورى', ayahRange: 'Ayat 1 - 53' },
      { surahNumber: 43, surahName: 'Az-Zukhruf', arabicName: 'الزخرف', ayahRange: 'Ayat 1 - 89' },
      { surahNumber: 44, surahName: 'Ad-Dukhan', arabicName: 'الدخان', ayahRange: 'Ayat 1 - 59' },
      { surahNumber: 45, surahName: 'Al-Jasiyah', arabicName: 'الجاثية', ayahRange: 'Ayat 1 - 37' }
    ]
  },
  {
    juzNumber: 26,
    nameArabic: 'حٰم',
    nameLatin: 'Hā Mīm',
    startSurahNumber: 46,
    startSurahName: 'Al-Ahqaf',
    startAyahNumber: 1,
    endSurahNumber: 51,
    endSurahName: 'Az-Zariyat',
    endAyahNumber: 30,
    totalVerses: 195,
    description: 'Surat Al-Ahqaf, surat Muhammad, surat Al-Fath (kemenangan Perjanjian Hudaibiyah), Al-Hujurat (akhlak dan persaudaraan umat), dan surat Qaf.',
    surahsInJuz: [
      { surahNumber: 46, surahName: 'Al-Ahqaf', arabicName: 'الأحقاف', ayahRange: 'Ayat 1 - 35' },
      { surahNumber: 47, surahName: 'Muhammad', arabicName: 'محمد', ayahRange: 'Ayat 1 - 38' },
      { surahNumber: 48, surahName: 'Al-Fath', arabicName: 'الفتح', ayahRange: 'Ayat 1 - 29' },
      { surahNumber: 49, surahName: 'Al-Hujurat', arabicName: 'الحجرات', ayahRange: 'Ayat 1 - 18' },
      { surahNumber: 50, surahName: 'Qaf', arabicName: 'ق', ayahRange: 'Ayat 1 - 45' },
      { surahNumber: 51, surahName: 'Az-Zariyat', arabicName: 'الذاريات', ayahRange: 'Ayat 1 - 30' }
    ]
  },
  {
    juzNumber: 27,
    nameArabic: 'قَالَ فَمَا خَطْبُكُمْ',
    nameLatin: 'Qāla Famā Khatbukum',
    startSurahNumber: 51,
    startSurahName: 'Az-Zariyat',
    startAyahNumber: 31,
    endSurahNumber: 57,
    endSurahName: 'Al-Hadid',
    endAyahNumber: 29,
    totalVerses: 399,
    description: 'Tujuan penciptaan jin dan manusia untuk beribadah, surat At-Tur, An-Najm, Al-Qamar, Ar-Rahman ("Fabiayyi ala\'i Rabbikuma tukadzdziban"), Al-Waqi\'ah, dan Al-Hadid.',
    surahsInJuz: [
      { surahNumber: 51, surahName: 'Az-Zariyat', arabicName: 'الذاريات', ayahRange: 'Ayat 31 - 60' },
      { surahNumber: 52, surahName: 'At-Tur', arabicName: 'الطور', ayahRange: 'Ayat 1 - 49' },
      { surahNumber: 53, surahName: 'An-Najm', arabicName: 'النجم', ayahRange: 'Ayat 1 - 62' },
      { surahNumber: 54, surahName: 'Al-Qamar', arabicName: 'القمر', ayahRange: 'Ayat 1 - 55' },
      { surahNumber: 55, surahName: 'Ar-Rahman', arabicName: 'الرحمن', ayahRange: 'Ayat 1 - 78' },
      { surahNumber: 56, surahName: 'Al-Waqi\'ah', arabicName: 'الواقعة', ayahRange: 'Ayat 1 - 96' },
      { surahNumber: 57, surahName: 'Al-Hadid', arabicName: 'الحديد', ayahRange: 'Ayat 1 - 29' }
    ]
  },
  {
    juzNumber: 28,
    nameArabic: 'قَدْ سَمِعَ اللّٰهُ',
    nameLatin: 'Qad Sami\'allāh',
    startSurahNumber: 58,
    startSurahName: 'Al-Mujadilah',
    startAyahNumber: 1,
    endSurahNumber: 66,
    endSurahName: 'At-Tahrim',
    endAyahNumber: 12,
    totalVerses: 137,
    description: 'Surat Al-Mujadilah (wanita yang mengadu kepada Allah), Al-Hasyr, Al-Mumtahanah, Ash-Shaff, Al-Jumu\'ah (keutamaan shalat Jumat), Al-Munafiqun, At-Taghabun, Ath-Thalaq, dan At-Tahrim.',
    surahsInJuz: [
      { surahNumber: 58, surahName: 'Al-Mujadilah', arabicName: 'المجادلة', ayahRange: 'Ayat 1 - 22' },
      { surahNumber: 59, surahName: 'Al-Hasyr', arabicName: 'الحشر', ayahRange: 'Ayat 1 - 24' },
      { surahNumber: 60, surahName: 'Al-Mumtahanah', arabicName: 'الممتحنة', ayahRange: 'Ayat 1 - 13' },
      { surahNumber: 61, surahName: 'As-Saff', arabicName: 'الصف', ayahRange: 'Ayat 1 - 14' },
      { surahNumber: 62, surahName: 'Al-Jumu\'ah', arabicName: 'الجمعة', ayahRange: 'Ayat 1 - 11' },
      { surahNumber: 63, surahName: 'Al-Munafiqun', arabicName: 'المنافقون', ayahRange: 'Ayat 1 - 11' },
      { surahNumber: 64, surahName: 'At-Tagabun', arabicName: 'التغابن', ayahRange: 'Ayat 1 - 18' },
      { surahNumber: 65, surahName: 'At-Talaq', arabicName: 'الطلاق', ayahRange: 'Ayat 1 - 12' },
      { surahNumber: 66, surahName: 'At-Tahrim', arabicName: 'التحريم', ayahRange: 'Ayat 1 - 12' }
    ]
  },
  {
    juzNumber: 29,
    nameArabic: 'تَبَارَكَ الَّذِي',
    nameLatin: 'Tabārakal-Ladzī',
    startSurahNumber: 67,
    startSurahName: 'Al-Mulk',
    startAyahNumber: 1,
    endSurahNumber: 77,
    endSurahName: 'Al-Mursalat',
    endAyahNumber: 50,
    totalVerses: 431,
    description: 'Juz Tabarak: Surat Al-Mulk (penyelamat siksa kubur), Al-Qalam, Al-Haqqah, Al-Ma\'arij, Nuh, Al-Jinn, Al-Muzzammil (qiyamullail), Al-Muddassir, Al-Qiyamah, Al-Insan, dan Al-Mursalat.',
    surahsInJuz: [
      { surahNumber: 67, surahName: 'Al-Mulk', arabicName: 'الملك', ayahRange: 'Ayat 1 - 30' },
      { surahNumber: 68, surahName: 'Al-Qalam', arabicName: 'القلم', ayahRange: 'Ayat 1 - 52' },
      { surahNumber: 69, surahName: 'Al-Haqqah', arabicName: 'الحاقة', ayahRange: 'Ayat 1 - 52' },
      { surahNumber: 70, surahName: 'Al-Ma\'arij', arabicName: 'المعارج', ayahRange: 'Ayat 1 - 44' },
      { surahNumber: 71, surahName: 'Nuh', arabicName: 'نوح', ayahRange: 'Ayat 1 - 28' },
      { surahNumber: 72, surahName: 'Al-Jinn', arabicName: 'الجن', ayahRange: 'Ayat 1 - 28' },
      { surahNumber: 73, surahName: 'Al-Muzzammil', arabicName: 'المزمل', ayahRange: 'Ayat 1 - 20' },
      { surahNumber: 74, surahName: 'Al-Muddassir', arabicName: 'المدثر', ayahRange: 'Ayat 1 - 56' },
      { surahNumber: 75, surahName: 'Al-Qiyamah', arabicName: 'القيامة', ayahRange: 'Ayat 1 - 40' },
      { surahNumber: 76, surahName: 'Al-Insan', arabicName: 'الإنسان', ayahRange: 'Ayat 1 - 31' },
      { surahNumber: 77, surahName: 'Al-Mursalat', arabicName: 'المرسلات', ayahRange: 'Ayat 1 - 50' }
    ]
  },
  {
    juzNumber: 30,
    nameArabic: 'عَمَّ',
    nameLatin: "'Amma",
    startSurahNumber: 78,
    startSurahName: 'An-Naba\'',
    startAyahNumber: 1,
    endSurahNumber: 114,
    endSurahName: 'An-Nas',
    endAyahNumber: 6,
    totalVerses: 564,
    description: 'Juz \'Amma: Berisi 37 surat pendek yang sangat sering dibaca dalam shalat harian, mulai dari An-Naba\', An-Nazi\'at, Al-Ikhlas, Al-Falaq, hingga An-Nas.',
    surahsInJuz: [
      { surahNumber: 78, surahName: 'An-Naba\'', arabicName: 'النبإ', ayahRange: 'Ayat 1 - 40' },
      { surahNumber: 79, surahName: 'An-Nazi\'at', arabicName: 'النازعات', ayahRange: 'Ayat 1 - 46' },
      { surahNumber: 80, surahName: '\'Abasa', arabicName: 'عبس', ayahRange: 'Ayat 1 - 42' },
      { surahNumber: 81, surahName: 'At-Takwir', arabicName: 'التكوير', ayahRange: 'Ayat 1 - 29' },
      { surahNumber: 82, surahName: 'Al-Infitar', arabicName: 'الانفطار', ayahRange: 'Ayat 1 - 19' },
      { surahNumber: 83, surahName: 'Al-Mutaffifin', arabicName: 'المطففين', ayahRange: 'Ayat 1 - 36' },
      { surahNumber: 84, surahName: 'Al-Insyiqaq', arabicName: 'الانشقاق', ayahRange: 'Ayat 1 - 25' },
      { surahNumber: 85, surahName: 'Al-Buruj', arabicName: 'البروج', ayahRange: 'Ayat 1 - 22' },
      { surahNumber: 86, surahName: 'At-Tariq', arabicName: 'الطارق', ayahRange: 'Ayat 1 - 17' },
      { surahNumber: 87, surahName: 'Al-A\'la', arabicName: 'الأعلى', ayahRange: 'Ayat 1 - 19' },
      { surahNumber: 88, surahName: 'Al-Gasyiyah', arabicName: 'الغاشية', ayahRange: 'Ayat 1 - 26' },
      { surahNumber: 89, surahName: 'Al-Fajr', arabicName: 'الفجر', ayahRange: 'Ayat 1 - 30' },
      { surahNumber: 90, surahName: 'Al-Balad', arabicName: 'البلد', ayahRange: 'Ayat 1 - 20' },
      { surahNumber: 91, surahName: 'Asy-Syams', arabicName: 'الشمس', ayahRange: 'Ayat 1 - 15' },
      { surahNumber: 92, surahName: 'Al-Lail', arabicName: 'الليل', ayahRange: 'Ayat 1 - 21' },
      { surahNumber: 93, surahName: 'Ad-Duha', arabicName: 'الضحى', ayahRange: 'Ayat 1 - 11' },
      { surahNumber: 94, surahName: 'Asy-Syarh', arabicName: 'الشرح', ayahRange: 'Ayat 1 - 8' },
      { surahNumber: 95, surahName: 'At-Tin', arabicName: 'التين', ayahRange: 'Ayat 1 - 8' },
      { surahNumber: 96, surahName: 'Al-\'Alaq', arabicName: 'العلق', ayahRange: 'Ayat 1 - 19' },
      { surahNumber: 97, surahName: 'Al-Qadr', arabicName: 'القدر', ayahRange: 'Ayat 1 - 5' },
      { surahNumber: 98, surahName: 'Al-Bayyinah', arabicName: 'البينة', ayahRange: 'Ayat 1 - 8' },
      { surahNumber: 99, surahName: 'Az-Zalzalah', arabicName: 'الزلزلة', ayahRange: 'Ayat 1 - 8' },
      { surahNumber: 100, surahName: 'Al-\'Adiyat', arabicName: 'العاديات', ayahRange: 'Ayat 1 - 11' },
      { surahNumber: 101, surahName: 'Al-Qari\'ah', arabicName: 'القارعة', ayahRange: 'Ayat 1 - 11' },
      { surahNumber: 102, surahName: 'At-Takasur', arabicName: 'التكاثر', ayahRange: 'Ayat 1 - 8' },
      { surahNumber: 103, surahName: 'Al-\'Asr', arabicName: 'العصر', ayahRange: 'Ayat 1 - 3' },
      { surahNumber: 104, surahName: 'Al-Humazah', arabicName: 'الهمزة', ayahRange: 'Ayat 1 - 9' },
      { surahNumber: 105, surahName: 'Al-Fil', arabicName: 'الفيل', ayahRange: 'Ayat 1 - 5' },
      { surahNumber: 106, surahName: 'Quraisy', arabicName: 'قريش', ayahRange: 'Ayat 1 - 4' },
      { surahNumber: 107, surahName: 'Al-Ma\'un', arabicName: 'الماعون', ayahRange: 'Ayat 1 - 7' },
      { surahNumber: 108, surahName: 'Al-Kausar', arabicName: 'الكوثر', ayahRange: 'Ayat 1 - 3' },
      { surahNumber: 109, surahName: 'Al-Kafirun', arabicName: 'الكافرون', ayahRange: 'Ayat 1 - 6' },
      { surahNumber: 110, surahName: 'An-Nasr', arabicName: 'النصر', ayahRange: 'Ayat 1 - 3' },
      { surahNumber: 111, surahName: 'Al-Lahab', arabicName: 'اللهب', ayahRange: 'Ayat 1 - 5' },
      { surahNumber: 112, surahName: 'Al-Ikhlas', arabicName: 'الإخلاص', ayahRange: 'Ayat 1 - 4' },
      { surahNumber: 113, surahName: 'Al-Falaq', arabicName: 'الفلق', ayahRange: 'Ayat 1 - 5' },
      { surahNumber: 114, surahName: 'An-Nas', arabicName: 'الناس', ayahRange: 'Ayat 1 - 6' }
    ]
  }
];

/**
 * Returns which Juz an Ayah belongs to based on surah number and ayah number
 */
export function getJuzForAyah(surahNumber: number, ayahNumber: number): number {
  for (let i = 0; i < QURAN_JUZ_LIST.length; i++) {
    const juz = QURAN_JUZ_LIST[i];
    // Check if within this juz
    if (surahNumber > juz.startSurahNumber && surahNumber < juz.endSurahNumber) {
      return juz.juzNumber;
    }
    if (juz.startSurahNumber === juz.endSurahNumber) {
      if (surahNumber === juz.startSurahNumber && ayahNumber >= juz.startAyahNumber && ayahNumber <= juz.endAyahNumber) {
        return juz.juzNumber;
      }
    } else {
      if (surahNumber === juz.startSurahNumber && ayahNumber >= juz.startAyahNumber) {
        return juz.juzNumber;
      }
      if (surahNumber === juz.endSurahNumber && ayahNumber <= juz.endAyahNumber) {
        return juz.juzNumber;
      }
    }
  }
  return 30; // fallback
}
