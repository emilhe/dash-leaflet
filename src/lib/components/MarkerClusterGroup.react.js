import React, {Component, Node} from 'react';
import PropTypes from 'prop-types';

import LeafletMarkerClusterGroup from "../MarkerClusterGroup";
require('react-leaflet-markercluster/dist/styles.min.css');

/**
 * MarkerClusterGroup is a wrapper of MarkerClusterGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class MarkerClusterGroup extends Component {
    render() {
        const nProps = Object.assign({}, this.props);

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
            LeafletMarkerClusterGroup,
            // this.props.children
            nProps,
            nProps.children
        )

        return el
    }
}

MarkerClusterGroup.propTypes = {

    /**
     * The children of this component (dynamic)
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

};

