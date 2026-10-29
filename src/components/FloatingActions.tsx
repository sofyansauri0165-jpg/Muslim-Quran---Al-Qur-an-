import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowUp,
  Volume2,
  BookOpen,
  Clock,
  X,
  Plus,
  CircleDot,
  Moon,
  Sun,
  Move,
  RotateCcw,
  Compass,
  Calendar
} from 'lucide-react';
import { LastRead, AppTab } from '../types/quran';

interface FloatingActionsProps {
  onOpenLastRead: () => void;
  lastRead: LastRead | null;
  onOpenAdhan: () => void;
  onNavigateTab: (tab: AppTab) => void;
  isAudioBarVisible: boolean;
  nextPrayerName?: string;
  nextPrayerCountdown?: string;
  themeMode?: 'light' | 'dark' | 'sepia';
  onToggleTheme?: () => void;
}

interface Position {
  x: number;
  y: number;
}

const STORAGE_KEY = 'mq_assistivetouch_pos';
const BUTTON_SIZE = 54;
const PADDING = 16;

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenLastRead,
  lastRead,
  onOpenAdhan,
  onNavigateTab,
  isAudioBarVisible,
  nextPrayerName,
  nextPrayerCountdown,
  themeMode = 'light',
  onToggleTheme
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: -1, y: -1 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasUserMoved, setHasUserMoved] = useState<boolean>(false);

  // References for drag handling
  const dragRef = useRef<{
    startX: number;
    startY: number;
    initialPosX: number;
    initialPosY: number;
    hasMovedThreshold: boolean;
    pointerId: number | null;
  }>({
    startX: 0,
    startY: 0,
    initialPosX: 0,
    initialPosY: 0,
    hasMovedThreshold: false,
    pointerId: null
  });

  const buttonRef = useRef<HTMLDivElement | null>(null);

  // Compute safe default position based on screen and bottom audio/nav bars
  const getDefaultPosition = useCallback((): Position => {
    if (typeof window === 'undefined') return { x: 20, y: 100 };
    const bottomBarOffset = isAudioBarVisible ? 160 : 96;
    return {
      x: Math.max(PADDING, window.innerWidth - BUTTON_SIZE - PADDING),
      y: Math.max(PADDING, window.innerHeight - BUTTON_SIZE - bottomBarOffset)
    };
  }, [isAudioBarVisible]);

  // Load saved position or default on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Position;
        const maxX = window.innerWidth - BUTTON_SIZE - PADDING;
        const maxY = window.innerHeight - BUTTON_SIZE - (isAudioBarVisible ? 140 : 80);
        setPosition({
          x: Math.min(Math.max(PADDING, parsed.x), Math.max(PADDING, maxX)),
          y: Math.min(Math.max(PADDING, parsed.y), Math.max(PADDING, maxY))
        });
        return;
      } catch {
        // Fallback to default
      }
    }
    setPosition(getDefaultPosition());
  }, [getDefaultPosition, isAudioBarVisible]);

  // Handle window resize to keep button inside viewport
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        if (prev.x < 0 || prev.y < 0) return getDefaultPosition();
        const maxX = window.innerWidth - BUTTON_SIZE - PADDING;
        const maxY = window.innerHeight - BUTTON_SIZE - (isAudioBarVisible ? 140 : 80);
        return {
          x: Math.min(Math.max(PADDING, prev.x), Math.max(PADDING, maxX)),
          y: Math.min(Math.max(PADDING, prev.y), Math.max(PADDING, maxY))
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getDefaultPosition, isAudioBarVisible]);

  // Monitor scroll for Scroll-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Reset position to default dock
  const handleResetPosition = () => {
    const def = getDefaultPosition();
    setPosition(def);
    localStorage.removeItem(STORAGE_KEY);
    setIsOpen(false);
  };

  // Magnetic edge snap (iOS AssistiveTouch behavior)
  const snapToClosestEdge = useCallback((currentX: number, currentY: number): Position => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const bottomLimit = screenHeight - BUTTON_SIZE - (isAudioBarVisible ? 140 : 80);

    const clampedY = Math.min(Math.max(PADDING, currentY), Math.max(PADDING, bottomLimit));
    
    // Snap to left or right edge
    const midX = screenWidth / 2;
    const snappedX = currentX + BUTTON_SIZE / 2 < midX ? PADDING : screenWidth - BUTTON_SIZE - PADDING;

    return { x: snappedX, y: clampedY };
  }, [isAudioBarVisible]);

  // Pointer drag start
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only primary button
    if (e.button !== 0) return;

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPosX: position.x,
      initialPosY: position.y,
      hasMovedThreshold: false,
      pointerId: e.pointerId
    };

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore if not supported
    }

    setIsDragging(true);
  };

  // Pointer drag move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || dragRef.current.pointerId !== e.pointerId) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const dist = Math.hypot(dx, dy);

    if (dist > 6) {
      dragRef.current.hasMovedThreshold = true;
      setHasUserMoved(true);

      const newX = dragRef.current.initialPosX + dx;
      const newY = dragRef.current.initialPosY + dy;

      const maxX = window.innerWidth - BUTTON_SIZE - PADDING;
      const maxY = window.innerHeight - BUTTON_SIZE - (isAudioBarVisible ? 140 : 80);

      setPosition({
        x: Math.min(Math.max(PADDING, newX), Math.max(PADDING, maxX)),
        y: Math.min(Math.max(PADDING, newY), Math.max(PADDING, maxY))
      });
    }
  };

  // Pointer drag end
  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragRef.current.pointerId !== e.pointerId) return;

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    setIsDragging(false);

    if (dragRef.current.hasMovedThreshold) {
      // Snap to edge like real AssistiveTouch
      const snapped = snapToClosestEdge(position.x, position.y);
      setPosition(snapped);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snapped));
      } catch {
        // Storage full or unavailable
      }
    } else {
      // It's a tap/click! Toggle the menu
      setIsOpen((prev) => !prev);
    }

    dragRef.current.pointerId = null;
    dragRef.current.hasMovedThreshold = false;
  };

  // Determine popup expansion orientation
  const isDockedLeft = position.x < (typeof window !== 'undefined' ? window.innerWidth / 2 : 200);
  const isDockedTop = position.y < (typeof window !== 'undefined' ? window.innerHeight / 2 : 400);

  // If position hasn't initialized yet, avoid flickering
  if (position.x < 0) return null;

  return (
    <>
      {/* Dimmed backdrop when menu is open to dismiss cleanly */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-900/25 dark:bg-black/45 backdrop-blur-[1.5px] transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Movable AssistiveTouch Container */}
      <div
        ref={buttonRef}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          touchAction: 'none'
        }}
        className={`fixed top-0 left-0 z-50 select-none ${
          isDragging ? 'cursor-grabbing transition-none' : 'cursor-grab transition-transform duration-300 ease-out'
        }`}
      >
        {/* Floating expanded menu */}
        {isOpen && (
          <div
            className={`absolute z-50 flex flex-col gap-2 p-2 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl border border-stone-200/90 dark:border-stone-700/80 shadow-2xl min-w-[210px] animate-in fade-in zoom-in-95 duration-200 ${
              isDockedTop
                ? 'top-16 origin-top'
                : 'bottom-16 origin-bottom'
            } ${
              isDockedLeft
                ? 'left-0 items-start origin-top-left'
                : 'right-0 items-end origin-bottom-right'
            }`}
          >
            {/* AssistiveTouch Header / Move helper info */}
            <div className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-medium text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-700/60 pb-1.5 mb-0.5">
              <span className="flex items-center gap-1.5">
                <Move className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                Assistive Touch
              </span>
              <button
                onClick={handleResetPosition}
                title="Kembalikan posisi ke sudut kanan bawah"
                className="flex items-center gap-1 text-[10px] text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-0.5 rounded cursor-pointer"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                Reset
              </button>
            </div>

            {/* Action 1: Toggle Mode Gelap / Terang */}
            {onToggleTheme && (
              <button
                onClick={() => {
                  onToggleTheme();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-100 hover:bg-emerald-50 dark:hover:bg-stone-800 transition-colors text-xs font-semibold group cursor-pointer ${
                  isDockedLeft ? 'flex-row' : 'flex-row-reverse text-right'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-700 text-amber-500 dark:text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
                  {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </div>
                <div className="flex-1 truncate">
                  Mode {themeMode === 'dark' ? 'Terang' : 'Malam (Gelap)'}
                </div>
              </button>
            )}

            {/* Action 2: Putar Audio Azan */}
            <button
              onClick={() => {
                onOpenAdhan();
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-100 hover:bg-emerald-50 dark:hover:bg-stone-800 transition-colors text-xs font-semibold group cursor-pointer ${
                isDockedLeft ? 'flex-row' : 'flex-row-reverse text-right'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                <Volume2 className="w-4 h-4" />
              </div>
              <div className="flex-1 truncate">Audio Azan</div>
            </button>

            {/* Action 3: Jam & Jadwal Sholat */}
            <button
              onClick={() => {
                onNavigateTab('sholat');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-100 hover:bg-emerald-50 dark:hover:bg-stone-800 transition-colors text-xs font-semibold group cursor-pointer ${
                isDockedLeft ? 'flex-row' : 'flex-row-reverse text-right'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1 truncate">Jadwal Sholat</div>
            </button>

            {/* Action: Kompas Arah Kiblat */}
            <button
              onClick={() => {
                onNavigateTab('kiblat');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-100 hover:bg-emerald-50 dark:hover:bg-stone-800 transition-colors text-xs font-semibold group cursor-pointer ${
                isDockedLeft ? 'flex-row' : 'flex-row-reverse text-right'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex-1 truncate">Kompas Kiblat</div>
            </button>

            {/* Action: Kalender Hijriah & Hari Besar */}
            <button
              onClick={() => {
                onNavigateTab('kalender');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-100 hover:bg-emerald-50 dark:hover:bg-stone-800 transition-colors text-xs font-semibold group cursor-pointer ${
                isDockedLeft ? 'flex-row' : 'flex-row-reverse text-right'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-xs">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex-1 truncate">Kalender Islam</div>
            </button>

            {/* Action 4: Lanjut Baca (Last Read) */}
            {lastRead && (
              <button
                onClick={() => {
                  onOpenLastRead();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-100 hover:bg-emerald-50 dark:hover:bg-stone-800 transition-colors text-xs font-semibold group cursor-pointer ${
                  isDockedLeft ? 'flex-row' : 'flex-row-reverse text-right'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <BookOpen className="w-4 h-4 text-amber-200" />
                </div>
                <div className="flex-1 truncate">
                  {lastRead.surahName}:{lastRead.ayahNumber}
                </div>
              </button>
            )}

            {/* Action 5: Tasbih Digital */}
            <button
              onClick={() => {
                onNavigateTab('tasbih');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-100 hover:bg-emerald-50 dark:hover:bg-stone-800 transition-colors text-xs font-semibold group cursor-pointer ${
                isDockedLeft ? 'flex-row' : 'flex-row-reverse text-right'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0 shadow-xs">
                <CircleDot className="w-4 h-4" />
              </div>
              <div className="flex-1 truncate">Tasbih Digital</div>
            </button>

            {/* Action 6: Kembali ke Atas (Scroll to Top) */}
            {showScrollTop && (
              <button
                onClick={() => {
                  scrollToTop();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-100 hover:bg-emerald-50 dark:hover:bg-stone-800 transition-colors text-xs font-semibold group cursor-pointer border-t border-stone-100 dark:border-stone-700/60 pt-2 ${
                  isDockedLeft ? 'flex-row' : 'flex-row-reverse text-right'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                  <ArrowUp className="w-4 h-4" />
                </div>
                <div className="flex-1 truncate">Kembali ke Atas</div>
              </button>
            )}
          </div>
        )}

        {/* The AssistiveTouch Ball / Button */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative group touch-none select-none`}
        >
          {/* Subtle drag hint tooltip on hover (desktop only) */}
          {!isOpen && !isDragging && (
            <div
              className={`absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-medium bg-stone-900/90 text-white px-2 py-1 rounded-md whitespace-nowrap shadow-lg ${
                isDockedLeft
                  ? 'left-14 top-1/2 -translate-y-1/2'
                  : 'right-14 top-1/2 -translate-y-1/2'
              }`}
            >
              Tahan & geser untuk memindahkan
            </div>
          )}

          {/* Core AssistiveTouch Floating Button */}
          <div
            className={`w-[54px] h-[54px] rounded-2xl flex items-center justify-center shadow-2xl transition-all border ${
              isDragging
                ? 'scale-110 shadow-emerald-500/40 ring-4 ring-emerald-500/30'
                : 'hover:scale-105 active:scale-95'
            } ${
              isOpen
                ? 'bg-stone-900 text-white border-stone-700 shadow-stone-900/50'
                : 'bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 text-white border-emerald-400/40 shadow-emerald-600/30'
            }`}
            title="Assistive Touch (Tahan dan geser untuk memindahkan)"
            role="button"
            aria-label="AssistiveTouch Menu Pintas"
          >
            {/* Movable Dots / Grip Indicator subtle badge */}
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 shadow-xs flex items-center justify-center pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity">
              <Move className="w-2.5 h-2.5" />
            </div>

            {isOpen ? (
              <X className="w-6 h-6 animate-in zoom-in-75 duration-200" />
            ) : (
              <img
                src="/assets/aistudio/IMG_3954_7eb1552b.png"
                alt="Logo AssistiveTouch"
                className="w-8 h-8 rounded-xl object-contain drop-shadow-sm pointer-events-none"
                draggable={false}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
