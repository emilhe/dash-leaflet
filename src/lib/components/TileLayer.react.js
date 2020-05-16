import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { TileLayer as LeafletTileLayer } from 'react-leaflet';

/**
 * TileLayer is a wrapper of TileLayer in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class TileLayer extends Component {
    render() {
        return <LeafletTileLayer {...this.props} />
    }
}

TileLayer.defaultProps = {
    // Set default to OSM
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

TileLayer.propTypes = {
    /**
     * A URL template for the tile layer, ie. a string of the following form:
     * 'http://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'
     * where {s} means one of the available subdomains (used sequentially to 
     * help with browser parallel requests per domain limitation; subdomain 
     * values are specified in options; a, b or c by default, can be omitted), 
     * {z} zoom level, {x} and {y} tile coordinates. {r} can be used to
     * add "@2x" to the URL to load retina tiles. 
     */
    url: PropTypes.string,

    /**
     * Opacity of the tiles. Can be used in the createTile() function.
     */
    opacity: PropTypes.number,

    /**
     * The explicit zIndex of the tile layer.
     */
    zIndex: PropTypes.number,

    // Static parameters

    /**
     * The minimum zoom level down to which this layer will be displayed (inclusive).
     */
    minZoom: PropTypes.number,

    /**
     * The maximum zoom level up to which this layer will be displayed (inclusive).
     */
    maxZoom: PropTypes.number,

    /**
     * Subdomains of the tile service. Can be passed in the form of one string 
     * (where each letter is a subdomain name) or an array of strings.
     */
    subdomains: PropTypes.string,

    /**
     * URL to the tile image to show in place of the tile that failed to load.
     */
    errorTileUrl: PropTypes.string,

    /**
     * The zoom number used in tile URLs will be offset with this value.
     */
    zoomOffset: PropTypes.number,

    /**
     * If true, inverses Y axis numbering for tiles (turn this on for TMS services).
     */
    tms: PropTypes.bool,

    /**
     * If set to true, the zoom number used in tile URLs will be reversed 
     * (maxZoom - zoom instead of zoom)
     */
    zoomReverse: PropTypes.bool,

    /**
     * If true and user is on a retina display, it will request four tiles of half 
     * the specified size and a bigger zoom level in place of one to utilize the 
     * high resolution.
     */
    detectRetina: PropTypes.bool,

    /**
     * Whether the crossOrigin attribute will be added to the tiles. If 
     * a String is provided, all tiles will have its crossOrigin attribute 
     * set to the String provided. This is needed if you want to access tile 
     * pixel data. Refer to CORS Settings for valid String values.
     */
    crossOrigin: PropTypes.bool,

    // Inherited from GridLayer

    /**
     * Width and height of tiles in the grid. Use a number if width and 
     * height are equal, or L.point(width, height) otherwise.
     */
    tileSize: PropTypes.number,

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
     * If set, tiles will only be loaded inside the set LatLngBounds.
     */
    bounds: PropTypes.arrayOf(PropTypes.number),

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
};
