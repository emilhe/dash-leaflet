import React from 'react';
import {assignEventHandlers} from '../utils';
import { FeatureGroup as ReactLeafletFeatureGroup } from 'react-leaflet';
import {FeatureGroupProps as Props} from '../dash-props';

/**
 * A class for drawing FeatureGroup overlays on a map.
 */
const FeatureGroup = (props: Props) => {
    return (
        <ReactLeafletFeatureGroup {...assignEventHandlers(props)}></ReactLeafletFeatureGroup>
    )
}

export default FeatureGroup;
