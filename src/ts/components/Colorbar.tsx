import React from 'react';
import {unDashify} from '../utils';
import { Colorbar as ReactLeafletColorbar } from '../react-leaflet/Colorbar';
import {ColorbarProps as Props} from '../dash-props';

/**
 * Marker is used to display clickable/draggable icons on the map. Extends Layer.
 */
const Colorbar = (props: Props) => {
    return (
        <ReactLeafletColorbar{...unDashify(props)}></ReactLeafletColorbar>
    )
}

export default Colorbar;
