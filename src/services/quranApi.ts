import { FALLBACK_SURAHS } from '../data/surahListFallback';
import { Bookmark, LastRead, SurahDetail, SurahSummary, TafsirDetail } from '../types/quran';

const SURAH_CACHE_KEY_PREFIX = 'mq_surah_';
const TAFSIR_CACHE_KEY_PREFIX = 'mq_tafsir_';
const BOOKMARKS_KEY = 'mq_bookmarks';
const LAST_READ_KEY = 'mq_last_read';

let memorySurahListCache: SurahSummary[] | null = null;

export async function fetchAllSurahs(): Promise<SurahSummary[]> {
  if (memorySurahListCache) {
    return memorySurahListCache;
  }

  // Check localStorage first
  try {
    const cached = localStorage.getItem('mq_surah_list');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length === 114) {
        memorySurahListCache = parsed;
        // background refresh
        refreshSurahListInBackground();
        return parsed;
      }
    }
  } catch (e) {
    console.warn('LocalStorage error reading surah list', e);
  }

  try {
    const response = await fetch('https://equran.id/api/v2/surat');
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    if (data && data.data && Array.isArray(data.data)) {
      memorySurahListCache = data.data;
      try {
        localStorage.setItem('mq_surah_list', JSON.stringify(data.data));
      } catch {
        // quota exceeded or private mode
      }
      return data.data;
    }
  } catch (error) {
    console.warn('Failed to fetch surah list from network, using local fallback:', error);
  }

  memorySurahListCache = FALLBACK_SURAHS;
  return FALLBACK_SURAHS;
}

async function refreshSurahListInBackground() {
  try {
    const response = await fetch('https://equran.id/api/v2/surat');
    if (response.ok) {
      const data = await response.json();
      if (data && data.data && Array.isArray(data.data)) {
        memorySurahListCache = data.data;
        localStorage.setItem('mq_surah_list', JSON.stringify(data.data));
      }
    }
  } catch {
    // quiet ignore
  }
}

export async function fetchSurahDetail(surahNumber: number): Promise<SurahDetail> {
  const cacheKey = `${SURAH_CACHE_KEY_PREFIX}${surahNumber}`;

  // Check local cache
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.ayat && parsed.ayat.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  try {
    const response = await fetch(`https://equran.id/api/v2/surat/${surahNumber}`);
    if (!response.ok) throw new Error(`Failed to fetch surah ${surahNumber}`);
    const res = await response.json();
    const detail: SurahDetail = res.data;

    try {
      localStorage.setItem(cacheKey, JSON.stringify(detail));
    } catch {
      // ignore quota
    }

    return detail;
  } catch (error) {
    console.error(`Error loading surah ${surahNumber}:`, error);
    throw error;
  }
}

export async function fetchTafsir(surahNumber: number): Promise<TafsirDetail> {
  const cacheKey = `${TAFSIR_CACHE_KEY_PREFIX}${surahNumber}`;

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // ignore
  }

  try {
    const response = await fetch(`https://equran.id/api/v2/tafsir/${surahNumber}`);
    if (!response.ok) throw new Error(`Failed to fetch tafsir ${surahNumber}`);
    const res = await response.json();
    const tafsir: TafsirDetail = res.data;

    try {
      localStorage.setItem(cacheKey, JSON.stringify(tafsir));
    } catch {
      // ignore
    }

    return tafsir;
  } catch (error) {
    console.error(`Error loading tafsir ${surahNumber}:`, error);
    throw error;
  }
}

export function getBookmarks(): Bookmark[] {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveBookmark(bookmark: Omit<Bookmark, 'id' | 'timestamp'>): Bookmark[] {
  const current = getBookmarks();
  const id = `${bookmark.surahNumber}:${bookmark.ayahNumber}`;
  const filtered = current.filter(b => b.id !== id);
  const updated: Bookmark[] = [
    { ...bookmark, id, timestamp: Date.now() },
    ...filtered
  ];
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return updated;
}

export function removeBookmark(id: string): Bookmark[] {
  const current = getBookmarks();
  const updated = current.filter(b => b.id !== id);
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return updated;
}

export function isAyahBookmarked(surahNumber: number, ayahNumber: number): boolean {
  const id = `${surahNumber}:${ayahNumber}`;
  const current = getBookmarks();
  return current.some(b => b.id === id);
}

export function getLastRead(): LastRead | null {
  try {
    const data = localStorage.getItem(LAST_READ_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveLastRead(lastRead: LastRead): void {
  try {
    localStorage.setItem(LAST_READ_KEY, JSON.stringify(lastRead));
  } catch {
    // ignore
  }
}
