import React from 'react';
import { Tooltip as ReactLeafletTooltip } from 'react-leaflet';
import {DashComponent, Modify} from "../dash-extensions-js";
import {assignEventHandlers} from "../utils";
import {ClickEvents, EventComponent, TooltipProps} from "../props";

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
