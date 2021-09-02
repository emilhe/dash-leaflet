import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { EditControl as LeafletEditControl } from "react-leaflet-draw"
import {resolveProps} from "dash-extensions";

require('../../../node_modules/leaflet-draw/dist/leaflet.draw.css');

/**
 * EditControl is based on https://github.com/alex3165/react-leaflet-draw/
 */
export default class EditControl extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();  // Create reference to be used for edit control object
    }

    render() {
        // Convert property to something that can be passed on to Dash.
        const propMappings = {
            _bounds: (x) => {return [x._southWest, x._northEast];}
        }
        // Convert layer to something that can be passed on to Dash.
        const propsToCollect = ["_bounds", "_radius", "_mRadius", "_leaflet_id"];
        const makeFeature = (properties, layer) => {
            // Figure out the geometry and type.
            let geometry;
            let type;
            if("_latlng" in layer){
                geometry = {type: "Point", coordinates: [layer._latlng.lng, layer._latlng.lat]};
                type = "marker";
                if("_radius" in layer){
                    type = "circlemarker";
                }
                if("_mRadius" in layer){
                    type = "circle";
                }
            }
            if("_latlngs" in layer){
                const polygon = (layer._latlngs.length === 1);
                const geometry_type = polygon ? "Polygon" : "LineString";
                type = polygon ? "polygon" : "polyline";
                const latlng = polygon ? layer._latlngs[0] : layer._latlngs;
                let coords = latlng.map(latlng => [latlng.lng, latlng.lat]);
                if(polygon) {
                    coords.push(coords[0]);  // close the polygon
                    coords = [coords];
                }
                // Special case for rectangle.
                if("_shape" in layer.editing){
                    type = "rectangle";
                }
                geometry = {type: geometry_type, coordinates: coords};
            }
            properties.type = type;
            // Collect relevant properties.
            propsToCollect.forEach(prop => {
                if (layer.hasOwnProperty(prop)) {
                    let value = layer[prop];
                    if(prop in propMappings){
                        value = propMappings[prop](value);
                    }
                    properties[prop] = value;
                }
            });
            // Convert to geojson feature.
            return {type: "Feature", properties: properties, geometry: geometry}
        }
        const makeGeojson = (features) => {return {type: "FeatureCollection", features: features}}
        // Convert event into a feature map that can be passed to Dash.
        const updateFeatures = (e, features) => {
            // Create a map of the features which have changed.
            const featureMap = {};
            Object.keys(e.layers._layers).forEach((key) => {
                featureMap[key] = makeFeature({}, e.layers._layers[key]);
            })
            // Construct a new list and fill in the updated features.
            const updatedFeatures = []
            for (const feature of features) {
                let leafletId = feature.properties._leaflet_id;
                // Collect all features not modified.
                if (!(leafletId in featureMap)) {
                    updatedFeatures.push(feature);
                    continue;
                }
                // If deleted, do nothing.
                if (e.type === "draw:deleted") {
                    continue;
                }
                // If edited, append feature.
                if (e.type === "draw:edited") {
                    updatedFeatures.push(featureMap[leafletId]);
                }
                // TODO: Handle other events?
            }
            return updatedFeatures
        }
        // Events that are exposed directly.
        const rawEvents = ['onMounted', 'onDrawVertex', 'onEditMove', 'onEditResize', 'onEditVertex'];
        let nProps = resolveProps(this.props, rawEvents, this);
        // Bind feature create event.
        nProps.onCreated = (e) => {
            const feature = makeFeature({}, e.layer);
            this.props.setProps({geojson: makeGeojson(this.props.geojson.features.concat([feature]))});
        }
        // Bind feature edit event.
        nProps.onEdited = (e) => {
            this.props.setProps({geojson: makeGeojson(updateFeatures(e, this.props.geojson.features))});
        }
        // Bind feature delete event.
        nProps.onDeleted = (e) => {
            this.props.setProps({geojson: makeGeojson(updateFeatures(e, this.props.geojson.features))});
        }
        // Bind mount event. The 1 ms timeout is necessary for the features to be loaded.
        const context = this;
        nProps.onMounted = (e) => {
            setTimeout(function () {
                const features = []
                let layers = e.options.edit.featureGroup._layers;
                Object.keys(layers).forEach((key) => {
                    features.push(makeFeature({type: 'mount'}, layers[key]));
                })
                context.props.setProps({geojson: makeGeojson(features)});
            }, 1);
        }
        // Bind action events.
        const actionEvents = ['onDrawStart', 'onDrawStop', 'onDeleteStart', 'onDeleteStop', 'onEditStart', 'onEditStop'];
        for(const actionEvent of actionEvents) {
            nProps[actionEvent] = (e) => {
                this.props.setProps({
                    action: {
                        layer_type: e.layerType, type: e.type,
                        n_actions: this.props.action.n_actions + 1
                    }
                });
            }
        }
        // Render the control.
        const el = <LeafletEditControl {...nProps} ref={this.myRef}/>;
        return el
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const manipulateToolbar = (toolbar, mode, action) => {
            toolbar._modes[mode].handler.enable();  // enable mode
            if(action){
                const actionButtons = toolbar._actionButtons;
//                console.log(actionButtons);
                const matches = actionButtons.filter((ab) => ab.button.text.toLowerCase() === action);
//                console.log(actionButtons.map((ab) => ab.button.text.toLowerCase()));
                if(matches.length === 1){
                    const match = matches[0]
                    match.button.click()  // emulate button click
                }
            }
        }
        if(prevProps.drawToolbar !== this.props.drawToolbar){
            const toolbars = this.myRef.current.leafletElement._toolbars;
            const {mode, action} = this.props.drawToolbar;
            manipulateToolbar(toolbars.draw, mode, action);
        }
        if(prevProps.editToolbar !== this.props.editToolbar){
            const toolbars = this.myRef.current.leafletElement._toolbars;
            const {mode, action} = this.props.editToolbar;
            manipulateToolbar(toolbars.edit, mode, action);
        }
    }

}

EditControl.defaultProps = {
    action: {n_actions: 0},
    geojson: {type: "FeatureCollection", features: []}
};

EditControl.propTypes = {

    /**
     * The position of this component.
     */
    position: PropTypes.oneOf(["topleft", "topright", "bottomleft", "bottomright"]),

    /**
     * Enable/disable draw controls. See example of usage here https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config
     */
    draw: PropTypes.object,

    /**
     * Enable/disable edit controls. See example of usage here https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config
     */
    edit: PropTypes.object,

    // Custom properties.

    /**
     * Fires on every action.
     */
    action: PropTypes.object,

    /**
     * Change this prop to manipulate the drawing toolbar, i.e. to change modes and/or invoke actions.
    */
    drawToolbar: PropTypes.shape({
        mode: PropTypes.oneOf(["marker", "polygon", "polyline", "rectangle", "circle", "circlemarker"]),
        action: PropTypes.oneOf(["cancel", "finish", "delete last point"]),  // Optionally, invoke an action
        n_clicks: PropTypes.number,
    }),

    /**
     * Change this prop to manipulate the edit toolbar, i.e. to change modes and/or invoke actions.
     */
    editToolbar: PropTypes.shape({
        mode: PropTypes.oneOf(["edit", "remove"]),
        action: PropTypes.oneOf(["save", "cancel", "clear all"]),  // Optionally, invoke an action
        n_clicks: PropTypes.number,
    }),

    /**
     * Geojson representing the current features.
     */
    geojson: PropTypes.object,

    // Raw events.

    /**
     * Hook to leaflet-draw's draw:mounted event.
     */
    onMounted: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:drawvertex event.
     */
    onDrawVertex: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:editmove event.
     */
    onEditMove: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:editresize event.
     */
    onEditResize: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:editvertex event.
     */
    onEditVertex: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    // Dash stuff.

    /**
     * The children of this component (dynamic).
     */
    children: PropTypes.node,

    /**
     * A custom class name to assign to the image. Empty by default.
     */
    className: PropTypes.string,

    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    // Events
    setProps: PropTypes.func,

};
