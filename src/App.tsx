import React, { useState, useEffect, useRef } from 'react';
import {
  fetchAllSurahs,
  fetchSurahDetail,
  fetchTafsir,
  getBookmarks,
  saveBookmark,
  removeBookmark,
  isAyahBookmarked,
  getLastRead,
  saveLastRead
} from './services/quranApi';
import {
  fetchPrayerTimesForCity,
  INDONESIAN_CITIES,
  getNextPrayer
} from './services/prayerTimes';
import { Ayah, Bookmark, LastRead, SurahDetail, SurahSummary, TafsirDetail, AppTab } from './types/quran';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { QuranHeroHeader } from './components/QuranHeroHeader';
import { SurahList } from './components/SurahList';
import { SurahReader } from './components/SurahReader';
import { TafsirModal } from './components/TafsirModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { PrayerTimesView } from './components/PrayerTimesView';
import { TajwidView } from './components/TajwidView';
import { QiblaCompassView } from './components/QiblaCompassView';
import { IslamicCalendarView } from './components/IslamicCalendarView';
import { DoaAndDzikirView } from './components/DoaAndDzikirView';
import { AsmaulHusnaView } from './components/AsmaulHusnaView';
import { TasbihDigitalView } from './components/TasbihDigitalView';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { FloatingActions } from './components/FloatingActions';
import { FloatingMobileNav } from './components/FloatingMobileNav';
import { AdhanAudioPlayerModal } from './components/AdhanAudioPlayerModal';
import { Footer } from './components/Footer';
import { usePWAInstall } from './hooks/usePWAInstall';
import { PWAInstallModal } from './components/PWAInstallModal';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'sepia'>(() => {
    return (localStorage.getItem('mq_theme') as 'light' | 'dark' | 'sepia') || 'light';
  });

  // PWA Install State & Hook
  const {
    isInstallable,
    isInstalled,
    isStandalone,
    isIOS,
    isOnline,
    showIOSModal,
    triggerInstall,
    closeIOSModal,
  } = usePWAInstall();
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Surah Data
  const [surahs, setSurahs] = useState<SurahSummary[]>([]);
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(null);
  const [currentSurahDetail, setCurrentSurahDetail] = useState<SurahDetail | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [initialAyahScroll, setInitialAyahScroll] = useState<number | null>(null);

  // Tafsir Modal
  const [isTafsirOpen, setIsTafsirOpen] = useState<boolean>(false);
  const [tafsirDetail, setTafsirDetail] = useState<TafsirDetail | null>(null);
  const [isLoadingTafsir, setIsLoadingTafsir] = useState<boolean>(false);
  const [tafsirAyahTarget, setTafsirAyahTarget] = useState<number | undefined>(undefined);

  // Bookmarks & Last Read
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  const [isBookmarksDrawerOpen, setIsBookmarksDrawerOpen] = useState<boolean>(false);

  // Prayer Info for Navbar & Floating Widget
  const [nextPrayerInfo, setNextPrayerInfo] = useState<{
    name: string;
    time: string;
    formattedCountdown: string;
  } | null>(null);
  const [isGlobalAdhanModalOpen, setIsGlobalAdhanModalOpen] = useState<boolean>(false);

  // Audio Playback
  const [selectedReciter, setSelectedReciter] = useState<string>(() => {
    return localStorage.getItem('mq_reciter') || '05'; // default Misyari Rasyid
  });
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSurahNumber, setAudioSurahNumber] = useState<number | null>(null);
  const [audioSurahName, setAudioSurahName] = useState<string>('');
  const [audioAyahNumber, setAudioAyahNumber] = useState<number | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isAudioPlayerVisible, setIsAudioPlayerVisible] = useState<boolean>(false);
  const [autoNextSurah, setAutoNextSurah] = useState<boolean>(() => {
    const saved = localStorage.getItem('mq_auto_next_surah');
    return saved !== null ? saved === 'true' : true;
  });
  const [audioToast, setAudioToast] = useState<string | null>(null);
  const audioToastTimeoutRef = useRef<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const showAudioToast = (msg: string) => {
    if (audioToastTimeoutRef.current) {
      clearTimeout(audioToastTimeoutRef.current);
    }
    setAudioToast(msg);
    audioToastTimeoutRef.current = window.setTimeout(() => {
      setAudioToast(null);
    }, 3500);
  };

  // Keep a fresh reference to audio state for ended/time event handlers
  const audioStateRef = useRef({
    audioSurahNumber,
    audioAyahNumber,
    currentSurahDetail,
    selectedReciter,
    autoNextSurah,
    surahs,
    selectedSurahNumber,
    playbackRate,
    currentTime
  });

  useEffect(() => {
    audioStateRef.current = {
      audioSurahNumber,
      audioAyahNumber,
      currentSurahDetail,
      selectedReciter,
      autoNextSurah,
      surahs,
      selectedSurahNumber,
      playbackRate,
      currentTime
    };
  });

  useEffect(() => {
    localStorage.setItem('mq_auto_next_surah', String(autoNextSurah));
  }, [autoNextSurah]);

  // Apply Theme Mode
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-sepia');
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else if (themeMode === 'sepia') {
      root.classList.add('theme-sepia');
    }
    localStorage.setItem('mq_theme', themeMode);
  }, [themeMode]);

  // Save selected reciter
  useEffect(() => {
    localStorage.setItem('mq_reciter', selectedReciter);
  }, [selectedReciter]);

  // Load Initial Surahs, Bookmarks, and Prayer Times
  useEffect(() => {
    fetchAllSurahs().then(setSurahs);
    setBookmarks(getBookmarks());
    setLastRead(getLastRead());

    fetchPrayerTimesForCity(INDONESIAN_CITIES[0]).then((timings) => {
      const np = getNextPrayer(timings);
      setNextPrayerInfo(np);
    });
  }, []);

  // Update Prayer info ticker every minute
  useEffect(() => {
    const timer = setInterval(() => {
      fetchPrayerTimesForCity(INDONESIAN_CITIES[0]).then((timings) => {
        const np = getNextPrayer(timings);
        setNextPrayerInfo(np);
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Audio Element Setup & Auto-Advance to Next Surah
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const onPlay = () => setIsPlayingAudio(true);
    const onPause = () => setIsPlayingAudio(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);

    const onEnded = async () => {
      const state = audioStateRef.current;
      const {
        audioSurahNumber: currentSurahNum,
        audioAyahNumber: currentAyahNum,
        currentSurahDetail: detail,
        selectedReciter: reciter,
        autoNextSurah: shouldAutoNext,
        surahs: allSurahs,
        selectedSurahNumber: openSurahNum
      } = state;

      // Mode 1: Ayah-by-ayah playback
      if (currentAyahNum !== null && currentSurahNum !== null) {
        if (detail && detail.nomor === currentSurahNum) {
          const nextAyahNum = currentAyahNum + 1;
          if (nextAyahNum <= detail.jumlahAyat) {
            const nextAyah = detail.ayat.find((a) => a.nomorAyat === nextAyahNum);
            if (nextAyah) {
              handlePlayAyahAudio(detail.nomor, nextAyah, reciter);
              return;
            }
          }
        }

        // Reached end of current surah in ayah mode -> Auto next surah
        if (shouldAutoNext && currentSurahNum < 114) {
          const nextSurahNum = currentSurahNum + 1;
          try {
            const nextDetail = await fetchSurahDetail(nextSurahNum);
            if (nextDetail && nextDetail.ayat && nextDetail.ayat.length > 0) {
              showAudioToast(`Melanjutkan ke QS. ${nextDetail.namaLatin}`);
              if (openSurahNum !== null) {
                setSelectedSurahNumber(nextSurahNum);
                setCurrentSurahDetail(nextDetail);
                setInitialAyahScroll(1);
              }
              handlePlayAyahAudio(nextSurahNum, nextDetail.ayat[0], reciter);
              return;
            }
          } catch (err) {
            console.error('Failed to auto-advance to next surah (ayah mode):', err);
          }
        }
      }

      // Mode 2: Full Surah playback (currentAyahNum === null)
      if (currentAyahNum === null && currentSurahNum !== null) {
        if (shouldAutoNext && currentSurahNum < 114) {
          const nextSurahNum = currentSurahNum + 1;
          let nextSurah = allSurahs.find((s) => s.nomor === nextSurahNum);
          if (!nextSurah) {
            try {
              const fetched = await fetchAllSurahs();
              nextSurah = fetched.find((s) => s.nomor === nextSurahNum);
            } catch {
              // ignore
            }
          }

          if (nextSurah) {
            showAudioToast(`Melanjutkan ke QS. ${nextSurah.namaLatin}`);
            if (openSurahNum !== null) {
              handleSelectSurah(nextSurahNum);
            }
            handlePlayFullSurah(nextSurah, reciter);
            return;
          }
        }
      }

      setIsPlayingAudio(false);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Load Surah Detail when selected
  const handleSelectSurah = async (surahNumber: number, targetAyah?: number) => {
    setSelectedSurahNumber(surahNumber);
    setIsLoadingSurah(true);
    setActiveTab('quran');

    try {
      const detail = await fetchSurahDetail(surahNumber);
      setCurrentSurahDetail(detail);
      if (targetAyah) {
        setInitialAyahScroll(targetAyah);
      } else {
        setInitialAyahScroll(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Failed to load surah detail:', err);
    } finally {
      setIsLoadingSurah(false);
    }
  };

  // Open Last Read
  const handleOpenLastRead = () => {
    if (lastRead) {
      handleSelectSurah(lastRead.surahNumber, lastRead.ayahNumber);
    }
  };

  // Set Last Read
  const handleSetLastRead = (surahNumber: number, surahName: string, ayahNumber: number) => {
    const lr: LastRead = {
      surahNumber,
      surahName,
      ayahNumber,
      timestamp: Date.now()
    };
    saveLastRead(lr);
    setLastRead(lr);
  };

  // Toggle Bookmark
  const handleToggleBookmark = (surah: SurahDetail, ayah: Ayah) => {
    const bookmarked = isAyahBookmarked(surah.nomor, ayah.nomorAyat);
    if (bookmarked) {
      const id = `${surah.nomor}:${ayah.nomorAyat}`;
      const updated = removeBookmark(id);
      setBookmarks(updated);
    } else {
      const updated = saveBookmark({
        surahNumber: surah.nomor,
        surahName: surah.namaLatin,
        ayahNumber: ayah.nomorAyat,
        ayahArabic: ayah.teksArab,
        ayahTranslation: ayah.teksIndonesia
      });
      setBookmarks(updated);
    }
  };

  const handleRemoveBookmark = (id: string) => {
    const updated = removeBookmark(id);
    setBookmarks(updated);
  };

  // Tafsir Handler
  const handleOpenTafsir = async (surahNumber: number, ayahNumber?: number) => {
    setIsTafsirOpen(true);
    setTafsirAyahTarget(ayahNumber);
    setIsLoadingTafsir(true);
    try {
      const tafsir = await fetchTafsir(surahNumber);
      setTafsirDetail(tafsir);
    } catch (err) {
      console.error('Failed to load tafsir:', err);
    } finally {
      setIsLoadingTafsir(false);
    }
  };

  // Play single Ayah Audio
  const handlePlayAyahAudio = (surahNumber: number, ayah: Ayah, reciterId: string) => {
    if (!audioRef.current) return;
    const audioUrl = ayah.audio[reciterId] || ayah.audio['05'] || Object.values(ayah.audio)[0];
    if (!audioUrl) return;

    const currentSurah = surahs.find((s) => s.nomor === surahNumber);
    setAudioSurahNumber(surahNumber);
    setAudioSurahName(currentSurah?.namaLatin || `Surat ${surahNumber}`);
    setAudioAyahNumber(ayah.nomorAyat);
    setIsAudioPlayerVisible(true);

    audioRef.current.src = audioUrl;
    audioRef.current.playbackRate = playbackRate;
    audioRef.current.play().catch((e) => console.warn('Audio play error:', e));
  };

  // Play full Surah Audio
  const handlePlayFullSurah = (surah: SurahSummary, reciterId: string) => {
    if (!audioRef.current || !surah.audioFull) return;
    const audioUrl = surah.audioFull[reciterId] || surah.audioFull['05'] || Object.values(surah.audioFull)[0];
    if (!audioUrl) return;

    setAudioSurahNumber(surah.nomor);
    setAudioSurahName(surah.namaLatin);
    setAudioAyahNumber(null);
    setIsAudioPlayerVisible(true);

    audioRef.current.src = audioUrl;
    audioRef.current.playbackRate = playbackRate;
    audioRef.current.play().catch((e) => console.warn('Audio play error:', e));
  };

  const handlePauseAudio = () => {
    audioRef.current?.pause();
  };

  const handleResumeAudio = () => {
    audioRef.current?.play().catch(() => {});
  };

  const handleSeek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
    }
  };

  const handleChangePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleNextAudio = async () => {
    const state = audioStateRef.current;
    const {
      audioSurahNumber: currentSurahNum,
      audioAyahNumber: currentAyahNum,
      currentSurahDetail: detail,
      selectedReciter: reciter,
      surahs: allSurahs,
      selectedSurahNumber: openSurahNum
    } = state;

    if (!currentSurahNum) return;

    // Ayah mode
    if (currentAyahNum !== null) {
      if (detail && detail.nomor === currentSurahNum) {
        const nextAyahNum = currentAyahNum + 1;
        if (nextAyahNum <= detail.jumlahAyat) {
          const nextAyah = detail.ayat.find((a) => a.nomorAyat === nextAyahNum);
          if (nextAyah) {
            handlePlayAyahAudio(detail.nomor, nextAyah, reciter);
            return;
          }
        }
      }

      // Reached last ayah -> advance to next surah ayah 1
      if (currentSurahNum < 114) {
        const nextSurahNum = currentSurahNum + 1;
        try {
          const nextDetail = await fetchSurahDetail(nextSurahNum);
          if (nextDetail && nextDetail.ayat && nextDetail.ayat.length > 0) {
            showAudioToast(`Memutar QS. ${nextDetail.namaLatin}`);
            if (openSurahNum !== null) {
              setSelectedSurahNumber(nextSurahNum);
              setCurrentSurahDetail(nextDetail);
              setInitialAyahScroll(1);
            }
            handlePlayAyahAudio(nextSurahNum, nextDetail.ayat[0], reciter);
          }
        } catch (e) {
          console.error('Next audio error:', e);
        }
      }
      return;
    }

    // Full surah mode
    if (currentSurahNum < 114) {
      const nextSurahNum = currentSurahNum + 1;
      let nextSurah = allSurahs.find((s) => s.nomor === nextSurahNum);
      if (!nextSurah) {
        try {
          const fetched = await fetchAllSurahs();
          nextSurah = fetched.find((s) => s.nomor === nextSurahNum);
        } catch {}
      }
      if (nextSurah) {
        showAudioToast(`Memutar QS. ${nextSurah.namaLatin}`);
        if (openSurahNum !== null) {
          handleSelectSurah(nextSurahNum);
        }
        handlePlayFullSurah(nextSurah, reciter);
      }
    }
  };

  const handlePrevAudio = async () => {
    const state = audioStateRef.current;
    const {
      audioSurahNumber: currentSurahNum,
      audioAyahNumber: currentAyahNum,
      currentSurahDetail: detail,
      selectedReciter: reciter,
      surahs: allSurahs,
      selectedSurahNumber: openSurahNum,
      currentTime: currTime
    } = state;

    if (!currentSurahNum) return;

    // Ayah mode
    if (currentAyahNum !== null) {
      if (currentAyahNum > 1 && detail && detail.nomor === currentSurahNum) {
        const prevAyahNum = currentAyahNum - 1;
        const prevAyah = detail.ayat.find((a) => a.nomorAyat === prevAyahNum);
        if (prevAyah) {
          handlePlayAyahAudio(detail.nomor, prevAyah, reciter);
          return;
        }
      }

      // If at first ayah, move to previous surah's last ayah
      if (currentSurahNum > 1) {
        const prevSurahNum = currentSurahNum - 1;
        try {
          const prevDetail = await fetchSurahDetail(prevSurahNum);
          if (prevDetail && prevDetail.ayat && prevDetail.ayat.length > 0) {
            const lastAyah = prevDetail.ayat[prevDetail.ayat.length - 1];
            showAudioToast(`Memutar QS. ${prevDetail.namaLatin}`);
            if (openSurahNum !== null) {
              setSelectedSurahNumber(prevSurahNum);
              setCurrentSurahDetail(prevDetail);
              setInitialAyahScroll(lastAyah.nomorAyat);
            }
            handlePlayAyahAudio(prevSurahNum, lastAyah, reciter);
          }
        } catch (e) {
          console.error('Prev audio error:', e);
        }
      }
      return;
    }

    // Full surah mode: restart if played > 4s or if on first surah
    if (currTime > 4 || currentSurahNum === 1) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      return;
    }

    // Go to previous surah
    if (currentSurahNum > 1) {
      const prevSurahNum = currentSurahNum - 1;
      let prevSurah = allSurahs.find((s) => s.nomor === prevSurahNum);
      if (!prevSurah) {
        try {
          const fetched = await fetchAllSurahs();
          prevSurah = fetched.find((s) => s.nomor === prevSurahNum);
        } catch {}
      }
      if (prevSurah) {
        showAudioToast(`Memutar QS. ${prevSurah.namaLatin}`);
        if (openSurahNum !== null) {
          handleSelectSurah(prevSurahNum);
        }
        handlePlayFullSurah(prevSurah, reciter);
      }
    }
  };

  const handleCloseAudio = () => {
    audioRef.current?.pause();
    setIsPlayingAudio(false);
    setIsAudioPlayerVisible(false);
    setAudioSurahNumber(null);
    setAudioAyahNumber(null);
  };

  const bookmarkedSurahNumbers = Array.from(new Set(bookmarks.map((b) => b.surahNumber)));

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors duration-200 relative pb-16 md:pb-0">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'quran') {
            setSelectedSurahNumber(null);
          }
        }}
        isDarkMode={themeMode === 'dark'}
        setIsDarkMode={(val) => setThemeMode(typeof val === 'function' ? (val(themeMode === 'dark') ? 'dark' : 'light') : (val ? 'dark' : 'light'))}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        lastRead={lastRead}
        onOpenLastRead={handleOpenLastRead}
        onOpenBookmarks={() => setIsBookmarksDrawerOpen(true)}
        bookmarksCount={bookmarks.length}
        onOpenAdhanModal={() => setIsGlobalAdhanModalOpen(true)}
        nextPrayerName={nextPrayerInfo?.name}
        nextPrayerTime={nextPrayerInfo?.time}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        isInstalled={isInstalled}
        isStandalone={isStandalone}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 pb-24">
        {/* Tab 0: Home (Beranda Islami Terpadu: Foto Madinah, Kalender, Tasbih, Jam Sholat, Tajwid, Doa) */}
        {activeTab === 'home' && (
          <HomeView
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              if (tab !== 'quran') setSelectedSurahNumber(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSurah={(num, targetAyah) => {
              setActiveTab('quran');
              handleSelectSurah(num, targetAyah);
            }}
            lastRead={lastRead}
            onOpenLastRead={handleOpenLastRead}
            onOpenAdhanModal={() => setIsGlobalAdhanModalOpen(true)}
            nextPrayerInfo={nextPrayerInfo}
            onSearchInQuran={(query) => {
              setSearchQuery(query);
              setActiveTab('quran');
              setSelectedSurahNumber(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            isStandalone={isStandalone}
            isIOS={isIOS}
          />
        )}

        {/* Tab 1: Al-Qur'an (Dedicated Mushaf Digital: 114 Surat, 30 Juz, Tafsir, Audio Murottal) */}
        {activeTab === 'quran' && (
          <>
            {selectedSurahNumber === null ? (
              <>
                <QuranHeroHeader
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onSelectSurah={(num) => handleSelectSurah(num)}
                  lastRead={lastRead}
                  onOpenLastRead={handleOpenLastRead}
                />
                <SurahList
                  surahs={surahs}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onSelectSurah={(num, targetAyah) => handleSelectSurah(num, targetAyah)}
                  currentlyPlayingSurah={audioSurahNumber}
                  isPlayingAudio={isPlayingAudio}
                  onTogglePlaySurah={(surah) => {
                    if (audioSurahNumber === surah.nomor && isPlayingAudio) {
                      handlePauseAudio();
                    } else {
                      handlePlayFullSurah(surah, selectedReciter);
                    }
                  }}
                  bookmarkedSurahNumbers={bookmarkedSurahNumbers}
                />
              </>
            ) : isLoadingSurah || !currentSurahDetail ? (
              <div className="py-24 text-center space-y-4">
                <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
                  Memuat ayat-ayat suci Al-Qur'an...
                </p>
              </div>
            ) : (
              <SurahReader
                surah={currentSurahDetail}
                onBack={() => {
                  setSelectedSurahNumber(null);
                  setCurrentSurahDetail(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectSurah={(num) => handleSelectSurah(num)}
                onOpenTafsir={handleOpenTafsir}
                currentlyPlayingSurah={audioSurahNumber}
                currentlyPlayingAyah={audioAyahNumber}
                isPlayingAudio={isPlayingAudio}
                onPlayAyahAudio={handlePlayAyahAudio}
                onPlayFullSurah={(s, r) => handlePlayFullSurah(s, r)}
                onPauseAudio={handlePauseAudio}
                selectedReciter={selectedReciter}
                setSelectedReciter={setSelectedReciter}
                isBookmarked={isAyahBookmarked}
                onToggleBookmark={handleToggleBookmark}
                onSetLastRead={handleSetLastRead}
                initialAyahToScroll={initialAyahScroll}
              />
            )}
          </>
        )}

        {/* Tab 2: Jadwal Sholat */}
        {activeTab === 'sholat' && <PrayerTimesView />}

        {/* Tab 3: Panduan & Kuis Ilmu Tajwid */}
        {activeTab === 'tajwid' && <TajwidView />}

        {/* Tab 4: Arah Kiblat */}
        {activeTab === 'kiblat' && <QiblaCompassView />}

        {/* Tab 5: Kalender Hijriah & Hari Besar */}
        {activeTab === 'kalender' && <IslamicCalendarView />}

        {/* Tab 6: Doa & Dzikir */}
        {activeTab === 'doa' && <DoaAndDzikirView />}

        {/* Tab 7: Asmaul Husna */}
        {activeTab === 'asmaul' && <AsmaulHusnaView />}

        {/* Tab 8: Tasbih Digital */}
        {activeTab === 'tasbih' && <TasbihDigitalView />}
      </main>

      {/* Floating Speed Dial & Quick Action Widget */}
      <FloatingActions
        onOpenLastRead={handleOpenLastRead}
        lastRead={lastRead}
        onOpenAdhan={() => setIsGlobalAdhanModalOpen(true)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'quran') setSelectedSurahNumber(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isAudioBarVisible={isAudioPlayerVisible}
        nextPrayerName={nextPrayerInfo?.name}
        nextPrayerCountdown={nextPrayerInfo?.formattedCountdown}
        themeMode={themeMode}
        onToggleTheme={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
      />

      {/* Floating Bottom Navigation Dock (Strictly 3 Modes: Quran, Home, Jam Sholat) */}
      <FloatingMobileNav
        activeTab={activeTab}
        isSurahOpen={selectedSurahNumber !== null}
        onSelectMode={(mode) => {
          if (mode === 'quran') {
            setActiveTab('quran');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (mode === 'home') {
            setActiveTab('home');
            setSelectedSurahNumber(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (mode === 'sholat') {
            setActiveTab('sholat');
            setSelectedSurahNumber(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        isAudioBarVisible={isAudioPlayerVisible}
        nextPrayerName={nextPrayerInfo?.name}
        nextPrayerTime={nextPrayerInfo?.time}
      />

      {/* Floating Auto-Next Surah Toast / Alert */}
      {audioToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 animate-bounce">
          <div className="bg-emerald-900/95 text-white border border-emerald-400/60 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold ring-2 ring-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{audioToast}</span>
          </div>
        </div>
      )}

      {/* Tafsir Modal */}
      {isTafsirOpen && (
        <TafsirModal
          tafsir={tafsirDetail}
          isLoading={isLoadingTafsir}
          onClose={() => {
            setIsTafsirOpen(false);
            setTafsirDetail(null);
          }}
          selectedAyahNumber={tafsirAyahTarget}
        />
      )}

      {/* Bookmarks & History Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksDrawerOpen}
        onClose={() => setIsBookmarksDrawerOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
        onOpenAyah={(surahNum, ayahNum) => {
          handleSelectSurah(surahNum, ayahNum);
        }}
        lastRead={lastRead}
        onOpenLastRead={handleOpenLastRead}
      />

      {/* Global Adhan Audio Player Modal */}
      <AdhanAudioPlayerModal
        isOpen={isGlobalAdhanModalOpen}
        onClose={() => setIsGlobalAdhanModalOpen(false)}
        prayerNameContext={nextPrayerInfo?.name || 'Waktu Sholat'}
      />

      {/* Sticky Bottom Audio Player Bar */}
      {isAudioPlayerVisible && audioSurahNumber && (
        <AudioPlayerBar
          isPlaying={isPlayingAudio}
          onTogglePlay={isPlayingAudio ? handlePauseAudio : handleResumeAudio}
          onNext={handleNextAudio}
          onPrev={handlePrevAudio}
          onClose={handleCloseAudio}
          surahName={audioSurahName}
          surahNumber={audioSurahNumber}
          ayahNumber={audioAyahNumber}
          reciterId={selectedReciter}
          audioRef={audioRef}
          duration={duration}
          currentTime={currentTime}
          onSeek={handleSeek}
          playbackRate={playbackRate}
          onChangePlaybackRate={handleChangePlaybackRate}
          autoNextSurah={autoNextSurah}
          onToggleAutoNextSurah={() => setAutoNextSurah(!autoNextSurah)}
          nextSurahName={
            audioSurahNumber < 114
              ? surahs.find((s) => s.nomor === audioSurahNumber + 1)?.namaLatin
              : undefined
          }
        />
      )}

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'quran') setSelectedSurahNumber(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* PWA Install Modal for Android & iPhone */}
      <PWAInstallModal
        isOpen={isInstallModalOpen || showIOSModal}
        onClose={() => {
          setIsInstallModalOpen(false);
          closeIOSModal();
        }}
        onDirectInstall={triggerInstall}
        isIOS={isIOS}
        canDirectInstall={!isIOS && isInstallable}
      />

      {/* Offline Status Badge */}
      <OfflineIndicator isOnline={isOnline} />
    </div>
  );
}
