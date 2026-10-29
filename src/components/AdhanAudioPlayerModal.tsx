import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  BookOpen,
  Check,
  Sparkles,
  Headphones
} from 'lucide-react';
import { ADHAN_TRACKS, ADHAN_TEXTS, DOA_AFTER_ADHAN, AdhanTrack } from '../data/adhanData';

interface AdhanAudioPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrackId?: string;
  prayerNameContext?: string;
}

export const AdhanAudioPlayerModal: React.FC<AdhanAudioPlayerModalProps> = ({
  isOpen,
  onClose,
  defaultTrackId = 'makkah',
  prayerNameContext
}) => {
  const [selectedTrack, setSelectedTrack] = useState<AdhanTrack>(() => {
    const found = ADHAN_TRACKS.find((t) => t.id === defaultTrackId);
    return found || ADHAN_TRACKS[0];
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'teks' | 'doa'>('teks');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize or change audio source
  useEffect(() => {
    if (!isOpen) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.src = selectedTrack.audioUrl;
    audio.currentTime = 0;
    setCurrentTime(0);

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    audio.play().catch((err) => {
      console.warn('Auto-play blocked or audio load error:', err);
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [isOpen, selectedTrack]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const target = ratio * duration;
    audioRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-900">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Headphones className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <span>Audio Azan & Panduan Ibadah</span>
                {prayerNameContext && (
                  <span className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-md font-semibold">
                    Waktu {prayerNameContext}
                  </span>
                )}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Panggilan suci menghadap Allah Subhanahu wa Ta'ala
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              onClose();
            }}
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Banner & Track Selection */}
        <div className="p-5 bg-gradient-to-br from-emerald-900 via-stone-900 to-stone-950 text-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                Pilihan Suara Azan
              </div>
              <h4 className="text-lg font-bold text-white mt-0.5">
                {selectedTrack.title}
              </h4>
              <p className="text-xs text-stone-300">
                {selectedTrack.location} {selectedTrack.muadzin ? `· ${selectedTrack.muadzin}` : ''}
              </p>
            </div>

            {/* Track Switcher Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {ADHAN_TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors font-medium ${
                    selectedTrack.id === track.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-stone-200'
                  }`}
                >
                  {track.id === 'makkah' && 'Makkah'}
                  {track.id === 'madinah' && 'Madinah'}
                  {track.id === 'fajr' && 'Subuh (Fajr)'}
                  {track.id === 'alafasy' && 'Alafasy'}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Scrub Bar */}
          <div className="space-y-1.5 pt-1">
            <div
              onClick={handleSeek}
              className="w-full h-2 bg-white/20 hover:h-2.5 rounded-full overflow-hidden cursor-pointer transition-all"
            >
              <div
                className="h-full bg-emerald-400 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-stone-300 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Player Action Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold flex items-center justify-center shadow-lg transition-transform active:scale-95"
                title={isPlaying ? 'Jeda Audio' : 'Lanjutkan Putar'}
              >
                {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
              </button>

              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                  }
                }}
                className="p-2 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Ulangi dari Awal"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={toggleMute}
              className="p-2 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title={isMuted ? 'Nyalakan Suara' : 'Bisukan'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Content Navigation: Lafadz Azan vs Doa Sesudah Azan */}
        <div className="flex items-center border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('teks')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'teks'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Lafadz & Menjawab Azan
          </button>
          <button
            onClick={() => setActiveTab('doa')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'doa'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Doa Sesudah Azan
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'teks' ? (
            <div className="space-y-4">
              <div className="text-xs text-stone-500 dark:text-stone-400 italic">
                Sunnah: Ucapkanlah seperti apa yang diucapkan oleh muadzin, kecuali pada lafadz "Hayya 'alash-shalah" dan "Hayya 'alal-falah" dijawab dengan "Laa hawla wa laa quwwata illaa billaah".
              </div>

              {ADHAN_TEXTS.map((line, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <span>Lafadz Muadzin</span>
                    <span className="font-mono text-[11px] text-stone-400">#{idx + 1}</span>
                  </div>

                  <p className="font-arabic text-xl text-right text-stone-900 dark:text-white leading-loose" dir="rtl">
                    {line.arabic}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-300 italic">
                    {line.latin}
                  </p>
                  <p className="text-xs text-stone-800 dark:text-stone-200">
                    "{line.translation}"
                  </p>

                  <div className="mt-2 pt-2 border-t border-stone-200 dark:border-stone-700/60 bg-emerald-50/60 dark:bg-emerald-950/40 p-2.5 rounded-lg">
                    <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                      Jawaban Pendengar:
                    </span>
                    <p className="font-arabic text-lg text-right text-stone-900 dark:text-stone-100" dir="rtl">
                      {line.responseArabic}
                    </p>
                    <p className="text-xs text-stone-600 dark:text-stone-300 italic mt-0.5">
                      {line.responseLatin}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Doa Setelah Mendengar Azan</span>
                </div>

                <div className="py-2 text-right" dir="rtl">
                  <p className="font-arabic text-2xl text-stone-900 dark:text-white leading-loose">
                    {DOA_AFTER_ADHAN.arabic}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-700">
                  <p className="text-xs font-medium text-stone-600 dark:text-stone-300 italic leading-relaxed">
                    {DOA_AFTER_ADHAN.latin}
                  </p>
                  <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                    "{DOA_AFTER_ADHAN.translation}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-700 text-[11px] text-stone-500 dark:text-stone-400">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">Keutamaan: </span>
                  Barangsiapa membaca doa ini setelah mendengar azan, maka halal baginya syafaat Nabi Muhammad shallallahu 'alaihi wa sallam pada hari kiamat ({DOA_AFTER_ADHAN.source}).
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex justify-end">
          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              onClose();
            }}
            className="px-4 py-1.5 text-xs font-semibold bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
