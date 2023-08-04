import React from 'react';
import { LocateControlProps as Props } from '../dash-props';
import {createControlComponent} from '@react-leaflet/core'
import * as L from "leaflet";

//#region Implementation

require("leaflet.locatecontrol");
require('leaflet.locatecontrol/dist/L.Control.Locate.min.css');

function createInstance(props: L.Control.LocateOptions) {
    return new L.Control.Locate(props);
}

const ReactLeafletLocateControl = createControlComponent(createInstance);

//#endregion

/**
 * LocateControl is a react-leaflet wrapper of https://github.com/domoritz/leaflet-locatecontrol.
 */
const LocateControl = (props: Props) => {
    return (
        <ReactLeafletLocateControl {...props}></ReactLeafletLocateControl>
    )
}

export default LocateControl;