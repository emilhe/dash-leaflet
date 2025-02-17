import {Control, Util, DomUtil, DomEvent} from 'leaflet';
import chroma from 'chroma-js';
import {createElementHook, createElementObject, createLeafComponent, createControlHook} from '@react-leaflet/core';
import * as LP from "../leaflet-props";

export type ColorbarProps = {
    /**
     * Chroma-js colorscale. Either a colorscale name, e.g. "Viridis", or a list of colors,
     * e.g. ["black", "#fdd49e", "rgba(255,0,0,0.35)"].
     * The predefined colorscales are listed here:
     * https://github.com/gka/chroma.js/blob/master/src/colors/colorbrewer.js
     */
    colorscale?: string | string[];

    /**
     * Width in pixels.
     */
    width?: number;

    /**
     * Height in pixels.
     */
    height?: number;

    /**
     * Domain minimum of the colorbar. Translates to the first color of the colorscale.
     */
    min?: number;

    /**
     * Domain maximum of the colorbar. Translates to the last color of the colorscale.
     */
    max?: number;

    /**
     * The number or positions of discrete classes in the colorbar. If not set the
     * colorbar will be continuous, which is the default.
     */
    classes?: number | number[];

    /**
     * Optional text to append to the colorbar ticks.
     */
    unit?: string;

    /**
     * Number of ticks on the colorbar.
     */
    nTicks?: number;

    /**
     * If set, fixes the tick decimal points to the given number.
     */
    tickDecimals?: number;

    /**
     * If set, these values are used for ticks (rather than the ones genrated based on nTicks).
     */
    tickValues?: number[],

    /**
     * If set, this text will be used instead of the data values.
     */
    tickText?: number[],

    /**
     * If true, the value will be shown as tooltip on hover.
     */
    tooltip?: boolean,

    /**
     * Opacity of the colorbar. Use it to match the perceived colors from an overlay
     * with opacity.
     */
    opacity?: number;

    /**
     * HTML style object to add to the colorbar entity, e.g. to set font color.
     */
    style?: object;

    /**
     * Any CSS classes to appy.
     */
    className?: string;

} & LP.ControlProps;

/**
 * Colorbar control component for Leaflet. Most of the functionality is
 * delegated to chroma-js (see the docs for that module). For creating your
 * own color schemes for maps, have a look at http://colorbrewer2.org.
 */
const ReactLeafletColorbar = Control.extend({
    options: {
        position: 'topright',
        colorscale: 'Viridis',
        width: 100,
        height: 10,
        min: 0,
        max: 1,
        classes: null,
        opacity: 1,
        nTicks: 3,
        tickDecimals: null,
        tickValues: null,
        tickText: null,
        unit: "",
        style: {},
        className: null,
        tooltip: true,
    },
    initialize: function (options) {
        Util.setOptions(this, options);
    },
    onAdd: function (map) {
        this._container = DomUtil.create('div', 'leaflet-control-colorbar');
        DomEvent.disableClickPropagation(this._container);
        if (this.options.className) {
            DomUtil.addClass(this._container, this.options.className);
        }

        this._update();

        return this._container;
    },
    _update: function () {
        if (!this._map) {
            return;
        }

        // Unpack stuff.
        const {min, max, colorscale, classes, tickDecimals, unit, width, height, tooltip, opacity} = this.options;
        const range = max - min;
        let {tickValues, tickText} = this.options;
        // Create the colorscale
        let scale;
        if (classes !== null) {
            scale = chroma.scale(colorscale).domain([min, max]).classes(classes);
        } else {
            scale = chroma.scale(colorscale).domain([min, max]);
        }
        // Calculate default precision
        const prec = Math.log10(Math.abs(range));
        let dec = Math.max(0, 2 - prec);
        if (tickDecimals !== null) {
            dec = tickDecimals;
        }
        // Calculate ticks.
        let nTicks = this.options.nTicks;
        if (tickValues === null) {
            tickValues = [];
            for (let i = 0; i < nTicks; i++) {
                tickValues.push(min + range * i / (nTicks - 1))
            }
        } else {
            nTicks = tickValues.length;
        }
        // Calculate tick positions.
        let tickPositions = tickValues.map(function (tick) {
            return (tick - min) / range
        });
        tickPositions.push(1 - tickPositions[tickPositions.length]);
        // Calculate tick labels. TODO: Raise an error, if lengths do not match?
        tickText = tickText ? tickText :
            tickValues.map(function (tick) {
                return String(tick.toFixed(dec)) + " " + String(unit)
            });

        let h = '';
        if (width > height) {
            // Horizontal
            h += `<div style="display: block">`
            // Draw the colorbar itself.
            for (let i = 0; i < width; i++) {
                const x = range * i / width + min;
                const rgba = scale(x).get('rgba');
                const title = tooltip ? "title=\"" + x.toFixed(dec) + "\"" : "";
                h += `<span "${title}" style="display: inline-block; background-color: rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3] * opacity}); width: 1px; height: ${height}px"></span>`;
            }
            h += `</div><div style="display: block; padding-bottom: 0em; margin-right: ${10 - width / (nTicks - 1)}px; margin-top: -3px">`
            // Add the ticks.
            h += `<span style="display: inline-block; transform: translate(-50%,0); text-align: center; width: ${tickPositions[0] * width}px"></span>`;
            for (let i = 0; i < nTicks; i++) {
                let shift = (tickPositions[i + 1] - tickPositions[i]) * width;
                h += `<span style="display: inline-block; transform: translate(-50%,0); text-align: center; width: ${shift}px">${tickText[i]}</span>`;
            }
            h += `</div>`

        } else {
            // Vertical
            h += `<div style="display: inline-block; margin-top: 5px">`
            // Draw the colorbar itself.
            for (let i = 0; i < height; i++) {
                const x = max - range * i / height;
                const rgba = scale(x).get('rgba');
                const title = tooltip ? "title=\"" + x.toFixed(dec) + "\"" : "";
                h += `<span ${title} style="display: block; background-color: rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3] * opacity}); height: 1px; width: ${width}px"></span>`;
            }
            h += `</div><div style="position: relative; display: inline-block; vertical-align: top; height: ${height}px; padding-left: 0.3em; margin-top: 5px">`
            // Add the ticks.
            h += `<span style="display: block; margin-bottom: ${tickPositions[0] * height}px; line-height: 0px; white-space: nowrap"></span>`;
            for (let i = 0; i < nTicks; i++) {
                let shift = (tickPositions[i + 1] - tickPositions[i]) * height;
                h += `<span style="display: block; margin-bottom: ${shift}px; line-height: 0px; white-space: nowrap">${tickText[nTicks - i - 1]}</span>`;
            }
            h += `</div>`
        }

        this._container.innerHTML = h;

        // Set the style attributes of the resulting container
        for (const prop in this.options.style) {
            this._container.style[prop] = this.options.style[prop];
        }

    },
    setColorscale: function (colorscale) {
        this.options.colorscale = colorscale || null;
    },
    setUnit: function (unit) {
        this.options.unit = unit || null;
    },
    setMin: function (min) {
        this.options.min = min || null;
    },
    setMax: function (max) {
        this.options.max = max || null;
    },
    setClasses: function (classes) {
        this.options.classes = classes || null;
    },
    setOpacity: function (opacity) {
        this.options.opacity = opacity || null;
    },
    setNTicks: function (nTicks) {
        this.options.nTicks = nTicks || null;
    },
    setTickValues: function (tickValues) {
        this.options.tickValues = tickValues || null;
    },
    setTickText: function (tickText) {
        this.options.tickText = tickText || null;
    },
    setTickDecimals: function (tickDecimals) {
        this.options.tickDecimals = tickDecimals || null;
    },
    setTooltip: function (tooltip) {
        this.options.tooltip = tooltip || null;
    },
    setClassName: function (oldClass, newClass) {
        this.options.className = newClass;
        if (oldClass !== undefined && oldClass !== null && oldClass !== "") {
            for (const c of oldClass.split(' ')) {
                DomUtil.removeClass(this._container, c);
            }
        }
        if (newClass !== undefined && newClass !== null && newClass !== "") {
            for (const c of newClass.split(' ')) {
                DomUtil.addClass(this._container, c);
            }
        }
    }
})

export const Colorbar = createLeafComponent<typeof ReactLeafletColorbar, ColorbarProps>(
    createControlHook(createElementHook(
            function createLeafletElement(props, context) {
                return createElementObject(new ReactLeafletColorbar(props), context)
            },
            function updateLeafletElement(instance: any, props, prevProps) {
                if (props.colorscale !== prevProps.colorscale) {
                    instance.setColorscale(props.colorscale);
                }
                if (props.tooltip !== prevProps.tooltip) {
                    instance.setTooltip(props.tooltip);
                }
                if (props.min !== prevProps.min) {
                    instance.setMin(props.min);
                }
                if (props.max !== prevProps.max) {
                    instance.setMax(props.max);
                }
                if (props.unit !== prevProps.unit) {
                    instance.setUnit(props.unit);
                }
                if (props.classes !== prevProps.classes) {
                    instance.setClasses(props.classes);
                }
                if (props.opacity !== prevProps.opacity) {
                    instance.setOpacity(props.opacity);
                }
                if (props.nTicks !== prevProps.nTicks) {
                    instance.setNTicks(props.nTicks);
                }
                if (props.tickDecimals !== prevProps.tickDecimals) {
                    instance.setTickDecimals(props.tickDecimals);
                }
                if (props.tickValues !== prevProps.tickValues) {
                    instance.setTickValues(props.tickValues);
                }
                if (props.tickText !== prevProps.tickText) {
                    instance.setTickText(props.tickText);
                }
                if (props.className !== prevProps.className) {
                    instance.setClassName(prevProps.className, props.className);
                }
                instance._update();
            }
        )
    )
)


