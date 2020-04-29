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
        const {map} = this.props.leaflet;
        var el;

        function getFeatureValue(feature, key) {
            // If the feature has a value itself, it takes precedence.
            if (feature.leaflet && key in feature.leaflet)
                return feature.leaflet[key];
            // Next, we look for a style in the featureOptions property.
            if (nProps.featureOptions && key in nProps.featureOptions)
                return nProps.featureOptions[key]
        }

        function applyStyle(feature) {
            return getFeatureValue(feature, "style");
        }

        function handleClick(e) {
            const feature = e.target.feature;
            // Update featureClick property.
            this.setProps({featureClick: feature});
            // If needed, zoomToBoundsOnClick.
            if (getFeatureValue(feature, "zoomToBoundsOnClick"))
                map.fitBounds(e.target.getBounds());
        }

        function handleMouseover(e) {
            const feature = e.target.feature;
            // Update feature_mouseover property.
            this.setProps({featureMouseover: feature});
            // Apply hover style if provided.
            const hoverStyle = getFeatureValue(feature, "hoverStyle");
            if (hoverStyle) {
                const layer = e.target;
                layer.setStyle(hoverStyle);
                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
                }
            }
        }

        function handleMouseout(e) {
            const feature = e.target.feature;
            // Update feature_mouseover property.
            this.setProps({featureMouseout: feature});
            // If hover style was applied, remove it again.
            if (getFeatureValue(feature, "hoverStyle"))
                el.ref.current.leafletElement.resetStyle(e.target);
        }

        function onEachFeature(feature, layer) {
            // Bind popup if provided.
            const popupContent = getFeatureValue(feature, "popupContent");
            if (popupContent)
                layer.bindPopup(popupContent);
            //  Always listen to events (maybe add option to disable via a property?)
            layer.on({
                    click: handleClick.bind(this),
                    mouseover: handleMouseover.bind(this),
                    mouseout: handleMouseout.bind(this)
                }
            );
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

    /**
     * The CSS style of the component (dynamic)
     */
    style: PropTypes.object,

    // Feature property defaults

    /**
     * The options that can be changed for each feature. Note that these options are defaults. To change options
     * for a particular feature, attach a dict to the feature under the key "leaflet" with the same options as below.
     */
    featureOptions: PropTypes.shape({
        // Default style of the feature.
        style: PropTypes.object,
        // Style to apply on mouse hover.
        hoverStyle: PropTypes.object,
        // If true, map will zoom to feature on click.
        zoomToBoundsOnClick: PropTypes.bool,
        // If set, a popup will be created on the feature with this content.
        popupContent: PropTypes.string
    }),

    // Events
    setProps: PropTypes.func,

    /**
     * Last feature clicked.
     */
    featureClick: PropTypes.object,

    /**
     * Last feature mouseover.
     */
    featureMouseover: PropTypes.object,

    /**
     * Last feature mouseout.
     */
    featureMouseout: PropTypes.object

}

export default withLeaflet(GeoJSON);