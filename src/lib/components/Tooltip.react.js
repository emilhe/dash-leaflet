import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Tooltip as LeafletTooltip } from 'react-leaflet';

/**
 * Tooltip is a wrapper of Tooltip in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class Tooltip extends Component {
    render() {
        return <LeafletTooltip {...this.props} />
    }
}

Tooltip.propTypes = {
    // Static parameters

    /**
     * Optional offset of the tooltip position.
     */
    offset: PropTypes.object,

    /**
     * Direction where to open the tooltip. Possible values are: right, 
     * left, top, bottom, center, auto. auto will dynamically switch between 
     * right and left according to the tooltip position on the map.
     */
    direction: PropTypes.string,

    /**
     * Whether to open the tooltip permanently or only on mouseover.
     */
    permanent: PropTypes.bool,

    /**
     * If true, the tooltip will follow the mouse instead of being fixed at 
     * the feature center.
     */
    sticky: PropTypes.bool,

    /**
     * If true, the tooltip will listen to the feature events.
     */
    interactive: PropTypes.bool,

    /**
     * Tooltip container opacity
     */
    opacity: PropTypes.number,

    /**
     * 
     */

    // Inherited from DivOverlay

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * The children of this component
     */
    children: PropTypes.node,

    /**
     * The class of the component (dynamic)
     */
    className: PropTypes.string,

    /**
     * The leaflet pane of the component
     */
    pane: PropTypes.string,

    /**
     * The attribution string for the component (dynamic)
     */
    attribution: PropTypes.string
};
