import React from 'react';
import {assignEventHandlers} from '../utils';
import { LayerGroup as ReactLeafletLayerGroup } from 'react-leaflet';
import {LayerGroupProps as Props} from '../dash-props';

/**
 * A class for drawing LayerGroup overlays on a map.
 */
const LayerGroup = (props: Props) => {
    return (
        <ReactLeafletLayerGroup {...assignEventHandlers(props)}></ReactLeafletLayerGroup>
    )
}

export default LayerGroup;
