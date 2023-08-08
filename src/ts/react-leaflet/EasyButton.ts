import {createControlComponent} from '@react-leaflet/core'
import "leaflet-easybutton";
import * as L from "leaflet";

require('leaflet-easybutton/src/easy-button.css')
function createLeafletElement(props: L.EasyButtonOptions) {
    return new L.Control.EasyButton(props);
}

export const EasyButton = createControlComponent(createLeafletElement);
