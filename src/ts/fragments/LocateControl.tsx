import React from 'react';
import { LocateControlProps as Props } from '../dash-props';
import { LocateControl as ReactLeafletLocateControl } from '../react-leaflet/LocateControl';

/**
 * LocateControl is a react-leaflet wrapper of https://github.com/domoritz/leaflet-locatecontrol.
 */
const LocateControl = (props: Props) => {
    return (
        <ReactLeafletLocateControl {...props}></ReactLeafletLocateControl>
    )
}

export default LocateControl;