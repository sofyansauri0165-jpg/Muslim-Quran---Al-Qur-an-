export interface DzikirItem {
  id: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  count: number;
  note?: string;
}

export const DZIKIR_PAGI: DzikirItem[] = [
  {
    id: 'dzikir-pagi-1',
    title: 'Membaca Ayat Kursi',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: "Allaahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhuu sinatuw-wa laa nawm, lahuu maa fis-samaawaati wa maa fil ardh...",
    translation: 'Allah, tidak ada tuhan selain Dia. Yang Mahahidup, yang terus-menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur...',
    count: 1,
    note: 'Barangsiapa membacanya ketika pagi, ia dilindungi dari gangguan jin hingga petang (HR. Al-Hakim).'
  },
  {
    id: 'dzikir-pagi-2',
    title: 'Surat Al-Ikhlas, Al-Falaq, An-Naas',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ ...',
    latin: "Qul huwallahu ahad... Qul a'uudzu birabbil falaq... Qul a'uudzu birabbin-naas...",
    translation: 'Membaca Surat Al-Ikhlas, Surat Al-Falaq, dan Surat An-Naas masing-masing sebanyak 3 kali.',
    count: 3,
    note: 'Mencukupkanmu dari segala kejahatan dan marabahaya (HR. Abu Daud & Tirmidzi).'
  },
  {
    id: 'dzikir-pagi-3',
    title: 'Sayyidul Istighfar',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    latin: "Allahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa anaa 'abduka, wa anaa 'alaa 'ahdika wa wa'dika mastatha'tu...",
    translation: 'Ya Allah, Engkau adalah Rabbku, tiada sesembahan yang haq selain Engkau. Engkau yang menciptakan aku dan aku adalah hamba-Mu...',
    count: 1,
    note: 'Barangsiapa membacanya dengan yakin lalu wafat pada hari itu sebelum petang, ia termasuk penghuni surga (HR. Bukhari).'
  },
  {
    id: 'dzikir-pagi-4',
    title: 'Perlindungan Dari Bahaya',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    latin: "Bismillahilladzi laa yadhurru ma'asmihi syai'un fil ardhi wa laa fis-samaa'i wa huwas samii'ul 'aliim.",
    translation: 'Dengan nama Allah yang bersama nama-Nya tidak ada sesuatu pun di bumi maupun di langit yang dapat membahayakan, dan Dia Maha Mendengar lagi Maha Mengetahui.',
    count: 3,
    note: 'Tidak akan ada bahaya yang memudharatkannya (HR. Abu Daud & Tirmidzi).'
  },
  {
    id: 'dzikir-pagi-5',
    title: 'Keridhaan kepada Allah, Islam, dan Nabi Muhammad',
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    latin: "Radhiitu billaahi rabbaa, wa bil-islaami diinaa, wa bi-muhammadin shallallahu 'alaihi wa sallama nabiyyaa.",
    translation: 'Aku rela Allah sebagai Rabbku, Islam sebagai agamaku, dan Nabi Muhammad shallallahu alaihi wa sallam sebagai Nabiku.',
    count: 3,
    note: 'Allah berhak meridhai hamba yang membacanya di pagi dan petang (HR. Ahmad & Abu Daud).'
  }
];

export const DZIKIR_PETANG: DzikirItem[] = [
  {
    id: 'dzikir-petang-1',
    title: 'Membaca Ayat Kursi',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ...',
    latin: "Allaahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhuu sinatuw-wa laa nawm...",
    translation: 'Allah, tidak ada tuhan selain Dia. Yang Mahahidup, yang terus-menerus mengurus (makhluk-Nya)...',
    count: 1,
    note: 'Barangsiapa membacanya ketika petang, ia dilindungi dari gangguan jin hingga pagi (HR. Al-Hakim).'
  },
  {
    id: 'dzikir-petang-2',
    title: 'Surat Al-Ikhlas, Al-Falaq, An-Naas',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ ...',
    latin: "Qul huwallahu ahad... Qul a'uudzu birabbil falaq... Qul a'uudzu birabbin-naas...",
    translation: 'Membaca Surat Al-Ikhlas, Surat Al-Falaq, dan Surat An-Naas masing-masing sebanyak 3 kali.',
    count: 3,
    note: 'Mencukupkanmu dari segala bahaya (HR. Abu Daud & Tirmidzi).'
  },
  {
    id: 'dzikir-petang-3',
    title: 'Perlindungan Dari Makhluk Jahat',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    latin: "A'uudzu bikalimaatillaahit-taammaati min syarri maa khalaq.",
    translation: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang Dia ciptakan.',
    count: 3,
    note: 'Tidak ada racun atau binatang berbisa yang dapat memudharatkannya di malam itu (HR. Muslim no. 2709).'
  },
  {
    id: 'dzikir-petang-4',
    title: 'Doa Sore Hari',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    latin: "Amsaynaa wa amsal-mulku lillaah, wal-hamdu lillaah, laa ilaaha illallaah wahdahu laa syariika lah...",
    translation: 'Kami telah memasuki waktu sore dan kerajaan milik Allah, segala puji bagi Allah, tidak ada sesembahan yang berhak disembah selain Allah semata...',
    count: 1,
    note: 'HR. Muslim no. 2723'
  }
];
