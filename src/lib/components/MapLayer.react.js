import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { MapLayer as LeafletMapLayer } from 'react-leaflet';

/**
 * MapLayer is a wrapper of MapLayer in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class MapLayer extends Component {
    render() {
        // Use non-JSX syntax to avoid having to list all props
        const el = React.createElement(
            LeafletMapLayer,
            this.props,
            this.props.children
        )

        return el
    }
}

MapLayer.defaultProps = {
    attribution: null
};

MapLayer.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * The children of this component
     */
    children: PropTypes.node,

    /**
     * The leaflet pane of the component
     */
    pane: PropTypes.string,

    /**
     * The attribution string for the component
     */
    attribution: PropTypes.string
};

