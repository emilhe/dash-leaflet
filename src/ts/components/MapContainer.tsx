import React, {useEffect} from 'react';
import {MapContainer as LeafletMapContainer, useMapEvents} from 'react-leaflet';
import {resolveCRS, resolveEventHandlers, resolveRenderer} from '../utils';
// Force loading of basic leaflet CSS.
import '../../../node_modules/leaflet/dist/leaflet.css';
import {ClickEvents, KeyboardEvents, LoadEvents, MapContainerProps, DashComponent, Modify} from "../props";

function EventSubscriber(props) {
    const map = useMapEvents(resolveEventHandlers(props, ["click", "dblclick", "keydown", "load"]))

    useEffect(function invalidateSize(){
        if(props.invalidateSize !== undefined){
            map.invalidateSize()
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
    invalidateSize?: string | number | object
}  & DashComponent & ClickEvents & LoadEvents & KeyboardEvents>;

/**
 * Component description
 */
const MapContainer = ({crs="EPSG3857", renderer=undefined, ...props}: Props) => {
    const target = {crs: resolveCRS(crs), renderer: resolveRenderer(renderer)}  // map from string repr of CRS to actual object
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
