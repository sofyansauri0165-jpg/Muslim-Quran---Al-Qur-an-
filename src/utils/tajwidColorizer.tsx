import React from 'react';

export interface TajwidColorInfo {
  id: string;
  name: string;
  colorName: string;
  colorClass: string;
  dotColor: string;
  badgeBg: string;
  description: string;
  duration: string;
  exampleArabic: string;
  letters: string;
}

export const TAJWID_COLOR_LEGEND: TajwidColorInfo[] = [
  {
    id: 'mad-far-i',
    name: 'Mad Wajib / Jaiz / Lazim',
    colorName: 'Merah',
    colorClass: 'text-red-600 dark:text-red-400 font-bold',
    dotColor: 'bg-red-500',
    badgeBg: 'bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
    description: 'Huruf mad yang bertemu hamzah atau sukun/tasydid (memiliki tanda bendera / maddah ~)',
    duration: 'Panjang 4 - 6 harakat',
    exampleArabic: 'جَآءَ · السَّمَآءِ · الضَّآلِّينَ',
    letters: 'Maddah ( ~ ) diatas huruf mad'
  },
  {
    id: 'ghunnah',
    name: 'Ghunnah Musyaddadah',
    colorName: 'Hijau Tua',
    colorClass: 'text-emerald-600 dark:text-emerald-400 font-bold',
    dotColor: 'bg-emerald-500',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300',
    description: 'Huruf Nun bertasydid (نّ) atau Mim bertasydid (مّ), wajib dibaca mendengung jelas dari rongga hidung',
    duration: 'Dengung 2 harakat',
    exampleArabic: 'إِنَّ · مِمَّا · عَمَّ',
    letters: 'نّ , مّ'
  },
  {
    id: 'ikhfa',
    name: 'Ikhfa Haqiqi & Syafawi',
    colorName: 'Toska / Cyan',
    colorClass: 'text-cyan-600 dark:text-cyan-400 font-medium',
    dotColor: 'bg-cyan-500',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300',
    description: 'Nun sukun/tanwin bertemu 15 huruf ikhfa atau Mim sukun bertemu Ba. Dibaca samar antara izhar dan idgham',
    duration: 'Samar & dengung 2 harakat',
    exampleArabic: 'مِنْ قَبْلِ · أَنْفُسَهُمْ · كُنْتُمْ',
    letters: 'ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك'
  },
  {
    id: 'idgham',
    name: 'Idgham (Bighunnah & Bilaghunnah)',
    colorName: 'Ungu / Violet',
    colorClass: 'text-violet-600 dark:text-purple-400 font-medium',
    dotColor: 'bg-violet-500',
    badgeBg: 'bg-violet-50 dark:bg-purple-950/60 border-violet-200 dark:border-purple-800 text-violet-700 dark:text-violet-300',
    description: 'Nun mati atau tanwin melebur ke huruf sesudahnya (dengan dengung pada ي ن م و, tanpa dengung pada ل ر)',
    duration: 'Melebur (2 harakat / lebur langsung)',
    exampleArabic: 'مَنْ يَّقُولُ · مِنْ رَّبِّهِمْ · هُدًى لِّلْمُتَّقِينَ',
    letters: 'ي ن م و (Bighunnah) · ل ر (Bilaghunnah)'
  },
  {
    id: 'iqlab',
    name: 'Iqlab',
    colorName: 'Oranye / Jingga',
    colorClass: 'text-amber-600 dark:text-orange-400 font-bold',
    dotColor: 'bg-amber-500',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300',
    description: 'Nun sukun atau tanwin bertemu huruf Ba (ب), bunyinya ditukar menjadi suara Mim dan mendengung',
    duration: 'Dengung 2 harakat',
    exampleArabic: 'مِنْۢ بَعْدِ · عَلِيمٌۢ بِذَاتِ',
    letters: 'ب (dengan tanda mim kecil ۭ)'
  },
  {
    id: 'qalqalah',
    name: 'Qalqalah (Pantulan)',
    colorName: 'Biru Cerah',
    colorClass: 'text-sky-600 dark:text-sky-400 font-bold',
    dotColor: 'bg-sky-500',
    badgeBg: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300',
    description: 'Huruf Qutbu Jadin yang berharakat sukun (asli atau waqaf), suaranya wajib dipantulkan',
    duration: 'Pantulan ringan (Sughra) / kuat (Kubra)',
    exampleArabic: 'يَجْعَلُونَ · أَلَمْ نَشْرَحْ · وَتَبَّ ۜ',
    letters: 'ق , ط , ب , ج , د (قُطْبُ جَدٍّ)'
  },
  {
    id: 'mad-thabii',
    name: "Mad Thabi'i (Mad Asli)",
    colorName: 'Rose / Merah Muda',
    colorClass: 'text-rose-500 dark:text-rose-400 font-normal',
    dotColor: 'bg-rose-500',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300',
    description: 'Huruf alif setelah fathah, ya sukun setelah kasrah, waw sukun setelah dammah, atau fathah berdiri',
    duration: 'Panjang 1 alif (2 harakat)',
    exampleArabic: 'قَالَ · قِيلَ · يَقُولُ · الرَّحْمٰنِ',
    letters: 'ا , و , ي , fathah tegak ( ٰ )'
  },
  {
    id: 'waqaf',
    name: 'Tanda Waqaf & Simbol',
    colorName: 'Kuning Emas',
    colorClass: 'text-amber-500 dark:text-yellow-400 font-bold',
    dotColor: 'bg-yellow-500',
    badgeBg: 'bg-yellow-50 dark:bg-yellow-950/60 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300',
    description: 'Tanda henti bacaan dalam Al-Qur\'an (Lazim, Jaiz, Mustahab, Mamnu\', dll.)',
    duration: 'Panduan berhenti / terus membaca',
    exampleArabic: 'مـ · ج · قلى · صلى · ۘ · ۚ · ۗ',
    letters: 'ۘ ۙ ۚ ۖ ۗ ۛ ۜ ۞'
  }
];

/**
 * Tokenize Arabic verse text into tajwid segments while keeping original words intact
 */
export function renderTajwidColoredText(arabicText: string, isTajwidEnabled = true): React.ReactNode {
  if (!isTajwidEnabled || !arabicText) {
    return arabicText;
  }

  // Split text by whitespace to preserve word spacing and ligatures
  const words = arabicText.split(/(\s+)/);

  return words.map((word, wordIndex) => {
    // If it's pure whitespace, preserve it
    if (/^\s+$/.test(word)) {
      return <span key={wordIndex}>{word}</span>;
    }

    // Check rules on word level or sub-token level:
    // 1. Waqf signs
    if (/^[ۘۙۚۖۗۛۜ۞]$/.test(word)) {
      return (
        <span
          key={wordIndex}
          className="text-amber-500 dark:text-yellow-400 font-bold mx-0.5 inline"
          title="Tanda Waqaf"
        >
          {word}
        </span>
      );
    }

    // Process characters inside the word:
    // Regex for Tajwid patterns
    // - Mad Far'i: letters followed by maddah (~\u0653\u06E4)
    // - Ghunnah: [ن|م] with shaddah (\u0651)
    // - Qalqalah: [قطبجد] with sukun (\u0652)
    // - Iqlab: small mim (\u06E2|\u06ED) or [نًٌٍْ] + ب
    // - Ikhfa: [نًٌٍْ] followed by [تثجدذزسشصضطظفقك]
    // - Idgham: [نًٌٍْ] followed by [يرملون]
    // - Mad Thabii: [َٰ] followed by [ا] or [ِ] followed by [ي] or [ُ] followed by [و]

    // Use a tokenizing regular expression that captures key tajwid groups
    // \u0651 = shaddah, \u0652 = sukun, \u0653 = maddah above, \u06E4 = small high maddah
    // \u0670 = dagger alif, \u064B-\u064D = tanwin, \u06E2\u06ED = small high/low meem
    const tajwidRegex = /([\u0600-\u06FF]*?)([\u0600-\u06FF][\u0653\u06E4]|[\u0646\u0645][\u0651][\u064E\u064F\u0650\u064B\u064C\u064D]?|[قطبجد][\u0652]|[ن][\u0652\u06E2\u06ED]?[\u0628]|[\u064B\u064C\u064D][\u06E2\u06ED]?[\s]?[\u0628]|[\u06D6-\u06DC\u06DE\u06DF\u06E9\u06EA]|[\u0600-\u06FF][\u0670]|[\u064E][\u0627\u0649]|[\u0650][\u064A][\u0652]?|[\u064F][\u0648][\u0652]?)/gu;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    // Reset regex index
    tajwidRegex.lastIndex = 0;

    let subIndex = 0;
    while ((match = tajwidRegex.exec(word)) !== null) {
      const prefix = match[1];
      const matchedTajwid = match[2];
      const matchStart = match.index;

      // Add prefix before tajwid group if any
      if (prefix && prefix.length > 0) {
        parts.push(<span key={`${wordIndex}-p-${subIndex}`}>{prefix}</span>);
        subIndex++;
      }

      // Determine Tajwid classification of matchedTajwid
      let colorClass = '';
      let title = '';

      if (/[\u0653\u06E4~]/.test(matchedTajwid)) {
        // Mad Far'i / Wajib / Jaiz (Panjang 4-6 harakat)
        colorClass = 'text-red-600 dark:text-red-400 font-bold';
        title = 'Mad Wajib / Jaiz / Lazim (Panjang 4-6 Harakat)';
      } else if (/[\u0646\u0645][\u0651]/.test(matchedTajwid)) {
        // Ghunnah Musyaddadah
        colorClass = 'text-emerald-600 dark:text-emerald-400 font-bold';
        title = 'Ghunnah Musyaddadah (Dengung 2 Harakat)';
      } else if (/[قطبجد][\u0652]/.test(matchedTajwid)) {
        // Qalqalah
        colorClass = 'text-sky-600 dark:text-sky-400 font-bold';
        title = 'Qalqalah (Pantulan Suara)';
      } else if (/[\u06E2\u06ED]|[\u0628]/.test(matchedTajwid) && /[\u0646\u064B\u064C\u064D]/.test(matchedTajwid)) {
        // Iqlab
        colorClass = 'text-amber-600 dark:text-orange-400 font-bold';
        title = 'Iqlab (Tukar ke Mim & Dengung 2 Harakat)';
      } else if (/[\u06D6-\u06DC\u06DE\u06DF\u06E9\u06EA]/.test(matchedTajwid)) {
        // Tanda Waqaf
        colorClass = 'text-amber-500 dark:text-yellow-400 font-bold';
        title = 'Tanda Waqaf';
      } else if (/[\u0670]|[\u064E][\u0627\u0649]|[\u0650][\u064A]|[\u064F][\u0648]/.test(matchedTajwid)) {
        // Mad Thabi'i
        colorClass = 'text-rose-500/90 dark:text-rose-400';
        title = "Mad Thabi'i (Panjang 2 Harakat)";
      }

      if (colorClass) {
        parts.push(
          <span
            key={`${wordIndex}-t-${subIndex}`}
            className={`${colorClass} transition-colors duration-150`}
            title={title}
          >
            {matchedTajwid}
          </span>
        );
      } else {
        parts.push(<span key={`${wordIndex}-n-${subIndex}`}>{matchedTajwid}</span>);
      }

      subIndex++;
      lastIndex = tajwidRegex.lastIndex;
    }

    // Add remainder of word if any
    if (lastIndex < word.length) {
      parts.push(
        <span key={`${wordIndex}-rem-${subIndex}`}>{word.slice(lastIndex)}</span>
      );
    }

    // If no tajwid patterns were matched, return word as is
    if (parts.length === 0) {
      return <span key={wordIndex}>{word}</span>;
    }

    return (
      <span key={wordIndex} className="inline">
        {parts}
      </span>
    );
  });
}
