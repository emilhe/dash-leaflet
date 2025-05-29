import {createControlComponent} from '@react-leaflet/core'
import "leaflet-mouse-position"
import * as L from "leaflet";
import {ControlProps} from "../leaflet-props";

require('leaflet-mouse-position/src/L.Control.MousePosition.css');

export type MousePositionProps = {
    /**
     * To separate longitude\latitude values. Defaults to '' : '.
     */
    separator?: string;

    /**
     * Initial text to display. Defaults to 'Unavailable'.
     */
    emptystring?: string;

    /**
     * Weather to put the longitude first or not. Defaults to false.
     */
    lngFirst?: boolean;

    /**
     * Number of digits. Defaults to 5.
     */
    numDigits?: number;

    /**
     * A string to be prepended to the coordinates. Defaults to the empty string ‘’.
     */
    prefix?: string;

    /**
     * Controls if longitude values will be wrapped. Defaults to true.
     */
    wrapLng?: boolean;
} & ControlProps;

export const MousePosition = createControlComponent<L.Control.Fullscreen, MousePositionProps>(

    function createLeafletElement(props) {
        return L.control.mousePosition(props);
    }
);
