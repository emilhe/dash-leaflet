import React from 'react';
import { Popup as ReactLeafletPopup } from 'react-leaflet';
import {ClickComponent, PopupProps, Modify, assignClickEventHandlers} from "../props";

type Props = Modify<PopupProps, ClickComponent>;

/**
 * Used to open popups in certain places of the map.
 */
const Popup = (props: Props) => {
    return (
        <ReactLeafletPopup {...assignClickEventHandlers(props)}></ReactLeafletPopup>
    )
}

export default Popup;
