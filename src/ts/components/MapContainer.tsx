import React from 'react';
import {MapContainer as LeafletMapContainer, useMapEvents} from 'react-leaflet';
import {resolveCRS, resolveRenderer} from '../utils';
import {ClickEvents, KeyboardEvents, LoadEvents, resolveEventHandlers} from '../events';
import {DashComponent, Modify} from "../dash-extensions-js";
import {MapContainerProps} from "../dash-props"
// Force loading of basic leaflet CSS.
import '../../../node_modules/leaflet/dist/leaflet.css';

function EventSubscriber(props) {
    useMapEvents(resolveEventHandlers(props, ["click", "dblclick", "keydown", "load"]))
    return null
}

type Props = Modify<MapContainerProps, {
    /**
     * The Coordinate Reference System to use. Don't change this if you're not sure what it means. [DL]
     */
    crs?: string;

    /**
     * The default method for drawing vector layers on the map. L.SVG or L.Canvas by default depending on browser support.
     */
    renderer?: {
        method: 'svg' | 'canvas',
        options: object
    };
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
