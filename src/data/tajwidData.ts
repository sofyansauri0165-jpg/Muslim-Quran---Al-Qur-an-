export interface TajwidExample {
  surah: string;
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  highlightPart: string;
  latinText: string;
  translation: string;
  note: string;
}

export interface TajwidRule {
  id: string;
  title: string;
  arabicTitle: string;
  category: 'nun-tanwin' | 'mim-sukun' | 'mad' | 'qalqalah' | 'alif-lam' | 'waqaf' | 'ra-lam';
  categoryLabel: string;
  letters: string[];
  definition: string;
  howToRead: string;
  duration?: string; // e.g. 1 alif (2 harakat), 2-3 alif (4-6 harakat)
  examples: TajwidExample[];
}

export interface TajwidQuizQuestion {
  id: number;
  question: string;
  arabicSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const TAJWID_CATEGORIES = [
  { id: 'all', label: 'Semua Hukum' },
  { id: 'nun-tanwin', label: 'Nun Sukun & Tanwin' },
  { id: 'mim-sukun', label: 'Mim Sukun' },
  { id: 'mad', label: 'Hukum Mad' },
  { id: 'qalqalah', label: 'Qalqalah (Pantulan)' },
  { id: 'alif-lam', label: 'Alif Lam (Al-Ta’rif)' },
  { id: 'waqaf', label: 'Tanda Waqaf' },
  { id: 'ra-lam', label: 'Hukum Ra & Lam' }
] as const;

export const TAJWID_RULES: TajwidRule[] = [
  // 1. NUN SUKUN & TANWIN
  {
    id: 'izhar-halqi',
    title: 'Izhar Halqi',
    arabicTitle: 'إظهار حلقي',
    category: 'nun-tanwin',
    categoryLabel: 'Nun Sukun & Tanwin',
    letters: ['ء', 'هـ', 'ع', 'غ', 'ح', 'خ'],
    definition: 'Izhar berarti jelas atau terang, dan Halqi artinya tenggorokan. Hukum ini terjadi apabila Nun Mati (نْ) atau Tanwin (ً ٍ ٌ) bertemu dengan salah satu dari 6 huruf halaq (tenggorokan).',
    howToRead: 'Dibaca jelas, tegas, tanpa berdengung (ghunnah), dan tidak terputus.',
    duration: '1 harakat (jelas normal tanpa dengung)',
    examples: [
      {
        surah: 'Al-Falaq',
        surahNumber: 113,
        ayahNumber: 3,
        arabicText: 'وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        highlightPart: 'غَاسِقٍ إِذَا',
        latinText: 'Wa min syarri ghaasiqin idzaa waqab',
        translation: 'Dan dari kejahatan malam apabila telah gelap gulita.',
        note: 'Kasrahtain pada huruf Qaf bertemu huruf Alif/Hamzah (إ).'
      },
      {
        surah: 'Al-Kautsar',
        surahNumber: 108,
        ayahNumber: 2,
        arabicText: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
        highlightPart: 'وَانْحَرْ',
        latinText: 'Fa shalli lirabbika wan-har',
        translation: 'Maka laksanakanlah sholat karena Tuhanmu, dan berkurbanlah.',
        note: 'Nun sukun (نْ) bertemu huruf Ha (ح).'
      },
      {
        surah: 'Al-Qari’ah',
        surahNumber: 101,
        ayahNumber: 11,
        arabicText: 'نَارٌ حَامِيَةٌ',
        highlightPart: 'نَارٌ حَامِيَةٌ',
        latinText: 'Naarun haamiyah',
        translation: '(Yaitu) api yang sangat panas.',
        note: 'Dhammatain pada Naarun bertemu huruf Ha (ح).'
      }
    ]
  },
  {
    id: 'idgham-bighunnah',
    title: 'Idgham Bighunnah',
    arabicTitle: 'إدغام بغنة',
    category: 'nun-tanwin',
    categoryLabel: 'Nun Sukun & Tanwin',
    letters: ['ي', 'ن', 'م', 'و'],
    definition: 'Idgham berarti memasukkan atau meleburkan, sedangkan Bighunnah berarti dengan dengung. Terjadi apabila Nun Sukun (نْ) atau Tanwin bertemu dengan salah satu dari 4 huruf yang tergabung dalam kata "YANMU" (يَنْمُو).',
    howToRead: 'Huruf nun atau tanwin dileburkan ke dalam huruf setelahnya disertai suara dengung yang ditahan di pangkal hidung (khaisyum).',
    duration: '2 harakat (ditahan dengan dengung lembut)',
    examples: [
      {
        surah: 'Al-Lahab',
        surahNumber: 111,
        ayahNumber: 1,
        arabicText: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ',
        highlightPart: 'لَهَبٍ وَتَبَّ',
        latinText: 'Tabbat yadaa abii lahabiw-wa tabb',
        translation: 'Binasalah kedua tangan Abu Lahab dan benar-benar binasa dia!',
        note: 'Kasrahtain pada lahabin bertemu huruf Wawu (و).'
      },
      {
        surah: 'Az-Zalzalah',
        surahNumber: 99,
        ayahNumber: 7,
        arabicText: 'فَمَنْ يَّعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَّرَهُ',
        highlightPart: 'فَمَنْ يَّعْمَلْ',
        latinText: "Famay-ya'mal mitsqaala dzarratin khairay-yarah",
        translation: 'Maka barangsiapa mengerjakan kebaikan seberat zarrah, niscaya dia akan melihat (balasan)nya.',
        note: 'Nun sukun bertemu huruf Ya (ي).'
      }
    ]
  },
  {
    id: 'idgham-bilaghunnah',
    title: 'Idgham Bilaghunnah',
    arabicTitle: 'إدغام بغير غنة',
    category: 'nun-tanwin',
    categoryLabel: 'Nun Sukun & Tanwin',
    letters: ['ل', 'ر'],
    definition: 'Idgham Bilaghunnah adalah meleburkan bunyi Nun Sukun (نْ) atau Tanwin ke dalam huruf Lam (ل) atau Ra (ر) secara sempurna tanpa mendengung sama sekali.',
    howToRead: 'Dimasukkan secara lebur sempurna ke huruf Lam atau Ra seolah bertasydid, tanpa ada dengungan sama sekali.',
    duration: '1 harakat (tanpa dengung)',
    examples: [
      {
        surah: 'Al-Ikhlas',
        surahNumber: 112,
        ayahNumber: 4,
        arabicText: 'وَلَمْ يَكُنْ لَّهُ كُفُوًا أَحَدٌ',
        highlightPart: 'يَكُنْ لَّهُ',
        latinText: 'Wa lam yakul-lahuu kufuwan ahad',
        translation: 'Dan tidak ada seorang pun yang setara dengan Dia.',
        note: 'Nun sukun bertemu huruf Lam (ل), dibaca yakul-lahuu bukan yakun-lahuu.'
      },
      {
        surah: 'Al-Humazah',
        surahNumber: 104,
        ayahNumber: 1,
        arabicText: 'وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ',
        highlightPart: 'وَيْلٌ لِّكُلِّ',
        latinText: 'Wailul-likulli humazatil-lumazah',
        translation: 'Celakalah bagi setiap pengumpat dan pencela.',
        note: 'Dhammatain pada Wailun melebur langsung ke Lam (ل).'
      }
    ]
  },
  {
    id: 'iqlab',
    title: 'Iqlab',
    arabicTitle: 'إقلاب',
    category: 'nun-tanwin',
    categoryLabel: 'Nun Sukun & Tanwin',
    letters: ['ب'],
    definition: 'Iqlab berarti menukar atau mengganti. Hukum ini terjadi apabila Nun Sukun (نْ) atau Tanwin bertemu dengan satu-satunya huruf Ba (ب). Dalam mushaf biasanya ditandai dengan huruf mim kecil (م).',
    howToRead: 'Bunyi nun sukun atau tanwin diubah menjadi bunyi Mim (م) di kedua bibir disertai dengung dan jeda yang lembut.',
    duration: '2 harakat (berdengung)',
    examples: [
      {
        surah: 'Al-Balad',
        surahNumber: 90,
        ayahNumber: 2,
        arabicText: 'وَأَنْتَ حِلٌّ بِهَٰذَا الْبَلَدِ',
        highlightPart: 'حِلٌّ بِهَٰذَا',
        latinText: 'Wa anta hillum-bihaadzal balad',
        translation: 'Dan engkau (Muhammad) bertempat di negeri (Mekah) ini.',
        note: 'Tanwin pada Hillun bertemu Ba (ب), dibaca Hillum-bihaadza.'
      },
      {
        surah: 'Al-Humazah',
        surahNumber: 104,
        ayahNumber: 4,
        arabicText: 'كَلَّا ۖ لَيُنْبَذَنَّ فِي الْحُطَمَةِ',
        highlightPart: 'لَيُنْبَذَنَّ',
        latinText: 'Kallaa layumbadzanna fil-hutamah',
        translation: 'Sekali-kali tidak! Pasti dia akan dilemparkan ke dalam (neraka) Hutamah.',
        note: 'Nun sukun bertemu Ba dalam satu kata, dibaca layumbadzanna.'
      }
    ]
  },
  {
    id: 'ikhfa-haqiqi',
    title: 'Ikhfa Haqiqi',
    arabicTitle: 'إخفاء حقيقي',
    category: 'nun-tanwin',
    categoryLabel: 'Nun Sukun & Tanwin',
    letters: ['ت', 'ث', 'ج', 'د', 'ذ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ف', 'ق', 'ك'],
    definition: 'Ikhfa berarti menyamarkan atau menyembunyikan. Terjadi apabila Nun Sukun (نْ) atau Tanwin bertemu salah satu dari 15 huruf hijaiyah selain huruf Izhar, Idgham, dan Iqlab.',
    howToRead: 'Membunyikan nun sukun atau tanwin antara izhar dan idgham, dengan menyamarkannya mendekati makhraj huruf berikutnya disertai dengung.',
    duration: '2 harakat',
    examples: [
      {
        surah: 'An-Nas',
        surahNumber: 114,
        ayahNumber: 4,
        arabicText: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        highlightPart: 'مِنْ شَرِّ',
        latinText: 'Min syarril waswaasil khannaas',
        translation: 'Dari kejahatan (bisikan) setan yang bersembunyi.',
        note: 'Nun sukun bertemu huruf Syin (ش), suara nun disamarkan ke huruf syin.'
      },
      {
        surah: 'Al-Falaq',
        surahNumber: 113,
        ayahNumber: 2,
        arabicText: 'مِنْ شَرِّ مَا خَلَقَ',
        highlightPart: 'مِنْ شَرِّ',
        latinText: 'Min syarri maa khalaq',
        translation: 'Dari kejahatan makhluk yang Dia ciptakan.',
        note: 'Nun sukun bertemu huruf Syin (ش).'
      }
    ]
  },

  // 2. MIM SUKUN
  {
    id: 'ikhfa-syafawi',
    title: 'Ikhfa Syafawi',
    arabicTitle: 'إخفاء شفوي',
    category: 'mim-sukun',
    categoryLabel: 'Mim Sukun',
    letters: ['ب'],
    definition: 'Terjadi apabila Mim Sukun (مْ) bertemu dengan huruf Ba (ب). Syafawi bermakna bibir karena makhraj kedua huruf ini berada di bibir.',
    howToRead: 'Membunyikan mim sukun secara samar pada kedua bibir disertai dengungan lembut yang ditahan.',
    duration: '2 harakat',
    examples: [
      {
        surah: 'Al-Fil',
        surahNumber: 105,
        ayahNumber: 4,
        arabicText: 'تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ',
        highlightPart: 'تَرْمِيهِمْ بِحِجَارَةٍ',
        latinText: 'Tarmiihim bihijaaratim-min sijjiil',
        translation: 'Yang melempari mereka dengan batu dari tanah liat yang dibakar.',
        note: 'Mim sukun pada tarmiihim bertemu huruf Ba (ب) pada bihijaaratin.'
      }
    ]
  },
  {
    id: 'idgham-mimi',
    title: 'Idgham Mimi (Mutamatsilain)',
    arabicTitle: 'إدغام ميمي / متماثلين',
    category: 'mim-sukun',
    categoryLabel: 'Mim Sukun',
    letters: ['م'],
    definition: 'Terjadi apabila Mim Sukun (مْ) bertemu dengan huruf Mim yang berharakat (مَ مِ مُ). Kedua huruf sama makhraj dan sifatnya.',
    howToRead: 'Memasukkan mim pertama ke dalam mim kedua secara lebur disertai ghunnah (dengung) penuh.',
    duration: '2 harakat (dengung ditahan)',
    examples: [
      {
        surah: 'Quraisy',
        surahNumber: 106,
        ayahNumber: 4,
        arabicText: 'الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ',
        highlightPart: 'أَطْعَمَهُمْ مِنْ',
        latinText: "Alladzii ath'amahum-min juu'",
        translation: 'Yang telah memberi makan kepada mereka untuk menghilangkan lapar.',
        note: 'Mim sukun pada ath’amahum bertemu huruf Mim pada min.'
      }
    ]
  },
  {
    id: 'izhar-syafawi',
    title: 'Izhar Syafawi',
    arabicTitle: 'إظهار شفوي',
    category: 'mim-sukun',
    categoryLabel: 'Mim Sukun',
    letters: ['Semua huruf kecuali ب dan م (26 huruf)'],
    definition: 'Terjadi apabila Mim Sukun (مْ) bertemu dengan semua huruf hijaiyah SELAIN Ba (ب) dan Mim (م). Terutama sangat ditekankan saat bertemu Wawu (و) dan Fa (ف) agar tidak samar.',
    howToRead: 'Membaca mim sukun dengan jelas, tegas di bibir tanpa dengungan panjang.',
    duration: '1 harakat (jelas normal)',
    examples: [
      {
        surah: 'Al-Kafirun',
        surahNumber: 109,
        ayahNumber: 6,
        arabicText: 'لَكُمْ دِينُكُمْ وَلِيَ دِينِ',
        highlightPart: 'لَكُمْ دِينُكُمْ',
        latinText: 'Lakum diinukum wa liya diin',
        translation: 'Untukmu agamamu, dan untukkulah agamaku.',
        note: 'Mim sukun pada lakum bertemu Dal (د), dan pada diinukum bertemu Wawu (و).'
      }
    ]
  },

  // 3. HUKUM MAD (PANJANG BACAAN)
  {
    id: 'mad-thabii',
    title: 'Mad Thabi’i (Mad Ashli)',
    arabicTitle: 'مد طبيعي / مد أصلي',
    category: 'mad',
    categoryLabel: 'Hukum Mad',
    letters: ['Alif (ا) sesudah Fathah', 'Wawu (و) sesudah Dhammah', 'Ya (ي) sesudah Kasrah'],
    definition: 'Mad Thabi’i adalah pemanjangan suara secara alami tanpa ada sebab hamzah, sukun, atau tasydid setelahnya.',
    howToRead: 'Dipanjangkan tepat 1 alif atau 2 harakat (ayunan sedang normal).',
    duration: '2 harakat (1 alif)',
    examples: [
      {
        surah: 'An-Nasr',
        surahNumber: 110,
        ayahNumber: 1,
        arabicText: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
        highlightPart: 'إِذَا',
        latinText: 'Idzaa jaa-a nashrullaahi wal-fath',
        translation: 'Apabila telah datang pertolongan Allah dan kemenangan.',
        note: 'Huruf Dzal berharakat fathah diikuti Alif sukun (إِذَا).'
      }
    ]
  },
  {
    id: 'mad-wajib-muttashil',
    title: 'Mad Wajib Muttashil',
    arabicTitle: 'مد واجب متصل',
    category: 'mad',
    categoryLabel: 'Hukum Mad',
    letters: ['Mad bertemu Hamzah (ء) dalam SATU kata'],
    definition: 'Terjadi apabila huruf Mad Thabi’i bertemu dengan huruf Hamzah (ء) dalam SATU kata bersambung.',
    howToRead: 'Wajib dipanjangkan antara 4 sampai 5 harakat (2 sampai 2.5 alif).',
    duration: '4 - 5 harakat',
    examples: [
      {
        surah: 'An-Nasr',
        surahNumber: 110,
        ayahNumber: 1,
        arabicText: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
        highlightPart: 'جَاءَ',
        latinText: 'Idzaa jaaa-a nashrullaahi wal-fath',
        translation: 'Apabila telah datang pertolongan Allah dan kemenangan.',
        note: 'Kata Jaa-a (جَاءَ) memuat mad bertemu hamzah dalam satu kalimat.'
      },
      {
        surah: 'Al-Ma’un',
        surahNumber: 107,
        ayahNumber: 6,
        arabicText: 'الَّذِينَ هُمْ يُرَاءُونَ',
        highlightPart: 'يُرَاءُونَ',
        latinText: 'Alladziina hum yuraaa-uun',
        translation: '(Yaitu) orang-orang yang berbuat riya.',
        note: 'Mad bertemu hamzah dalam kata yuraa-uun.'
      }
    ]
  },
  {
    id: 'mad-jaiz-munfashil',
    title: 'Mad Jaiz Munfashil',
    arabicTitle: 'مد جائز منفصل',
    category: 'mad',
    categoryLabel: 'Hukum Mad',
    letters: ['Mad di akhir kata bertemu Hamzah di AWAL kata berikutnya'],
    definition: 'Terjadi apabila huruf Mad Thabi’i berada di akhir sebuah kata, dan huruf Hamzah (ء / ا) berada di awal kata berikutnya (terpisah).',
    howToRead: 'Boleh dibaca 2, 4, atau 5 harakat (jalur Syathibiyyah mengutamakan 4-5 harakat).',
    duration: '4 - 5 harakat (boleh 2 harakat dalam qashr)',
    examples: [
      {
        surah: 'Al-Kautsar',
        surahNumber: 108,
        ayahNumber: 1,
        arabicText: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
        highlightPart: 'إِنَّا أَعْطَيْنَاكَ',
        latinText: "Innaaa a'thainaakal-kautsar",
        translation: 'Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak.',
        note: 'Innaa (kata pertama) berakhir mad, bertemu A’thainaaka (kata kedua diawali hamzah).'
      },
      {
        surah: 'Al-Qadr',
        surahNumber: 97,
        ayahNumber: 1,
        arabicText: 'إِنَّا أَنْزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
        highlightPart: 'إِنَّا أَنْزَلْنَاهُ',
        latinText: 'Innaaa anzalnaahu fii lailatil-qadr',
        translation: 'Sesungguhnya Kami telah menurunkannya (Al-Qur’an) pada malam qadar.',
        note: 'Kata Innaa bertemu anzalnaahu.'
      }
    ]
  },
  {
    id: 'mad-aridh-lissukun',
    title: 'Mad ‘Aridh Lissukun',
    arabicTitle: 'مد عارض للسكون',
    category: 'mad',
    categoryLabel: 'Hukum Mad',
    letters: ['Mad Thabi’i bertemu huruf hidup di akhir bacaan (Waqaf)'],
    definition: 'Terjadi apabila setelah huruf Mad Thabi’i terdapat satu huruf hidup tetapi dibaca sukun (mati) karena berhenti (waqaf) di akhir ayat atau tanda waqaf.',
    howToRead: 'Boleh dibaca pendek (2 harakat), sedang (4 harakat), atau panjang (6 harakat).',
    duration: '2, 4, atau 6 harakat',
    examples: [
      {
        surah: 'Al-Fatihah',
        surahNumber: 1,
        ayahNumber: 2,
        arabicText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        highlightPart: 'الْعَالَمِينَ',
        latinText: "Al-hamdulillaahi rabbil-'aalamiin",
        translation: 'Segala puji bagi Allah, Tuhan seluruh alam.',
        note: 'Kata Al-‘aalamiina dihentikan sehingga nun dibaca sukun menjadi Al-‘aalamiin.'
      }
    ]
  },

  // 4. QALQALAH (PANTULAN SUARA)
  {
    id: 'qalqalah-sughra',
    title: 'Qalqalah Sughra (Kecil)',
    arabicTitle: 'قلقلة صغرى',
    category: 'qalqalah',
    categoryLabel: 'Qalqalah (Pantulan)',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'],
    definition: 'Huruf qalqalah (Qaf, Tha, Ba, Jim, Dal - disingkat "BAJU DI THOQO") yang bersukun asli di tengah-tengah kata/kalimat.',
    howToRead: 'Dipantulkan dengan pantulan ringan, wajar, dan tidak berlebihan.',
    duration: 'Pantulan ringan di tengah kata',
    examples: [
      {
        surah: 'Al-Kautsar',
        surahNumber: 108,
        ayahNumber: 3,
        arabicText: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
        highlightPart: 'الْأَبْتَرُ',
        latinText: 'Inna syaani-aka huwal-abtar',
        translation: 'Sungguh, orang yang membencimu dialah yang terputus (dari rahmat Allah).',
        note: 'Huruf Ba sukun di tengah kata Al-Abtar.'
      },
      {
        surah: 'Al-Adiyat',
        surahNumber: 100,
        ayahNumber: 1,
        arabicText: 'وَالْعَادِيَاتِ ضَبْحًا',
        highlightPart: 'ضَبْحًا',
        latinText: "Wal-'aadiyaati dhab-haa",
        translation: 'Demi kuda perang yang berlari kencang terengah-engah.',
        note: 'Huruf Ba sukun di kata Dhab-ha.'
      }
    ]
  },
  {
    id: 'qalqalah-kubra',
    title: 'Qalqalah Kubra (Besar)',
    arabicTitle: 'قلقلة كبرى',
    category: 'qalqalah',
    categoryLabel: 'Qalqalah (Pantulan)',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'],
    definition: 'Huruf qalqalah yang berada di akhir kata dan dibaca sukun karena berhenti (waqaf).',
    howToRead: 'Dipantulkan dengan pantulan yang lebih kuat, tebal, dan jelas dibanding sughra.',
    duration: 'Pantulan tegas & kuat di akhir waqaf',
    examples: [
      {
        surah: 'Al-Ikhlas',
        surahNumber: 112,
        ayahNumber: 1,
        arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        highlightPart: 'أَحَدٌ',
        latinText: 'Qul huwallaahu ahad',
        translation: 'Katakanlah (Muhammad), "Dialah Allah, Yang Maha Esa."',
        note: 'Huruf Dal di akhir kata Ahad dibaca sukun saat waqaf dengan pantulan mantap.'
      },
      {
        surah: 'Al-Falaq',
        surahNumber: 113,
        ayahNumber: 1,
        arabicText: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        highlightPart: 'الْفَلَقِ',
        latinText: "Qul a'uudzu birabbil-falaq",
        translation: 'Katakanlah, "Aku berlindung kepada Tuhan yang menguasai subuh."',
        note: 'Huruf Qaf di akhir kata Al-Falaq.'
      }
    ]
  },

  // 5. ALIF LAM (AL-TA’RIF)
  {
    id: 'alif-lam-qamariyah',
    title: 'Alif Lam Qamariyah (Izhar Qamariyah)',
    arabicTitle: 'إظهار قمرية / اللام القمرية',
    category: 'alif-lam',
    categoryLabel: 'Alif Lam (Al-Ta’rif)',
    letters: ['ء', 'ب', 'غ', 'ح', 'ج', 'ك', 'و', 'خ', 'ف', 'ع', 'ق', 'ي', 'م', 'هـ'],
    definition: 'Huruf Alif Lam (ال) bertemu salah satu dari 14 huruf Qamariyah yang dirangkum dalam: "ابْغِ حَجَّكَ وَخَفْ عَقِيمَهُ". Di atas huruf Lam terdapat tanda sukun (الْ).',
    howToRead: 'Huruf Lam dibaca jelas (terang) bunyi "L"-nya tanpa dilebur.',
    duration: 'Jelas normal',
    examples: [
      {
        surah: 'Al-Qari’ah',
        surahNumber: 101,
        ayahNumber: 1,
        arabicText: 'الْقَارِعَةُ',
        highlightPart: 'الْقَارِعَةُ',
        latinText: "Al-qaari'ah",
        translation: 'Hari Kiamat,',
        note: 'Alif lam bertemu huruf Qaf (ق), bunyi Lam dibaca jelas: Al-Qaari’ah.'
      },
      {
        surah: 'Al-Falaq',
        surahNumber: 113,
        ayahNumber: 1,
        arabicText: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        highlightPart: 'الْفَلَقِ',
        latinText: "Birabbil-falaq",
        translation: 'Tuhan yang menguasai subuh.',
        note: 'Alif lam bertemu Fa (ف).'
      }
    ]
  },
  {
    id: 'alif-lam-syamsiyah',
    title: 'Alif Lam Syamsiyah (Idgham Syamsiyah)',
    arabicTitle: 'إدغام شمسية / اللام الشمسية',
    category: 'alif-lam',
    categoryLabel: 'Alif Lam (Al-Ta’rif)',
    letters: ['ت', 'ث', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ل', 'ن'],
    definition: 'Huruf Alif Lam (ال) bertemu dengan 14 huruf Syamsiyah. Dalam mushaf ditandai huruf setelah Alif Lam menyandang harakat Tasydid ( ّ ).',
    howToRead: 'Bunyi Lam dileburkan langsung ke dalam huruf berikutnya (tidak dibaca "L").',
    duration: 'Langsung melebur ke huruf bertasydid',
    examples: [
      {
        surah: 'An-Nas',
        surahNumber: 114,
        ayahNumber: 1,
        arabicText: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        highlightPart: 'النَّاسِ',
        latinText: "Qul a'uudzu birabbin-naas",
        translation: 'Katakanlah, "Aku berlindung kepada Tuhannya manusia."',
        note: 'Alif lam bertemu Nun, dibaca an-naas (bukan al-naas).'
      },
      {
        surah: 'Asy-Syams',
        surahNumber: 91,
        ayahNumber: 1,
        arabicText: 'وَالشَّمْسِ وَضُحَاهَا',
        highlightPart: 'وَالشَّمْسِ',
        latinText: 'Wasy-syamsi wa dhuhaahaa',
        translation: 'Demi matahari dan sinarnya pada pagi hari,',
        note: 'Alif lam bertemu Syin, dibaca wasy-syamsi.'
      }
    ]
  },

  // 6. TANDA WAQAF
  {
    id: 'tanda-waqaf',
    title: 'Ragam Tanda Waqaf Mushaf Al-Qur’an',
    arabicTitle: 'علامات الوقف في المصحف',
    category: 'waqaf',
    categoryLabel: 'Tanda Waqaf',
    letters: ['مـ (Lazim)', 'لا (Mamnu’)', 'ج (Jaiz)', 'صلى (Wasal Aula)', 'قلى (Waqaf Aula)', '∴ ∴ (Mu’anaqah)'],
    definition: 'Waqaf adalah menghentikan bacaan Al-Qur’an sejenak sambil bernapas dengan niat melanjutkan kembali bacaan.',
    howToRead: 'Perhatikan simbol tanda waqaf kecil di atas ayat:',
    duration: 'Sesuai simbol',
    examples: [
      {
        surah: 'Al-Baqarah',
        surahNumber: 2,
        ayahNumber: 2,
        arabicText: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
        highlightPart: 'لَا رَيْبَ ۛ فِيهِ ۛ',
        latinText: 'Dzaalikal kitaabu laa raiba fiihi hudal-lil-muttaqiin',
        translation: 'Kitab (Al-Qur’an) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa.',
        note: 'Tanda Mu’anaqah (tiga titik kembar ۛ): Boleh berhenti di salah satu tanda titik, tidak boleh berhenti di keduanya.'
      }
    ]
  }
];

export const TAJWID_QUIZ: TajwidQuizQuestion[] = [
  {
    id: 1,
    question: 'Hukum bacaan apakah yang terjadi apabila Nun Sukun (نْ) bertemu huruf Ba (ب)?',
    options: ['Izhar Halqi', 'Idgham Bighunnah', 'Iqlab', 'Ikhfa Haqiqi'],
    correctIndex: 2,
    explanation: 'Iqlab adalah hukum menukar bunyi nun sukun/tanwin menjadi mim (م) saat bertemu huruf tunggal Ba (ب).'
  },
  {
    id: 2,
    question: 'Manakah di bawah ini yang merupakan huruf-huruf Idgham Bighunnah?',
    options: ['ي - ن - م - و', 'ل - ر', 'ء - هـ - ع - ح', 'ق - ط - ب - ج - د'],
    correctIndex: 0,
    explanation: 'Huruf Idgham Bighunnah ada 4 yang disingkat dalam kata YANMU (ي - ن - م - و).'
  },
  {
    id: 3,
    question: 'Berapakah panjang harakat standar untuk bacaan Mad Thabi’i (Mad Asli)?',
    options: ['1 harakat', '2 harakat (1 alif)', '4 harakat', '6 harakat'],
    correctIndex: 1,
    explanation: 'Mad Thabi’i dipanjangkan sepanjang 2 harakat (setara 1 alif ayunan).'
  },
  {
    id: 4,
    question: 'Pada lafadz "قُلْ هُوَ اللَّهُ أَحَدٌ", huruf Dal di akhir ayat saat waqaf merupakan contoh dari...',
    options: ['Qalqalah Sughra', 'Qalqalah Kubra', 'Izhar Syafawi', 'Mad Wajib'],
    correctIndex: 1,
    explanation: 'Qalqalah Kubra terjadi ketika huruf qalqalah berada di akhir kata dan disukunkan karena berhenti (waqaf).'
  },
  {
    id: 5,
    question: 'Pada lafadz "تَرْمِيهِمْ بِحِجَارَةٍ", hukum bacaan Mim Sukun bertemu Ba disebut...',
    options: ['Idgham Mimi', 'Izhar Syafawi', 'Ikhfa Syafawi', 'Iqlab'],
    correctIndex: 2,
    explanation: 'Mim sukun bertemu huruf Ba dinamakan Ikhfa Syafawi, dibaca samar di kedua bibir dengan dengung halus.'
  }
];
