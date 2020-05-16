import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { GridLayer as LeafletGridLayer } from 'react-leaflet';

/**
 * GridLayer is a wrapper of GridLayer in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class GridLayer extends Component {
    render() {
        return <LeafletGridLayer {...this.props} />
    }
}

GridLayer.defaultProps = {
    attribution: null
};

GridLayer.propTypes = {
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
    attribution: PropTypes.string
};

