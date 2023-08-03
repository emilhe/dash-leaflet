import React from 'react';
import {dashifyProps} from '../utils';
import { FeatureGroup as ReactLeafletFeatureGroup } from 'react-leaflet';
import {FeatureGroupProps as Props} from '../dash-props';

/**
 * A class for drawing FeatureGroup overlays on a map.
 */
const FeatureGroup = (props: Props) => {
    return (
        <ReactLeafletFeatureGroup {...dashifyProps(props)}></ReactLeafletFeatureGroup>
    )
}

export default FeatureGroup;
