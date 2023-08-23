import React from 'react';
import { PolylineDecorator as ReactLeafletPolylineDecorator, PolylineDecoratorProps} from '../react-leaflet/PolylineDecorator';
import {DashComponent, Modify} from "../dash-extensions-js";
import {assignEventHandlers} from "../utils";
import {ClickEvents, EventComponent} from "../props";

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
