import {createControlComponent} from '@react-leaflet/core';
import "leaflet.locatecontrol";
import * as L from "leaflet";
import {ControlProps, PathProps} from "../leaflet-props";

require('leaflet.locatecontrol/dist/L.Control.Locate.min.css');

export type LocateControlProps = {
    // /**
    //  * The layer that the user's location should be drawn on.
    //  */
    // layer?: L.Layer;

    /**
     * Set the map view (zoom and pan) to the user's location as it updates.
     */
    setView?: false | 'once' | 'always' | 'untilPan' | 'untilPanOrZoom';

    /**
     * Smooth pan and zoom to the location of the marker. Only works in Leaflet 1.0+.
     */
    flyTo?: boolean;

    /**
     * Only pan when setting the view.
     */
    keepCurrentZoomLevel?: boolean;

    /**
     * After activating the plugin by clicking on the icon, zoom to the selected zoom level, even when keepCurrentZoomLevel is true. Set to false to disable this feature.
     */
    initialZoomLevel?: boolean | number;

    /**
     * What to do when the user clicks on the control. Has three options inView, inViewNotFollowing and outOfView. Possible values are stop and setView, or the name of a behaviour to inherit from.
     */
    clickBehavior?: object;

    /**
     * If set, save the map bounds just before centering to the user's location. When control is disabled, set the view back to the bounds that were saved.
     */
    returnToPrevBounds?: boolean;

    /**
     * Keep a cache of the location after the user deactivates the control. If set to false, the user has to wait until the locate API returns a new location before they see where they are again.
     */
    cacheLocation?: boolean;

    /**
     * Show the compass bearing on top of the location marker.
     */
    showCompass?: boolean;

    /**
     * If set, a circle that shows the location accuracy is drawn.
     */
    drawCircle?: boolean;

    /**
     * If set, the marker at the users' location is drawn.
     */
    drawMarker?: boolean;

    // /**
    //  * The class to be used to create the marker.
    //  */
    // markerClass?: class;
    //
    // /**
    //  * The class to be used to create the compass.
    //  */
    // compassClass?: class;

    /**
     * Accuracy circle style properties.
     */
    circleStyle?: PathProps;

    /**
     * Inner marker style properties. Only works if your marker class supports setStyle.
     */
    markerStyle?: PathProps;

    /**
     * Triangle compass heading marker style properties. Only works if your marker class supports setStyle.
     */
    compassStyle?: PathProps;

    /**
     * Changes to the accuracy circle while following. Only need to provide changes.
     */
    followCircleStyle?: PathProps;

    /**
     * Changes to the inner marker while following. Only need to provide changes.
     */
    followMarkerStyle?: PathProps;

    /**
     * Changes to the compass marker while following. Only need to provide changes.
     */
    followCompassStyle?: PathProps;

    /**
     * The CSS class for the icon.
     */
    icon?: string;

    /**
     * The CSS class for the icon while loading.
     */
    iconLoading?: string;

    /**
     * The element to be created for icons.
     */
    iconElementTag?: string;

    /**
     * Padding around the accuracy circle.
     */
    circlePadding?: number[];

    // /**
    //  * This callback can be used in case you would like to override button creation behavior.
    //  */
    // createButtonCallback?: ((container: HTMLDivElement, options: L.LocateOptions) => void);
    //
    // /**
    //  * This callback can be used to override the viewport tracking behavior.
    //  */
    // getLocationBounds?: function;
    //
    // /**
    //  * This event is called when the user's location is outside the bounds set on the map.
    //  */
    // onLocationError?: ((event: ErrorEvent, control: L.Control.Locate) => void);

    /**
     * Use metric units.
     */
    metric?: boolean;

    // /**
    //  * Called when the user's location is outside the bounds set on the map. Called repeatedly when the user's location changes.
    //  */
    // onLocationOutsideMapBounds?: ((control: L.Control.Locate) => void);

    /**
     * Display a pop-up when the user click on the inner marker.
     */
    showPopup?: boolean;

    /**
     * Strings used in the control. Options are title, text, metersUnit, feetUnit, popup and outsideMapBoundsMsg
     */
    strings?: L.Control.StringsOptions;

    /**
     * The default options passed to leaflets locate method.
     */
    locateOptions?: L.LocateOptions;

} & ControlProps;

function createLeafletElement(props: LocateControlProps) {
    return new L.Control.Locate(props);
}

export const LocateControl = createControlComponent<L.Control.Locate, LocateControlProps>(
    function createLeafletElement(props: LocateControlProps) {
        return new L.Control.Locate(props);
    }
);
