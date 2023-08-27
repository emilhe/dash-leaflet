import React, {useEffect} from 'react';
import {MapContainer as LeafletMapContainer, useMapEvents} from 'react-leaflet';
import {resolveCRS, resolveEventHandlers, resolveRenderer} from '../utils';
// Force loading of basic leaflet CSS.
import '../../../node_modules/leaflet/dist/leaflet.css';
import {ClickEvents, KeyboardEvents, LoadEvents, MapContainerProps, DashComponent, Modify} from "../props";

const trackViewport = (map, props) => {
    const bounds = map.getBounds()
    props.setProps({
        zoom: map.zoom, center: map.center,
        bounds: [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]]
    })
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
            trackViewport(map, props);
        })
    }

    useEffect(function invalidateSize(){
        if(props.invalidateSize !== undefined){
            map.invalidateSize();
        }
    }, [props.invalidateSize])

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
