import React from 'react';
import {assignEventHandlers} from '../utils';
import { Tooltip as ReactLeafletTooltip } from 'react-leaflet';
import {TooltipProps as Props} from '../dash-props';

/**
 * Used to display small texts on top of map layers.
 */
const Tooltip = (props: Props) => {
    return (
        <ReactLeafletTooltip {...assignEventHandlers(props)}></ReactLeafletTooltip>
    )
}

export default Tooltip;
