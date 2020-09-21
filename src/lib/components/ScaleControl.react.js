import React, {Component, Node} from 'react';
import PropTypes from 'prop-types';

import { ScaleControl as LeafletScaleControl } from 'react-leaflet';

/**
 * ScaleControl is a wrapper of ScaleControl in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class ScaleControl extends Component {
    render() {
        return <LeafletScaleControl {...this.props} />
    }
}

ScaleControl.propTypes = {

    /**
     * Position.
     */
    position: PropTypes.oneOf(['topleft', 'topright', 'bottomleft', 'bottomright']),

    /**
     * Imperial scale or not.
     */
    imperial: PropTypes.bool,

    /**
     * Metric scale or not.
     */
    metric: PropTypes.bool,

     /**
     * Update when idle or not.
     */
    updateWhenIdle: PropTypes.bool,

    /**
     * Control maxWidth.
     */
    maxWidth: PropTypes.number,

    /**
     * The children of this component (dynamic).
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

};

