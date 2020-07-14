import { Component } from 'react';
import PropTypes from 'prop-types';
import { withLeaflet } from "react-leaflet";
import Supercluster from 'supercluster';
import { GeoJSON } from 'leaflet'
import {decode} from 'geobuf'

/**
 * LayerGroup is a wrapper of LayerGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
class SuperCluster extends Component {

    componentDidMount() {
        const nProps = Object.assign({}, this.props);
        const { map } = nProps.leaflet;
        const asyncfunc = async () => {
            let data = nProps.data
            // Download data if needed.
            if (!data && nProps.url) {
                const response = await fetch(nProps.url);
                if(nProps.format == "geojson"){
                    data = await response.json();
                }
                if(nProps.format == "geobuf"){
                    data = await response.arrayBuffer();
                }
            }
            // Do any data transformations needed to arrive at geojson data.
            if(nProps.format === "geobuf"){
                var Pbf = require('pbf');
                data = decode(new Pbf(data));
            }
            // Add cluster properties if they are missing.
            data.features = data.features.map(feature => {
                if(!feature.properties){
                    feature["properties"] = {}
                }
                if(!feature.properties.cluster){
                    feature["properties"]["cluster"] = false
                }
                return feature
            })

            // Create index.
            const index = new Supercluster(nProps.options)
            index.load(data.features);
            this.index = index;
            // Create markers container.
            const markers = new GeoJSON(null, {
                pointToLayer: this._defaultCreateClusterIcon
            });

            function update() {
                // Get map state.
                const bounds = map.getBounds()
                const zoom = map.getZoom()
                const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
                // Update the data.
                var clusters = index.getClusters(bbox, zoom);
                markers.clearLayers();  
                markers.addData(clusters);
            }

            function handleClick(e){
                var clusterId = e.layer.feature.properties.cluster_id;
                var center = e.latlng;
                var expansionZoom;
                // Zoom to bounds on cluster click.
                if (nProps.zoomToBoundsOnClick && clusterId) {
                    expansionZoom = index.getClusterExpansionZoom(clusterId);
                    map.flyTo(center, expansionZoom);
                }
                // Dash events.
                nProps.n_clicks = nProps.n_clicks + 1
                nProps.setProps({n_clicks: nProps.n_clicks});
                nProps.setProps({marker_click: e.layer.feature})
            }

            // Do initial update.
            update();
            // Bind component to map.
            markers.addTo(map)
            // Bind update on map move (this is where the "magic" happens).
            map.on('moveend', update);
            // Bind click event(s).
            markers.on('click', handleClick)
        }

        asyncfunc();
    }

    render() {
        return null;
    }

    _defaultCreateClusterIcon(feature, latlng) {
        if (!feature.properties.cluster) return L.marker(latlng);

        var count = feature.properties.point_count;
        var size =
            count < 100 ? 'small' :
                count < 1000 ? 'medium' : 'large';
        var icon = L.divIcon({
            html: '<div><span>' + feature.properties.point_count_abbreviated + '</span></div>',
            className: 'marker-cluster marker-cluster-' + size,
            iconSize: L.point(40, 40)
        });

        return L.marker(latlng, {
            icon: icon
        });
    }


}

SuperCluster.defaultProps = {
    zoomToBoundsOnClick: true,
    format: "geojson",
    n_clicks: 0,
    marker_click: null
};

SuperCluster.propTypes = {

   /**
     * Data (consider using url for better performance).
     */
    data: PropTypes.object,

    /**
     * Url to data (use instead of data for better performance).
     */
    url: PropTypes.string, 

    /**
     * Data format.
     */
    format: PropTypes.oneOf(["geojson", "geobuf"]),


    /**
     * Options passed to SuperCluster, https://github.com/mapbox/supercluster.
     */
    options: PropTypes.object,

    /**
     * If true, zoom on cluster click.
     */
    zoomToBoundsOnClick: PropTypes.bool,

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    // Events
    setProps: PropTypes.func,

    /**
     * Dash callback property. Number of times the marker has been clicked
     */
    n_clicks: PropTypes.number,

    /**
     * Last feature clicked.
     */
    marker_click: PropTypes.object,

};

export default withLeaflet(SuperCluster);