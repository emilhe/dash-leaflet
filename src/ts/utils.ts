// import {decode} from "geobuf";
import { toByteArray } from 'base64-js';
import * as L from 'leaflet'
import {DashComponent} from "./props";
import {LeafletKeyboardEvent, LeafletMouseEvent} from "leaflet";

//#region Props

export type Modify<T, R> = Omit<T, keyof R> & R;

//#endregion

//#region Prop resolution (should be moved back to dash-extensions-js)

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

//#endregion


//#region Event handler resolution

function resolveEventHandlers(props, target={}) {
    const nProps = Object.assign(target, props);
    if (nProps.eventHandlers == undefined) {
        return defaultEvents(nProps)
    }
    return resolveAllProps(nProps.eventHandlers, nProps);
}

function assignEventHandlers(props, target={}, skipUnDashify=false) {
    const nProps = Object.assign(target, props);
    nProps.eventHandlers = (nProps.eventHandlers == undefined)? defaultEvents(nProps) : resolveAllProps(nProps.eventHandlers, nProps);
    return skipUnDashify? nProps : unDashify(nProps);
}

function defaultEvents(props) {
    return {
        click: (e: LeafletMouseEvent) => {
            props.setProps({
                n_clicks: props.n_clicks == undefined ? 1 : props.n_clicks + 1,
                click: pick(e, 'latlng', 'layerPoint', 'containerPoint')
            })
        },
        dblclick: (e: LeafletMouseEvent) => {
            props.setProps({
                n_dblclicks: props.n_dblclicks == undefined ? 1 : props.n_dblclicks + 1,
                dblclick: pick(e, 'latlng', 'layerPoint', 'containerPoint')
            })
        },
        keydown: (e: KeyboardEvent) => {
            props.setProps({
                n_keydowns: props.n_keydowns == undefined ? 1 : props.n_keydowns + 1,
                dblclick: pick(e, 'key', 'ctrlKey', 'metaKey', 'shiftKey', 'repeat')
            })
        },
        load: (e) => (props.setProps({
            load: {
                timestamp: Date.now()
            }
        })),
    }
}

//#endregion

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

//# region Small utils

function unDashify(props: any){
    return omit(props, 'setProps', 'loading_state');
}
function resolveRenderer(value: { renderer: string, options: object }): L.Renderer{
    if(value === undefined){
        return undefined
    }
    const {renderer, options} = value;
    if(renderer === 'svg'){
        return L.svg({...options})
    }
    if(renderer === 'canvas'){
        return L.canvas({...options})
    }
}

function resolveCRS(value: string): L.CRS{
    if(value === undefined){
        return undefined
    }
    return L.CRS[value]
}


//#endregion

//#region https://stackoverflow.com/a/56592365/2428887

const pick = <T extends {}, K extends keyof T>(obj: T, ...keys: K[]) => (
  Object.fromEntries(
    keys
    .filter(key => key in obj)
    .map(key => [key, obj[key]])
  ) as Pick<T, K>
);

const inclusivePick = <T extends {}, K extends (string | number | symbol)>(
  obj: T, ...keys: K[]
) => (
  Object.fromEntries(
    keys
    .map(key => [key, obj[key as unknown as keyof T]])
  ) as {[key in K]: key extends keyof T ? T[key] : undefined}
)

const omit = <T extends {}, K extends keyof T>(
  obj: T, ...keys: K[]
) =>(
  Object.fromEntries(
    Object.entries(obj)
    .filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>
)

//#endregion

export {
    assembleGeojson,
    resolveProps,
    resolveAllProps,
    resolveEventHandlers,
    assignEventHandlers,
    unDashify,
    resolveRenderer,
    resolveCRS,
    omit, pick, inclusivePick
};