import React from 'react';
import { LocateControl as ReactLeafletLocateControl } from '../react-leaflet/LocateControl';

/**
 * Lazy loader.
 */
const LocateControl = (props) => {
    return (
        <ReactLeafletLocateControl {...props}></ReactLeafletLocateControl>
    )
}

export default LocateControl;