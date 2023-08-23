import React from 'react';
import { FeatureGroup as ReactLeafletFeatureGroup } from 'react-leaflet';
import {FeatureGroupProps, assignEventHandlers, EventComponent, Modify} from "../props";

type Props = Modify<FeatureGroupProps, EventComponent>;

/**
 * A class for drawing FeatureGroup overlays on a map.
 */
const FeatureGroup = (props: Props) => {
    return (
        <ReactLeafletFeatureGroup {...assignEventHandlers(props)}></ReactLeafletFeatureGroup>
    )
}

export default FeatureGroup;
