import React from 'react';
import { MeasureControl as ReactLeafletMeasureControl } from '../react-leaflet/MeasureControl';

/**
 * Lazy loader.
 */
const MeasureControl = (props) => {
    return (
        <ReactLeafletMeasureControl {...props}></ReactLeafletMeasureControl>
    )
}

export default MeasureControl;