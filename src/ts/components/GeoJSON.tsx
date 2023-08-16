import React from 'react';
import {
    assignEventHandlers,
    getContext,
    mergeEventHandlers,
    pick,
    resolveAllProps,
    resolveProps,
    unDashify
} from '../utils';
import { GeoJSON as ReactLeafletGeoJSON } from '../react-leaflet/GeoJSON';
import {GeoJSONProps as Props} from '../dash-props';
import * as L from 'leaflet'

/**
 * Used to load and display a single image over specific bounds of the map.
 */
const GeoJSON = ({spiderfyOnMaxZoom=true, ...props}: Props) => {
    // Resolve main functional properties.
    const nProps = resolveProps(props,["pointToLayer", "style", "onEachFeature", "filter",
        "coordsToLatLng", "hoverStyle", "clusterToLayer"], getContext(props));
    // Bind default onEachFeature.
    if(!nProps.onEachFeature){
        nProps.onEachFeature = (feature, layer) => {
            if(!feature.properties){
                return
            }
            if(feature.properties.popup){
                layer.bindPopup(feature.properties.popup)
            }
            if(feature.properties.tooltip){
                layer.bindTooltip(feature.properties.tooltip)
            }
        }
    }
    // // Add event handlers.
    // const defaultEventHandlers = props.disableDefaultEventHandlers ? {} : _getDefaultEventHandlers(props);
    // const customEventHandlers = (props.eventHandlers == undefined) ? {} : resolveAllProps(props.eventHandlers, props);
    // nProps.eventHandlers = mergeEventHandlers(defaultEventHandlers, customEventHandlers)
    // Render the component.
    return (
        <ReactLeafletGeoJSON spiderfyOnMaxZoom={spiderfyOnMaxZoom} {...unDashify(props)}></ReactLeafletGeoJSON>
        // <ReactLeafletGeoJSON spiderfyOnMaxZoom={spiderfyOnMaxZoom} {...assignEventHandlers(props)}></ReactLeafletGeoJSON>
    )
}

export default GeoJSON;