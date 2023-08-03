import React from 'react';
import {dashifyProps} from '../utils';
import { Popup as ReactLeafletPopup } from 'react-leaflet';
import {PopupProps as Props} from '../dash-props';

/**
 * Used to open popups in certain places of the map.
 */
const Popup = (props: Props) => {
    return (
        <ReactLeafletPopup {...dashifyProps(props)}></ReactLeafletPopup>
    )
}

export default Popup;
