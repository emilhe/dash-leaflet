// src/components/StreetLabels/utils/bearing.ts
export function calculateBearing(point1: L.Point, point2: L.Point): number {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  // Note: In screen coordinates, Y increases downward
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  return (angle + 360) % 360;
}

export function shouldFlipText(bearing: number): boolean {
  // Flip text if it would appear upside down
  // Adjusted for screen coordinates where Y increases downward
  const normalizedBearing = (bearing + 360) % 360;
  return normalizedBearing > 90 && normalizedBearing < 270;
}

export function calculateGeographicBearing(
  latlng1: L.LatLng,
  latlng2: L.LatLng
): number {
  const lat1 = latlng1.lat * Math.PI / 180;
  const lat2 = latlng2.lat * Math.PI / 180;
  const dLng = (latlng2.lng - latlng1.lng) * Math.PI / 180;

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  const bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
}