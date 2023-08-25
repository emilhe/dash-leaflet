import React from 'react';
import {LocateControl as ReactLeafletLocateControl, LocateControlProps} from '../react-leaflet/LocateControl';

/**
 * Lazy loader.
 */
const LocateControl = (props: LocateControlProps) => {
    return (
        <ReactLeafletLocateControl {...props}></ReactLeafletLocateControl>
    )
}

export default LocateControl;