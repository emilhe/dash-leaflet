import React from 'react';
import { SideBySideControl as ReactLeafletSideBySideControl, SideBySideControlProps} from '../react-leaflet/SideBySideControl';
import { DashComponent, Modify} from "../props";

type Props = Modify<SideBySideControlProps, DashComponent>;

/**
 * A Leaflet control to add a split screen to compare two map overlays.
 */
const SideBySideControl = (props: Props) => {
    return (
        <ReactLeafletSideBySideControl {...props}></ReactLeafletSideBySideControl>
    )
}

export default SideBySideControl;
