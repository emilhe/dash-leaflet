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
        // Resolve functional properties.
        nProps.options = resolveFunctionalProps(nProps.options,
            ["pointToLayer", "style", "onEachFeature", "filter", "coordsToLatLng"]);
        // Add event handlers.
        nProps.onclick = (e) => {
            const feature = e.layer.feature;
            let bounds = e.layer.getBounds();
            bounds = [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]];
            nProps.setProps({ n_clicks: nProps.n_clicks + 1 });
            nProps.setProps({featureClick: feature});
            nProps.setProps({boundsClick: bounds});
        };
        nProps.onmouseover = (e) => {
            const feature = e.layer.feature;
            let bounds = e.layer.getBounds();
            bounds = [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]];
            nProps.setProps({featureHover: feature});
            nProps.setProps({boundsHover: bounds});
        };
        nProps.onmouseout = (e) => {
            // const feature = e.layer.feature;
            nProps.setProps({featureHover: null});
            nProps.setProps({boundsHover: null});
        };
        // Render the GeoJSON element.
        return <LeafletGeoJSON2 {...nProps} ref={this.myRef}/>
    }

}

GeoJSON2.defaultProps = {
    n_clicks: 0,
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
    options: PropTypes.object,

    // Dash related properties.

    /**
     * Children
     */
    children: PropTypes.node,

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * Special Dash property.
     */
    setProps: PropTypes.func,

    // Dash events.

    /**
     * Dash callback property. Number of times the marker has been clicked
     */
    n_clicks: PropTypes.number,

    /**
     * Last feature clicked.
     */
    featureClick: PropTypes.object,

    /**
     * Last feature clicked.
     */
    boundsClick: PropTypes.object,

    /**
     * Last feature hover.
     */
    featureHover: PropTypes.object,

    /**
     * Last feature clicked.
     */
    boundsHover: PropTypes.object,

};

export default withLeaflet(GeoJSON2);

