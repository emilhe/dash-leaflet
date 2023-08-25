import React from 'react';
import { FullScreenControl as ReactLeafletFullScreenControl, FullScreenControlProps} from '../react-leaflet/FullScreenControl';
import { DashComponent, Modify} from "../props";

type Props = Modify<FullScreenControlProps, DashComponent>;

/**
 * A basic FullScreen control with two buttons (FullScreen in and FullScreen out). It is put on the map by default unless you set its FullScreenControl option to false.
 */
const FullScreenControl = (props: Props) => {
    return (
        <ReactLeafletFullScreenControl {...props}></ReactLeafletFullScreenControl>
    )
}

export default FullScreenControl;
