import {decode} from "geobuf";
import { toByteArray } from 'base64-js';

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

function resolveFunctionalProp(prop, context){
    if(typeof prop === "string"){
        const func = new Function("return " + prop)()
        if(context){
            return (...args) => func(...args, context)
        }
        return func
    }
    return (...args) => prop
}

function resolveFunctionalProps(props, functionalProps, context){
    let nProps = Object.assign({}, props);
    for(let prop of functionalProps) {
        if (nProps[prop]) {
            nProps[prop] = resolveFunctionalProp(nProps[prop], context);
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