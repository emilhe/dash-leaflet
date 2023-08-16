import React from 'react';
import {MapContainer as LeafletMapContainer, useMapEvents} from 'react-leaflet';
import * as L from 'leaflet'
import {resolveCRS, resolveEventHandlers} from '../utils';
import {MapContainerProps as Props} from '../dash-props';
// Force loading of basic leaflet CSS.
import '../../../node_modules/leaflet/dist/leaflet.css';

function EventSubscriber(props) {
    const map = useMapEvents(resolveEventHandlers(props))
    return null
}

/**
 * Component description
 */
const MapContainer = ({crs="EPSG3857", ...props}: Props) => {
    const target = {crs: resolveCRS(crs)}  // map from string repr of CRS to actual object
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
