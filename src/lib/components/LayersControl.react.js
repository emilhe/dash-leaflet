import React, {Component, Node} from 'react';
import PropTypes from 'prop-types';

import { LayersControl as LeafletLayersControl } from 'react-leaflet';

/**
 * ScaleControl is a wrapper of ScaleControl in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class LayersControl extends Component {
    render() {
        return <LeafletLayersControl {...this.props} />
    }
}

LayersControl.propTypes = {

    /**
     * XXX
     */
    collapsed: PropTypes.bool,

    /**
     * XXX
     */
    position: PropTypes.string,

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