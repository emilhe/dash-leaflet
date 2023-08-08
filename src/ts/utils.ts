// import {decode} from "geobuf";
import { toByteArray } from 'base64-js';
import * as L from 'leaflet'
import {DashComponent} from "./props";

//#region Props

export type Modify<T, R> = Omit<T, keyof R> & R;

//#endregion

//#region Copied from dash-extensions-js

function isPlainObject(o) {
    return (o === null || Array.isArray(o) || typeof o == 'function' || o.constructor === Date) ?
        false
        : (typeof o == 'object');
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function resolveProp(prop, context) {
    // If it's not an object, just return.
    if (!isPlainObject(prop)) {
        return prop
    }
    // Check if the prop should be resolved a variable.
    if (prop.variable) {
        return resolveVariable(prop, context)
    }
    // Check if the prop should be resolved as an arrow function.
    if (prop.arrow) {
        return (...args) => prop.arrow
    }
    // If none of the special properties are present, do nothing.
    return prop
}

function resolveVariable(prop, context) {
    // Resolve the function.
    const variable = getDescendantProp(window, prop.variable)
    // If it's not there, raise an error.
    if (variable === undefined) {
        throw new Error("No match for [" + prop.variable + "] in the global window object.")
    }
    // If it's a function, add context.
    if (isFunction(variable) && context) {
        return (...args) => variable(...args, context)
    }
    // Otherwise, use the variable as-is.
    return variable
}

function getDescendantProp(obj, desc) {
    const arr = desc.split(".");
    while (arr.length && (obj = obj[arr.shift()]));
    return obj;
}

function resolveProps(props, functionalProps, context) {
    for (let prop of functionalProps) {
        if (props[prop]) {
            props[prop] = resolveProp(props[prop], context);
        }
    }
    return props
}

function resolveAllProps(props, context) {
    if (props === undefined) {
        return props;
    }
    return resolveProps(props, Object.keys(props), context)
}

function resolveEventHandlers(props, target={}) {
    const nProps = Object.assign(target, props);
    if (nProps.eventHandlers == undefined) {
        return defaultEvents(nProps)
    }
    return resolveAllProps(nProps.eventHandlers, nProps);
}

function assignEventHandlers(props, target={}) {
    const nProps = Object.assign(target, props);
    nProps.eventHandlers = (nProps.eventHandlers == undefined)? defaultEvents(nProps) : resolveAllProps(nProps.eventHandlers, nProps);
    return nProps
}


//#endregion

function defaultEvents(props) {
    return {
        click: (e) => (props.setProps({
            event: {
                type: e.type,
                latlng: e.latlng,
                timestamp: Date.now()
            }
        })),
        dblclick: (e) => (props.setProps({ 
            event: { 
                type: e.type, 
                latlng: e.latlng,
                timestamp: Date.now() 
            } 
        })),
        // TODO: Revisit event mapping...
        load: (e) => (props.setProps({ 
            event: { 
                type: e.type, 
                timestamp: Date.now() 
            } 
        })),
    }
}

async function assembleGeojson(props) {
    const { data, url, format } = props;
    // Handle case when there is not data.
    if (!data && !url) {
        return { features: [] };
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
    else {
        if (format != "geojson") {
            geojson = toByteArray(geojson)
        }
    }
    // // Do any data transformations needed to arrive at geojson data. TODO: Might work only in node?
    // if (format == "geobuf") {
    //     var Pbf = require('pbf');
    //     geojson = decode(new Pbf(geojson));
    // }
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

function resolveRenderer(props){
    if(props.renderer === undefined){
        return undefined
    }
    const {renderer, options} = props;
    if(renderer === 'svg'){
        return L.svg({...options})
    }
    if(renderer === 'canvas'){
        return L.canvas({...options})
    }
}

//# region Small utils

function unDashify(props: any){
    return (({ id, setProps, loading_state, ...o }) => o)(props)  // remove extra props to avoid them being added to the WMS URL
}

// TODO: I am not sure why this is suddenly necessary? FIX IT
function setProps(props: any, newProps:any ){
    for (const [key, value] of Object.entries(newProps)) {
        console.log(`${key}: ${value}`);
        props[key] = value
        props.setProps({key: props[key]})
    }
}

// TESTING

export function eventTest(props: any, target={}){
    const nProps = Object.assign({
        n_clicks: 0,
        n_dblclicks: 0,
        n_loads: 0,
        ...target
    }, props);
    console.log(nProps)
    if(nProps.eventHandlers == undefined) {
        nProps.eventHandlers = {
            click: (e) => {
                nProps.n_clicks = nProps.n_clicks + 1;
                nProps.setProps({n_clicks: nProps.n_clicks});
            },
            dblclick: (e) => {
                nProps.n_dblclicks = nProps.n_dblclicks + 1;
                nProps.setProps({n_dblclicks: nProps.n_dblclicks});
            },
            load: (e) => {
                nProps.n_loads = nProps.n_loads + 1;
                nProps.setProps({n_loads: nProps.n_loads});
            },
        }
    }
    else{
        nProps.eventHandlers = resolveAllProps(nProps.eventHandlers, nProps);
    }
    return (({ id, setProps, loading_state, n_clicks, n_dblcliks, n_loads, ...o }) => o)(nProps)
    // return unDashify(nProps);
}

// function defaultEvents(props) {
//     return {
//         click: (e) => (props.setProps({
//             event: {
//                 type: e.type,
//                 latlng: e.latlng,
//                 timestamp: Date.now()
//             }
//         })),
//         dblclick: (e) => (props.setProps({
//             event: {
//                 type: e.type,
//                 latlng: e.latlng,
//                 timestamp: Date.now()
//             }
//         })),
//         // TODO: Revisit event mapping...
//         load: (e) => (props.setProps({
//             event: {
//                 type: e.type,
//                 timestamp: Date.now()
//             }
//         })),
//     }
// }

//#endregion

export {
    assembleGeojson,
    resolveProps,
    resolveAllProps,
    resolveEventHandlers,
    assignEventHandlers,
    unDashify,
    setProps
};