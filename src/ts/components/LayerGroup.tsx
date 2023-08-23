import React from 'react';
import {assignEventHandlers, EventComponent} from '../events';
import { LayerGroup as ReactLeafletLayerGroup } from 'react-leaflet';
import {LayerGroupProps} from '../dash-props';
import {DashComponent, Modify} from "../props";

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
