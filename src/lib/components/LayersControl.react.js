import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletLayersControl from '../LeafletLayersControl';

export default class LayersControl extends Component {

    render() {
        // Inject components into window.
        const dash_leaflet = Object.assign({}, window["dash_leaflet"]);
        dash_leaflet["BaseLayer"] = LeafletLayersControl.BaseLayer;
        dash_leaflet["Overlay"] = LeafletLayersControl.Overlay;
        window["dash_leaflet"] = dash_leaflet;
        // Render the component.
        return  <LeafletLayersControl {...this.props} />
    }

}

LayersControl.propTypes = {

    /**
     * Collapsed.
     */
    collapsed: PropTypes.bool,

    /**
     * Position.
     */
    position: PropTypes.oneOf(['topleft', 'topright', 'bottomleft', 'bottomright']),

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
