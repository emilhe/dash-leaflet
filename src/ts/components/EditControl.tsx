import React, {useEffect, useRef} from 'react';
import {mergeEventHandlers} from "../utils";
import {EditControlProps} from '../react-leaflet/EditControl';
import {EventProps, DashComponent, Modify, resolveAllProps, robustifySetProps} from "../props";
import L from 'leaflet';
import { EditControl as ReactLeafletEditControl } from '../react-leaflet/EditControl';
import 'leaflet-draw/dist/leaflet.draw.css';

const LazyEditControl = React.lazy(() => import('../fragments/EditControl'));

interface StylableLayer extends L.Layer {
    setStyle?: (style: L.PathOptions) => void;
    _leaflet_id?: number;
    setIcon?: (icon: L.Icon) => void;
}

interface GeoJSONFeatureProperties {
    leafletId: number;
    type: string;
    color?: string;
    emoji?: string;
    radius?: number;
    mRadius?: number;
    bounds?: [L.LatLng, L.LatLng];
}

interface GeoJSONFeature {
    type: string;
    properties: GeoJSONFeatureProperties;
    geometry: {
        type: string;
        coordinates: number[] | number[][] | number[][][];
    };
}

interface GeoJSONCollection {
    type: string;
    features: GeoJSONFeature[];
}

type Props = Modify<EditControlProps, {
    geojson?: GeoJSONCollection,
    currentColor?: string,
    currentEmoji?: string,
} & EventProps & DashComponent>;

const EditControl = ({
    position = 'topright',
    draw = {},
    edit = {},
    geojson = { type: "FeatureCollection", features: [] } as GeoJSONCollection,
    currentColor = '#3388ff',
    currentEmoji = '',
    ...props
}: Props) => {
    const layerRef = useRef<{[key: string]: StylableLayer}>({});

    const nProps = Object.assign(props, {geojson: geojson});
    robustifySetProps(nProps)
    const customEventHandlers = (props.eventHandlers == undefined) ? {} : resolveAllProps(props.eventHandlers, props);
    const defaultEventHandlers = props.disableDefaultEventHandlers ? {} : _getDefaultEventHandlers(props, layerRef);

    nProps.eventHandlers = mergeEventHandlers(defaultEventHandlers, customEventHandlers);

    useEffect(() => {
        if (!nProps.geojson || !nProps.geojson.features) {
            return;
        }

        nProps.geojson.features.forEach((feature: GeoJSONFeature) => {
            const leafletId = feature.properties.leafletId;
            const layer = layerRef.current[leafletId];

            if (layer) {
                if (feature.properties.type === 'marker' && layer.setIcon && feature.properties.emoji) {
                    console.log("Updating marker icon:", feature.properties.emoji);  // Debug log
                    const icon = new L.Icon({
                        iconUrl: feature.properties.emoji,
                        iconSize: [25, 25],
                        iconAnchor: [12.5, 12.5],
                        popupAnchor: [0, -12.5]
                    });
                    layer.setIcon(icon);
                } else if (layer.setStyle && feature.properties.color) {
                    console.log("Updating shape color:", feature.properties.color);  // Debug log
                    layer.setStyle({
                        color: feature.properties.color,
                        fillColor: feature.properties.color,
                        opacity: 0.5,
                        fillOpacity: 0.2,
                        weight: 4
                    });
                }
            }
        });
    }, [currentColor, currentEmoji, nProps.geojson]);

    return (
        <ReactLeafletEditControl position={position} draw={draw} edit={edit} {...nProps} />
    );
}

function _getDefaultEventHandlers(props, layerRef: React.MutableRefObject<{[key: string]: StylableLayer}>) {
    const eventHandlers = {}

    eventHandlers["draw:created"] = (e) => {
        const layer = e.layer as StylableLayer;
        const id = L.Util.stamp(layer);
        layer._leaflet_id = id;
        layerRef.current[id] = layer;

        const feature = _makeFeature({
            color: props.currentColor || '#3388ff',
            emoji: props.currentEmoji || '',
            leafletId: id
        }, layer);

        props.setProps({geojson: _makeGeojson(props.geojson.features.concat([feature]))});
    }

    eventHandlers["draw:edited"] = (e) => {
        props.setProps({geojson: _makeGeojson(_updateFeatures(e, props.geojson.features))});
    }

    eventHandlers["draw:deleted"] = (e) => {
        Object.keys(e.layers._layers).forEach(id => {
            delete layerRef.current[id];
        });
        props.setProps({geojson: _makeGeojson(_updateFeatures(e, props.geojson.features))});
    }

    eventHandlers["draw:mounted"] = (e) => {
        setTimeout(function () {
            const features = []
            let layers = e.instance.options.edit.featureGroup._layers;
            Object.keys(layers).forEach((key) => {
                const layer = layers[key] as StylableLayer;
                layerRef.current[key] = layer;
                features.push(_makeFeature({type: 'mount'}, layer));
            })
            props.setProps({geojson: _makeGeojson(features)});
        }, 1);
    }

    return eventHandlers;
}

function _makeFeature(properties, layer) {
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
            coords.push(coords[0]);
            coords = [coords];
        }
        if ("_shape" in layer.editing) {
            type = "rectangle";
        }
        geometry = {type: geometry_type, coordinates: coords};
    }
    properties.type = type;

    if (type === 'marker' && properties.emoji) {
        properties.emoji = properties.emoji;
        properties.icon = {
            iconUrl: properties.emoji,
            iconSize: [25, 25],
            iconAnchor: [12, 12]
        };
    }

    if (layer.options && layer.options.color) {
        properties.color = layer.options.color;
    }

    const propMappings = {
        bounds: (x) => {
            return [x._southWest, x._northEast];
        }
    }
    const propsToCollect = ["bounds", "radius", "mRadius", "leafletId"];
    propsToCollect.forEach(prop => {
        const layerProp = '_' + prop;
        if (layer.hasOwnProperty(layerProp)) {
            let value = layer[layerProp];
            if (prop in propMappings) {
                value = propMappings[prop](value);
            }
            properties[prop] = value;
        }
    });

    properties.color = properties.color || layer.options?.color || '#3388ff';

    return {type: "Feature", properties: properties, geometry: geometry}
}

function _makeGeojson(features) {
    return {type: "FeatureCollection", features: features}
}

function _updateFeatures(e, features) {
    const featureMap = {};
    Object.keys(e.layers._layers).forEach((key) => {
        const layer = e.layers._layers[key];
        const existingFeature = features.find(f => f.properties.leafletId === parseInt(key));
        const properties = existingFeature ? {...existingFeature.properties} : {};
        featureMap[key] = _makeFeature(properties, layer);
    });

    const updatedFeatures = []
    for (const feature of features) {
        let leafletId = feature.properties.leafletId;
        if (!(leafletId in featureMap)) {
            updatedFeatures.push(feature);
            continue;
        }
        if (e.type === "draw:deleted") {
            continue;
        }
        if (e.type === "draw:edited") {
            updatedFeatures.push(featureMap[leafletId]);
        }
    }
    return updatedFeatures
}

export default EditControl;