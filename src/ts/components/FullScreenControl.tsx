import React from 'react';
import {assignEventHandlers} from '../utils';
import { FullScreenControl as ReactLeafletFullScreenControl } from '../react-leaflet/FullScreenControl';
import {FullScreenControlProps as Props} from '../dash-props';

/**
 * A basic FullScreen control with two buttons (FullScreen in and FullScreen out). It is put on the map by default unless you set its FullScreenControl option to false.
 */
const FullScreenControl = (props: Props) => {
    return (
        <ReactLeafletFullScreenControl {...assignEventHandlers(props)}></ReactLeafletFullScreenControl>
    )
}

export default FullScreenControl;
