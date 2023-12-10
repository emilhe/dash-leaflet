import React, {useEffect} from 'react';
import {MapContainer as LeafletMapContainer, useMapEvents} from 'react-leaflet';
import {resolveCRS, resolveEventHandlers, resolveRenderer} from '../utils';
// Force loading of basic leaflet CSS.
import '../../../node_modules/leaflet/dist/leaflet.css';
import {ClickEvents, KeyboardEvents, LoadEvents, MapContainerProps, DashComponent, Modify} from "../props";
import L from "leaflet";

const isEmpty = (obj) => {
   return Object.keys(obj).length === 0;
}

const deltaZoomCenter = (map, zoom, center) => {
    const centerObj = L.latLng(center);
    const mapZoom = map.getZoom()
    const mapCenter = map.getCenter()
    // Check if anything changed.
    const delta = {}
    if(zoom != mapZoom){
        delta['zoom'] = mapZoom
    }
   if(!centerObj.equals(mapCenter)) {
       delta['center'] = mapCenter
   }
   return delta
}

const trackViewport = (map, props) => {
    const delta = deltaZoomCenter(map, props.zoom, props.center);
   // If the view didn't change, don't update anything.
    if(isEmpty(delta)){
       return
    }
   // Otherwise, issue the update.
    const bounds = map.getBounds()
    delta['bounds'] = [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]]
    props.setProps(delta)
}

function EventSubscriber(props) {
    const eventHandlers = resolveEventHandlers(props, ["click", "dblclick", "keydown", "load"])
    const map = useMapEvents(Object.assign(eventHandlers, !props.trackViewport? {} : {
        moveend: (e) => {
            trackViewport(map, props);
        }
    }));
    if(props.trackViewport) {
        map.whenReady(() => {
            // The setTimeout ensures map is rendered before initial viewport tracking call.
            setTimeout(()=>{trackViewport(map, props)}, 0);
        })
    }

    useEffect(function invalidateSize(){
        if(props.invalidateSize !== undefined){
            map.invalidateSize();
        }
    }, [props.invalidateSize])

    useEffect(function updateViewport(){
        if(props.viewport === undefined){
            return;
        }
        let {transition, options, bounds, center, zoom} = props.viewport;
        // If bounds are specified, they take precedence.
        if(bounds){
            bounds = new L.LatLngBounds(bounds)
            // Check if update is needed.
            if(map.getBounds().equals(bounds)){
                console.log("BREAK BOUNDS CHANGE")
                return;
            }
            // Issue the update.
            console.log("ISSUE BOUNDS UPDATE")
            switch (transition) {
                case 'flyToBounds':
                    map.flyToBounds(bounds, options)
                    return;
                case 'panInsideBounds':
                    map.panInsideBounds(bounds, options)
                    return;
                default:
                    map.fitBounds(bounds, options)
            }
            return;
        }
        // Otherwise, read center/zoom if missing.
        if(!center){
            center = map.getCenter();
        }
        if(!zoom){
            zoom = map.getZoom();
        }
        const delta = deltaZoomCenter(map, zoom, center)
        // Check if an update is missing.
        if(isEmpty(delta)){
            console.log("BREAK CENTER/ZOOM CHANGE")
        }
        // Issue the update.
        console.log("ISSUE CENTER/ZOOM CHANGE")
        switch (transition) {
            case 'flyTo':
                map.flyTo(center, zoom, options)
                return;
            case 'panTo':
                map.panTo(center, options)
                return;
            default:
                map.setView(center, zoom, options)
        }
    }, [props.viewport])

    useEffect(function updateZoom(){
        if(props.zoom === undefined){
            return;
        }
        if(props.zoom == map.getZoom()){
            return;
        }
        map.setZoom(props.zoom);
    }, [props.zoom])

    useEffect(function updateCenter(){
        if(props.center === undefined){
            return;
        }
        if(L.latLng(props.center).equals(map.getCenter())){
            return;
        }
        map.setView(props.center);
    }, [props.center])

    return null
}

type Props = Modify<MapContainerProps, {
    /**
     * The Coordinate Reference System to use. Don't change this if you're not sure what it means. [DL]
     */
    crs?: string;

    /**
     * The default method for drawing vector layers on the map. L.SVG or L.Canvas by default depending on browser support. [DL]
     */
    renderer?: {
        method: 'svg' | 'canvas',
        options: object
    };

    /**
     * Change the value to force map size invalidation. [DL]
     */
    invalidateSize?: string | number | object;

    /**
     * This property can be used to manipulate the viewport after initializing the map. Set either "center"/"zoom",
     * or bounds. If both are set, "bounds" takes precedence. Default value for transition is "setView" for "center"/
     * "zoom", and "fitBounds" for "bounds". [DL]
     */
    viewport?: {
        center?: number[],
        zoom?: number
        transition?: "flyTo" | "panTo" | "setView" | "fitBounds" | "flyToBounds" | "panInsideBounds"
        bounds?: number[][]
        options?: {
            animate?: boolean,
            duration?: number,
            easeLinearity?: number,
            noMoveStart?: boolean,
            // These are for bounds panning
            paddingTopLeft?: number[],
            paddingBottomRight?: number[],
            padding?: number[],
        }
    };

    /**
     * If true (default), zoom, center, and bounds properties are updated on whenReady/moveend. [DL]
     */
    trackViewport?: boolean;
}  & DashComponent & ClickEvents & LoadEvents & KeyboardEvents>;

/**
 * The MapContainer component is responsible for creating the Leaflet Map instance and providing it to its child components, using a React Context.
 */
const MapContainer = ({crs="EPSG3857", renderer=undefined, trackViewport=true, ...props}: Props) => {
    const target = {
        crs: resolveCRS(crs), // map from string repr of CRS to actual object
        renderer: resolveRenderer(renderer),  // map from string repr of Renderer to actual object
        trackViewport: trackViewport
    }
    const nProps = Object.assign(target, props);
    // Add a custom event subscriber that exposes events to Dash.
    return (
        <LeafletMapContainer {...nProps}>
            {nProps.children}
            <EventSubscriber {...nProps}></EventSubscriber>
        </LeafletMapContainer>
    )
}

export default MapContainer;
