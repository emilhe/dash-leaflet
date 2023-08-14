import React, { Suspense } from 'react';
import {EditControlProps as Props} from '../dash-props';
import {mergeEventHandlers, omit, resolveAllProps, unDashify} from "../utils";

// eslint-disable-next-line no-inline-comments
const LazyEditControl = React.lazy(() => import(/* webpackChunkName: "EditControl" */ '../fragments/EditControl'));

/**
 * EditControl is based on https://github.com/alex3165/react-leaflet-draw/
 */
const EditControl = ({position='topright', draw={}, edit={}, geojson={features: []}, ...props}: Props) => {
    const nProps = Object.assign(props, {geojson: geojson});
    const customEventHandlers = (props.eventHandlers == undefined) ? {} : resolveAllProps(props.eventHandlers, props);
    const defaultEventHandlers = props.disableDefaultEventHandlers ? {} : _getDefaultEventHandlers(props);
    nProps.eventHandlers = mergeEventHandlers(defaultEventHandlers, customEventHandlers, props)
    _registerEvents(nProps)
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <LazyEditControl position={position} draw={draw} edit={edit} {...unDashify(nProps)}  />
            </Suspense>
        </div>
    );
}

// TODO: Is this really necessary?
function _setProps(props, newProps) {
    for (const [key, value] of Object.entries(newProps)) {
        props[key] = value;
        props.setProps({...{[key]: value}});
    }
}

function _registerEvents(props){
    Object.keys(props.eventHandlers).forEach(function (key, index) {
        const event = "on".concat(key.substring(0, 1).toUpperCase()).concat(key.substring(1))
        props[event] = (e) => {
            return props.eventHandlers[key](e);
        }
    });
    return omit(props, 'eventHandlers')
}

function _getDefaultEventHandlers(props) {
    const eventHandlers = {}
    // Bind feature create event.
    eventHandlers["created"] = (e) => {
        const feature = _makeFeature({}, e.layer);
        _setProps(props, {geojson: _makeGeojson(props.geojson.features.concat([feature]))});
    }
    // Bind feature edit event.
    eventHandlers["edited"] = (e) => {
        _setProps(props, {geojson: _makeGeojson(_updateFeatures(e, props.geojson.features))});
    }
    // Bind feature delete event.
    eventHandlers["deleted"] = (e) => {
        _setProps(props, {geojson: _makeGeojson(_updateFeatures(e, props.geojson.features))});
    }
    // Bind mount event. The 1 ms timeout is necessary for the features to be loaded.
    eventHandlers["mounted"] = (e) => {
        setTimeout(function () {
            const features = []
            let layers = e.options.edit.featureGroup._layers;
            Object.keys(layers).forEach((key) => {
                features.push(_makeFeature({type: 'mount'}, layers[key]));
            })
            _setProps(props, {geojson: _makeGeojson(features)});
        }, 1);
    }
    // Bind action events.
    const actionEvents = ['drawStart', 'drawStop', 'deleteStart', 'deleteStop', 'editStart', 'editStop'];
    for (const actionEvent of actionEvents) {
        eventHandlers[actionEvent] = (e) => {
            _setProps(props, {
                action: {
                    layer_type: e.layerType, type: e.type,
                    n_actions: props.action == undefined ? 1 : props.action.n_actions + 1
                }
            });
        }
    }
    return eventHandlers
}

function _makeFeature(properties, layer) {
    // Figure out the geometry and type.
    let geometry;
    let type;
    if ("_latlng" in layer) {
        geometry = {type: "Point", coordinates: [layer._latlng.lng, layer._latlng.lat]};
        type = "marker";
        if ("_radius" in layer) {
            type = "circlemarker";
        }
        if ("_mRadius" in layer) {
            type = "circle";
        }
    }
    if ("_latlngs" in layer) {
        const polygon = (layer._latlngs.length === 1);
        const geometry_type = polygon ? "Polygon" : "LineString";
        type = polygon ? "polygon" : "polyline";
        const latlng = polygon ? layer._latlngs[0] : layer._latlngs;
        let coords = latlng.map(latlng => [latlng.lng, latlng.lat]);
        if (polygon) {
            coords.push(coords[0]);  // close the polygon
            coords = [coords];
        }
        // Special case for rectangle.
        if ("_shape" in layer.editing) {
            type = "rectangle";
        }
        geometry = {type: geometry_type, coordinates: coords};
    }
    properties.type = type;
    // Collect relevant properties.
    const propMappings = {
        _bounds: (x) => {
            return [x._southWest, x._northEast];
        }
    }
    const propsToCollect = ["_bounds", "_radius", "_mRadius", "_leaflet_id"];
    propsToCollect.forEach(prop => {
        if (layer.hasOwnProperty(prop)) {
            let value = layer[prop];
            if (prop in propMappings) {
                value = propMappings[prop](value);
            }
            properties[prop] = value;
        }
    });
    // Convert to geojson feature.
    return {type: "Feature", properties: properties, geometry: geometry}
}

function _makeGeojson (features){
    return {type: "FeatureCollection", features: features}
}

function _updateFeatures(e, features){
    // Create a map of the features which have changed.
    const featureMap = {};
    Object.keys(e.layers._layers).forEach((key) => {
        featureMap[key] = _makeFeature({}, e.layers._layers[key]);
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

export default EditControl;