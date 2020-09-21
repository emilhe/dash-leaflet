import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { LayerGroup as LeafletLayerGroup } from 'react-leaflet';
import {withLeaflet} from "react-leaflet/lib/context";

/**
 * LayerGroup is a wrapper of LayerGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
class LayerGroup extends Component {
    render() {
        return <LeafletLayerGroup {...this.props} />
    }
}

LayerGroup.propTypes = {

    /**
     * Attribution
     */
    attribution: PropTypes.string,

    /**
     * Attribution
     */
    children: PropTypes.node,

    /**
     * A custom class name. Empty by default.
     */
    className: PropTypes.string,

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    // Events
    setProps: PropTypes.func,

};

export default withLeaflet(LayerGroup);
