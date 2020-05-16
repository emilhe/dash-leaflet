import React, {Component, Node} from 'react';
import PropTypes from 'prop-types';

import LeafletMarkerClusterGroup from "../LeafletMarkerClusterGroup";
require('react-leaflet-markercluster/dist/styles.min.css');

/**
 * MarkerClusterGroup is a wrapper of MarkerClusterGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class MarkerClusterGroup extends Component {

    render() {
        return <LeafletMarkerClusterGroup {...this.props}/>
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
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * Marker cluster group options (a dict). See list of options here
     * https://github.com/Leaflet/Leaflet.markercluster#all-options
     */
    options: PropTypes.object,


    // Events
    setProps: PropTypes.func,

};

