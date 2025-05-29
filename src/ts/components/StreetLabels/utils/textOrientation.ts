// src/ts/components/StreetLabels/utils/textOrientation.ts
import L from 'leaflet';

/**
 * Utility functions for text orientation along paths
 */

/**
 * Determines the optimal text placement along a path
 * @param points Array of points representing the path
 * @returns Object with placement information
 */
export function getOptimalTextPlacement(points: L.Point[]): {
  startIndex: number;
  endIndex: number;
  totalLength: number;
} {
  if (points.length < 2) {
    return { startIndex: 0, endIndex: 0, totalLength: 0 };
  }

  // Calculate segment lengths
  const segments: number[] = [];
  let totalLength = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const length = points[i].distanceTo(points[i + 1]);
    segments.push(length);
    totalLength += length;
  }

  // Find the longest continuous segment
  let maxLength = 0;
  let bestStart = 0;
  let bestEnd = points.length - 1;

  // For now, use the entire path
  // Future enhancement: find the straightest section
  return {
    startIndex: bestStart,
    endIndex: bestEnd,
    totalLength
  };
}

/**
 * Checks if text should be split across multiple segments
 * @param textWidth The width of the text
 * @param pathLength The length of the path
 * @returns Boolean indicating if text should be split
 */
export function shouldSplitText(textWidth: number, pathLength: number): boolean {
  // Don't split if text fits comfortably
  return textWidth > pathLength * 0.8;
}

/**
 * Calculate text offset to center it on the path
 * @param textWidth Width of the text
 * @param pathLength Length of the path
 * @returns Offset value
 */
export function calculateTextOffset(textWidth: number, pathLength: number): number {
  return Math.max(0, (pathLength - textWidth) / 2);
}