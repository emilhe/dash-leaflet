import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletGeoJSON2 from '../LeafletGeoJSON2';
import {resolveFunctionalProps} from '../utils'
import {withLeaflet} from "react-leaflet";


/**
 * LayerGroup is a wrapper of LayerGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
class GeoJSON2 extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();  // Create reference to be used for geojson object
    }

    render() {
        let nProps = Object.assign({}, this.props);
        nProps.options = resolveFunctionalProps(nProps.options,
            ["pointToLayer", "style", "onEachFeature", "filter", "coordsToLatLng"]);
        return <LeafletGeoJSON2 {...nProps} ref={this.myRef}/>
    }

}

GeoJSON2.defaultProps = {
    format: "geojson",
};

GeoJSON2.propTypes = {

    /**
     * Data (consider using url for better performance).
     */
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

    /**
     * Url to data (use instead of data for better performance).
     */
    url: PropTypes.string,

    /**
     * Data format.
     */
    format: PropTypes.oneOf(["geojson", "geobuf"]),

    /**
     * Options for the GeoJSON object (see https://leafletjs.com/reference-1.6.0.html#geojson-option for details).
     */
    options: PropTypes.object


};

export default withLeaflet(GeoJSON2);

