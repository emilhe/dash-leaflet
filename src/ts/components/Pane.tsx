import React from 'react';
import {dashifyProps} from '../utils';
import { Pane as ReactLeafletPane } from 'react-leaflet';
import {PaneProps as Props} from '../dash-props';

/**
 * Panes are DOM elements used to control the ordering of layers on the map.
 */
const Pane = (props: Props) => {
    return (
        <ReactLeafletPane {...dashifyProps(props)}></ReactLeafletPane>
    )
}

export default Pane;
