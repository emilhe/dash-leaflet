import React, {useEffect} from 'react';
import {DashComponent, Modify, unDashify} from '../dash-extensions-js';
import {LayersControl as ReactLeafletLayersControl, useMapEvents} from 'react-leaflet';
import {LayersControlProps} from '../dash-props';

export type Props = Modify<LayersControlProps, {
    /**
     * Name of the currently selected base layer. [DL]
     */
    baseLayer?: string,

    /**
     * Names of the currently selected overlays. [DL]
     */
    overlays?: string[]
} & DashComponent>;

/**
 * The layers control gives users the ability to switch between different base layers and switch overlays on/off.
 */
const LayersControl = (props: Props) => {
    // Inject components into window.
    const dash_leaflet = Object.assign({}, window["dash_leaflet"]);
    dash_leaflet["BaseLayer"] = ReactLeafletLayersControl.BaseLayer;
    dash_leaflet["Overlay"] = ReactLeafletLayersControl.Overlay;
    window["dash_leaflet"] = dash_leaflet;
    // Bind events.
    const eventHandlers = {
        baselayerchange: (e) => {
            props.setProps({baseLayer: e.name});
        },
        overlayadd: (e) => {
            props.setProps({overlays: props.overlays === undefined? [e.name] : props.overlays.concat([e.name])})
        },
        overlayremove: (e) => {
            props.setProps({ overlays: props.overlays.filter(item => item !== e.name)})
        },
    }
    useMapEvents(eventHandlers)
    // Derive initial values.
    useEffect(() => {
        const overlays = [];
        let baseLayer = undefined;
        React.Children.map(props.children, (child) => {
            const dpl = (child as any).props._dashprivate_layout;
            const props = dpl.props;
            if(dpl.type === "BaseLayer" && props.checked){
                console.log()
                baseLayer = props.name;
            }
            if(dpl.type === "Overlay" && props.checked){
                overlays.push(props.name);
            }
        })
        props.setProps({
            overlays: overlays,
            baseLayer: baseLayer
        })
    }, []);
    // Render the component.
    return (
        <ReactLeafletLayersControl {...unDashify(props)}></ReactLeafletLayersControl>
    )
}

export default LayersControl;
