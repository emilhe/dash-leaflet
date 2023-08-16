import React from 'react';
import { MeasureControlOptions as Props } from '../dash-props';
import { MeasureControl as ReactLeafletMeasureControl } from '../react-leaflet/MeasureControl';

/**
 * Lazy loader.
 */
const MeasureControl = (props: Props) => {
    return (
        <ReactLeafletMeasureControl {...props}></ReactLeafletMeasureControl>
    )
}

export default MeasureControl;