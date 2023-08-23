import React from 'react';
import { Pane as ReactLeafletPane } from 'react-leaflet';
import {PaneProps} from '../dash-props';
import {DashComponent, Modify, unDashify} from "../dash-extensions-js";

type Props = Modify<PaneProps, DashComponent>;

/**
 * Panes are DOM elements used to control the ordering of layers on the map.
 */
const Pane = ({name, ...props}: Props) => {
    return (
        <ReactLeafletPane name={name} {...unDashify(props)}></ReactLeafletPane>
    )
}

export default Pane;
