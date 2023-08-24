import React from 'react';
import {EasyButton as ReactLeafletEasyButton} from "../react-leaflet/EasyButton";
import {
    DashComponent,
    Modify,
    SingleClickEvent,
    EventComponent,
    assignEventHandlers
} from "../props";
import {ControlProps} from "../leaflet-props";

type Props = Modify<{
    /**
     * The icon to show, e.g. 'fa-globe' from "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
     */
    icon: string,

    /**
     * Title on the button.
     */
    title?: string,

} & ControlProps, SingleClickEvent & EventComponent & DashComponent>;

/**
 * The easiest way to add buttons with Leaflet.
 */
const EasyButton = (props: Props) => {
    const nProps = assignEventHandlers(props, {}, true)
    const mProps = {
        states: [{
            stateName: 'default',
            icon: nProps.icon,
            title: nProps.title,
            onClick: (btn, map) => {
                if(nProps.eventHandlers && nProps.eventHandlers["click"]){
                    nProps.eventHandlers["click"](btn);
                }
                if(nProps.disableDefaultEventHandlers){return;}
                nProps.setProps({
                    n_clicks: nProps.n_clicks == undefined ? 1 : nProps.n_clicks + 1
                })
            }
        }],
    }
    return (
        <ReactLeafletEasyButton {...mProps}></ReactLeafletEasyButton>
    )
}

export default EasyButton;