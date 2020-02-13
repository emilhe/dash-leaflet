import { withLeaflet, MapLayer } from 'react-leaflet';

import { ImageOverlay, Util, DomUtil, latLngBounds, Bounds } from 'leaflet';
import * as GeoTIFF from 'geotiff';
import chroma from 'chroma-js';
import proj4 from 'proj4';

/**
 * GeoTIFF overlay using canvas instead of an image. Only supports WGS 84
 * (also known as WGS 1984, EPSG:4326) GeoTIFFs, ie. no reprojection is done.
 */

const LeafletGeotiff = ImageOverlay.extend({
	options: {
        colorscale: 'Viridis',
        domainMin: 0,
        domainMax: 1,
        clampLow: false,
        clampHigh: false,
        classes: null,
		band: 0,
        image: 0,
        clip: null,
        style: {},
        className: null,
        nCanvas: 10
    },
    _initImage: function() {
        const image = DomUtil.create('div');
        this._image = image;
        this._raster = {};
        this._canvasses = [];

        for (let i=0; i<this.options.nCanvas; i++) {
            const canvas = DomUtil.create('canvas', '', image);
            canvas.style.position = 'absolute';
            canvas.style['image-rendering'] = 'pixelated';
            this._canvasses.push(canvas);
        }

        // Add some classes used by leaflet to the canvas.
        DomUtil.addClass(image, 'leaflet-image-layer');
        if (this._zoomAnimated) { DomUtil.addClass(image, 'leaflet-zoom-animated'); }
        if (this.options.className) { DomUtil.addClass(image, this.options.className); }

        // Set style attributes to the DOM object if any are given.
        for (const prop in this.options.style) {
            image.style[prop] = this.options.style[prop];
        }

        // Override some listeners. Required by leaflet.
        image.onselectstart = Util.falseFn;
        image.onmousemove = Util.falseFn;
    },
    initialize: function (url, options) {
		this._url = url;

		Util.setOptions(this, options);

        this._setScale();
	},
    setURL: function(url) {
        this._url = url;

        this._getData();

        if (!this._url) {
            // Recalculate the bounds in case the _url is set to None after it was valid
            const bounds = new Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
                                      this._map.latLngToLayerPoint(this._bounds.getSouthEast()));
            const size = bounds.getSize();

            // Set the canvas position to the pixel coordinates calculated above.
            DomUtil.setPosition(this._image, bounds.min);

            // Set the DOM size of the canvas to the pixel size calculated above.
            this._image.style.width  = size.x + 'px';
            this._image.style.height = size.y + 'px';
        }
    },
    setBand: function (band) {
        this.options.band = band;
        this._getData();
    },
    setClip: function (clip) {
        this.options.clip = clip;
        this._drawImage();
    },
    setOpacity: function (opacity) {
        this.options.opacity = opacity;
        this._drawImage();
    },
    setColorscale: function (colorscale) {
        this.options.colorscale = colorscale;
        this._setScale();
        this._drawImage();
    },
    setDomainMin: function (domainMin) {
        this.options.domainMin = domainMin;
        this._setScale();
        this._drawImage();
    },
    setDomainMax: function (domainMax) {
        this.options.domainMax = domainMax;
        this._setScale();
        this._drawImage();
    },
    setClampLow: function (clampLow) {
        this.options.clampLow = clampLow;
        this._drawImage();
    },
    setClampHigh: function (clampHigh) {
        this.options.clampHigh = clampHigh;
        this._drawImage();
    },
    setClasses: function (classes) {
        this.options.classes = classes;
        this._setScale();
        this._drawImage();
    },
    setStyle: function (style) {
        this.options.style = style;
        this._image.style = null;
        for (const prop in this.options.style) {
            this._image.style[prop] = this.options.style[prop];
        }
        this._reset();
    },
    setClassName: function (oldClass, newClass) {
        this.options.className = newClass;
        if (oldClass !== undefined && oldClass !== null && oldClass !== "") {
            for (const c of oldClass.split(' ')) {
                DomUtil.removeClass(this._image, c);
            }
        }
        if (newClass !== undefined && newClass !== null && newClass !== "") {
            for (const c of newClass.split(' ')) {
                DomUtil.addClass(this._image, c);
            }
        }
        this._reset();
    },
    isClockwise: function (poly) {
        let sum = 0;
        for (let i=1; i<poly.length; i++) {
            sum += (poly[i][0] - poly[i-1][0]) * (poly[i][1] + poly[i-1][1]);
        }
        sum += (poly[0][0] - poly[poly.length-1][0]) * (poly[0][1] + poly[poly.length-1][1]);

        return sum < 0;
    },
    getIndexForLatLng: function (lat, lng) {
        const xmin = this._raster.originX;
        const xmax = xmin + this._raster.width * this._raster.pixelWidth;
        const ymax = this._raster.originY;
        const ymin = ymax - this._raster.height * this._raster.pixelHeight;

        if (lat < ymin || lat > ymax || lng < xmin || lng > xmax) return null

        const yd = (ymax - lat)/this._raster.pixelHeight;
        const xd = (lng - xmin)/this._raster.pixelWidth;

        const i = Math.floor(yd) * this._raster.width + Math.floor(xd);
        if (i >= 0 && i < this._raster.data.length) {
            return i;
        }
        return null
    },
    getValueAtLatLng: function (lat, lng) {
        const i = this.getIndexForLatLng(lat, lng);
        if (i === null){
            return null
        }
        return this._raster.data[i];
    },
    _setScale: function() {
        if (this.options.classes !== null) {
            this._scale = chroma.scale(this.options.colorscale)
                                .domain([this.options.domainMin, this.options.domainMax])
                                .classes(this.options.classes);
        } else {
            this._scale = chroma.scale(this.options.colorscale)
                                .domain([this.options.domainMin, this.options.domainMax]);
        }
    },
    _reset: function () {
        if (!this._raster.data) {
            this._getData();
        } else {
            // Calculate the bounds from the information supplied by the GeoTIFF.
            const bounds = new Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
                                      this._map.latLngToLayerPoint(this._bounds.getSouthEast()));
            const size = bounds.getSize();

            // Set the canvas position to the pixel coordinates calculated above.
            DomUtil.setPosition(this._image, bounds.min);

            // Set the DOM size of the canvas to the pixel size calculated above.
            this._image.style.width  = size.x + 'px';
            this._image.style.height = size.y + 'px';
        }
    },
    _getData: function() {
        // Reset this._raster and _bounds
        this._raster = {};
        this._bounds = latLngBounds([[-99999, -99999], [-99999, -99999]]);

        if (!this._url) return;

        fetch(this._url)
        .then(response => response.arrayBuffer())
        .then(buffer => GeoTIFF.fromArrayBuffer(buffer))
        .then(tiff => {
            this.tiff = tiff;
            return this.tiff.getImage(this.options.image);
        }).then(image => {

            const height = image.getHeight();
            const width = image.getWidth();

            this._raster.width = width;
            this._raster.height = height;

            // Get the meta data stored in the image.
            const meta = image.getFileDirectory();
            if (meta.GDAL_NODATA) {
                this._raster.noData = parseFloat(meta.GDAL_NODATA);
            }

            const {
                GeographicTypeGeoKey,
                ProjectedCSTypeGeoKey,
              } = image.getGeoKeys();

            const projection = GeographicTypeGeoKey || ProjectedCSTypeGeoKey;
            if (projection !== 4326) console.log(`Unsupported projection: ${projection}`);

            const [resolutionX, resolutionY] = image.getResolution();
            const pixelHeight = Math.abs(resolutionY);
            const pixelWidth = Math.abs(resolutionX);

            this._raster.pixelHeight = pixelHeight;
            this._raster.pixelWidth = pixelWidth;

            const [originX, originY] = image.getOrigin();

            this._raster.originX = originX;
            this._raster.originY = originY;

            const xmin = originX;
            const xmax = xmin + width * pixelWidth;
            const ymax = originY;
            const ymin = ymax - height * pixelHeight;

            // This sets the bounds for ImageOverlay which makes transforms, zoom, etc. work
            this._bounds = latLngBounds([[ymin, xmin], [ymax, xmax]]);

            const bounds = new Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
                                      this._map.latLngToLayerPoint(this._bounds.getSouthEast()));
            const size = bounds.getSize();

            // Set the (real) pixel sizes of the canvasses
            let yOffset = 0;
            let yPctOffset = 0;
            for (let i=0; i<this.options.nCanvas; i++) {
                this._canvasses[i].width = this._raster.width;
                this._canvasses[i].style.width = "100%";

                const yHeight = Math.ceil(this._raster.height/this.options.nCanvas);
                this._canvasses[i].height = i == this.options.nCanvas - 1 ? this._raster.height - yOffset : yHeight;

                const y1 = ymax - yOffset * pixelHeight;
                const y0 = ymax - (yOffset + this._canvasses[i].height) * pixelHeight;

                const yminp = proj4('EPSG:3857', [xmin, ymin]);
                const ymaxp = proj4('EPSG:3857', [xmin, ymax]);
                const y0p = proj4('EPSG:3857', [xmin, y0]);
                const y1p = proj4('EPSG:3857', [xmin, y1]);

                const yPct = (y1p[1] - y0p[1])/(ymaxp[1] - yminp[1]);
                this._canvasses[i].style.height = `${100*yPct}%`;
                this._canvasses[i].style.top = `${100*yPctOffset}%`;

                yOffset += yHeight;
                yPctOffset += yPct;
            }

            // Set the canvas position to the pixel coordinates calculated above.
            DomUtil.setPosition(this._image, bounds.min);

            // Set the (DOM) size of the canvas to the pixel size calculated above.
            this._image.style.width  = size.x + 'px';
            this._image.style.height = size.y + 'px';

            // Use these if you need to look at the information in the GeoTIFF
            // console.log(image);
            // console.log(meta);
            image.readRasters().then(rst => {
                this._raster.data = rst[this.options.band];
                this.fire('load');
                this._drawImage();
            })
        })
    },
    _drawImage: function () {
        // We need to check if the data has been loaded, because drawImage may be
        // triggered early by the set* methods
        if (this._raster.data) {
            let yOffset = 0;
            for (let k=0; k<this.options.nCanvas; k++) {
                const ctx = this._canvasses[k].getContext("2d");
                const yHeight = this._canvasses[k].height;
//                console.log(yOffset, yHeight, this._raster.height);

                // We draw the image on a separate image data buffer and then copy it
                // onto the canvas in the end.
                const id = ctx.createImageData(this._raster.width, yHeight);

                for (let j=0; j<yHeight; j++) {
                    for (let i=0; i<this._raster.width; i++) {
                        const rIdx = (j+yOffset)*this._raster.width + i;
                        let val = this._raster.data[rIdx];

                        // Clamp the value if enabled
                        if (val < this.options.domainMin && this.options.clampLow) {
                            val = this.options.domainMin;
                        }
                        if (val > this.options.domainMax && this.options.clampHigh) {
                            val = this.options.domainMax;
                        }

                        // Calculate the color using the colorscale
                        let color;
                        if (val === this._raster.noData) {
                            color = this._scale(null);
                        } else {
                            color = this._scale(val);
                        }

                        // Draw the color if within the domain
                        if (val >= this.options.domainMin && val <= this.options.domainMax) {
                            const idx = 4*(j*this._raster.width + i);
                            id.data[idx] = color.get('rgba.r');
                            id.data[idx+1] = color.get('rgba.g');
                            id.data[idx+2] = color.get('rgba.b');
                            id.data[idx+3] = this.options.opacity*color.get('rgba.a')*255;
                        }
                    }
                }

                // Copy final image to the canvas
                ctx.clearRect(0, 0, this._raster.width, yHeight);
                ctx.putImageData(id, 0, 0);


                if (this.options.clip) {
                    const xmin = this._raster.originX;
                    const ymax = this._raster.originY;

                    ctx.globalCompositeOperation = 'destination-out';

                    // Draw a path around the border of the image.
                    ctx.beginPath();
                    ctx.moveTo(0, -yOffset);
                    ctx.lineTo(this._raster.width, -yOffset);
                    ctx.lineTo(this._raster.width, this._raster.height - yOffset);
                    ctx.lineTo(0, this._raster.height - yOffset);
                    ctx.closePath();

                    // If there are clipping polygons, then this section removes whatever
                    // is outside the polygons on the canvas.
                    let moved = false;
                    for (let i=0; i<this.options.clip.length; i++) {
                        const clipCW = this.isClockwise(this.options.clip[i]);
                        // Then draw a path along the polygon
                        if (clipCW) {
                            // Clockwise
                            for (let j = this.options.clip[i].length - 1; j >= 0; j--) {
                                const [lat, lng] = this.options.clip[i][j];
                                const y = (ymax - lat) / this._raster.pixelHeight;
                                const x = (lng - xmin) / this._raster.pixelWidth;

                                if (moved) {
                                    ctx.lineTo(x, y - yOffset);
                                } else {
                                    ctx.moveTo(x, y - yOffset);
                                    moved = true;
                                }
                            }
                        } else {
                            // Counter clockwise
                            for (let j = 0; j < this.options.clip.length; j++) {
                                const [lat, lng] = this.options.clip[i][j];
                                const y = (ymax - lat) / this._raster.pixelHeight;
                                const x = (lng - xmin) / this._raster.pixelWidth;

                                if (moved) {
                                    ctx.lineTo(x, y - yOffset);
                                } else {
                                    ctx.moveTo(x, y - yOffset);
                                    moved = true;
                                }
                            }
                        }
                        ctx.closePath();
                    }
                    // This then cuts out the polygon and removes everything outside it
                    ctx.fill();
                }

                // Add canvas height to yOffset
                yOffset += yHeight;
            }
        }
    }
});

class LeafletGeoTIFFOverlay extends MapLayer {
    createLeafletElement(props) {
        const nProps = Object.assign({}, props);

        const el = new LeafletGeotiff(
            nProps.url,
            this.getOptions(nProps)
        )
        this.contextValue = Object.assign({}, props.leaflet);
        this.contextValue.popupContainer = el;

        return el
    }

    updateLeafletElement(fromProps, toProps) {
        if (toProps.url !== fromProps.url) {
            this.leafletElement.setURL(toProps.url);
        }
        if (toProps.band !== fromProps.band) {
            this.leafletElement.setBand(toProps.band);
        }
        if (toProps.clip !== fromProps.clip) {
            this.leafletElement.setClip(toProps.clip);
        }
        if (toProps.opacity !== fromProps.opacity) {
            this.leafletElement.setOpacity(toProps.opacity);
        }
        if (toProps.colorscale !== fromProps.colorscale) {
            this.leafletElement.setColorscale(toProps.colorscale);
        }
        if (toProps.domainMin !== fromProps.domainMin) {
            this.leafletElement.setDomainMin(toProps.domainMin);
        }
        if (toProps.domainMax !== fromProps.domainMax) {
            this.leafletElement.setDomainMax(toProps.domainMax);
        }
        if (toProps.clampLow !== fromProps.clampLow) {
            this.leafletElement.setClampLow(toProps.clampLow);
        }
        if (toProps.clampHigh !== fromProps.clampHigh) {
            this.leafletElement.setClampHigh(toProps.clampHigh);
        }
        if (toProps.classes !== fromProps.classes) {
            this.leafletElement.setClasses(toProps.classes);
        }
        if (toProps.style !== fromProps.style) {
            this.leafletElement.setStyle(toProps.style);
        }
        if (toProps.className !== fromProps.className) {
            this.leafletElement.setClassName(fromProps.className, toProps.className);
        }
    }
}

export default withLeaflet(LeafletGeoTIFFOverlay)
