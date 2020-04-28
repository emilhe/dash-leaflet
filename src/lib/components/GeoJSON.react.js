import React, {Component, Node} from 'react';
import PropTypes from 'prop-types';

import { GeoJSON as LeafletGeoJSON } from 'react-leaflet';

/**
 * LayerGroup is a wrapper of LayerGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class GeoJSON extends Component {
    render() {
        const nProps = Object.assign({}, this.props);

        // Read feature style information from style property if it exists.
        nProps.style = (feature) => {
            if ('style' in feature)
                return feature.style
        } ;

        // nProps.onEachFeature = (feature, layer) => {
        //     layer.on({
        //         click: (e) => map.fitBounds(e.target.getBounds());
        //     });
        // }

//         function onEachFeature(feature, layer) {
//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         click: zoomToFeature
//     });
// }

        // // eslint-disable-next-line
        // nProps.onclick = (e) => {
        //     nProps.setProps({ click_lat_lng: [e.latlng.lat, e.latlng.lng] });
        // }

        // // eslint-disable-next-line
        // nProps.ondblclick = (e) => {
        //     nProps.setProps({ dbl_click_lat_lng: [e.latlng.lat, e.latlng.lng] });
        // }

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

