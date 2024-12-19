import React from 'react';
import { createControlComponent } from "@react-leaflet/core";
import * as L from "leaflet";
import { ControlPosition, Layer, Map } from "leaflet";
import { Modify, DashComponent } from "../props";

// Import CSS
require('./sidebyside.css');
require('./range.css')

// Extend Leaflet typings
declare module "leaflet" {
    interface Map {
        _controlContainer: HTMLElement;
    }

    namespace Control {
        class SideBySide extends Control {
            constructor(
                leftLayers: Layer | Layer[],
                rightLayers: Layer | Layer[],
                options?: SideBySideOptions
            );
            fire(type: string, data?: any): this;
            setLeftLayers(leftLayers: Layer | Layer[]): this;
            setRightLayers(rightLayers: Layer | Layer[]): this;
            _map: L.Map;
            _container: HTMLElement;
            _range: HTMLInputElement;
            _divider: HTMLElement;
            _leftLayer: L.Layer;
            _rightLayer: L.Layer;
            _leftLayers: L.Layer[];
            _rightLayers: L.Layer[];
            _mapWasDragEnabled: boolean;
            _mapWasTapEnabled: boolean;
        }

        interface SideBySideOptions {
            thumbSize?: number;
            padding?: number;
            position?: ControlPosition;
        }
    }

    namespace control {
        function sideBySide(
            leftLayers: Layer | Layer[],
            rightLayers: Layer | Layer[],
            options?: Control.SideBySideOptions
        ): Control.SideBySide;
    }
}


interface SideBySideProps {
    /**
     * Layer(s) to show on the left side of the map
     */
    leftLayers: L.Layer | L.Layer[];

    /**
     * Layer(s) to show on the right side of the map
     */
    rightLayers: L.Layer | L.Layer[];

    /**
     * Size of the thumb control in pixels
     */
    thumbSize?: number;

    /**
     * Padding around the control in pixels
     */
    padding?: number;

    /**
     * Position of the control
     */
    position?: L.ControlPosition;
}


// Helper function to handle array conversion
function asArray<T>(arg: T | T[]): T[] {
    return Array.isArray(arg) ? arg : [arg];
}


// Create the base control class
const SideBySideControl = L.Control.extend({
    includes: L.Evented.prototype,

    options: {
        thumbSize: 42,
        padding: 0,
        position: "center" as ControlPosition,
    },

    initialize: function(leftLayers: Layer | Layer[], rightLayers: Layer | Layer[], options?: L.Control.SideBySideOptions) {
        this.setLeftLayers(leftLayers);
        this.setRightLayers(rightLayers);
        L.Util.setOptions(this, options);
    },

    setPosition: function() { /* noop */ },

    setLeftLayers: function(leftLayers: L.Layer | L.Layer[]) {
        this._leftLayers = asArray(leftLayers);
        return this._updateLayers();
    },

    setRightLayers: function(rightLayers: L.Layer | L.Layer[]) {
        this._rightLayers = asArray(rightLayers);
        return this._updateLayers();
    },

    getPosition: function(): number {
        const rangeValue = this._range.value;
        const offset = (0.5 - rangeValue) * (2 * this.options.padding + this.options.thumbSize);
        return this._map.getSize().x * rangeValue + offset;
    },

    addTo: function(map: L.Map) {
        this.remove();
        this._map = map;

        var container = this._container = L.DomUtil.create('div', 'leaflet-sbs', map._controlContainer);

        // Create divider and range input
        this._divider = L.DomUtil.create('div', 'leaflet-sbs-divider', container);
        var range = this._range = L.DomUtil.create('input', 'leaflet-sbs-range', container);
        range.type = 'range';
        range.min = '0';
        range.max = '1';
        range.step = 'any';
        range.value = '0.5';
        range.style.paddingLeft = range.style.paddingRight = this.options.padding + 'px';

        // Set up events
        L.DomEvent.on(range, 'mousedown touchstart', L.DomEvent.stopPropagation)
            .on(container, 'mousedown touchstart', L.DomEvent.stopPropagation);

        // Initialize layer containers
        if (this._leftLayer && this._leftLayer.getContainer) {
            const container = this._leftLayer.getContainer();
            if (container) {
                container.style.position = 'absolute';
                container.style.overflow = 'hidden';
            }
        }

        if (this._rightLayer && this._rightLayer.getContainer) {
            const container = this._rightLayer.getContainer();
            if (container) {
                container.style.position = 'absolute';
                container.style.overflow = 'hidden';
            }
        }

        this._addEvents();
        this._updateLayers();
        return this;
    },


    onRemove: function() {
        if (this._map) {
            // Clean up layer clips first
            if (this._leftLayer && this._leftLayer.getContainer) {
                const leftContainer = this._leftLayer.getContainer();
                if (leftContainer) leftContainer.style.clip = '';
            }
            if (this._rightLayer && this._rightLayer.getContainer) {
                const rightContainer = this._rightLayer.getContainer();
                if (rightContainer) rightContainer.style.clip = '';
            }

            // Remove events
            this._removeEvents();

            // Remove DOM elements
            if (this._container) {
                L.DomUtil.remove(this._container);
            }

            // Clear references
            this._map = null;
            this._leftLayer = null;
            this._rightLayer = null;
        }
        return this;
    },

    _updateLayers: function() {
        if (!this._map) return this;

        const prevLeft = this._leftLayer;
        const prevRight = this._rightLayer;
        this._leftLayer = this._rightLayer = null;

        this._leftLayers.forEach((layer) => {
            if (this._map.hasLayer(layer)) {
                this._leftLayer = layer;
            }
        });

        this._rightLayers.forEach((layer) => {
            if (this._map.hasLayer(layer)) {
                this._rightLayer = layer;
            }
        });

        if (prevLeft !== this._leftLayer) {
            prevLeft && this.fire('leftlayerremove', {layer: prevLeft});
            this._leftLayer && this.fire('leftlayeradd', {layer: this._leftLayer});
        }

        if (prevRight !== this._rightLayer) {
            prevRight && this.fire('rightlayerremove', {layer: prevRight});
            this._rightLayer && this.fire('rightlayeradd', {layer: this._rightLayer});
        }

        this._updateClip();
        return this;
    },

    _updateClip: function() {
        const map = this._map;
        if (!map) return;

        const size = map.getSize();
        const nw = map.containerPointToLayerPoint([0, 0]);
        const se = map.containerPointToLayerPoint(size);
        const clipX = nw.x + this.getPosition();
        const dividerX = this.getPosition();

        // Position the divider
        this._divider.style.left = dividerX + 'px';
        this.fire('dividermove', {x: clipX});

        // Calculate clip paths for each side
        const clipLeft = `rect(${[0, clipX - nw.x, size.y, 0].join('px,')}px)`;
        const clipRight = `rect(${[0, size.x, size.y, clipX - nw.x].join('px,')}px)`;

        // Apply clipping to layer containers
        if (this._leftLayer && this._leftLayer.getContainer) {
            const container = this._leftLayer.getContainer();
            if (container) {
                container.style.clip = clipLeft;
                container.style.zIndex = '1';
                container.style.position = 'absolute';
            }
        }

        if (this._rightLayer && this._rightLayer.getContainer) {
            const container = this._rightLayer.getContainer();
            if (container) {
                container.style.clip = clipRight;
                container.style.zIndex = '2';
                container.style.position = 'absolute';
            }
        }
    },

    _addEvents: function() {
        if (!this._map || !this._range) return;

        this._map.on('move', this._updateClip, this);
        this._map.on('layeradd layerremove', this._updateLayers, this);

        L.DomEvent
            .on(this._range, 'input change', this._updateClip, this)
            .on(this._range, 'mousedown touchstart', this._cancelMapDrag, this)
            .on(this._range, 'mouseup touchend', this._uncancelMapDrag, this)
            .on(this._range, 'input change', L.DomEvent.stopPropagation)
            .on(this._container, 'mousedown', L.DomEvent.stopPropagation);
    },

    _removeEvents: function() {
        if (this._range) {
            L.DomEvent.off(this._range, 'input change', this._updateClip, this);
            L.DomEvent.off(this._range, 'mousedown touchstart', this._cancelMapDrag, this);
            L.DomEvent.off(this._range, 'mouseup touchend', this._uncancelMapDrag, this);
        }

        if (this._map) {
            this._map.off('layeradd layerremove', this._updateLayers, this);
            this._map.off('move', this._updateClip, this);
        }
    },

    _cancelMapDrag: function() {
        this._mapWasDragEnabled = this._map.dragging.enabled();
        this._mapWasTapEnabled = this._map.tap && this._map.tap.enabled();
        this._map.dragging.disable();
        this._map.tap && this._map.tap.disable();
    },

    _uncancelMapDrag: function(e: any) {
        this._map.fire('moveend');
        if (this._mapWasDragEnabled) {
            this._map.dragging.enable();
        }
        if (this._mapWasTapEnabled) {
            this._map.tap.enable();
        }
    }
}) as unknown as {
    new (
        leftLayers: L.Layer | L.Layer[],
        rightLayers: L.Layer | L.Layer[],
        options?: L.Control.SideBySideOptions
    ): L.Control.SideBySide;
};


(L.Control as any).SideBySide = SideBySideControl;

L.control.sideBySide = function(leftLayers: Layer | Layer[], rightLayers: Layer | Layer[], options?: L.Control.SideBySideOptions) {
    return new L.Control.SideBySide(leftLayers, rightLayers, options);
};

L.control.sideBySide = function(
    leftLayers: L.Layer | L.Layer[],
    rightLayers: L.Layer | L.Layer[],
    options?: L.Control.SideBySideOptions
): L.Control.SideBySide {
    return new SideBySideControl(leftLayers, rightLayers, options) as L.Control.SideBySide;
};


/**
 * A Leaflet control to compare two map layers side by side with a draggable divider.
 */
const SideBySide = createControlComponent<L.Control.SideBySide, SideBySideProps>(
    function createSideBySideControl({ leftLayers, rightLayers, ...options }) {
        return L.control.sideBySide(leftLayers, rightLayers, options);
    }
);

export default SideBySide;