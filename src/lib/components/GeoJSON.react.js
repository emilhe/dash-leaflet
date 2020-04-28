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

        // function getColor(d) {
        //     return d > 1000 ? '#800026' :
        //            d > 500  ? '#BD0026' :
        //            d > 200  ? '#E31A1C' :
        //            d > 100  ? '#FC4E2A' :
        //            d > 50   ? '#FD8D3C' :
        //            d > 20   ? '#FEB24C' :
        //            d > 10   ? '#FED976' :
        //                       '#FFEDA0';
        // }
        //
        // function style(feature) {
        //     return {
        //         fillColor: getColor(feature.properties.density),
        //         weight: 2,
        //         opacity: 1,
        //         color: 'white',
        //         dashArray: '3',
        //         fillOpacity: 0.7
        //     };
        // }

        nProps.style = (feature) => {
            // Look for a feature specific style.
            if (nProps.style_map && 'id' in feature && feature.id in nProps.style_map)
                return nProps.style_map[feature.id];
            // Look for a default style.
            if (nProps.default_style)
                return nProps.default_style;
        } ;

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
     * Default style.
     */
    default_style: PropTypes.object,

    /**
     * Customized style via a mapping <id, style>
     */
    style_map: PropTypes.object,

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

