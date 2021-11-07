import React, {Component} from 'react';
import {propTypes} from '../components/MarkerClusterGroup.react';

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

MarkerClusterGroup.propTypes = propTypes;