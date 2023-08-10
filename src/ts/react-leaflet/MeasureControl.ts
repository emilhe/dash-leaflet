import {createControlComponent} from '@react-leaflet/core';
import 'leaflet-measure';
import * as L from "leaflet";

require('leaflet-measure/dist/leaflet-measure.css');

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
