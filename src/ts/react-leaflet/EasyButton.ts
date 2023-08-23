import {createControlComponent} from '@react-leaflet/core'
import "leaflet-easybutton";
import * as L from "leaflet";
import {ControlProps} from "../leaflet-props";

require('leaflet-easybutton/src/easy-button.css')

export type EasyButtonProps = {
    /**
     * The icon to show, e.g. 'fa-globe' from "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
     */
    icon: string,

    /**
     * Title on the button.
     */
    title?: string,

} & ControlProps;

function createLeafletElement(props: L.EasyButtonOptions) {
    return new L.Control.EasyButton(props);
}

export const EasyButton = createControlComponent(createLeafletElement);
