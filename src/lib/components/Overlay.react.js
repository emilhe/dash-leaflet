import React, {Component, Node} from 'react';
import PropTypes from 'prop-types';

import { LayersControl as LeafletLayersControl } from 'react-leaflet';

export default class Overlay extends Component {
    render() {
        return <LeafletLayersControl.Overlay {...this.props} />
    }
}

Overlay.propTypes = {

    /**
     * XXX
     */
    name: PropTypes.string.isRequired,

    /**
     * XXX
     */
    checked: PropTypes.bool,

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