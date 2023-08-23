import React from 'react';
import {assignEventHandlers} from '../utils';
import { FeatureGroup as ReactLeafletFeatureGroup } from 'react-leaflet';
import {DashComponent, Modify} from "../dash-extensions-js";
import {EventComponent, FeatureGroupProps} from "../props";

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
