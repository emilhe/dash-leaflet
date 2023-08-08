import {createControlComponent} from '@react-leaflet/core'
import "leaflet.locatecontrol"
import * as L from "leaflet";

require('leaflet.locatecontrol/dist/L.Control.Locate.min.css');

function createLeafletElement(props: L.Control.LocateOptions) {
    return new L.Control.Locate(props);
}

export const LocateControl = createControlComponent(createLeafletElement);
