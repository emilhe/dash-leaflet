import React from 'react';
import { VectorTileLayer as ReactVectorTileLayer } from '../react-leaflet/VectorTileLayer';

/**
 * Lazy loader.
 */
const VectorTileLayer = (props) => {
    return (
        <ReactVectorTileLayer {...props}></ReactVectorTileLayer>
    )
}

export default VectorTileLayer;