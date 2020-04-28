import React, {Component, Node} from 'react';
import PropTypes from 'prop-types';

import {GeoJSON as LeafletGeoJSON} from 'react-leaflet';
import {withLeaflet} from "react-leaflet";

/**
 * LayerGroup is a wrapper of LayerGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
class GeoJSON extends Component {

    render() {
        const nProps = Object.assign({}, this.props);
        const { map } = this.props.leaflet;

        // Read feature style information from style property if it exists.
        nProps.style = (feature) => {
              if (feature.style)
                  return feature.style
        };

//         function onEachFeature(feature, layer) {
//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         click: zoomToFeature
//     });
// }
        console.log(this.props);
        console.log(map);

        // Attach event handlers. TODO: Which event handlers?
        function onEachFeature(feature, layer) {
            layer.on({
                click: (e) => map.fitBounds(e.target.getBounds())
            });
            // layer.onclick = (e) => map.fitBounds(e.target.getBounds());
          // // does this feature have a property named popupContent?
          // if (feature.properties && feature.properties.popupContent) {
          //   layer.bindPopup(feature.properties.popupContent);
          // }
        }

        nProps.onEachFeature = onEachFeature;

        // We need to use the non-JSX syntax to avoid having to list all props
        const el = React.createElement(
            LeafletGeoJSON,
            nProps,
            nProps.children
        )

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