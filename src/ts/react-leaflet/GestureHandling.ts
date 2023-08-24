import "leaflet-gesture-handling";
import {useMap} from "react-leaflet";
import {useEffect} from "react";

import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

// TODO: https://github.com/elmarquis/Leaflet.GestureHandling/issues/47#issuecomment-775158618
export type GestureHandlingProps = {
    // /**
    //  * The plugin will auto-detect a users language from the browser setting and show the appropriate translation.
    //  * 52 languages are supported without you needing to do anything. However if you wish to override this, you can
    //  * set your own text by supplying gestureHandlingOptions and a text option as shown below. You must specify text
    //  * for touch, scroll and scrollMac.
    //  */
    // text?: {
    //     touch: string,
    //     scroll: string,
    //     scrollMac: string
    // }
    //
    // /**
    //  * Time in ms before the message should disappear. default: 1000 (1 sec).
    //  */
    // duration?: number,
};

export const GestureHandling = (props: any) => {
    const map = useMap() as any;

    useEffect(() => {
        map.gestureHandlingOptions = props;  // TODO: Doesn't work for some reason?
        map.gestureHandling.enable();
        return () => {
            map.gestureHandling.disable();
        }
    })

    return null
}
