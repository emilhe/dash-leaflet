import {createControlComponent} from '@react-leaflet/core';
import 'leaflet-measure';
import * as L from "leaflet";
import {ControlProps} from "../leaflet-props";

require('leaflet-measure/dist/leaflet-measure.css');

export type MeasureControlOptions = {
    /**
     * The primary units used to display length results.
     */
    primaryLengthUnit?: "feet" | "meters" | "miles" | "kilometers";

    /**
     * The secondary units used to display length results.
     */
    secondaryLengthUnit?: "feet" | "meters" | "miles" | "kilometers";

    /**
     * The primary units used to display area results.
     */
    primaryAreaUnit?: "acres" | "hectares"| "sqfeet"| "sqmeters"| "sqmiles";

    /**
     * The secondary units used to display area results.
     */
    secondaryAreaUnit?: "acres" | "hectares"| "sqfeet"| "sqmeters"| "sqmiles";

    /**
     * The color to use for map features rendered while actively performing a measurement.
     */
    activeColor?: string,

    /**
     * The color to use for features generated from a completed measurement.
     */
    completedColor?: string,

    /**
     * The options applied to the popup of the resulting measure feature.
     */
    popupOptions?: L.PopupOptions,

    // /**
    //  * Custom units to make available to the measurement calculator. Packaged units are feet, meters, miles, and kilometers for length and acres, hectares, sqfeet, sqmeters, and sqmiles for areas. Additional unit definitions can be added to the packaged units using this option.
    //  */
    // unit: string,

    /**
     * The Z-index of the marker used to capture measure clicks.
     */
    captureZIndex?: number,

    /**
     * The decimal point separator used when displaying measurements.
     */
    decPoint?: string,

    /**
     * The thousands separator used when displaying measurements.
     */
    thousandsSep?: string,
} & ControlProps;

// https://github.com/ljagis/leaflet-measure/issues/171#issuecomment-1137483548
function _bugfix(){
    (L.Control as any).Measure.include({
        // set icon on the capture marker
        _setCaptureMarkerIcon: function () {
            // disable autopan
            this._captureMarker.options.autoPanOnFocus = false;
            // default function
            this._captureMarker.setIcon(
                L.divIcon({
                    iconSize: this._map.getSize().multiplyBy(2)
                })
            );
        },
    });
}

function createLeafletElement(props: any) {
    _bugfix();
    return new (L.Control as any).Measure(props);
}

export const MeasureControl = createControlComponent(createLeafletElement);
