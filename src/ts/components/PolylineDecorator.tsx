import React from 'react';
import { PolylineDecorator as ReactLeafletPolylineDecorator, PolylineDecoratorProps} from '../react-leaflet/PolylineDecorator';
import {DashComponent, Modify} from "../props";
import {assignEventHandlers, ClickEvents, EventComponent} from "../events";

type Props = Modify<PolylineDecoratorProps, DashComponent & EventComponent & ClickEvents>;

/**
 * Polyline is a wrapper of Polyline in react-leaflet. It takes similar properties to its react-leaflet counterpart.
 */
const PolylineDecorator = (props: Props) => {
    return (
        <ReactLeafletPolylineDecorator {...assignEventHandlers(props, ["click", "dblclick"])}></ReactLeafletPolylineDecorator>
    )
}

export default PolylineDecorator;
