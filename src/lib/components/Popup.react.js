import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Popup as LeafletPopup } from 'react-leaflet';

/**
 * Popup is a wrapper of Popup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class Popup extends Component {
    render() {
        return <LeafletPopup {...this.props} />
    }
}

Popup.propTypes = {
    /**
     * A geographical point (lat, lon)
     */
    position: PropTypes.arrayOf(PropTypes.number),

    // Static parameters

    /**
     * Max width of the popup, in pixels.
     */
    maxWidth: PropTypes.number,

    /**
     * Min width of the popup, in pixels.
     */
    minWidth: PropTypes.number,

    /**
     * If set, creates a scrollable container of the given height
     * inside a popup if its content exceeds it.
     */
    maxHeight: PropTypes.number,

    /**
     * Set it to false if you don't want the map to do panning 
     * animation to fit the opened popup.
     */
    autoPan: PropTypes.bool,

    /**
     * The margin between the popup and the top left corner of the map 
     * view after autopanning was performed.
     */
    autoPanPaddingTopLeft: PropTypes.object,

    /**
     * The margin between the popup and the bottom right corner of the
     * map view after autopanning was performed.
     */
    autoPanPaddingBottomRight: PropTypes.object,

    /**
     * Equivalent of setting both top left and bottom right autopan padding 
     * to the same value.
     */
    autoPanPadding: PropTypes.object,

    /**
     * Set it to true if you want to prevent users from panning the popup 
     * off of the screen while it is open.
     */
    keepInView: PropTypes.bool,

    /**
     * Controls the presence of a close button in the popup.
     */
    closeButton: PropTypes.bool,

    /**
     * Set it to false if you want to override the default behavior of the popup 
     * closing when another popup is opened.
     */
    autoClose: PropTypes.bool,

    /**
     * Set it to false if you want to override the default behavior of the ESC 
     * key for closing of the popup.
     */
    closeOnEscapeKey: PropTypes.bool,

    /**
     * Set it if you want to override the default behavior of the popup closing 
     * when user clicks on the map. Defaults to the map's closePopupOnClick option.
     */
    closeOnClick: PropTypes.bool,

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
