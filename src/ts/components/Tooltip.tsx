import React from 'react';
import { Tooltip as ReactLeafletTooltip } from 'react-leaflet';
import {TooltipProps} from '../dash-props';
import {DashComponent, Modify} from "../dash-extensions-js";
import {assignEventHandlers, ClickEvents, EventComponent} from "../events";

type Props = Modify<TooltipProps, EventComponent & ClickEvents & DashComponent>;

/**
 * Used to display small texts on top of map layers.
 */
const Tooltip = (props: Props) => {
    return (
        <ReactLeafletTooltip {...assignEventHandlers(props, ["click", "dblclick"])}></ReactLeafletTooltip>
    )
}

export default Tooltip;
