// src/components/StreetLabels/TextPathRenderer.ts
import L from 'leaflet';
import './utils/canvas-textpath';
import { calculateBearing, shouldFlipText } from './utils/bearing';

export interface LabelStyle {
  fontSize?: number;
  fontFamily?: string;
  textColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  minZoom?: number;
  maxZoom?: number;
  offset?: number;
}

export class TextPathRenderer {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  renderTextPath(text: string, points: L.Point[], style: LabelStyle = {}) {
    if (points.length < 2) return;

    const {
      fontSize = 14,
      fontFamily = 'Arial',
      textColor = '#333333',
      strokeColor = '#FFFFFF',
      strokeWidth = 3,
      textAlign = 'center',
      textBaseline = 'middle',
      offset = 0
    } = style;

    // Calculate overall path direction
    let totalDx = 0;
    let totalDy = 0;
    for (let i = 1; i < points.length; i++) {
      totalDx += points[i].x - points[i - 1].x;
      totalDy += points[i].y - points[i - 1].y;
    }

    // Determine if we should flip based on overall direction
    const angle = Math.atan2(totalDy, totalDx) * 180 / Math.PI;
    const shouldFlip = angle > 90 || angle < -90;

    // Prepare path array
    let pathArray = points.reduce((acc, point) => {
      acc.push(point.x, point.y);
      return acc;
    }, [] as number[]);

    // Flip path if needed for readability
    if (shouldFlip) {
      // Reverse the points order
      const reversedPoints = [...points].reverse();
      pathArray = reversedPoints.reduce((acc, point) => {
        acc.push(point.x, point.y);
        return acc;
      }, [] as number[]);
    }

    // Apply offset if specified
    if (offset !== 0) {
      pathArray = this.offsetPath(pathArray, offset);
    }

    // Configure canvas context
    this.ctx.save();
    this.ctx.font = `${fontSize}px ${fontFamily}`;
    this.ctx.textAlign = textAlign;
    this.ctx.textBaseline = textBaseline;

    // Enable text path properties
    (this.ctx as any).textJustify = true;
    (this.ctx as any).textOverflow = '';
    (this.ctx as any).textStrokeMin = 40; // Minimum path length

    // Draw stroke if specified
    if (strokeColor && strokeWidth > 0) {
      this.ctx.strokeStyle = strokeColor;
      this.ctx.lineWidth = strokeWidth;
      this.ctx.lineJoin = 'round';
      this.ctx.miterLimit = 2;
      // Use strokeTextPath instead of strokeText for path-based text
      (this.ctx as any).strokeTextPath(text, pathArray);
    }

    // Draw fill text
    this.ctx.fillStyle = textColor;
    (this.ctx as any).textPath(text, pathArray);

    this.ctx.restore();
  }

  calculateLabelBounds(text: string, points: L.Point[], style: LabelStyle = {}): L.Bounds {
    const { fontSize = 14 } = style;

    // Estimate text metrics
    this.ctx.save();
    this.ctx.font = `${fontSize}px ${style.fontFamily || 'Arial'}`;
    const metrics = this.ctx.measureText(text);
    this.ctx.restore();

    // Calculate bounding box along the path
    const textWidth = metrics.width;
    const textHeight = fontSize * 1.5; // Approximate height

    // Find center point of path
    const centerIndex = Math.floor(points.length / 2);
    const centerPoint = points[centerIndex];

    // Create bounds around center point
    const halfWidth = textWidth / 2;
    const halfHeight = textHeight / 2;

    return L.bounds(
      [centerPoint.x - halfWidth, centerPoint.y - halfHeight],
      [centerPoint.x + halfWidth, centerPoint.y + halfHeight]
    );
  }

  private offsetPath(pathArray: number[], offset: number): number[] {
    // For now, just return the path as-is
    // A full implementation would calculate perpendicular offsets at each point
    // This would involve:
    // 1. Calculate normals at each point
    // 2. Offset each point along its normal
    // 3. Handle line intersections at corners
    return pathArray;
  }
}