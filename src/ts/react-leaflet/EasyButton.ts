import {createControlComponent} from '@react-leaflet/core'
import "leaflet-easybutton";
import * as L from "leaflet";

require('leaflet-easybutton/src/easy-button.css')

export const EasyButton = createControlComponent<L.Control.EasyButton, L.EasyButtonOptions>(
    function createLeafletElement(props) {
        return new L.Control.EasyButton(props);
    }
);
