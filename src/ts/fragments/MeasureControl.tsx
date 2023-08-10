import React from 'react';
import { MeasureControlOptions as Props } from '../dash-props';
import { MeasureControl as ReactLeafletMeasureControl } from '../react-leaflet/MeasureControl';

/**
 * MeasureControl is a react-leaflet wrapper of https://github.com/domoritz/leaflet-MeasureControl.
 */
const MeasureControl = (props: Props) => {
    return (
        <ReactLeafletMeasureControl {...props}></ReactLeafletMeasureControl>
    )
}

export default MeasureControl;