import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withLeaflet } from "react-leaflet";
import Supercluster from 'supercluster';
import { GeoJSON } from 'leaflet'

/**
 * LayerGroup is a wrapper of LayerGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
class SuperCluster extends Component {

    componentDidMount() {
        const { map } = this.props.leaflet;
        const asyncfunc = async () => {
            let data = this.props.data 
            // Download data if needed.
            if (~data.features) {
                const response = await fetch(data);
                data = await response.json();
            }
            // Create index.
            const index = new Supercluster({
                radius: 60,
                extent: 256,
                maxZoom: 18
            })
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

            // Do initial update.
            update();
            // Bind component to map.
            markers.addTo(map)
            // Bind update.
            map.on('moveend', update);
            // Bind click-to-zoom.
            markers.on('click', function (e) {
                var clusterId = e.layer.feature.properties.cluster_id;
                var center = e.latlng;
                var expansionZoom;
                if (clusterId) {
                    expansionZoom = index.getClusterExpansionZoom(clusterId);
                    map.flyTo(center, expansionZoom);
                }
            })
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
};

SuperCluster.propTypes = {

    /**
     * GeoJSON data
     */
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

    /**
     * Attribution
     */
    children: PropTypes.node,

    /**
     * A custom class name to assign to the image. Empty by default.
     */
    className: PropTypes.string,

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * The CSS style of the component (dynamic)
     */
    style: PropTypes.object,

    // Events
    setProps: PropTypes.func,

};

export default withLeaflet(SuperCluster);