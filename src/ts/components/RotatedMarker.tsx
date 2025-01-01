import React, { useEffect } from 'react';
import L from 'leaflet';
import { Marker as ReactLeafletMarker, useMap } from 'react-leaflet';
import { MarkerProps, assignClickEventHandlers, ClickComponent, Modify } from "../props";

// Import rotated marker functionality
import 'leaflet-marker-rotation';

// Initialize default Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('../../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('../../../node_modules/leaflet/dist/images/marker-shadow.png'),
});

type Props = Modify<MarkerProps, {
    /**
     * Options passed to L.icon constructor. See https://leafletjs.com/reference.html#icon for details on how to customize the marker icon. [DL]
     */
    icon?: L.IconOptions;

    /**
     * Rotation angle in degrees (clockwise). [DL]
     */
    rotationAngle?: number;

    /**
     * The rotation origin, as a transform-origin CSS rule (e.g. 'bottom center', 'center center'). [DL]
     */
    rotationOrigin?: string;
} & ClickComponent>;

const RotatedMarker = ({
    icon = null,
    rotationAngle = 0,
    rotationOrigin = 'center center',
    position,
    ...props
}: Props) => {
    const map = useMap();
    const markerRef = React.useRef<any>(null);
    const iconObj = icon === null ? new L.Icon.Default() : L.icon(icon);

    // Handle rotation updates
    useEffect(() => {
        if (markerRef.current) {
            const marker = markerRef.current;
            if (marker.setRotationAngle) {
                marker.setRotationAngle(rotationAngle);
                marker.setRotationOrigin(rotationOrigin);
            }
        }
    }, [rotationAngle, rotationOrigin]);

    return (
        <ReactLeafletMarker
            ref={markerRef}
            icon={iconObj}
            position={position}
            rotationAngle={rotationAngle}
            rotationOrigin={rotationOrigin}
            {...assignClickEventHandlers(props)}
        />
    );
};

export default RotatedMarker;