import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  MapPin,
  Navigation,
  RotateCw,
  Info,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sliders,
  Sparkles
} from 'lucide-react';
import {
  calculateQiblaBearing,
  calculateDistanceToKaaba,
  INDONESIA_LOCATIONS,
  CityLocation
} from '../services/qiblaService';

export const QiblaCompassView: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityLocation>(INDONESIA_LOCATIONS[0]); // Jakarta default
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState<string>('Jakarta (DKI Jakarta)');
  const [isGpsActive, setIsGpsActive] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Compass Sensor Heading (0-360)
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [manualOffset, setManualOffset] = useState<number>(0);
  const [isSensorAvailable, setIsSensorAvailable] = useState<boolean>(false);
  const [permissionRequested, setPermissionRequested] = useState<boolean>(false);
  const [isManualMode, setIsManualMode] = useState<boolean>(false);

  // Calculate Qibla bearing from current coordinates
  const currentLat = userCoords?.lat ?? selectedCity.latitude;
  const currentLng = userCoords?.lng ?? selectedCity.longitude;
  const qiblaBearing = calculateQiblaBearing(currentLat, currentLng);
  const distanceToKaaba = calculateDistanceToKaaba(currentLat, currentLng);

  // Effective compass orientation
  const currentHeading = isManualMode ? manualOffset : deviceHeading;

  // The angle to rotate the Kaaba needle relative to the phone's heading
  // Needle angle = Qibla Bearing - Device Heading
  const relativeQiblaAngle = (qiblaBearing - currentHeading + 360) % 360;

  // Is facing Kaaba within tolerance (e.g. ±3 degrees)
  const isFacingQibla =
    relativeQiblaAngle <= 4 || relativeQiblaAngle >= 356;

  // Trigger haptic vibration once when aligned
  const lastVibratedRef = useRef<number>(0);
  useEffect(() => {
    if (isFacingQibla && typeof window !== 'undefined' && 'vibrate' in navigator) {
      const now = Date.now();
      if (now - lastVibratedRef.current > 1500) {
        lastVibratedRef.current = now;
        try {
          navigator.vibrate([40, 60, 40]);
        } catch {
          // Ignore
        }
      }
    }
  }, [isFacingQibla]);

  // Request Device Orientation (Especially on iOS 13+ devices)
  const requestCompassPermission = async () => {
    setPermissionRequested(true);
    if (
      typeof window !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> })
        .requestPermission === 'function'
    ) {
      try {
        const response = await (
          DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }
        ).requestPermission();
        if (response === 'granted') {
          setIsSensorAvailable(true);
          startCompassListener();
        } else {
          setGpsError('Izin sensor orientasi tidak diberikan. Anda dapat memilih kota atau menggunakan putaran manual.');
          setIsManualMode(true);
        }
      } catch (err) {
        console.warn('DeviceOrientation permission error:', err);
        setIsManualMode(true);
      }
    } else {
      startCompassListener();
    }
  };

  const startCompassListener = () => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading: number | null = null;

      // WebKit compass heading (iOS Safari)
      if ('webkitCompassHeading' in e && typeof (e as unknown as { webkitCompassHeading: number }).webkitCompassHeading === 'number') {
        heading = (e as unknown as { webkitCompassHeading: number }).webkitCompassHeading;
      } else if (e.alpha !== null) {
        // Android standard: 360 - alpha for clockwise North
        heading = (360 - e.alpha) % 360;
      }

      if (heading !== null && !isNaN(heading)) {
        setIsSensorAvailable(true);
        setDeviceHeading(Math.round(heading));
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  };

  useEffect(() => {
    const cleanup = startCompassListener();
    return cleanup;
  }, []);

  // Use GPS Location
  const handleUseGps = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation tidak didukung pada browser ini.');
      return;
    }
    setGpsError(null);
    setIsGpsActive(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setLocationName('Lokasi GPS Akurat Saya');
        setIsGpsActive(false);
      },
      (err) => {
        setIsGpsActive(false);
        setGpsError(`Gagal mendapatkan lokasi GPS (${err.message}). Menggunakan pilihan kota.`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Handle City Change
  const handleCityChange = (cityName: string) => {
    const found = INDONESIA_LOCATIONS.find((c) => c.name === cityName);
    if (found) {
      setSelectedCity(found);
      setUserCoords(null);
      setLocationName(found.name);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Kompas Kiblat Presisi Nusantara</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-white mb-2">
          Arah Kiblat Menuju Ka'bah
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto">
          Dihitung dengan rumus trigonometri bola (Great Circle Bearing) dari koordinat lokasi Anda langsung menuju Ka'bah di Makkah Al-Mukarramah.
        </p>
      </div>

      {/* Main Control & Location Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 sm:p-5 border border-stone-200 dark:border-stone-700 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* City Select or GPS */}
        <div className="w-full sm:w-auto flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
            <select
              value={userCoords ? 'GPS' : selectedCity.name}
              onChange={(e) => {
                if (e.target.value !== 'GPS') handleCityChange(e.target.value);
              }}
              className="w-full pl-9 pr-8 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {userCoords && <option value="GPS">📍 Lokasi GPS Saya Saat Ini</option>}
              {INDONESIA_LOCATIONS.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleUseGps}
            disabled={isGpsActive}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium transition-colors shadow-xs shrink-0 cursor-pointer disabled:opacity-50"
            title="Dapatkan koordinat presisi perangkat Anda via GPS"
          >
            <Navigation className={`w-3.5 h-3.5 ${isGpsActive ? 'animate-spin' : ''}`} />
            <span>{isGpsActive ? 'Mencari GPS...' : 'Gunakan GPS'}</span>
          </button>
        </div>

        {/* Mode Toggle: Sensor vs Manual Slider */}
        <button
          onClick={() => setIsManualMode(!isManualMode)}
          className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
            isManualMode
              ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
              : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
          }`}
          title="Gunakan slider putar manual jika perangkat laptop atau desktop tidak memiliki sensor kompas fisik"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{isManualMode ? 'Mode Manual Aktif' : 'Mode Putar Manual'}</span>
        </button>
      </div>

      {gpsError && (
        <div className="mb-6 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{gpsError}</span>
        </div>
      )}

      {/* Grid: Compass Dial & Quick Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Compass Visualizer */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-xl relative overflow-hidden">
          {/* Status Pill on Top of Compass */}
          <div className="mb-6">
            {isFacingQibla ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 animate-pulse">
                <CheckCircle2 className="w-4 h-4" />
                <span>TEPAT MENGHADAP KIBLAT</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold border border-stone-200 dark:border-stone-700">
                <RotateCw className="w-3.5 h-3.5 text-stone-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Putar perangkat ke arah jarum emas Ka'bah</span>
              </div>
            )}
          </div>

          {/* Compass Dial Outer Ring */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Compass Base Ring (Rotates with Device Heading) */}
            <div
              style={{
                transform: `rotate(${-currentHeading}deg)`,
                transition: isManualMode ? 'none' : 'transform 0.25s cubic-bezier(0.1, 0.9, 0.2, 1)'
              }}
              className="absolute inset-0 rounded-full border-4 border-stone-200 dark:border-stone-700 bg-radial from-stone-50 via-white to-stone-100 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 shadow-inner flex items-center justify-center"
            >
              {/* Cardinal Labels */}
              <span className="absolute top-2 text-xs font-bold text-rose-600 dark:text-rose-400">U (0°)</span>
              <span className="absolute right-2.5 text-xs font-bold text-stone-500 dark:text-stone-400">T (90°)</span>
              <span className="absolute bottom-2 text-xs font-bold text-stone-500 dark:text-stone-400">S (180°)</span>
              <span className="absolute left-2 text-xs font-bold text-stone-500 dark:text-stone-400">B (270°)</span>

              {/* Tick Marks (360 degrees, 30-deg steps) */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  style={{ transform: `rotate(${i * 30}deg)` }}
                  className="absolute inset-0 flex justify-center pointer-events-none"
                >
                  <div className={`w-0.5 ${i % 3 === 0 ? 'h-3 bg-stone-400 dark:bg-stone-500' : 'h-1.5 bg-stone-300 dark:bg-stone-700'}`} />
                </div>
              ))}
            </div>

            {/* Glowing highlight when aligned with Kaaba */}
            {isFacingQibla && (
              <div className="absolute inset-0 rounded-full bg-emerald-500/15 ring-8 ring-emerald-500/20 blur-xs transition-all pointer-events-none" />
            )}

            {/* Kaaba Direction Needle (Points directly to Qibla relative to screen) */}
            <div
              style={{
                transform: `rotate(${relativeQiblaAngle}deg)`,
                transition: isManualMode ? 'none' : 'transform 0.25s cubic-bezier(0.1, 0.9, 0.2, 1)'
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {/* Top half: Kaaba Marker Arrow */}
              <div className="absolute top-4 flex flex-col items-center">
                {/* Kaaba Icon Box */}
                <div className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-md mb-1 transition-colors ${
                  isFacingQibla
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                    : 'bg-stone-900 text-amber-300 border border-amber-400/40'
                }`}>
                  <span className="w-2 h-2 rounded-xs bg-amber-400" />
                  <span>KA'BAH</span>
                </div>
                {/* Sharp pointer needle */}
                <div className={`w-0 h-0 border-x-8 border-x-transparent border-b-[38px] drop-shadow-md ${
                  isFacingQibla ? 'border-b-emerald-600' : 'border-b-amber-500'
                }`} />
              </div>

              {/* Center Hub */}
              <div className={`w-10 h-10 rounded-full border-2 shadow-lg flex items-center justify-center z-10 transition-colors ${
                isFacingQibla
                  ? 'bg-emerald-600 border-white text-white'
                  : 'bg-stone-900 border-amber-400 text-amber-300'
              }`}>
                <Compass className="w-5 h-5" />
              </div>

              {/* Bottom half: Counter Needle tail */}
              <div className="absolute bottom-6 w-1 h-8 bg-stone-400/50 rounded-full" />
            </div>

            {/* Top Fixed Phone Reference Notch (12 O'Clock) */}
            <div className="absolute -top-3 w-4 h-3 bg-stone-700 dark:bg-stone-300 rounded-sm shadow-xs flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white dark:bg-stone-900" />
            </div>
          </div>

          {/* Current Degree Readout */}
          <div className="mt-6 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white font-mono">
              {qiblaBearing}° <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 font-sans">dari Utara</span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Sudut hadap perangkat saat ini:{' '}
              <span className="font-mono font-bold text-stone-700 dark:text-stone-200">
                {currentHeading}°
              </span>
            </p>
          </div>

          {/* Manual Rotation Slider for desktop / non-sensor */}
          {isManualMode && (
            <div className="w-full max-w-xs mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1.5">
                <span>Simulasi Putar Manual:</span>
                <span className="font-mono font-bold text-amber-600">{manualOffset}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="359"
                value={manualOffset}
                onChange={(e) => setManualOffset(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          )}

          {/* iOS Sensor Permission button if sensor inactive */}
          {!isSensorAvailable && !permissionRequested && (
            <button
              onClick={requestCompassPermission}
              className="mt-4 px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-600" />
              <span>Aktifkan Sensor Kompas HP</span>
            </button>
          )}
        </div>

        {/* Right Column: Detailed Metrics & Guide */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Card 1: Lokasi & Jarak */}
          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-sm">
            <div className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3">
              Informasi Titik Lokasi
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-600 dark:text-stone-400">Lokasi Acuan</span>
                <span className="text-xs font-bold text-stone-900 dark:text-white truncate max-w-44">
                  {locationName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-600 dark:text-stone-400">Koordinat</span>
                <span className="text-xs font-mono font-medium text-stone-700 dark:text-stone-300">
                  {currentLat.toFixed(4)}°, {currentLng.toFixed(4)}°
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-600 dark:text-stone-400">Derajat Kiblat</span>
                <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {qiblaBearing}° (Barat Laut)
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-stone-100 dark:border-stone-800 pt-3">
                <span className="text-xs text-stone-600 dark:text-stone-400">Jarak ke Ka'bah</span>
                <span className="text-sm font-bold text-stone-900 dark:text-white font-mono">
                  ± {distanceToKaaba.toLocaleString('id-ID')} km
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Panduan Kalibrasi & Akurasi */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 shadow-sm text-emerald-950 dark:text-emerald-200">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tips Akurasi Kompas</span>
            </div>
            <ul className="text-xs space-y-1.5 leading-relaxed text-emerald-900 dark:text-emerald-200/90 list-disc list-inside">
              <li>Letakkan smartphone di permukaan datar atau pegang sejajar dengan dada.</li>
              <li>Jauhkan dari benda bermagnet, speaker, case berbahan logam, atau laptop.</li>
              <li>
                Jika arah melenceng, kalibrasi sensor dengan menggerakkan HP membentuk <strong>pola angka 8</strong> di udara selama beberapa detik.
              </li>
            </ul>
          </div>

          {/* Card 3: Dalil Kiblat */}
          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-sm text-xs text-stone-600 dark:text-stone-300">
            <div className="font-semibold text-stone-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-600" />
              <span>Surat Al-Baqarah Ayat 144</span>
            </div>
            <p className="italic text-stone-500 dark:text-stone-400 leading-relaxed mb-2 font-arabic text-sm text-right" dir="rtl">
              فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ ۚ وَحَيْثُ مَا كُنتُمْ فَوَلُّوا وُجُوهَكُمْ شَطْرَهُ
            </p>
            <p className="text-[11px] leading-relaxed">
              "Maka hadapkanlah wajahmu ke arah Masjidilharam. Dan di mana saja kamu berada, hadapkanlah wajahmu ke arah itu."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
