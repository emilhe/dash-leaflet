import React from 'react';
import {EasyButton as ReactLeafletEasyButton, EasyButtonProps} from "../react-leaflet/EasyButton";
import {assignEventHandlers} from "../utils";
import {DashComponent, Modify} from "../dash-extensions-js";
import {EventProps} from "../props";

type Props = Modify<EasyButtonProps, DashComponent>;

/**
 * A useful control to geolocate the user with many options. Official Leaflet and MapBox plugin.
 */
const EasyButton = (props: Props) => {
    const nProps = assignEventHandlers(props, ["click"], {}, false, true)
    const mProps = {
        states: [{
            stateName: 'default',
            icon: nProps.icon,
            title: nProps.title,
            onClick: nProps.eventHandlers.click
        }],
    }
    return (
        <ReactLeafletEasyButton {...mProps}></ReactLeafletEasyButton>
    )
}

export default EasyButton;