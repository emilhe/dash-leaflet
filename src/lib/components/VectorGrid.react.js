import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletVectorGrid from '../LeafletVectorGrid';

/**
 * VectorGrid is a wrapper of https://github.com/mhasbie/react-leaflet-vectorgrid
 */
export default class VectorGrid extends Component {
    render() {
        console.log(this.props)
        return <LeafletVectorGrid {...this.props} />
    }
}

VectorGrid.defaultProps = {
    type: 'slicer',
    subdomains: '',
};

VectorGrid.propTypes = {

    /**
     * Required when using type slicer. A valid GeoJSON FeatureCollection object.
     */
    data: PropTypes.object,

    /**
     * Decides between using VectorGrid.Slicer and VectorGrid.Protobuf. Available options: slicer, protobuf.
     */
    type: PropTypes.oneOf(["slicer", "protobuf"]),

    /**
     * A unique identifier field in the vector feature.
     */
    idField: PropTypes.string,

    /**
     * Property to display as tooltip.
     */
    tooltip: PropTypes.string,

    /**
     * Apply default style to all vector features. Use this props when not using vectorTileLayerStyles
     */
    style: PropTypes.object,

    /**
     * Style to apply to features on mouseover event.
     */
    hoverStyle: PropTypes.object,

   /**
     * Style to apply to features on click event. Can be use to show user selection when feature is clicked.
    * Double click to clear selection.
     */
    activeStyle: PropTypes.object,

   /**
     * Sets the VectorGrid z-index.
     */
    zIndex: PropTypes.number,

   /**
     * Whether VectorGrid fires Interactive Layer events.
     */
    interactive: PropTypes.bool,

    /**
     * Required when using type protobuf. Pass a url template that points to vector tiles (usually .pbf or .mvt).
     */
    url: PropTypes.string,

    /**
     * Akin to the subdomains option to L.TileLayer.
     */
    subdomains: PropTypes.string,

    /**
     * Tile server access key.
     */
    accessKey: PropTypes.string,

    /**
     * Tile server access token.
     */
    accessToken: PropTypes.string,

    /**
     * A data structure holding initial symbolizer definitions for the vector features. Refer to
     * [Leaflet.VectorGrid doc](https://github.com/Leaflet/Leaflet.VectorGrid) for more info.
     */
    vectorTileLayerStyles: PropTypes.object,

    // TODO: NOT YET IMPLEMENTED

    // tooltip

    // popup

    // onClick

    // onMouseover

    // onMouseout

    // onDblclick

    // Dash related properties.

    /**
     * Children
     */
    children: PropTypes.node,

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    // Events
    setProps: PropTypes.func,
};

