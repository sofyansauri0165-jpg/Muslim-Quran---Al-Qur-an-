import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, X, Volume2, VolumeX, RotateCcw } from 'lucide-react';
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
  duration,
  currentTime,
  onSeek,
  playbackRate,
  onChangePlaybackRate
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md text-white border-t border-stone-800 shadow-2xl transition-all">
      {/* Interactive Progress Scrub bar */}
      <div
        className="w-full h-1.5 bg-stone-800 hover:h-2.5 transition-all cursor-pointer relative group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
          onSeek(ratio * duration);
        }}
      >
        <div
          className="h-full bg-emerald-500 relative transition-all"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Surah & Reciter Info */}
        <div className="flex items-center gap-3 min-w-0 max-w-xs sm:max-w-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs shrink-0">
            {surahNumber}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-sm font-bold text-white truncate">
                QS. {surahName}
              </span>
              {ayahNumber && (
                <span className="text-xs text-emerald-400 font-mono font-medium shrink-0">
                  : {ayahNumber}
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-400 truncate">
              Qari: {reciter.name}
            </p>
          </div>
        </div>

        {/* Center: Controls & Time */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-3 sm:gap-4">
            {onPrev && (
              <button
                onClick={onPrev}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
                title="Ayat Sebelumnya"
                aria-label="Ayat Sebelumnya"
              >
                <SkipBack className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onTogglePlay}
              className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
              title={isPlaying ? 'Jeda Audio' : 'Lanjutkan Putar'}
              aria-label={isPlaying ? 'Jeda Audio' : 'Putar Audio'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            {onNext && (
              <button
                onClick={onNext}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
                title="Ayat Selanjutnya"
                aria-label="Ayat Selanjutnya"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-stone-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Rate & Close */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={cyclePlaybackRate}
            className="px-2 py-1 text-xs font-mono font-medium bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-md border border-stone-700 transition-colors"
            title="Kecepatan Putar"
          >
            {playbackRate}x
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors ml-1"
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
