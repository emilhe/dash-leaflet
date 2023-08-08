import {createElementObject, createLayerComponent, extendContext} from "@react-leaflet/core";
import * as L from "leaflet";

function createLeafletElement(props, context) {
    const {position, iconOptions, ...otherProps} = props;
    const icon = new L.DivIcon(iconOptions);
    const marker = L.marker(position, {icon: icon, ...otherProps});
    return createElementObject(
        marker,
        extendContext(context, {overlayContainer: marker}),
    )
}

function updateLeafletElement(instance, props, prevProps) {
    if (props.position !== prevProps.position) {
        instance.setLatLng(props.position);
    }
    if (props.zIndexOffset !== prevProps.zIndexOffset) {
        instance.setZIndexOffset(props.zIndexOffset);
    }
    if (props.opacity !== prevProps.opacity) {
        instance.setOpacity(props.opacity);
    }
    if (props.draggable !== prevProps.draggable) {
        if (props.draggable) {
            instance.dragging.enable();
        } else {
            instance.dragging.disable();
        }
    }
}

export const DivMarker = createLayerComponent(createLeafletElement, updateLeafletElement)
