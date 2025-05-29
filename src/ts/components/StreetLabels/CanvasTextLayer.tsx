// src/components/StreetLabels/CanvasTextLayer.tsx
import React, { useEffect, useRef, useMemo } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { TextPathRenderer, LabelStyle } from './TextPathRenderer';
import { LabelCollisionManager } from './LabelCollisionManager';
import './street-labels.css'; // Import the CSS styles

interface CanvasTextLayerProps {
  polylines: Array<{
    id: string;
    positions: L.LatLngExpression[];
    label?: string;
    labelStyle?: LabelStyle;
  }>;
  collisionDetection?: boolean;
}

export const CanvasTextLayer: React.FC<CanvasTextLayerProps> = ({
  polylines,
  collisionDetection = true
}) => {
  const map = useMap();
  const layerRef = useRef<L.Layer | null>(null);
  const collisionManager = useRef(new LabelCollisionManager());

  // Create a stable reference to polylines data
  const polylinesRef = useRef(polylines);
  polylinesRef.current = polylines;

  // Memoize the polylines array to prevent unnecessary rerenders
  const polylineKey = useMemo(() => {
    return polylines.map(p => `${p.id}-${p.label}`).join('|');
  }, [polylines]);

  useEffect(() => {
    if (!map) return;

    const CanvasLabelLayer = L.Layer.extend({
      onAdd: function() {
        this._canvas = L.DomUtil.create('canvas', 'leaflet-street-labels');
        this._ctx = this._canvas.getContext('2d');
        this._renderer = new TextPathRenderer(this._ctx);

        const size = map.getSize();
        this._updateCanvasSize(size);

        // Set canvas style
        this._canvas.style.position = 'absolute';
        this._canvas.style.pointerEvents = 'none'; // Make labels non-interactive

        // Add to markerPane instead of overlayPane to ensure labels appear above paths
        map.getPanes().markerPane.appendChild(this._canvas);

        // Bind map events
        map.on('viewreset', this._reset, this);
        map.on('zoom', this._onZoom, this);
        map.on('move', this._onMove, this);
        map.on('resize', this._onResize, this);
        map.on('moveend', this._redraw, this); // Redraw on moveend for better performance

        this._reset();
      },

      onRemove: function() {
        L.DomUtil.remove(this._canvas);
        map.off('viewreset', this._reset, this);
        map.off('zoom', this._onZoom, this);
        map.off('move', this._onMove, this);
        map.off('resize', this._onResize, this);
        map.off('moveend', this._redraw, this);
      },

      _updateCanvasSize: function(size) {
        const scale = window.devicePixelRatio || 1;
        this._canvas.width = size.x * scale;
        this._canvas.height = size.y * scale;
        this._canvas.style.width = size.x + 'px';
        this._canvas.style.height = size.y + 'px';

        if (scale !== 1) {
          this._ctx.scale(scale, scale);
        }
      },

      _reset: function() {
        const topLeft = map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this._canvas, topLeft);
        this._redraw();
      },

      _onZoom: function() {
        this._updateCanvasSize(map.getSize());
        this._reset();
      },

      _onMove: function() {
        const topLeft = map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this._canvas, topLeft);
        // Don't redraw on every move event - wait for moveend
      },

      _onResize: function() {
        this._updateCanvasSize(map.getSize());
        this._redraw();
      },

      _redraw: function() {
        const canvas = this._canvas;
        const ctx = this._ctx;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (collisionDetection) {
          collisionManager.current.reset();
        }

        const zoom = map.getZoom();

        // Get current polylines data from ref
        const currentPolylines = polylinesRef.current;

        currentPolylines.forEach(polyline => {
          if (!polyline.label) return;

          const style = polyline.labelStyle || {};

          // Check zoom constraints
          if (zoom < (style.minZoom || 0) || zoom > (style.maxZoom || 22)) return;

          // Convert positions to container points
          const points = polyline.positions.map(pos => {
            // Ensure proper lat/lng format
            const latLng = Array.isArray(pos)
              ? L.latLng(pos[0], pos[1])
              : L.latLng(pos);
            return map.latLngToContainerPoint(latLng);
          });

          // Skip if path is too short
          if (points.length < 2) return;

          // Check if label should be rendered
          if (collisionDetection) {
            const bounds = this._renderer.calculateLabelBounds(
              polyline.label,
              points,
              style
            );

            if (!collisionManager.current.checkAndAdd(polyline.id, bounds)) {
              return; // Skip if collision detected
            }
          }

          this._renderer.renderTextPath(polyline.label, points, style);
        });
      }
    });

    const layer = new CanvasLabelLayer();
    layerRef.current = layer;
    map.addLayer(layer);

    // Force initial redraw
    setTimeout(() => {
      if (layerRef.current && (layerRef.current as any)._redraw) {
        (layerRef.current as any)._redraw();
      }
    }, 100);

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
      }
    };
  }, [map, collisionDetection]); // Remove polylines from dependencies

  // Update the layer when polylines change
  useEffect(() => {
    if (layerRef.current && (layerRef.current as any)._redraw) {
      (layerRef.current as any)._redraw();
    }
  }, [polylineKey]);

  return null;
};