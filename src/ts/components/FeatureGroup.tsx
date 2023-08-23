import React from 'react';
import {assignEventHandlers, EventComponent} from '../events';
import { FeatureGroup as ReactLeafletFeatureGroup } from 'react-leaflet';
import {FeatureGroupProps} from '../dash-props';
import {DashComponent, Modify} from "../dash-extensions-js";

type Props = Modify<FeatureGroupProps, EventComponent & DashComponent>;

/**
 * A class for drawing FeatureGroup overlays on a map.
 */
const FeatureGroup = (props: Props) => {
    return (
        <ReactLeafletFeatureGroup {...assignEventHandlers(props)}></ReactLeafletFeatureGroup>
    )
}

export default FeatureGroup;
