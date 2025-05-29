import React, {Suspense, useEffect, useRef, useState} from 'react';
import {mergeEventHandlers} from "../utils";
import {EditControlProps} from '../react-leaflet/EditControl';
import {EventProps, DashComponent, Modify, resolveAllProps, robustifySetProps} from "../props";
import L from 'leaflet';

// eslint-disable-next-line no-inline-comments
const LazyEditControl = React.lazy(() => import(/* webpackChunkName: "EditControl.ts" */ '../fragments/EditControl'));

// Extend the props to include color and emoji support
type Props = Modify<EditControlProps, {
    /**
     * Geojson representing the current features.
     */
    geojson?: {
        type: string;
        features: object[]
    },
    /**
     * Current color to apply to new shapes.
     */
    currentColor?: string,
    /**
     * Current emoji to apply to new markers.
     */
    currentEmoji?: string,
} & EventProps & DashComponent>;

// Define the StylableLayer interface
interface StylableLayer extends L.Layer {
    setStyle?: (style: L.PathOptions) => void;
    _leaflet_id?: number;
    setIcon?: (icon: L.Icon | L.DivIcon) => void;
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

/**
 * EditControl is based on https://github.com/alex3165/react-leaflet-draw/
 * This enhanced version supports dynamic color changes for shapes and emoji icons for markers.
 */
const EditControl = ({
    position = 'topright',
    draw = {},
    edit = {},
    geojson = {type: "FeatureCollection", features: []},
    currentColor = '#3388ff',
    currentEmoji = '',
    ...props
}: Props) => {
    const layerRef = useRef<{[key: string]: StylableLayer}>({});
    const [lastFeatureId, setLastFeatureId] = useState<number | null>(null);

    const nProps = Object.assign(props, {geojson: geojson});
    robustifySetProps(nProps)
    const customEventHandlers = (props.eventHandlers == undefined) ? {} : resolveAllProps(props.eventHandlers, props);
    const defaultEventHandlers = props.disableDefaultEventHandlers ? {} : _getDefaultEventHandlers(props, layerRef, currentColor, currentEmoji, lastFeatureId, setLastFeatureId);

    nProps.eventHandlers = mergeEventHandlers(defaultEventHandlers, customEventHandlers)

    // Update ONLY the last created feature when color or emoji changes
    useEffect(() => {
        if (!nProps.geojson || !nProps.geojson.features || lastFeatureId === null) {
            return;
        }

        // Find the last created feature
        const lastFeature = (nProps.geojson.features as GeoJSONFeature[]).find(
            feature => feature.properties?.leafletId === lastFeatureId
        );

        if (!lastFeature) {
            return;
        }

        const layer = layerRef.current[lastFeatureId];
        if (!layer) {
            return;
        }

        // Update only the last created feature
        if (lastFeature.properties.type === 'marker' && layer.setIcon) {
            if (currentEmoji) {
                const icon = createEmojiIcon(currentEmoji);
                layer.setIcon(icon);
                // Update the feature properties
                lastFeature.properties.emoji = currentEmoji;
            }
        } else if (layer.setStyle && lastFeature.properties.type !== 'marker') {
            layer.setStyle({
                color: currentColor,
                fillColor: currentColor,
                opacity: 0.5,
                fillOpacity: 0.2,
                weight: 4
            });
            // Update the feature properties
            lastFeature.properties.color = currentColor;
        }

        // Update the geojson with the modified feature
        const updatedFeatures = nProps.geojson.features.map((f: GeoJSONFeature) =>
            f.properties.leafletId === lastFeatureId ? lastFeature : f
        );
        props.setProps({geojson: {type: "FeatureCollection", features: updatedFeatures}});

    }, [currentColor, currentEmoji]); // Remove geojson from dependencies to avoid infinite loop

    // Re-apply styles when features are mounted or loaded
    useEffect(() => {
        if (!nProps.geojson || !nProps.geojson.features) {
            return;
        }

        (nProps.geojson.features as GeoJSONFeature[]).forEach((feature) => {
            const leafletId = feature.properties?.leafletId;
            const layer = layerRef.current[leafletId];

            if (layer && feature.properties) {
                // Re-apply stored styles to ensure features retain their appearance
                if (feature.properties.type === 'marker' && layer.setIcon && feature.properties.emoji) {
                    const icon = createEmojiIcon(feature.properties.emoji);
                    layer.setIcon(icon);
                } else if (layer.setStyle && feature.properties.type !== 'marker' && feature.properties.color) {
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
    }, [nProps.geojson.features.length]); // Re-run when number of features changes

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <LazyEditControl position={position} draw={draw} edit={edit} {...nProps} />
            </Suspense>
        </div>
    );
}

// Helper function to create emoji icon
function createEmojiIcon(emoji: string) {
    // Check if emoji is a URL (for custom emojis from dash-emoji-mart)
    const isUrl = emoji.startsWith('http://') || emoji.startsWith('https://');

    if (isUrl) {
        return L.icon({
            iconUrl: emoji,
            iconSize: [25, 25],
            iconAnchor: [12.5, 12.5],
            popupAnchor: [0, -12.5]
        });
    } else {
        // For native emojis, create a div icon
        return L.divIcon({
            html: `<div style="font-size: 24px; text-align: center; line-height: 25px;">${emoji}</div>`,
            iconSize: [25, 25],
            iconAnchor: [12.5, 12.5],
            popupAnchor: [0, -12.5],
            className: 'emoji-marker-icon'
        });
    }
}

function _getDefaultEventHandlers(
    props,
    layerRef: React.MutableRefObject<{[key: string]: StylableLayer}>,
    currentColor: string,
    currentEmoji: string,
    lastFeatureId: number | null,
    setLastFeatureId: React.Dispatch<React.SetStateAction<number | null>>
) {
    const eventHandlers = {}

    eventHandlers["draw:created"] = (e) => {
        const layer = e.layer as StylableLayer;
        const id = L.Util.stamp(layer);
        layer._leaflet_id = id;
        layerRef.current[id] = layer;

        // Track this as the last created feature
        setLastFeatureId(id);

        // Apply current styling to new features
        const properties: any = {
            leafletId: id,
            color: currentColor,
            emoji: currentEmoji
        };

        // Apply color to shapes
        if (layer.setStyle && e.layerType !== 'marker') {
            layer.setStyle({
                color: currentColor,
                fillColor: currentColor,
                opacity: 0.5,
                fillOpacity: 0.2,
                weight: 4
            });
        }

        // Apply emoji to markers
        if (e.layerType === 'marker' && currentEmoji && layer.setIcon) {
            const icon = createEmojiIcon(currentEmoji);
            layer.setIcon(icon);
        }

        const feature = _makeFeature(properties, layer);
        props.setProps({geojson: _makeGeojson(props.geojson.features.concat([feature]))});
    }

    eventHandlers["draw:edited"] = (e) => {
        // When editing, update the last feature ID if a single feature was edited
        const editedLayers = Object.keys(e.layers._layers);
        if (editedLayers.length === 1) {
            setLastFeatureId(parseInt(editedLayers[0]));
        }
        props.setProps({geojson: _makeGeojson(_updateFeatures(e, props.geojson.features))});
    }

    eventHandlers["draw:deleted"] = (e) => {
        Object.keys(e.layers._layers).forEach(id => {
            delete layerRef.current[id];
            // If we deleted the last feature, clear the lastFeatureId
            if (parseInt(id) === lastFeatureId) {
                setLastFeatureId(null);
            }
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

    // Action events
    const actionEvents = ['draw:drawstart', 'draw:drawstop', 'draw:deletestart', 'draw:deletestop', 'draw:editstart', 'draw:editstop'];
    for (const actionEvent of actionEvents) {
        eventHandlers[actionEvent] = (e) => {
            props.setProps({
                action: {
                    layer_type: e.layerType,
                    type: e.type,
                    n_actions: props.action == undefined ? 1 : props.action.n_actions + 1
                }
            });
        }
    }

    return eventHandlers
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
        // Special case for rectangle - check if layer.editing exists first
        if (layer.editing && layer.editing._shape) {
            type = "rectangle";
        }
        geometry = {type: geometry_type, coordinates: coords};
    }

    properties.type = type;

    // Store emoji information
    if (type === 'marker' && properties.emoji) {
        properties.emoji = properties.emoji;
    }

    // Store color information - preserve existing color if not provided
    if (layer.options && layer.options.color) {
        properties.color = layer.options.color;
    } else if (properties.color) {
        // Use the provided color
    } else {
        properties.color = '#3388ff'; // Default color
    }

    // Collect other properties
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