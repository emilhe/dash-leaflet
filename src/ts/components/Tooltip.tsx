import React from 'react';
import { Tooltip as ReactLeafletTooltip } from 'react-leaflet';
import {assignClickEventHandlers, ClickComponent, TooltipProps, Modify} from "../props";

type Props = Modify<TooltipProps, ClickComponent>;

/**
 * Used to display small texts on top of map layers.
 */
const Tooltip = (props: Props) => {
    return (
        <ReactLeafletTooltip {...assignClickEventHandlers(props)}></ReactLeafletTooltip>
    )
}

export default Tooltip;
