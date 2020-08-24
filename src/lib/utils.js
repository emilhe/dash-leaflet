import {decode} from "geobuf";
import { toByteArray } from 'base64-js';

function registerGeojsonEvents(props, el) {
    let nProps = Object.assign({}, props);
    // Resolve functional properties in options.
    nProps.options = resolveFunctionalProps(nProps.options,
        ["pointToLayer", "style", "onEachFeature", "filter", "coordsToLatLng"]);
    // Resolve also hover style.
    if (nProps.hoverStyle) {
        nProps.hoverStyle = resolveFunctionalProp(nProps.hoverStyle);
    }
    // Add event handlers.
    nProps.onclick = (e) => {
        const feature = e.layer.feature;
        let bounds = e.layer.getBounds();
        bounds = [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]];
        nProps.setProps({n_clicks: nProps.n_clicks + 1});
        nProps.setProps({featureClick: feature});
        nProps.setProps({boundsClick: bounds});
    };
    nProps.onmouseover = (e) => {
        const feature = e.layer.feature;
        let bounds = e.layer.getBounds();
        bounds = [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]];
        nProps.setProps({featureHover: feature});
        nProps.setProps({boundsHover: bounds});
        // Hover styling.
        if (nProps.hoverStyle) {
            e.layer.setStyle(nProps.hoverStyle(feature));
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                e.layer.bringToFront();
            }
        }
    };
    nProps.onmouseout = (e) => {
        nProps.setProps({featureHover: null});
        nProps.setProps({boundsHover: null});
        // Hover styling.
        if (nProps.hoverStyle) {
            el.ref.current.leafletElement.resetStyle(e.layer);
        }
    };
    return nProps
}

function registerDefaultEvents(obj){
    const nProps = Object.assign({}, obj.props);
    const propTypes = obj.__proto__.constructor.propTypes
    // Click event.
    if("n_clicks" in propTypes || "click_lat_lng" in propTypes) {
        nProps.onclick = (e) => {
            if ("n_clicks" in propTypes) {
                nProps.setProps({n_clicks: nProps.n_clicks + 1});
            }
            if ("click_lat_lng" in propTypes) {
                nProps.setProps({click_lat_lng: [e.latlng.lat, e.latlng.lng]});
            }
        };
    }
    // Double click events.
    if("dbl_click_lat_lng" in propTypes) {
        nProps.ondblclick = (e) => {
            nProps.setProps({ dbl_click_lat_lng: [e.latlng.lat, e.latlng.lng] });
        };
    }

    return nProps


}

function resolveFunctionalProp(prop){
    if(typeof prop === "string"){
        return new Function("return " + prop)()
    }
    return (...args) => prop
}

function resolveFunctionalProps(props, functionalProps){
    let nProps = Object.assign({}, props);
    for(let prop of functionalProps) {
        if (nProps[prop]) {
            nProps[prop] = resolveFunctionalProp(nProps[prop]);
        }
    }
    return nProps
}

async function assembleGeojson(props){
    const {data, url, format} = props;
    // Handle case when there is not data.
    if (!data && !url){
        return {features: []};
    }
    // Download data if needed.
    let geojson = data;
    if (!data && url) {
        const response = await fetch(url);
        if (format === "geojson") {
            geojson = await response.json();
        }
        if (format == "geobuf") {
            geojson = await response.arrayBuffer();
        }
    }
    // Unless the data are geojson, do base64 decoding.
    else{
        if (format != "geojson") {
            geojson = toByteArray(geojson)
        }
    }
    // Do any data transformations needed to arrive at geojson data. TODO: Might work only in node?
    if (format == "geobuf") {
        var Pbf = require('pbf');
        geojson = decode(new Pbf(geojson));
    }
    // Add cluster properties if they are missing.
    geojson.features = geojson.features.map(feature => {
        if (!feature.properties) {
            feature["properties"] = {}
        }
        if (!feature.properties.cluster) {
            feature["properties"]["cluster"] = false
        }
        return feature
    });
    return geojson
}

export {
    resolveFunctionalProp,
  resolveFunctionalProps,
    assembleGeojson,
    registerDefaultEvents
};