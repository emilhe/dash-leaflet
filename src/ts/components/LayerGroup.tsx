import React from 'react';
import {assignEventHandlers} from '../utils';
import { LayerGroup as ReactLeafletLayerGroup } from 'react-leaflet';
import {DashComponent, Modify} from "../dash-extensions-js";
import {EventComponent, LayerGroupProps} from "../props";

type Props = Modify<LayerGroupProps, EventComponent & DashComponent>;

/**
 * A class for drawing LayerGroup overlays on a map.
 */
const LayerGroup = (props: Props) => {
    return (
        <ReactLeafletLayerGroup {...assignEventHandlers(props)}></ReactLeafletLayerGroup>
    )
}

export default LayerGroup;
