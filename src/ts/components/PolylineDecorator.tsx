import React from 'react';
import { PolylineDecorator as ReactLeafletPolylineDecorator, PolylineDecoratorProps} from '../react-leaflet/PolylineDecorator';
import {assignClickEventHandlers, ClickComponent, Modify} from "../props";

type Props = Modify<PolylineDecoratorProps, ClickComponent>;

/**
 * Polyline is a wrapper of Polyline in react-leaflet. It takes similar properties to its react-leaflet counterpart.
 */
const PolylineDecorator = (props: Props) => {
    return (
        <ReactLeafletPolylineDecorator {...assignClickEventHandlers(props)}></ReactLeafletPolylineDecorator>
    )
}

export default PolylineDecorator;
