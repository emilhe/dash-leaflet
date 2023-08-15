import React from 'react';
import {assignEventHandlers, getContext, mergeEventHandlers, pick, resolveAllProps, resolveProps} from '../utils';
// import { GeoJSON as ReactLeafletGeoJSON } from 'react-leaflet';
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
        <ReactLeafletGeoJSON spiderfyOnMaxZoom={spiderfyOnMaxZoom} {...assignEventHandlers(props)}></ReactLeafletGeoJSON>
    )
}

function _getFeature(e) {
    const feature = e.layer.feature;
    if (e.layer.getBounds) {
        let bounds = e.layer.getBounds();
        feature.bounds = [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]];
    }
    return feature;
}
function _getDefaultEventHandlers(props) {
    return {
        click: (e) => {
            const p = {n_clicks: props.n_clicks == undefined ? 1 : props.n_clicks + 1}
            p["data-click"] = _getFeature(e)
            props.setProps(p)
        },
        dblclick: (e) => {
            const p = {n_dblclicks: props.n_dblclicks == undefined ? 1 : props.n_dblclicks + 1}
            p["data-dblclick"] = _getFeature(e)
            props.setProps(p)
        },
        keydown: (e) => {
            const p = {n_keydowns: props.n_keydowns == undefined ? 1 : props.n_keydowns + 1}
            p["data-keydown"] = pick(e, 'key', 'ctrlKey', 'metaKey', 'shiftKey', 'repeat')
            props.setProps(p)
        },
        mouseover: (e) => {
            const feature = _getFeature(e);
            // Hover styling.
            if (props.hoverStyle) {
                e.layer.setStyle(props.hoverStyle(feature));
                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    e.layer.bringToFront();
                }
            }
            // TODO: Set hover feature?
            // nProps.setProps({hover_feature: feature});
        },
        mouseout: (e) => {
            console.log(e)
            // Hover styling.
            // if (props.hoverStyle) {
            //     el.ref.current.leafletElement.resetStyle(e.layer);
            // }
        }
    }
    // return eventHandlers
    // return <ReactLeafletGeoJSON></ReactLeafletGeoJSON>
    // // Render the GeoJSON element.
    // const el = <LeafletGeoJSON {...nProps} ref={this.myRef}/>;
    // return el
}

export default GeoJSON;