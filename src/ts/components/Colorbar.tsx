import React from 'react';
import { Colorbar as ReactLeafletColorbar, ColorbarProps } from '../react-leaflet/Colorbar';
import {DashComponent, Modify} from "../props";

type Props = Modify<ColorbarProps, DashComponent>;

/**
 * Color bar control component for Leaflet. Most of the functionality is
 * delegated to chroma-js (see the docs for that module). For creating your
 * own color schemes for maps, have a look at http://colorbrewer2.org.
 */
const Colorbar = (props: Props) => {
    return (
        <ReactLeafletColorbar{...props}></ReactLeafletColorbar>
    )
}

export default Colorbar;
