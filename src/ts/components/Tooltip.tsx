import React from 'react';
import {dashifyProps} from '../utils';
import { Tooltip as ReactLeafletTooltip } from 'react-leaflet';
import {TooltipProps as Props} from '../dash-props';

/**
 * Used to display small texts on top of map layers.
 */
const Tooltip = (props: Props) => {
    return (
        <ReactLeafletTooltip {...dashifyProps(props)}></ReactLeafletTooltip>
    )
}

export default Tooltip;
