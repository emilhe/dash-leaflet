import {
    createControlHook,
    createElementHook,
    createLeafComponent,
    useLeafletContext,
    createElementObject
} from "@react-leaflet/core";
import "leaflet-draw"
import * as L from "leaflet";
import {useEffect, useRef} from "react";
import {ControlProps} from "../leaflet-props";
import {EventedBehavior} from "../react-leaflet-props";

export type EditControlProps = {
    /**
     * Enable/disable draw controls. See example of usage here https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config
     */
    draw?: object;

    /**
     * Enable/disable edit controls. See example of usage here https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config
     */
    edit?: object;

    /**
     * Customize toolbar button tooltips. See default values here https://github.com/Leaflet/Leaflet.draw/blob/master/src/Leaflet.draw.js#L99
     */
    buttons?: object;

    // Custom properties.

    /**
     * Fires on every action.
     */
    action?: {
        layer_type: string,
        type: string,
        n_actions: number
    };

    /**
     * Change this prop to manipulate the drawing toolbar, i.e. to change modes and/or invoke actions.
    */
    drawToolbar?: {
        mode: "marker" | "polygon" | "polyline" | "rectangle" | "circle" | "circlemarker",
        action: "cancel" | "finish" | "delete last point",  // Optionally, invoke an action
        n_clicks: number,
    };

    /**
     * Change this prop to manipulate the edit toolbar, i.e. to change modes and/or invoke actions.
     */
    editToolbar?: {
        mode: "edit" | "remove",
        action: "save" | "cancel" | "clear all",  // Optionally, invoke an action
        n_clicks: number,
    };

} & ControlProps & EventedBehavior;

const manipulateToolbar = (toolbar, mode, action) => {
    if (toolbar._activeMode != mode) {
        toolbar._modes[mode].handler.enable();  // enable mode
    }
    if (action) {
        const actionButtons = toolbar._actionButtons;
        const matches = actionButtons.filter((ab) => ab.button.text.toLowerCase() === action);
        if (matches.length === 1) {
            const match = matches[0]
            setTimeout(()=> {
                match.button.click()  // emulate button click
            }, 10)  // delay is necessary for some actions to work
        }
    }
}


function createEditControl(){
    function createDrawElement(props, ctx) {
        const {layerContainer} = ctx;
        const {draw, edit, buttons, position} = props;
        const options = {
            edit: {
                ...edit,
                featureGroup: layerContainer,
            },
        };
        if (draw) {
            options["draw"] = {...draw};
        }
        if (position) {
            options["position"] = position;
        }
        if (buttons) {
            L.drawLocal.draw.toolbar.buttons = {
                ...L.drawLocal.draw.toolbar.buttons, ...buttons
            }
        }
        return createElementObject(new L.Control.Draw(options), ctx)
    }
    function updateDrawElement(instance, props, prevProps) {
        if (prevProps.drawToolbar !== props.drawToolbar) {
            const toolbars = instance._toolbars;
            const {mode, action} = props.drawToolbar;
            manipulateToolbar(toolbars.draw, mode, action);
        }
        if (prevProps.editToolbar !== props.editToolbar) {
            const toolbars = instance._toolbars;
            const {mode, action} = props.editToolbar;
            manipulateToolbar(toolbars.edit, mode, action);
        }
    }
    const useDraw = (props: EditControlProps) => {
        const context = useLeafletContext()
        const {map, layerContainer} = context;
        const elementRef = useElement(props, context)

        //#region Events

        const {eventHandlers} = props;
        const eventHandlersRef = useRef<L.LeafletEventHandlerFnMap | null | undefined>()

        const onDrawCreate = (e) => {
            const container = layerContainer || map;
            container.addLayer(e.layer);
        };

        useEffect(
            function fireMount() {
                eventHandlers && eventHandlers['draw:mounted'] && eventHandlers['draw:mounted'](elementRef.current);
            },
            [],
        )

        useEffect(
            function addEventHandlers() {
                map.on(L.Draw.Event.CREATED, onDrawCreate);
                if (eventHandlers != null) {
                    map.on(eventHandlers)
                }
                eventHandlersRef.current = eventHandlers
                return function removeEventHandlers() {
                    map.off(L.Draw.Event.CREATED, onDrawCreate);
                    if (eventHandlersRef.current != null) {
                        map.off(eventHandlersRef.current)
                    }
                    eventHandlersRef.current = null
                }
            },
            [eventHandlers],
        )

        //#endregion

        return elementRef
    }

    const useElement = createElementHook(createDrawElement, updateDrawElement)
    const useControl = createControlHook(useDraw)
    return createLeafComponent<typeof L.Control.Draw, EditControlProps>(useControl)
}
export const EditControl = createEditControl()
