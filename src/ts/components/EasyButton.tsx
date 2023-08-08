import React from 'react';
import {EasyButton as ReactLeafletEasybutton} from "../react-leaflet/EasyButton";
import {EasyButtonProps as Props} from "../dash-props";
import {eventTest} from "../utils";

/**
 * A useful control to geolocate the user with many options. Official Leaflet and MapBox plugin.
 */
const EasyButton = (props: Props) => {
    const nProps = eventTest(props)
    const mProps = {
        states: [{
            stateName: 'default',
            icon: nProps.icon,
            title: nProps.title,
            onClick: nProps.eventHandlers.click
        }],
    }
    return (
        <ReactLeafletEasybutton {...mProps}></ReactLeafletEasybutton>
    )
}

export default EasyButton;