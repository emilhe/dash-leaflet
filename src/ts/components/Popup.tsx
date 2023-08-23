import React from 'react';
import { Popup as ReactLeafletPopup } from 'react-leaflet';
import {PopupProps} from '../dash-props';
import {DashComponent, Modify} from "../dash-extensions-js";
import {assignEventHandlers, ClickEvents, EventComponent} from "../events";

type Props = Modify<PopupProps, EventComponent & ClickEvents & DashComponent>;

/**
 * Used to open popups in certain places of the map.
 */
const Popup = (props: Props) => {
    return (
        <ReactLeafletPopup {...assignEventHandlers(props, ["click", "dblclick"])}></ReactLeafletPopup>
    )
}

export default Popup;
