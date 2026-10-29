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
import { Ayah, Bookmark, LastRead, SurahDetail, SurahSummary, TafsirDetail } from './types/quran';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SurahList } from './components/SurahList';
import { SurahReader } from './components/SurahReader';
import { TafsirModal } from './components/TafsirModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { PrayerTimesView } from './components/PrayerTimesView';
import { DoaAndDzikirView } from './components/DoaAndDzikirView';
import { AsmaulHusnaView } from './components/AsmaulHusnaView';
import { TasbihDigitalView } from './components/TasbihDigitalView';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { FloatingActions } from './components/FloatingActions';
import { FloatingMobileNav } from './components/FloatingMobileNav';
import { AdhanAudioPlayerModal } from './components/AdhanAudioPlayerModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState<'quran' | 'sholat' | 'doa' | 'asmaul' | 'tasbih'>('quran');
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'sepia'>(() => {
    return (localStorage.getItem('mq_theme') as 'light' | 'dark' | 'sepia') || 'light';
  });

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

  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Audio Element Setup
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const onPlay = () => setIsPlayingAudio(true);
    const onPause = () => setIsPlayingAudio(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      // If we are currently playing an individual ayah, auto-advance to next ayah!
      if (audioAyahNumber !== null && currentSurahDetail) {
        const nextAyahNum = audioAyahNumber + 1;
        if (nextAyahNum <= currentSurahDetail.jumlahAyat) {
          const nextAyah = currentSurahDetail.ayat.find((a) => a.nomorAyat === nextAyahNum);
          if (nextAyah) {
            handlePlayAyahAudio(currentSurahDetail.nomor, nextAyah, selectedReciter);
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
  }, [audioAyahNumber, currentSurahDetail, selectedReciter]);

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

  const handleNextAyahAudio = () => {
    if (audioAyahNumber !== null && currentSurahDetail) {
      const nextAyahNum = audioAyahNumber + 1;
      if (nextAyahNum <= currentSurahDetail.jumlahAyat) {
        const nextAyah = currentSurahDetail.ayat.find((a) => a.nomorAyat === nextAyahNum);
        if (nextAyah) {
          handlePlayAyahAudio(currentSurahDetail.nomor, nextAyah, selectedReciter);
        }
      }
    }
  };

  const handlePrevAyahAudio = () => {
    if (audioAyahNumber !== null && currentSurahDetail && audioAyahNumber > 1) {
      const prevAyahNum = audioAyahNumber - 1;
      const prevAyah = currentSurahDetail.ayat.find((a) => a.nomorAyat === prevAyahNum);
      if (prevAyah) {
        handlePlayAyahAudio(currentSurahDetail.nomor, prevAyah, selectedReciter);
      }
    }
  };

  const handleCloseAudio = () => {
    audioRef.current?.pause();
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
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 pb-24">
        {/* Tab 1: Al-Qur'an */}
        {activeTab === 'quran' && (
          <>
            {selectedSurahNumber === null ? (
              <>
                <HeroSection
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onSelectSurah={(num) => handleSelectSurah(num)}
                  lastRead={lastRead}
                  onOpenLastRead={handleOpenLastRead}
                  onOpenPrayerTimes={() => setActiveTab('sholat')}
                />
                <SurahList
                  surahs={surahs}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onSelectSurah={(num) => handleSelectSurah(num)}
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

        {/* Tab 3: Doa & Dzikir */}
        {activeTab === 'doa' && <DoaAndDzikirView />}

        {/* Tab 4: Asmaul Husna */}
        {activeTab === 'asmaul' && <AsmaulHusnaView />}

        {/* Tab 5: Tasbih Digital */}
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

      {/* Floating Bottom Mobile Navigation Dock */}
      <FloatingMobileNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'quran') setSelectedSurahNumber(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isAudioBarVisible={isAudioPlayerVisible}
        nextPrayerName={nextPrayerInfo?.name}
      />

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
          onNext={audioAyahNumber !== null ? handleNextAyahAudio : undefined}
          onPrev={audioAyahNumber !== null ? handlePrevAyahAudio : undefined}
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
    </div>
  );
}
