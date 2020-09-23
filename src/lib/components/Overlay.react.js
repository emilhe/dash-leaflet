import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Overlay is a wrapper of LayersControl.Overlay in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class Overlay extends Component {
    render() {
        return null;
    }
}

Overlay.propTypes = {

    /**
     * Checked.
     */
    checked: PropTypes.bool,

    /**
     * Name.
     */
    name: PropTypes.string,

    /**
     * Attribution
     */
    children: PropTypes.node,

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    // Events
    setProps: PropTypes.func,

};

