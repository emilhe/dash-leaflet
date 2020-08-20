import React, {Component} from 'react';
import PropTypes from 'prop-types';

import LeafletGeoTIFFOverlay from '../LeafletGeoTIFFOverlay';

/**
 * GeoTIFFOverlay is just wrapper of LeafletGeoTIFFOverlay.
 */
export default class GeoTIFFOverlay extends Component {
    render() {
        const nProps = Object.assign({}, this.props);
        // Bind events.
        nProps.onclick = (e) => {
            const idx = e.target.getIndexForLatLng(e.latlng.lat, e.latlng.lng);
            const val = e.target.getValueAtLatLng(e.latlng.lat, e.latlng.lng);
            nProps.setProps({ click_lat_lng_val: [e.latlng.lat, e.latlng.lng, val] });
            nProps.setProps({ click_lat_lng_idx: [e.latlng.lat, e.latlng.lng, idx] });
        };
        nProps.ondblclick = (e) => {
            const idx = e.target.getIndexForLatLng(e.latlng.lat, e.latlng.lng);
            const val = e.target.getValueAtLatLng(e.latlng.lat, e.latlng.lng);
            nProps.setProps({ dbl_click_lat_lng_val: [e.latlng.lat, e.latlng.lng, val] });
            nProps.setProps({ dbl_click_lat_lng_idx: [e.latlng.lat, e.latlng.lng, idx] });
        };
        // Render the leaflet component.
        return <LeafletGeoTIFFOverlay {...nProps} />
    }
}

GeoTIFFOverlay.propTypes = {
    /**
     * The URL of the GeoTIFF file. Only EPSG:4326 / WGS84 coordinates are supported at
     * this time, ie. the file will be mapped without reprojection.
     */
    url: PropTypes.string,

    /**
     * The band inside the GeoTIFF file. Defaults to 0.
     */
    band: PropTypes.number,

    /**
     * The image inside the GeoTIFF file. Defaults to 0.
     */
    image: PropTypes.number,

    /**
     * Chroma-js colorscale. Either a colorscale name, e.g. "Viridis", or a list of colors,
     * e.g. ["black", "#fdd49e", "rgba(255,0,0,0.35)"]
     * The predefined colorscales are listed here:
     * https://github.com/gka/chroma.js/blob/master/src/colors/colorbrewer.js
     */
    colorscale: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),

    /**
     * Domain minimum of the colorscale. Translates to the first color of the colorscale.
     */
    domainMin: PropTypes.number,

    /**
     * Domain maximum of the colorscale. Translates to the last color of the colorscale.
     */
    domainMax: PropTypes.number,

    /**
     * Clamp values higher than domainMax to domainMax. Defaults to false, which precludes
     * those values from being drawn.
     */
    clampHigh: PropTypes.bool,

    /**
     * Clamp values lower than domainMin to domainMin. Defaults to false, which precludes
     * those values from being drawn.
     */
    clampLow: PropTypes.bool,

    /**
     * The number or positions of discrete classes in the colorbar. If not set the
     * colorbar will be continuous, which is the default.
     */
    classes: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
    ]),

    /**
     * List of clipping polygons. Each polygon is a list of [lat, lon] coordinates that surrounds the area to be
     * shown on the map.
     */
    clip: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),

    /**
     * HTML style object to add to the overlay entity, e.g. to set interpolation mode
     * with {'image-rendering': 'pixelated'}
     */
    style: PropTypes.object,

    // Inherited from GridLayer

    /**
     * Width and height of tiles in the grid. Use a number if width and
     * height are equal, or L.point(width, height) otherwise.
     */
    tileSize: PropTypes.number,

    /**
     * Opacity of the tiles. Can be used in the createTile() function.
     */
    opacity: PropTypes.number,

    /**
     * Load new tiles only when panning ends. true by default on mobile
     * browsers, in order to avoid too many requests and keep smooth
     * navigation. false otherwise in order to display new tiles during
     * panning, since it is easy to pan outside the keepBuffer option
     * in desktop browsers.
     */
    updateWhenIdle: PropTypes.bool,

    /**
     * By default, a smooth zoom animation (during a touch zoom or a
     * flyTo()) will update grid layers every integer zoom level.
     * Setting this option to false will update the grid layer only
     * when the smooth animation ends.
     */
    updateWhenZooming: PropTypes.bool,

    /**
     * Tiles will not update more than once every updateInterval
     * milliseconds when panning.
     */
    updateInterval: PropTypes.number,

    /**
     * The explicit zIndex of the tile layer.
     */
    zIndex: PropTypes.number,

    /**
     * If set, tiles will only be loaded inside the set LatLngBounds.
     */
    bounds: PropTypes.arrayOf(PropTypes.number),

    /**
     * The minimum zoom level down to which this layer will be
     * displayed (inclusive).
     */
    minZoom: PropTypes.number,

    /**
     * The maximum zoom level up to which this layer will be
     * displayed (inclusive).
     */
    maxZoom: PropTypes.number,

    /**
     * Minimum zoom number the tile source has available. If it
     * is specified, the tiles on all zoom levels lower than
     * minNativeZoom will be loaded from minNativeZoom level
     * and auto-scaled.
     */
    minNativeZoom: PropTypes.number,

    /**
     * Maximum zoom number the tile source has available. If it
     * is specified, the tiles on all zoom levels higher than
     * maxNativeZoom will be loaded from maxNativeZoom level
     * and auto-scaled.
     */
    maxNativeZoom: PropTypes.number,

    /**
     * Whether the layer is wrapped around the antimeridian. If
     * true, the GridLayer will only be displayed once at low zoom
     * levels. Has no effect when the map CRS doesn't wrap around.
     * Can be used in combination with bounds to prevent requesting
     * tiles outside the CRS limits.
     */
    noWrap: PropTypes.bool,

    /**
     * A custom class name to assign to the tile layer. Empty by default.
     */
    className: PropTypes.string,

    /**
     * When panning the map, keep this many rows and columns of tiles
     * before unloading them.
     */
    keepBuffer: PropTypes.number,

    /**
     * If true, the image overlay will emit mouse events when clicked or hovered.
     */
    interactive: PropTypes.bool,

    /**
     * When true, a mouse event on this path will trigger the same
     * event on the map (unless L.DomEvent.stopPropagation is used).
     */
    bubblingMouseEvents: PropTypes.bool,

    // Inherited from MapLayer

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * The children of this component
     */
    children: PropTypes.node,

    /**
     * The leaflet pane of the component
     */
    pane: PropTypes.string,

    /**
     * The attribution string for the component
     */
    attribution: PropTypes.string,

    // Events
    setProps: PropTypes.func,

    /**
     * Dash callback property. Receives [lat, lng, val] upon click. Requires interactive=True.
     */
    click_lat_lng_val: PropTypes.arrayOf(PropTypes.number),

    /**
     * Dash callback property. Receives [lat, lng, idx] upon click. Requires interactive=True.
     */
    click_lat_lng_idx: PropTypes.arrayOf(PropTypes.number),


    /**
     * Dash callback property. Receives [lat, lng, val] upon double click. Requires interactive=True.
     */
    dbl_click_lat_lng_val: PropTypes.arrayOf(PropTypes.number),

        /**
     * Dash callback property. Receives [lat, lng, idx] upon double click. Requires interactive=True.
     */
    dbl_click_lat_lng_idx: PropTypes.arrayOf(PropTypes.number)
};
