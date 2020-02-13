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
        domainMin: 0,
        domainMax: 1,
        classes: null,
        opacity: 1,
        nTicks: 3,
        tickDecimals: null,
        unit: "",
        style: {},
        className: null
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

        // Create the colorscale
        let scale;
        if (this.options.classes !== null) {
            scale = chroma.scale(this.options.colorscale)
                          .domain([this.options.domainMin, this.options.domainMax])
                          .classes(this.options.classes);
        } else {
            scale = chroma.scale(this.options.colorscale)
                          .domain([this.options.domainMin, this.options.domainMax]);
        }

        // Calculate default precision
        const prec = Math.log10(Math.abs(this.options.domainMax - this.options.domainMin));
        let dec = Math.max(0, 2 - prec);

        if (this.options.tickDecimals !== null) {
            dec = this.options.tickDecimals;
        }

        let h = '';
        if (this.options.width > this.options.height) {
            // Horizontal
            h += `<div style="display: block">`
            for (let i=0; i<this.options.width; i++) {
                const x = (this.options.domainMax - this.options.domainMin)*i/this.options.width + this.options.domainMin;
                const rgba = scale(x).get('rgba');
                h += `<span title="${x.toFixed(dec)}" style="display: inline-block; background-color: rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]*this.options.opacity}); width: 1px; height: ${this.options.height}px"></span>`;
            }
            h += `</div><div style="display: block; padding-bottom: 1.3em; margin-right: ${10 - this.options.width/(this.options.nTicks - 1)}px; margin-top: -3px">`
            for (let i=0; i<this.options.nTicks; i++) {
                h += `<span style="display: inline-block; transform: translate(-50%,0); text-align: center; width: ${this.options.width/(this.options.nTicks - 1)}px">${(this.options.domainMin + (this.options.domainMax - this.options.domainMin)*i/(this.options.nTicks - 1)).toFixed(dec)} ${this.options.unit}</span>`;
            }
            h += `</div>`

        } else {
            // Vertical
            h += `<div style="display: inline-block; margin-top: 5px">`
            for (let i=0; i<this.options.height; i++) {
                const x = this.options.domainMax - (this.options.domainMax - this.options.domainMin)*i/this.options.height;
                const rgba = scale(x).get('rgba');
                h += `<span title="${x.toFixed(dec)}" style="display: block; background-color: rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]*this.options.opacity}); height: 1px; width: ${this.options.width}px"></span>`;
            }
            h += `</div><div style="position: relative; display: inline-block; vertical-align: top; height: ${this.options.height}px; padding-left: 0.3em; margin-top: 5px">`
            for (let i=0; i<this.options.nTicks; i++) {
                h += `<span style="display: block; margin-bottom: ${this.options.height/(this.options.nTicks-1)}px; line-height: 0px; white-space: nowrap">${(this.options.domainMax + (this.options.domainMin - this.options.domainMax)*i/(this.options.nTicks - 1)).toFixed(dec)} ${this.options.unit}</span>`;
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
    setDomainMin: function (domainMin) {
        this.options.domainMin = domainMin;
        this._update();
    },
    setDomainMax: function (domainMax) {
        this.options.domainMax = domainMax;
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
    setTickDecimals: function (tickDecimals) {
        this.options.tickDecimals = tickDecimals;
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
        if (toProps.domainMin !== fromProps.domainMin) {
            this.leafletElement.setDomainMin(toProps.domainMin);
        }
        if (toProps.domainMax !== fromProps.domainMax) {
            this.leafletElement.setDomainMax(toProps.domainMax);
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
        if (toProps.className !== fromProps.className) {
            this.leafletElement.setClassName(fromProps.className, toProps.className);
        }
    }
}

export default withLeaflet(LeafletColorbar);
