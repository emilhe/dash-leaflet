import React, {Component} from 'react';
import {propTypes} from '../components/GeoTIFFOverlay.react';
import LeafletGeoTIFFOverlay from '../LeafletGeoTIFFOverlay';

/**
 * GeoTIFFOverlay is just wrapper of LeafletGeoTIFFOverlay.
 */
export default class GeoTIFFOverlay extends Component {
    render() {
        const nProps = Object.assign({}, this.props);
        // Bind events.
        nProps.onclick = (e) => {
            const idx = e.target.getIndexForLatLng(e.latlng.lat, e.latlng.lng);
            const val = e.target.getValueAtLatLng(e.latlng.lat, e.latlng.lng);
            nProps.setProps({ click_lat_lng_val: [e.latlng.lat, e.latlng.lng, val] });
            nProps.setProps({ click_lat_lng_idx: [e.latlng.lat, e.latlng.lng, idx] });
        };
        nProps.ondblclick = (e) => {
            const idx = e.target.getIndexForLatLng(e.latlng.lat, e.latlng.lng);
            const val = e.target.getValueAtLatLng(e.latlng.lat, e.latlng.lng);
            nProps.setProps({ dbl_click_lat_lng_val: [e.latlng.lat, e.latlng.lng, val] });
            nProps.setProps({ dbl_click_lat_lng_idx: [e.latlng.lat, e.latlng.lng, idx] });
        };
        // Render the leaflet component.
        return <LeafletGeoTIFFOverlay {...nProps} />
    }
}

GeoTIFFOverlay.propTypes = propTypes;