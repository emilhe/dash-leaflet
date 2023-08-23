import React from 'react';
import { Colorbar as ReactLeafletColorbar, ColorbarOptions } from '../react-leaflet/Colorbar';
import {DashComponent, Modify, unDashify} from "../dash-extensions-js";

type Props = Modify<ColorbarOptions, DashComponent>;

/**
 * Color bar control component for Leaflet. Most of the functionality is
 * delegated to chroma-js (see the docs for that module). For creating your
 * own color schemes for maps, have a look at http://colorbrewer2.org.
 */
const Colorbar = (props: Props) => {
    return (
        <ReactLeafletColorbar{...unDashify(props)}></ReactLeafletColorbar>
    )
}

export default Colorbar;
