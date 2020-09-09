import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletGeoJSON from '../LeafletGeoJSON';
import {resolveFunctionalProps} from '../utils'
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
        // Resolve main functional properties.
        let nProps = resolveFunctionalProps(this.props,
            ["hoverStyle", "clusterToLayer"], this);
        // Resolve functional properties in geojson options.
        nProps.options = resolveFunctionalProps(nProps.options,
            ["pointToLayer", "style", "onEachFeature", "filter", "coordsToLatLng"], this);
        // Bind default onEachFeature.
        if(!nProps.options.onEachFeature){
            nProps.options.onEachFeature = (feature, layer) => {
                if(!feature.properties){
                    return
                }
                if(feature.properties.popup){
                    layer.bindPopup(feature.properties.popup)
                }
                if(feature.properties.tooltip){
                    layer.bindTooltip(feature.properties.tooltip)
                }
            }
        }
        // Add event handlers.
        nProps.onclick = (e) => {
            const feature = e.layer.feature;
            nProps.setProps({ n_clicks: nProps.n_clicks + 1 });
            // Add bounds to feature. TODO: Is this the right way?
            if(e.layer.getBounds) {
                let bounds = e.layer.getBounds();
                feature.bounds = [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]];
            }
            nProps.setProps({click_feature: feature});
        };
        nProps.onmouseover = (e) => {
            const feature = e.layer.feature;
            // Add bounds to feature. TODO: Is this the right way?
            if (e.layer.getBounds) {
                let bounds = e.layer.getBounds();
                feature.bounds = [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]];
            }
            nProps.setProps({hover_feature: feature});
            // Hover styling.
            if (nProps.hoverStyle) {
                e.layer.setStyle(nProps.hoverStyle(feature));
                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    e.layer.bringToFront();
                }
            }
        };
        nProps.onmouseout = (e) => {
            nProps.setProps({hover_feature: null});
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
    cluster: false,
    spiderfyOnMaxZoom: true,
    zoomToBounds: false,
    zoomToBoundsOnClick: false,
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
    hoverStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * If true, zoom to feature bounds on click.
     */
    zoomToBoundsOnClick: PropTypes.bool,

    /**
     * If true, zoom bounds when data are set.
     */
    zoomToBounds: PropTypes.bool,


    /**
     * Object intended for passing variables to functional properties, i.e. clusterToLayer, hoverStyle and
     * (options) pointToLayer, style, filter, and onEachFeature functions.
     */
    hideout: PropTypes.object,

    /**
     * The leaflet pane of the component
     */
    pane: PropTypes.string,

    // Properties related to clustering.

    /**
     * If true, marker clustering will be performed.
     */
    cluster: PropTypes.bool,

    /**
     * Function that determines how a cluster is drawn.
     */
    clusterToLayer: PropTypes.string,

    /**
     * If true, markers that are not resolved at max zoom level will be spiderfied on click.
     */
    spiderfyOnMaxZoom: PropTypes.bool,

    /**
     * Options for the SuperCluster object (see https://github.com/mapbox/supercluster for details).
     */
    superClusterOptions: PropTypes.object,

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
    click_feature: PropTypes.object,

    /**
     * Last feature hovered.
     */
    hover_feature: PropTypes.object,

};

export default withLeaflet(GeoJSON);

