import React from 'react';
import { LocateControlProps as Props } from '../dash-props';
import { LocateControl as ReactLeafletLocateControl } from '../react-leaflet/LocateControl';

/**
 * Lazy loader.
 */
const LocateControl = (props: Props) => {
    return (
        <ReactLeafletLocateControl {...props}></ReactLeafletLocateControl>
    )
}

export default LocateControl;