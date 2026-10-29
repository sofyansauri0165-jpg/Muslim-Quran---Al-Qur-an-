// Coordinates of the Holy Kaaba in Makkah al-Mukarramah
export const KAABA_COORDINATES = {
  latitude: 21.422487,
  longitude: 39.826206
};

export interface CityLocation {
  name: string;
  province: string;
  latitude: number;
  longitude: number;
}

export const INDONESIA_LOCATIONS: CityLocation[] = [
  { name: 'Jakarta (DKI Jakarta)', province: 'DKI Jakarta', latitude: -6.2088, longitude: 106.8456 },
  { name: 'Bandung (Jawa Barat)', province: 'Jawa Barat', latitude: -6.9175, longitude: 107.6191 },
  { name: 'Surabaya (Jawa Timur)', province: 'Jawa Timur', latitude: -7.2575, longitude: 112.7521 },
  { name: 'Semarang (Jawa Tengah)', province: 'Jawa Tengah', latitude: -6.9667, longitude: 110.4167 },
  { name: 'Yogyakarta (DIY)', province: 'DI Yogyakarta', latitude: -7.7956, longitude: 110.3695 },
  { name: 'Medan (Sumatera Utara)', province: 'Sumatera Utara', latitude: 3.5952, longitude: 98.6722 },
  { name: 'Banda Aceh (Aceh)', province: 'Aceh', latitude: 5.5483, longitude: 95.3238 },
  { name: 'Padang (Sumatera Barat)', province: 'Sumatera Barat', latitude: -0.9471, longitude: 100.4172 },
  { name: 'Palembang (Sumatera Selatan)', province: 'Sumatera Selatan', latitude: -2.9761, longitude: 104.7754 },
  { name: 'Pekanbaru (Riau)', province: 'Riau', latitude: 0.5071, longitude: 101.4478 },
  { name: 'Makassar (Sulawesi Selatan)', province: 'Sulawesi Selatan', latitude: -5.1477, longitude: 119.4327 },
  { name: 'Banjarmasin (Kalimantan Selatan)', province: 'Kalimantan Selatan', latitude: -3.3194, longitude: 114.5908 },
  { name: 'Pontianak (Kalimantan Barat)', province: 'Kalimantan Barat', latitude: -0.0263, longitude: 109.3425 },
  { name: 'Samarinda (Kalimantan Timur)', province: 'Kalimantan Timur', latitude: -0.5022, longitude: 117.1536 },
  { name: 'Balikpapan (Kalimantan Timur)', province: 'Kalimantan Timur', latitude: -1.2379, longitude: 116.8289 },
  { name: 'Denpasar (Bali)', province: 'Bali', latitude: -8.6705, longitude: 115.2126 },
  { name: 'Mataram (Nusa Tenggara Barat)', province: 'NTB', latitude: -8.5833, longitude: 116.1167 },
  { name: 'Kupang (Nusa Tenggara Timur)', province: 'NTT', latitude: -10.1772, longitude: 123.607 },
  { name: 'Manado (Sulawesi Utara)', province: 'Sulawesi Utara', latitude: 1.4748, longitude: 124.8428 },
  { name: 'Ambon (Maluku)', province: 'Maluku', latitude: -3.6547, longitude: 128.1906 },
  { name: 'Jayapura (Papua)', province: 'Papua', latitude: -2.5337, longitude: 140.7181 }
];

// Convert Degrees to Radians
const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

// Convert Radians to Degrees
const toDegrees = (radians: number): number => (radians * 180) / Math.PI;

/**
 * Calculates Qibla direction bearing (0 to 360 degrees clockwise from True North)
 * using Great Circle spherical trigonometry formula.
 */
export function calculateQiblaBearing(userLat: number, userLng: number): number {
  const phiK = toRadians(KAABA_COORDINATES.latitude);
  const lambdaK = toRadians(KAABA_COORDINATES.longitude);
  const phiU = toRadians(userLat);
  const lambdaU = toRadians(userLng);

  const deltaLambda = lambdaK - lambdaU;

  const y = Math.sin(deltaLambda) * Math.cos(phiK);
  const x =
    Math.cos(phiU) * Math.sin(phiK) -
    Math.sin(phiU) * Math.cos(phiK) * Math.cos(deltaLambda);

  let qiblaBearing = toDegrees(Math.atan2(y, x));
  // Normalize to 0 - 360 degrees
  qiblaBearing = (qiblaBearing + 360) % 360;

  return Math.round(qiblaBearing * 10) / 10;
}

/**
 * Calculates distance to Kaaba in kilometers using the Haversine formula
 */
export function calculateDistanceToKaaba(userLat: number, userLng: number): number {
  const R = 6371; // Earth radius in KM
  const dLat = toRadians(KAABA_COORDINATES.latitude - userLat);
  const dLng = toRadians(KAABA_COORDINATES.longitude - userLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(userLat)) *
      Math.cos(toRadians(KAABA_COORDINATES.latitude)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance);
}
