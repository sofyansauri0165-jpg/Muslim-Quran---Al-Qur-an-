import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  X,
  Volume2,
  VolumeX,
  Repeat
} from 'lucide-react';
import { RECITERS } from '../types/quran';

interface AudioPlayerBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onClose: () => void;
  surahName: string;
  surahNumber: number;
  ayahNumber?: number | null;
  reciterId: string;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  duration: number;
  currentTime: number;
  onSeek: (seconds: number) => void;
  playbackRate: number;
  onChangePlaybackRate: (rate: number) => void;
  autoNextSurah?: boolean;
  onToggleAutoNextSurah?: () => void;
  nextSurahName?: string;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onClose,
  surahName,
  surahNumber,
  ayahNumber,
  reciterId,
  audioRef,
  duration,
  currentTime,
  onSeek,
  playbackRate,
  onChangePlaybackRate,
  autoNextSurah = true,
  onToggleAutoNextSurah,
  nextSurahName
}) => {
  const [isMuted, setIsMuted] = useState(false);

  const reciter = RECITERS.find((r) => r.id === reciterId) || RECITERS[0];

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const cyclePlaybackRate = () => {
    const rates = [0.75, 1.0, 1.25, 1.5];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    onChangePlaybackRate(rates[nextIndex]);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900/98 backdrop-blur-md text-white border-t border-stone-800 shadow-2xl transition-all">
      {/* Interactive Progress Scrub bar */}
      <div
        className="w-full h-1.5 bg-stone-800 hover:h-2.5 transition-all cursor-pointer relative group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
          onSeek(ratio * duration);
        }}
        title="Klik untuk geser durasi audio"
      >
        <div
          className="h-full bg-emerald-500 relative transition-all"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Surah & Reciter Info */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 max-w-[200px] sm:max-w-xs md:max-w-sm">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs shrink-0 shadow-xs">
            {surahNumber}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-xs sm:text-sm font-bold text-white truncate">
                QS. {surahName}
              </span>
              {ayahNumber && (
                <span className="text-[11px] sm:text-xs text-emerald-400 font-mono font-medium shrink-0">
                  : {ayahNumber}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-[10px] sm:text-[11px] text-stone-400 truncate">
                Qari: {reciter.name}
              </p>
              {autoNextSurah && nextSurahName && (
                <span className="hidden lg:inline-flex items-center text-[10px] text-emerald-300 bg-emerald-950/70 px-1.5 py-0.2 rounded border border-emerald-800/60 truncate">
                  Lanjut: QS. {nextSurahName}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: Controls, Time & Auto-Next Toggle */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 sm:gap-3">
            {onPrev && (
              <button
                onClick={onPrev}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                title={ayahNumber ? 'Ayat Sebelumnya' : 'Surat Sebelumnya'}
                aria-label={ayahNumber ? 'Ayat Sebelumnya' : 'Surat Sebelumnya'}
              >
                <SkipBack className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onTogglePlay}
              className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
              title={isPlaying ? 'Jeda Audio' : 'Lanjutkan Putar'}
              aria-label={isPlaying ? 'Jeda Audio' : 'Putar Audio'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            {onNext && (
              <button
                onClick={onNext}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                title={ayahNumber ? 'Ayat Selanjutnya' : 'Surat Selanjutnya'}
                aria-label={ayahNumber ? 'Ayat Selanjutnya' : 'Surat Selanjutnya'}
              >
                <SkipForward className="w-4 h-4" />
              </button>
            )}

            {/* Auto-Next Surah Toggle Button */}
            {onToggleAutoNextSurah && (
              <button
                onClick={onToggleAutoNextSurah}
                className={`ml-1 px-2 py-1 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  autoNextSurah
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 shadow-xs'
                    : 'bg-stone-800/80 text-stone-400 hover:text-stone-200 border border-stone-700'
                }`}
                title={
                  autoNextSurah
                    ? 'Otomatis lanjut ke surat berikutnya AKTIF (Klik untuk mematikan)'
                    : 'Otomatis lanjut ke surat berikutnya NONAKTIF (Klik untuk mengaktifkan)'
                }
              >
                <Repeat className={`w-3.5 h-3.5 ${autoNextSurah ? 'text-emerald-400' : 'text-stone-400'}`} />
                <span className="hidden sm:inline text-[11px] font-semibold">
                  Auto Lanjut Surat {autoNextSurah ? 'ON' : 'OFF'}
                </span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-stone-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Mute, Rate & Close */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={toggleMute}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            aria-label={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={cyclePlaybackRate}
            className="px-2 py-1 text-xs font-mono font-medium bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-md border border-stone-700 transition-colors"
            title="Kecepatan Putar"
          >
            {playbackRate}x
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors ml-0.5 sm:ml-1"
            title="Tutup Pemutar"
            aria-label="Tutup Pemutar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
