import React, { useState } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles, Plus, Award } from 'lucide-react';

interface DhikrPreset {
  id: string;
  arabic: string;
  latin: string;
  target: number;
}

const PRESETS: DhikrPreset[] = [
  { id: 'subhanallah', arabic: 'سُبْحَانَ اللَّهِ', latin: 'Subhanallah', target: 33 },
  { id: 'alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', latin: 'Alhamdulillah', target: 33 },
  { id: 'allahuakbar', arabic: 'اللَّهُ أَكْبَرُ', latin: 'Allahu Akbar', target: 33 },
  { id: 'astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', latin: 'Astaghfirullah', target: 100 },
  { id: 'tahlil', arabic: 'لَا إِلَهَ إِلَّا اللَّهُ', latin: 'Laa ilaaha illallaah', target: 100 },
  { id: 'shalawat', arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ', latin: 'Allahumma Shalli Ala Sayyidina Muhammad', target: 100 }
];

export const TasbihDigitalView: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<DhikrPreset>(PRESETS[0]);
  const [count, setCount] = useState<number>(0);
  const [completedRounds, setCompletedRounds] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const handleTap = () => {
    const nextCount = count + 1;

    // Haptic feedback
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(nextCount % selectedPreset.target === 0 ? [50, 50, 50] : 30);
    }

    // Audio click sound synth
    if (soundEnabled && typeof window !== 'undefined' && window.AudioContext) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(nextCount % selectedPreset.target === 0 ? 880 : 440, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } catch {
        // ignore audio failure
      }
    }

    if (nextCount >= selectedPreset.target) {
      setCount(0);
      setCompletedRounds((prev) => prev + 1);
    } else {
      setCount(nextCount);
    }
  };

  const handleReset = () => {
    setCount(0);
    setCompletedRounds(0);
  };

  const progressPercent = (count / selectedPreset.target) * 100;

  return (
    <div className="max-w-md mx-auto py-4 space-y-6">
      {/* Dhikr Selector Bar */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-xs">
        <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-2">
          Pilih Kalimat Dzikir:
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPreset(p);
                setCount(0);
              }}
              className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-colors ${
                selectedPreset.id === p.id
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-semibold'
                  : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
              }`}
            >
              <div className="truncate">{p.latin}</div>
              <div className="text-[10px] text-stone-400 mt-0.5">Target {p.target}x</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Tasbih Instrument Card */}
      <div className="bg-gradient-to-b from-stone-900 to-stone-950 text-white border border-stone-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Putaran: {completedRounds}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
              title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
              title="Reset Hitungan"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Dhikr Display */}
        <div className="space-y-2 py-2">
          <p className="font-arabic text-3xl sm:text-4xl text-amber-200 leading-relaxed" dir="rtl">
            {selectedPreset.arabic}
          </p>
          <p className="text-base font-semibold text-white">
            {selectedPreset.latin}
          </p>
          <p className="text-xs text-emerald-400">
            Target per putaran: {selectedPreset.target} kali
          </p>
        </div>

        {/* Big Tactile Interactive Button */}
        <div className="py-4">
          <button
            onClick={handleTap}
            className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 shadow-2xl flex flex-col items-center justify-center transition-transform active:scale-95 border-4 border-emerald-400/40 relative group cursor-pointer"
          >
            {/* Progress ring visual ring */}
            <div className="text-5xl sm:text-6xl font-mono font-bold tracking-tight text-white drop-shadow-md">
              {count}
            </div>
            <div className="text-xs text-emerald-100 font-medium mt-1 uppercase tracking-wider">
              Ketuk Disini
            </div>
          </button>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5 max-w-xs mx-auto">
          <div className="flex justify-between text-xs text-stone-400">
            <span>Kemajuan Putaran</span>
            <span className="font-mono">{count} / {selectedPreset.target}</span>
          </div>
          <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
