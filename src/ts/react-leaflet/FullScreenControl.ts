import {createControlComponent} from '@react-leaflet/core'
import "leaflet.fullscreen"
import * as L from "leaflet";

require('leaflet.fullscreen/Control.FullScreen.css');

function createLeafletElement(props: L.Control.FullscreenOptions) {
    return L.control.fullscreen(props);
}

export const FullScreenControl = createControlComponent(createLeafletElement);
