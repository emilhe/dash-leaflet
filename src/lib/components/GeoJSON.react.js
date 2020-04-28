import React, {Component, Node} from 'react';
import PropTypes from 'prop-types';

import {GeoJSON as LeafletGeoJSON} from 'react-leaflet';
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
        const nProps = Object.assign({}, this.props);
        const { map } = this.props.leaflet;
        var el;

        function applyStyle(feature){
            if (feature.style)
                return feature.style
        }

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds())
        }


        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
        }

        function resetHighlight(e){
            el.ref.current.leafletElement.resetStyle(e.target);
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }

        // Bind styles.
        nProps.style = applyStyle;
        // Bind events.
        nProps.onEachFeature = onEachFeature;
        // Bind reference to nProps.
        nProps.ref = this.myRef;
        // We need to use the non-JSX syntax to avoid having to list all props
        el = React.createElement(
            LeafletGeoJSON,
            nProps,
            nProps.children
        );

        return el
    }

}

GeoJSON.propTypes = {

    /**
     * GeoJSON data
     */
    data: PropTypes.object,

    /**
     * Attribution
     */
    attribution: PropTypes.string,

    /**
     * Attribution
     */
    children: PropTypes.node,

    /**
     * A custom class name to assign to the image. Empty by default.
     */
    className: PropTypes.string,

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    // Events
    setProps: PropTypes.func,

}

export default withLeaflet(GeoJSON);