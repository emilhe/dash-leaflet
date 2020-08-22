import { GeoJSON } from 'leaflet'
import { withLeaflet, Path } from 'react-leaflet';
import {assembleGeojson} from "./utils";

class LeafletGeoJSON extends Path {

    createLeafletElement(props) {
        return new GeoJSON(null, {...props.options});
    }

    updateLeafletElement(fromProps, toProps) {
        // Change style (dynamic).
        if (typeof toProps.style === 'function') {
            this.leafletElement.setStyle(toProps.style)
        } else {
            this.setStyleIfChanged(fromProps, toProps)
        }
        // Change data (dynamic).
        if (toProps.url !== fromProps.url ||
            toProps.data !== fromProps.data ||
            toProps.format !== fromProps.format) {
            this._init(toProps)
        }
    }

    componentDidMount() {
        // Call super.
        super.componentDidMount();
        // Get the data.
        this._init(this.props)
    }

    _init(props){
        const {format, url, data} = props;
        assembleGeojson(data, url, format).then(this._redraw.bind(this));
    }

    _redraw(geojson) {
        this.leafletElement.clearLayers();
        this.leafletElement.addData(geojson);
    }

}

export default withLeaflet(LeafletGeoJSON)