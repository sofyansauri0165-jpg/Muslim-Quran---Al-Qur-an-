export interface AdhanTrack {
  id: string;
  title: string;
  location: string;
  muadzin?: string;
  audioUrl: string;
  isFajr?: boolean;
}

export const ADHAN_TRACKS: AdhanTrack[] = [
  {
    id: 'makkah',
    title: 'Azan Masjidil Haram Makkah',
    location: 'Makkah Al-Mukarramah',
    muadzin: 'Syaikh Ali Mulla',
    audioUrl: '/audio/adhan/azan_makkah.mp3',
    isFajr: false
  },
  {
    id: 'madinah',
    title: 'Azan Masjid Nabawi Madinah',
    location: 'Madinah Al-Munawwarah',
    muadzin: 'Muadzin Masjid Nabawi',
    audioUrl: '/audio/adhan/azan_madinah.mp3',
    isFajr: false
  },
  {
    id: 'fajr',
    title: 'Azan Subuh (Fajr)',
    location: 'Lengkap dengan Ash-Shalatu Khairum Minan Naum',
    muadzin: 'Muadzin Al-Haram',
    audioUrl: '/audio/adhan/azan_fajr.mp3',
    isFajr: true
  },
  {
    id: 'alafasy',
    title: 'Azan Syaikh Mishary Rashid Alafasy',
    location: 'Kuwait / International',
    muadzin: 'Syaikh Mishary Rashid Alafasy',
    audioUrl: '/audio/adhan/azan_alafasy.mp3',
    isFajr: false
  }
];

export interface AdhanLine {
  arabic: string;
  latin: string;
  translation: string;
  responseArabic: string;
  responseLatin: string;
}

export const ADHAN_TEXTS: AdhanLine[] = [
  {
    arabic: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ (٢x)',
    latin: 'Allahu Akbar, Allahu Akbar (2x)',
    translation: 'Allah Maha Besar, Allah Maha Besar',
    responseArabic: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ',
    responseLatin: 'Allahu Akbar, Allahu Akbar'
  },
  {
    arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ (٢x)',
    latin: "Asyhadu allaa ilaaha illallaah (2x)",
    translation: 'Aku bersaksi bahwa tiada sesembahan yang berhak disembah selain Allah',
    responseArabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ',
    responseLatin: "Asyhadu allaa ilaaha illallaah"
  },
  {
    arabic: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ (٢x)',
    latin: "Asyhadu anna Muhammadar Rasuulullaah (2x)",
    translation: 'Aku bersaksi bahwa Nabi Muhammad adalah utusan Allah',
    responseArabic: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
    responseLatin: "Asyhadu anna Muhammadar Rasuulullaah"
  },
  {
    arabic: 'حَيَّ عَلَى الصَّلَاةِ (٢x)',
    latin: "Hayya 'alash-shalaah (2x)",
    translation: 'Marilah menunaikan shalat',
    responseArabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    responseLatin: "Laa hawla wa laa quwwata illaa billaah"
  },
  {
    arabic: 'حَيَّ عَلَى الْفَلَاحِ (٢x)',
    latin: "Hayya 'alal-falaah (2x)",
    translation: 'Marilah meraih kemenangan / keberuntungan',
    responseArabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    responseLatin: "Laa hawla wa laa quwwata illaa billaah"
  },
  {
    arabic: 'الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ (٢x - Khusus Subuh)',
    latin: "Ash-shalaatu khairum minan-nawm (2x)",
    translation: 'Shalat itu lebih baik daripada tidur',
    responseArabic: 'صَدَقْتَ وَبَرِرْتَ / لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    responseLatin: "Shadaqta wa barirta"
  },
  {
    arabic: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ (١x)',
    latin: 'Allahu Akbar, Allahu Akbar (1x)',
    translation: 'Allah Maha Besar, Allah Maha Besar',
    responseArabic: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ',
    responseLatin: 'Allahu Akbar, Allahu Akbar'
  },
  {
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ (١x)',
    latin: 'Laa ilaaha illallaah (1x)',
    translation: 'Tiada sesembahan yang berhak disembah selain Allah',
    responseArabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    responseLatin: 'Laa ilaaha illallaah'
  }
];

export const DOA_AFTER_ADHAN = {
  arabic: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ، إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ',
  latin: "Allahumma rabba haadzihid-da'watit-taammati wash-shalaatil-qaa'imati, aati Muhammadanil-wasiilata wal-fadhiilata wab'atshu maqaamam mahmuudanil-ladzii wa'adtahu, innaka laa tukhliful-mii'aad.",
  translation: 'Ya Allah, Pemilik panggilan yang sempurna ini dan shalat yang senantiasa didirikan, anugerahkanlah kepada Nabi Muhammad wasilah (kedudukan tinggi di surga) dan keutamaan. Dan bangkitkanlah beliau pada tempat yang terpuji sebagaimana yang telah Engkau janjikan kepadanya. Sesungguhnya Engkau tidak pernah menyalahi janji.',
  source: 'HR. Bukhari no. 614'
};
