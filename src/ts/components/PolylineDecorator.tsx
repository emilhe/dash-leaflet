import React from 'react';
import {assignEventHandlers} from '../utils';
import { PolylineDecorator as ReactLeafletPolylineDecorator } from '../react-leaflet/PolylineDecorator';
import {PolylineDecoratorProps as Props} from '../dash-props';

/**
 * Polyline is a wrapper of Polyline in react-leaflet. It takes similar properties to its react-leaflet counterpart.
 */
const PolylineDecorator = (props: Props) => {
    return (
        <ReactLeafletPolylineDecorator {...assignEventHandlers(props)}></ReactLeafletPolylineDecorator>
    )
}

export default PolylineDecorator;
