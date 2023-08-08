import "leaflet-gesture-handling";
import {useMap} from "react-leaflet";
import {useEffect} from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

export const GestureHandling = (props: any) => {
    const map = useMap() as any;

    useEffect(() => {
        map.gestureHandlingOptions = props;  // TODO: Doesn't work for some reason?
        map.gestureHandling.enable();
        return () => {
            map.gestureHandling.disenable();
        }
    })

    return null
}
