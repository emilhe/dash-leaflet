import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { DivOverlay as LeafletDivOverlay } from 'react-leaflet';

/**
 * DivOverlay is a wrapper of DivOverlay in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class DivOverlay extends Component {
    render() {
        // Use non-JSX syntax to avoid having to list all props
        const el = React.createElement(
            LeafletDivOverlay,
            this.props,
            this.props.children
        )

        return el
    }
}

DivOverlay.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * The children of this component
     */
    children: PropTypes.node,

    /**
     * The class of the component
     */
    className: PropTypes.string,

    /**
     * The leaflet pane of the component
     */
    pane: PropTypes.string,

    /**
     * The attribution string for the component
     */
    attribution: PropTypes.string
};

