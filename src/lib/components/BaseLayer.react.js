import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { LayersControl as LeafletLayersControl } from 'react-leaflet';

/**
 * LayersControl is a wrapper of LayersControl in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class BaseLayer extends Component {
    render() {
        console.log("THIS SHOULD NEVER HAPPEN")
        return null; // <LeafletLayersControl.BaseLayer {...this.props} />
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

