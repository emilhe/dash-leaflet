import React from 'react';
import {assignEventHandlers} from '../utils';
import { Popup as ReactLeafletPopup } from 'react-leaflet';
import {PopupProps as Props} from '../dash-props';

/**
 * Used to open popups in certain places of the map.
 */
const Popup = (props: Props) => {
    return (
        <ReactLeafletPopup {...assignEventHandlers(props)}></ReactLeafletPopup>
    )
}

export default Popup;
