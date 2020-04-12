import React, {Component} from 'react';
import PropTypes from 'prop-types';


// This forces webpack to use url-loader, and returns the proper base64 encoded URLs to Leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
 iconRetinaUrl: require('../../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
 iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
 shadowUrl: require('../../../node_modules/leaflet/dist/images/marker-shadow.png'),
});

import { Marker as LeafletMarker } from 'react-leaflet';

/**
 * Marker is a wrapper of Marker in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class Marker extends Component {
    render() {
        const nProps = Object.assign({}, this.props);

        // Instantiate the Icon
        nProps.icon = this.props.icon === null ? new L.Icon.Default() : L.icon(this.props.icon);

        // eslint-disable-next-line
        nProps.onclick = (e) => {
            this.props.setProps({ n_clicks: this.props.n_clicks + 1 });
        }

        // We need to use the non-JSX syntax to avoid having to list all props
        const el = React.createElement(
            LeafletMarker,
            nProps,
            nProps.children
        )

        return el
    }
}

Marker.defaultProps = {
    icon: null,
    n_clicks: 0
}

Marker.propTypes = {
    /**
     * A geographical point (lat, lon)
     */
    position: PropTypes.arrayOf(PropTypes.number).isRequired,

    /**
     * Icon object to use for rendering the marker. See Icon
     * documentation for details on how to customize the marker
     * icon. If not specified, an instance of L.Icon.Default is used.
     */
    icon: PropTypes.object,

    /**
     * Whether the marker is draggable with mouse/touch or not.
     */
    draggable: PropTypes.bool,

    /**
     * The opacity of the marker.
     */
    opacity: PropTypes.number,

    /**
     * By default, marker images zIndex is set automatically based
     * on its latitude. Use this option if you want to put the
     * marker on top of all others (or below), specifying a high
     * value like 1000 (or high negative value, respectively).
     */
    zIndexOffset: PropTypes.number,

    // Static parameters

    /**
     * Whether the marker can be tabbed to with a keyboard and clicked by
     * pressing enter.
     */
    keyboard: PropTypes.bool,

    /**
     * Text for the browser tooltip that appear on marker hover (no tooltip
     * by default).
     */
    title: PropTypes.string,

    /**
     * Text for the alt attribute of the icon image (useful for accessibility).
     */
    alt: PropTypes.string,

    /**
     * If true, the marker will get on top of others when you hover the mouse
     * over it.
     */
    riseOnHover: PropTypes.bool,

    /**
     * The z-index offset used for the riseOnHover feature.
     */
    riseOffset: PropTypes.number,

    /**
     * When true, a mouse event on this marker will trigger the same event
     * on the map (unless L.DomEvent.stopPropagation is used).
     */
    bubblingMouseEvents: PropTypes.bool,

    /**
     * Whether to pan the map when dragging this marker near its edge or not.
     */
    autoPan: PropTypes.bool,

    /**
     * Distance (in pixels to the left/right and to the top/bottom) of the map
     * edge to start panning the map.
     */
    autoPanPadding: PropTypes.object,

    /**
     * Number of pixels the map should pan by.
     */
    autoPanSpeed: PropTypes.number,

    /**
     * If false, the layer will not emit mouse events and will act as a part of
     * the underlying map.
     */
    interactive: PropTypes.bool,

    // Inherited from MapLayer

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
    attribution: PropTypes.string,

    // Events
    setProps: PropTypes.func,

    /**
     * Dash callback property. Number of times the marker has been clicked
     */
    n_clicks: PropTypes.number,

};
