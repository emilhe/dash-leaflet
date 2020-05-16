import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { DivOverlay as LeafletDivOverlay } from 'react-leaflet';

/**
 * DivOverlay is a wrapper of DivOverlay in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class DivOverlay extends Component {
    render() {
        return <LeafletDivOverlay {...this.props}/>
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

