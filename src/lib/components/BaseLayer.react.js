import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * BaseLayer is a wrapper of LayersControl.BaseLayer in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class BaseLayer extends Component {
    render() {
        return null;
    }
}

BaseLayer.propTypes = {

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

