import React from 'react';
import {assignEventHandlers} from '../utils';
import { Pane as ReactLeafletPane } from 'react-leaflet';
import {PaneProps as Props} from '../dash-props';

/**
 * Panes are DOM elements used to control the ordering of layers on the map.
 */
const Pane = (props: Props) => {
    return (
        <ReactLeafletPane {...assignEventHandlers(props)}></ReactLeafletPane>
    )
}

export default Pane;
