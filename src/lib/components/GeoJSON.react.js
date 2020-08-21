import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletGeoJSON from '../LeafletGeoJSON';
import {resolveFunctionalProps, resolveFunctionalProp} from '../utils'
import {withLeaflet} from "react-leaflet";


/**
 * LayerGroup is a wrapper of LayerGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
class GeoJSON extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();  // Create reference to be used for geojson object
    }

    render() {
        let nProps = Object.assign({}, this.props);
        // Resolve functional properties in options.
        nProps.options = resolveFunctionalProps(nProps.options,
            ["pointToLayer", "style", "onEachFeature", "filter", "coordsToLatLng"]);
        // Resolve also hover style.
        if(nProps.hoverStyle){
            nProps.hoverStyle = resolveFunctionalProp(nProps.hoverStyle);
        }
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
            // Hover styling.
            if (nProps.hoverStyle) {
                e.layer.setStyle(nProps.hoverStyle(feature));
                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    e.layer.bringToFront();
                }
            }
        };
        nProps.onmouseout = (e) => {
            nProps.setProps({featureHover: null});
            nProps.setProps({boundsHover: null});
            // Hover styling.
            if (nProps.hoverStyle) {
                el.ref.current.leafletElement.resetStyle(e.layer);
            }
        };
        // Render the GeoJSON element.
        const el = <LeafletGeoJSON {...nProps} ref={this.myRef}/>;
        return el
    }

}

GeoJSON.defaultProps = {
    n_clicks: 0,
    format: "geojson",
};

GeoJSON.propTypes = {

    /**
     * Options for the GeoJSON object (see https://leafletjs.com/reference-1.6.0.html#geojson-option for details).
     */
    options: PropTypes.object,

    // Properties used to inject the geojson data.

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

    // Convenience wrappers specific to Dash Leaflet.

    /**
     * Style function applied on hover.
     */
    hoverStyle: PropTypes.string,

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
     * Dash callback property. Number of times the object has been clicked.
     */
    n_clicks: PropTypes.number,

    /**
     * Last feature clicked.
     */
    featureClick: PropTypes.object,

    /**
     * Bounds of last feature clicked.
     */
    featureClickBounds: PropTypes.object,

    /**
     * Last feature hovered.
     */
    featureHover: PropTypes.object,

    /**
     * Bounds of last feature hovered.
     */
    featureHoverBounds: PropTypes.object,

};

export default withLeaflet(GeoJSON);

