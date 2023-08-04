import React from 'react';
import { Props } from '../components/LocateControl';
import {LocateControl as ReactLeafletLocateControl} from "../wrappers/LocateControl"

/**
 * LocateControl is a wrapper of leaflet.locatecontrol.
 */
const LocateControl = (props: Props) => {
    return (
        <ReactLeafletLocateControl {...props}></ReactLeafletLocateControl>
    )
}

export default LocateControl;