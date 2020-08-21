import {decode} from "geobuf";
import { toByteArray } from 'base64-js';


function resolveFunctionalProp(prop){
    return new Function("return function (...args){return " + prop + "(...args)}")()
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

async function assembleGeojson(data, url, format){
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
    assembleGeojson
};