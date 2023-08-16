import React from 'react';
import { GeoJSON as ReactLeafletGeoJSON } from '../react-leaflet/GeoJSON';

/**
 * Lazy loader.
 */
const GeoJSON = (props) => {
    return (
        <ReactLeafletGeoJSON {...props}></ReactLeafletGeoJSON>
    )
}

export default GeoJSON;