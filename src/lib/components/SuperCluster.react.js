import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withLeaflet} from "react-leaflet";
import LeafletSuperCluster from '../LeafletSuperCluster';

/**
 * LayerGroup is a wrapper of LayerGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
class SuperCluster extends Component {

    render() {
        const nProps = Object.assign({}, this.props);
        // Bind events.
        nProps.onclick = (e) => {
            nProps.setProps({ n_clicks: nProps.n_clicks + 1 });
            nProps.setProps({ marker_click: e.layer.feature});
        }
        // Render the leaflet component.
        return <LeafletSuperCluster {...nProps}/>
      }

}

SuperCluster.defaultProps = {   
    zoomToBoundsOnClick: true,
    format: "geojson",
    spiderfy: true,
    n_clicks: 0,
    marker_click: null,
    options:{
    maxZoom: 16,
    },
    clusterOptions: {
        iconSize: 40,
        classNames: [
            {minCount: 0, className: "marker-cluster marker-cluster-small"},
            {minCount: 100, className: "marker-cluster marker-cluster-medium"},
            {minCount: 1000, className: "marker-cluster marker-cluster-large"},
        ]
    }
};

SuperCluster.propTypes = {

    /**
     * TODO: Implement this one.
     */
    spiderfy: PropTypes.bool,

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
     * Option for customization of the clusters.
     */
    clusterOptions: PropTypes.shape({
        iconSize: PropTypes.number,
        classNames: PropTypes.arrayOf(PropTypes.shape({
            minCount: PropTypes.number,
            className: PropTypes.string
        }))
    }),

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