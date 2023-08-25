import React from 'react';
import { LayerGroup as ReactLeafletLayerGroup } from 'react-leaflet';
import {LayerGroupProps, assignEventHandlers, EventComponent, Modify} from "../props";

type Props = Modify<LayerGroupProps, EventComponent>;

/**
 * A class for drawing LayerGroup overlays on a map.
 */
const LayerGroup = (props: Props) => {
    return (
        <ReactLeafletLayerGroup {...assignEventHandlers(props)}></ReactLeafletLayerGroup>
    )
}

export default LayerGroup;
