import * as L from 'leaflet'
import {LeafletMouseEvent} from 'leaflet'
import {useMap} from "react-leaflet";
import {pick, resolveAllProps, robustifySetProps, unDashify} from "./dash-extensions-js"
import {ClickEvents, EventProps, DashComponent} from "./props";

//#region Events

export function getContext(props){
    return {map: useMap(), ...props}
}

export function assignEventHandlers(props, defaultEvents: string[] = [], target={}, skipUnDashify=false, robust=false) {
    const nProps = Object.assign(target, props);
    if(robust){
        robustifySetProps(nProps)
    }
    nProps.eventHandlers = resolveEventHandlers(nProps, defaultEvents)
    return skipUnDashify? nProps : unDashify(nProps, ['disableDefaultEventHandlers']);
}

export function resolveEventHandlers(props, defaultEvents = undefined) {
    const customEventHandlers = (props.eventHandlers === undefined) ? {} : resolveAllProps(props.eventHandlers, getContext(props));
    const _defaultEventHandlers = props.disableDefaultEventHandlers ? {} : _getDefaultEventHandlers(props, defaultEvents);
    return mergeEventHandlers(_defaultEventHandlers, customEventHandlers)
}

export function mergeEventHandlers(defaultEventHandlers, customEventHandlers){
    const keys = Object.keys(customEventHandlers).concat(Object.keys(defaultEventHandlers));
    const eventHandlers = {}
    keys.forEach(function (key, index) {
        eventHandlers[key] = (e) =>  {
            if(key in defaultEventHandlers){
                defaultEventHandlers[key](e);
            }
            if(key in customEventHandlers){
                customEventHandlers[key](e);
            }
        }
    });
    return eventHandlers
}

function _getDefaultEventHandlers(props, events) {
    if(events === undefined){
        return {}
    }
    const defaultEventHandlers =  {
        click: (e: LeafletMouseEvent) => {
            props.setProps({
                n_clicks: props.n_clicks == undefined ? 1 : props.n_clicks + 1,
                clickData: pick(e, 'latlng', 'layerPoint', 'containerPoint')
            })
        },
        dblclick: (e: LeafletMouseEvent) => {
            props.setProps({
                n_dblclicks: props.n_dblclicks == undefined ? 1 : props.n_dblclicks + 1,
                dblclickData: pick(e, 'latlng', 'layerPoint', 'containerPoint')
            })
        },
        keydown: (e) => {
            props.setProps({
                n_keydowns: props.n_keydowns == undefined ? 1 : props.n_keydowns + 1,
                dblclickData: pick(e, 'key', 'ctrlKey', 'metaKey', 'shiftKey', 'repeat')
            })
        },
        load: (e) => {
            props.setProps({n_loads: props.n_loads == undefined ? 1 : props.n_loads + 1})
        }
    }
    return pick(defaultEventHandlers, ...events)
}

//#endregion

//#region Prop resolution
export function resolveRenderer(value: { method: string, options: object }): L.Renderer {
    if (value === undefined) {
        return undefined
    }
    const {method, options} = value;
    if (method === 'svg') {
        return options ? L.svg({...options}) : L.svg()
    }
    if (method === 'canvas') {
        return options ? L.canvas({...options}) : L.canvas()
    }
}

export function resolveCRS(value: string): L.CRS {
    if (value === undefined) {
        return undefined
    }
    return L.CRS[value]
}

//#endregion

export { pick, omit } from './dash-extensions-js';