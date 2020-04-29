import React, {Component, Node} from 'react';
import PropTypes from 'prop-types';

import {GeoJSON as LeafletGeoJSON} from 'react-leaflet';
import {withLeaflet} from "react-leaflet";

/**
 * LayerGroup is a wrapper of LayerGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
class GeoJSON extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();  // Create reference to be used for geojson object
    }

    render() {
        const nProps = Object.assign({}, this.props);
        const { map } = this.props.leaflet;
        var el;

        // If the feature has a style property, apply the style.
        function applyStyle(feature){
            if (feature.properties && feature.properties.style)
                return feature.properties.style
        }

        function handleClick(e){
            const feature = e.target.feature;
            // // Update feature_clicks property.
            console.log(this);
            this.setProps({ feature_clicks: feature });
            // Zoom to position if zoomOnClick is enabled.
            if (feature.properties && feature.properties.zoomOnClick){
                map.fitBounds(e.target.getBounds());
            }
            // Other?
        }

        function handleMouseover(e){
            const feature = e.target.feature;
            // Apply hover style if provided..
            if(feature.properties && feature.properties.hoverStyle){
                const layer = e.target;
                layer.setStyle(feature.properties.hoverStyle);
                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
                }
            }
            // Other?
        }

        function handleMouseout(e){
            const feature = e.target.feature;
            // If hover style was applied, remove it again.
            if(feature.properties && feature.properties.hoverStyle)
                el.ref.current.leafletElement.resetStyle(e.target);
        }

        function onEachFeature(feature, layer) {
            // Bind popup if provided.
            if (feature.properties && feature.properties.popupContent)
                layer.bindPopup(feature.properties.popupContent);
            //  Always listen to click events (maybe add option to disable via a property?)
            const eventHandlers = {click: handleClick.bind(this)};
            //  Listen to hover events only if hoverStyle is set (maybe add option to enable via a property?)
            if (feature.properties && feature.properties.hoverStyle)
                eventHandlers.mouseover = handleMouseover;
            eventHandlers.mouseout = handleMouseout;
            layer.on(eventHandlers);
        }

        // Bind styles.
        nProps.style = applyStyle;
        // Bind events.
        nProps.onEachFeature = onEachFeature;
        // Bind reference to nProps.
        nProps.ref = this.myRef;
        // We need to use the non-JSX syntax to avoid having to list all props
        el = React.createElement(
            LeafletGeoJSON,
            nProps,
            nProps.children
        );

        return el
    }

}

GeoJSON.propTypes = {

    /**
     * GeoJSON data
     */
    data: PropTypes.object,

    /**
     * Attribution
     */
    attribution: PropTypes.string,

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

    /**
     * X
     */
    feature_clicks: PropTypes.object

}

export default withLeaflet(GeoJSON);