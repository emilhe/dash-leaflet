import React from 'react';
import {dashifyProps} from '../utils';
import { LayerGroup as ReactLeafletLayerGroup } from 'react-leaflet';
import {LayerGroupProps as Props} from '../dash-props';

/**
 * A class for drawing LayerGroup overlays on a map.
 */
const LayerGroup = (props: Props) => {
    return (
        <ReactLeafletLayerGroup {...dashifyProps(props)}></ReactLeafletLayerGroup>
    )
}

export default LayerGroup;
