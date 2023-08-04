import {createControlComponent} from '@react-leaflet/core'
import * as L from "leaflet";

require('leaflet.locatecontrol/dist/L.Control.Locate.min.css');

/**
 * LocateControl is a wrapper of LocateControl in react-leaflet. The component requires linking font-awesome, i.e.
 * app = dash.Dash(external_stylesheets=['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'])
 */

function createInstance(props: L.Control.LocateOptions) {
    return new L.Control.Locate(props);
}

export const LocateControl = createControlComponent(createInstance);