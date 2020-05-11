import React, {Component, Node} from 'react';
import PropTypes from 'prop-types';

import LeafletGeoJSON from '../LeafletGeoJSON';
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
        let el;
        let nProps = Object.assign({}, this.props);
        const {map} = this.props.leaflet;

        function getOptionValue(feature, key) {
            const {defaultOptions, featureOptions} = nProps;
            // If the feature has a value itself, it takes precedence.
            if (featureOptions && nProps.featureId in feature && feature[nProps.featureId] in featureOptions &&
                key in featureOptions[feature[nProps.featureId]])
                return featureOptions[feature[nProps.featureId]][key];
            // Next, we look for a style in the featureOptions property.
            if (defaultOptions && key in defaultOptions)
                return nProps.defaultOptions[key]
        }

        function handleClick(e) {
            const feature = e.target.feature;
            this.n_clicks = this.n_clicks + 1;
            // Update featureClick property.
            this.setProps({featureClick: feature});
            this.setProps({n_clicks: this.n_clicks});
            // If needed, zoomToBoundsOnClick.
            if (getOptionValue(feature, "zoomToBoundsOnClick"))
                map.fitBounds(e.target.getBounds());
        }

        function handleMouseover(e) {
            const feature = e.target.feature;
            // Update feature_mouseover property.
            this.setProps({featureHover: feature});
            // Apply hover style if provided.
            const hoverStyle = getOptionValue(feature, "hoverStyle");
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
            this.setProps({featureHover: null});
            // If hover style was applied, remove it again.
            if (getOptionValue(feature, "hoverStyle"))
                el.ref.current.leafletElement.resetStyle(e.target);
        }

        function onEachFeature(feature, layer) {
            // Bind popup if provided.
            const popupContent = getOptionValue(feature, "popupContent");
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

GeoJSON.defaultProps = {
    featureId: "id",
    n_clicks: 0
};

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

    /**
     * Interactivity to be applied across all features.
     */
    defaultOptions: PropTypes.shape({
        // Style to apply on mouse hover.
        hoverStyle: PropTypes.object,
        // If true, map will zoom to feature on click.
        zoomToBoundsOnClick: PropTypes.bool,
        // If set, a popup will be created on the feature with this content.
        popupContent: PropTypes.string
    }),

    /**
     * Style to be applied across all features.
     */
    defaultStyle: PropTypes.object,

    /**
     * Interactivity to be applied per feature (an id must be assigned to target a feature).
     */
    featureOptions: PropTypes.shape({
        id: {
            // Style to apply on mouse hover.
            hoverStyle: PropTypes.object,
            // If true, map will zoom to feature on click.
            zoomToBoundsOnClick: PropTypes.bool,
            // If set, a popup will be created on the feature with this content.
            popupContent: PropTypes.string
        }
    }),

    /**
     * Style to be applied per feature (an id must be assigned to target a feature).
     */
    featureStyle: PropTypes.shape({
        id: PropTypes.object,
    }),

    /**
     * Which feature property to be used for matching as the feature id.
     */
    featureId: PropTypes.string,

    // Events
    setProps: PropTypes.func,

    /**
     * Dash callback property. Number of times the marker has been clicked
     */
    n_clicks: PropTypes.number,

    /**
     * Last feature clicked.
     */
    featureClick: PropTypes.object,

    /**
     * Last feature hover.
     */
    featureHover: PropTypes.object,

};

export default withLeaflet(GeoJSON);