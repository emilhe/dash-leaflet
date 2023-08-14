import React from 'react';
import {MapContainer as LeafletMapContainer, useMapEvents} from 'react-leaflet';
import * as L from 'leaflet'
import { resolveEventHandlers } from '../utils';
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
const MapContainer = ({crs, ...props}: Props) => {
    // Map from string repr of CRS to actual object.
    const nProps = Object.assign({crs: L.CRS[crs]}, props);
    // Add a custom event subscriber that exposes events to Dash.
    return (
        <LeafletMapContainer {...nProps}>
            {nProps.children}
            <EventSubscriber {...nProps}></EventSubscriber>
        </LeafletMapContainer>
    )
}

MapContainer.defaultProps = {
    crs: "EPSG3857",
    // Set some values to enable small examples.
    center: [56, 10],
    zoom: 6,
    // Per default, fill parent container.
    style: {'width': "100%", 'height': "100%", "position": "relative"}
};

export default MapContainer;
