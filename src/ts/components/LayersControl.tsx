import React from 'react';
import {assignEventHandlers} from '../utils';
import { LayersControl as ReactLeafletLayersControl } from 'react-leaflet';
import {LayersControlProps as Props} from '../dash-props';

/**
 * A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless you set its LayersControl option to false.
 */
const LayersControl = (props: Props) => {
   // Inject components into window.
    const dash_leaflet = Object.assign({}, window["dash_leaflet"]);
    dash_leaflet["BaseLayer"] = ReactLeafletLayersControl.BaseLayer;
    dash_leaflet["Overlay"] = ReactLeafletLayersControl.Overlay;
    window["dash_leaflet"] = dash_leaflet;
    return (
        <ReactLeafletLayersControl {...assignEventHandlers(props)}></ReactLeafletLayersControl>
    )
}

export default LayersControl;
