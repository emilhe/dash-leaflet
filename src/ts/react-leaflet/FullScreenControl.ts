import {createControlComponent} from '@react-leaflet/core'
import "leaflet.fullscreen"
import * as L from "leaflet";
import {ControlProps} from "../leaflet-props";

require('leaflet.fullscreen/Control.FullScreen.css');

export type FullScreenControlProps = {
    /**
     * Content of the button, can be HTML, default 'null'.
     */
    content?: string;

    /**
     * Title of the button, default 'Full Screen'.
     */
    title?: string;

    /**
     * Title of the button when fullscreen is on, default 'Exit Full Screen'.
     */
    titleCancel?: string;

    /**
     * Force separate button to detach from zoom buttons, default 'false'.
     */
    forceSeparateButton?: boolean;

    /**
     * Force use of pseudo full screen even if full screen API is available, default 'false'.
     */
    forcePseudoFullscreen?: boolean;

    /**
     * Dom element to render in full screen, false by default, fallback to 'map._container'.
     */
    fullscreenElement?: false | HTMLElement;
} & ControlProps;

export const FullScreenControl = createControlComponent<L.Control.Fullscreen, FullScreenControlProps>(
    function createLeafletElement(props) {
        return L.control.fullscreen(props);
    }
);
