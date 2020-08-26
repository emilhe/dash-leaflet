import { Control, Util, DomUtil, DomEvent } from 'leaflet';
import { withLeaflet, MapControl } from 'react-leaflet';
import chroma from 'chroma-js';

/**
 * Colorbar control component for Leaflet. Most of the functionality is
 * delegated to chroma-js (see the docs for that module). For creating your
 * own color schemes for maps, have a look at http://colorbrewer2.org.
 */

const Colorbar = Control.extend({
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
        if (this.options.className) { DomUtil.addClass(this._container, this.options.className); }

		this._update();

		return this._container;
	},
	_update: function () {
		if (!this._map) { return; }

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
        }
        else{
            nTicks = tickValues.length;
        }
        // Calculate tick positions.
        let tickPositions = tickValues.map(function (tick) { return (tick -  min) / range });
        tickPositions.push(1-tickPositions[tickPositions.length]);
        // Calculate tick labels. TODO: Raise an error, if lengths do not match?
        tickText = tickText ? tickText :
            tickValues.map(function (tick) { return String(tick.toFixed(dec)) + " " + String(unit)});

        let h = '';
        if (width > height) {
            // Horizontal
            h += `<div style="display: block">`
            // Draw the colorbar itself.
            for (let i=0; i<width; i++) {
                const x = range*i/width + min;
                const rgba = scale(x).get('rgba');
                const title = tooltip? "title=\"" + x.toFixed(dec) + "\"" : "";
                h += `<span "${title}" style="display: inline-block; background-color: rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]*opacity}); width: 1px; height: ${height}px"></span>`;
            }
            h += `</div><div style="display: block; padding-bottom: 0em; margin-right: ${10 - width/(nTicks - 1)}px; margin-top: -3px">`
            // Add the ticks.
            h += `<span style="display: inline-block; transform: translate(-50%,0); text-align: center; width: ${tickPositions[0]* width}px"></span>`;
            for (let i=0; i<nTicks; i++) {
                let shift = (tickPositions[i+1] - tickPositions[i]) * width;
                h += `<span style="display: inline-block; transform: translate(-50%,0); text-align: center; width: ${shift}px">${tickText[i]}</span>`;
            }
            h += `</div>`

        } else {
            // Vertical
            h += `<div style="display: inline-block; margin-top: 5px">`
            // Draw the colorbar itself.
            for (let i=0; i<height; i++) {
                const x = max - range*i/height;
                const rgba = scale(x).get('rgba');
                const title = tooltip? "title=\"" + x.toFixed(dec) + "\"" : "";
                h += `<span ${title} style="display: block; background-color: rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]*opacity}); height: 1px; width: ${width}px"></span>`;
            }
            h += `</div><div style="position: relative; display: inline-block; vertical-align: top; height: ${height}px; padding-left: 0.3em; margin-top: 5px">`
            // Add the ticks.
            h += `<span style="display: block; margin-bottom: ${tickPositions[0]* height }px; line-height: 0px; white-space: nowrap"></span>`;
            for (let i=0; i<nTicks; i++) {
                let shift  = (tickPositions[i+1] - tickPositions[i]) * height;
                h += `<span style="display: block; margin-bottom: ${shift}px; line-height: 0px; white-space: nowrap">${tickText[nTicks-i-1]}</span>`;
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
        this.options.colorscale = colorscale;
        this._update();
    },
    setUnit: function (unit) {
        this.options.unit = unit;
        this._update();
    },
    setMin: function (min) {
        this.options.min = min;
        this._update();
    },
    setMax: function (max) {
        this.options.max = max;
        this._update();
    },
    setClasses: function (classes) {
        this.options.classes = classes;
        this._update();
    },
    setOpacity: function (opacity) {
        this.options.opacity = opacity;
        this._update();
    },
    setNTicks: function (nTicks) {
        this.options.nTicks = nTicks;
        this._update();
    },
    setTickValues: function (tickValues) {
        this.options.tickValues = tickValues;
        this._update();
    },
    setTickText: function (tickText) {
        this.options.tickText = tickText;
        this._update();
    },
    setTickDecimals: function (tickDecimals) {
        this.options.tickDecimals = tickDecimals;
        this._update();
    },
    setTooltip: function (tooltip) {
        this.options.tooltip = tooltip;
        this._update();
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
        this._update();
    }
})

class LeafletColorbar extends MapControl {

    createLeafletElement(props) {
        return new Colorbar(props);
    }

    updateLeafletElement(fromProps, toProps) {
        if (toProps.colorscale !== fromProps.colorscale) {
            this.leafletElement.setColorscale(toProps.colorscale);
        }
        if (toProps.tooltip !== fromProps.tooltip) {
            this.leafletElement.setTooltip(toProps.tooltip);
        }
        if (toProps.min !== fromProps.min) {
            this.leafletElement.setMin(toProps.min);
        }
        if (toProps.max !== fromProps.max) {
            this.leafletElement.setMax(toProps.max);
        }
        if (toProps.unit !== fromProps.unit) {
            this.leafletElement.setUnit(toProps.unit);
        }
        if (toProps.classes !== fromProps.classes) {
            this.leafletElement.setClasses(toProps.classes);
        }
        if (toProps.opacity !== fromProps.opacity) {
            this.leafletElement.setOpacity(toProps.opacity);
        }
        if (toProps.nTicks !== fromProps.nTicks) {
            this.leafletElement.setNTicks(toProps.nTicks);
        }
        if (toProps.tickDecimals !== fromProps.tickDecimals) {
            this.leafletElement.setTickDecimals(toProps.tickDecimals);
        }
        if (toProps.tickValues !== fromProps.tickValues) {
            this.leafletElement.setTickValues(toProps.tickValues);
        }
        if (toProps.tickText !== fromProps.tickText) {
            this.leafletElement.setTickText(toProps.tickText);
        }
        if (toProps.className !== fromProps.className) {
            this.leafletElement.setClassName(fromProps.className, toProps.className);
        }
    }
}

export default withLeaflet(LeafletColorbar);
