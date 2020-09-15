import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { LayersControl as LeafletLayersControl } from 'react-leaflet';

/**
 * LayerGroup is a wrapper of LayerGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class LayersControl extends Component {
    render() {
        return <LayersControl {...this.props} />
    }
}

LayersControl.propTypes = {

    /**
     * XXX
     */
    collapsed: PropTypes.bool,

    // TODO: Add position at some point. Also for ScaleControl and ZoomControl?
    // /**
    //  * XXX
    //  */
    // position: PropTypes.bool,

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

};

