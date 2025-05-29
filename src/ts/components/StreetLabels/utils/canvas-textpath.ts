// src/components/StreetLabels/utils/canvas-textpath.ts
// Direct implementation of Canvas TextPath functionality
// Based on https://github.com/Viglino/Canvas-TextPath

interface CanvasRenderingContext2DExtended extends CanvasRenderingContext2D {
  textPath?: (text: string, path: number[]) => void;
  strokeTextPath?: (text: string, path: number[]) => void;
  textJustify?: boolean;
  textOverflow?: string;
  textStrokeMin?: number;
}

export function initializeCanvasTextPath() {
  const ctx = CanvasRenderingContext2D.prototype as CanvasRenderingContext2DExtended;

  // Calculate path length
  function getPathLength(path: number[]): number {
    let length = 0;
    for (let i = 2; i < path.length; i += 2) {
      const dx = path[i] - path[i - 2];
      const dy = path[i + 1] - path[i - 1];
      length += Math.sqrt(dx * dx + dy * dy);
    }
    return length;
  }

  // Get position and angle at distance along path
  function getPositionAtLength(path: number[], targetLength: number): { x: number, y: number, angle: number } | null {
    let currentLength = 0;

    for (let i = 2; i < path.length; i += 2) {
      const x1 = path[i - 2];
      const y1 = path[i - 1];
      const x2 = path[i];
      const y2 = path[i + 1];

      const dx = x2 - x1;
      const dy = y2 - y1;
      const segmentLength = Math.sqrt(dx * dx + dy * dy);

      if (currentLength + segmentLength >= targetLength) {
        const ratio = (targetLength - currentLength) / segmentLength;
        return {
          x: x1 + dx * ratio,
          y: y1 + dy * ratio,
          angle: Math.atan2(dy, dx)
        };
      }

      currentLength += segmentLength;
    }

    return null;
  }

  // Main textPath implementation
  ctx.textPath = function(this: CanvasRenderingContext2DExtended, text: string, path: number[]) {
    if (!text || !path || path.length < 4) return;

    const pathLength = getPathLength(path);
    const textMetrics = this.measureText(text);
    const textWidth = textMetrics.width;

    // Check if text is too long for path
    if (this.textStrokeMin && pathLength < this.textStrokeMin) return;

    // Calculate starting position based on text alignment
    let startOffset = 0;
    if (this.textAlign === 'center') {
      startOffset = (pathLength - textWidth) / 2;
    } else if (this.textAlign === 'right' || this.textAlign === 'end') {
      startOffset = pathLength - textWidth;
    }

    // Save current context state
    this.save();

    // Draw each character
    let currentOffset = startOffset;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charWidth = this.measureText(char).width;

      // Get position for this character
      const pos = getPositionAtLength(path, currentOffset + charWidth / 2);
      if (!pos) break;

      // Transform to character position and rotation
      this.save();
      this.translate(pos.x, pos.y);
      this.rotate(pos.angle);

      // Adjust vertical position based on textBaseline
      let yOffset = 0;
      if (this.textBaseline === 'middle') {
        yOffset = 0;
      } else if (this.textBaseline === 'top') {
        yOffset = textMetrics.actualBoundingBoxAscent / 2;
      } else if (this.textBaseline === 'bottom') {
        yOffset = -textMetrics.actualBoundingBoxDescent / 2;
      }

      // Draw the character
      this.fillText(char, -charWidth / 2, yOffset);

      this.restore();

      currentOffset += charWidth;
    }

    // Restore original context state
    this.restore();
  };

  // Stroke text along path
  ctx.strokeTextPath = function(this: CanvasRenderingContext2DExtended, text: string, path: number[]) {
    if (!text || !path || path.length < 4) return;

    const pathLength = getPathLength(path);
    const textMetrics = this.measureText(text);
    const textWidth = textMetrics.width;

    // Check if text is too long for path
    if (this.textStrokeMin && pathLength < this.textStrokeMin) return;

    // Calculate starting position based on text alignment
    let startOffset = 0;
    if (this.textAlign === 'center') {
      startOffset = (pathLength - textWidth) / 2;
    } else if (this.textAlign === 'right' || this.textAlign === 'end') {
      startOffset = pathLength - textWidth;
    }

    // Save current context state
    this.save();

    // Draw each character
    let currentOffset = startOffset;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charWidth = this.measureText(char).width;

      // Get position for this character
      const pos = getPositionAtLength(path, currentOffset + charWidth / 2);
      if (!pos) break;

      // Transform to character position and rotation
      this.save();
      this.translate(pos.x, pos.y);
      this.rotate(pos.angle);

      // Adjust vertical position based on textBaseline
      let yOffset = 0;
      if (this.textBaseline === 'middle') {
        yOffset = 0;
      } else if (this.textBaseline === 'top') {
        yOffset = textMetrics.actualBoundingBoxAscent / 2;
      } else if (this.textBaseline === 'bottom') {
        yOffset = -textMetrics.actualBoundingBoxDescent / 2;
      }

      // Stroke the character
      this.strokeText(char, -charWidth / 2, yOffset);

      this.restore();

      currentOffset += charWidth;
    }

    // Restore original context state
    this.restore();
  };
}

// Initialize on import
if (typeof window !== 'undefined') {
  initializeCanvasTextPath();
}