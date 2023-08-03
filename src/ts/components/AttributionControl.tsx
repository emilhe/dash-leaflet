import React from 'react';
import {dashifyProps} from '../utils';
import { AttributionControl as ReactLeafletAttributionControl } from 'react-leaflet';
import {AttributionControlProps as Props} from '../dash-props';

/**
 * The attribution control allows you to display attribution data in a small text box on a map. It is put on the map by default unless you set its attributionControl option to false, and it fetches attribution texts from layers with the getAttribution method automatically.
 */
const AttributionControl = (props: Props) => {
    return (
        <ReactLeafletAttributionControl {...dashifyProps(props)}></ReactLeafletAttributionControl>
    )
}

export default AttributionControl;