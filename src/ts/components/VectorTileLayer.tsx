import React from 'react';
import {DashComponent} from "../props";
import {VectorTileLayer as ReactLeafletVectorTileLayer, VectorTileLayerProps} from '../react-leaflet/VectorTileLayer';

type Props = VectorTileLayerProps & DashComponent;

/**
 * Used to load and display tile layers on the map. Note that most tile servers require attribution.
 */
const VectorTileLayer = (props: Props) => {
    return (
        <ReactLeafletVectorTileLayer {...props}></ReactLeafletVectorTileLayer>
    )
}

export default VectorTileLayer;
