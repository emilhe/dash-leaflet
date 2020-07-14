import { Component } from 'react';
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