import React, {Component, Node} from 'react';
import PropTypes from 'prop-types';

import LeafletSuperCluster from '../LeafletSuperCluster';
import {withLeaflet} from "react-leaflet";
// import Supercluster from 'supercluster';

/**
 * LayerGroup is a wrapper of LayerGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
class SuperCluster extends Component {

    // constructor(props) {
    //     super(props);
    //     // Create index.
    //     const index = new Supercluster({
    //         radius: 60,
    //         extent: 256,
    //         maxZoom: 18
    //       })
    //     index.load(props.data.features);
    //     this.index = index;
    //     // Create reference to be used for geojson object
    //     this.myRef = React.createRef(); 
    // }

    // componentDidMount() {
    //     // Add component to map.
    //     const { map } = this.props.leaflet;
    //     console.log(map)
    //     map.options.onViewportChanged = (e) => {
    //         console.log(e)
    //     }
    //   }
    
      render() {
        return <LeafletSuperCluster {...this.props} />
      }

    // render() {
    //     let nProps = Object.assign({}, this.props);
    //     const {map} = this.props.leaflet;
    //     // Get map state.
    //     const bounds = map.getBounds()
    //     const zoom = map.getZoom()
    //     const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
    //     // Update the data.
    //     nProps.data = this.index.getClusters(bbox, zoom);
    //     nProps.pointToLayer = this.createClusterIcon;
    //     const el = <LeafletGeoJSON {...nProps} ref={this.myRef}/>

    //     map.onViewportChanged = (e) => {
    //         console.log(e)
    //     }
    //     // map.on('moveend', update) = (e) => {
    //     //     console.log("hest")
    //     // }
    //     map.onmoveend = (e) => {
    //         console.log("hest2")
    //     }
    //     console.log("hat")
    //     return el
    // }



}

SuperCluster.defaultProps = {
    featureId: "id",
    n_clicks: 0
};

SuperCluster.propTypes = {

    /**
     * GeoJSON data
     */
    data: PropTypes.object,

    /**
     * Attribution
     */
    attribution: PropTypes.string,

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

    /**
     * Interactivity to be applied across all features.
     */
    defaultOptions: PropTypes.shape({
        // Style to apply on mouse hover.
        hoverStyle: PropTypes.object,
        // If true, map will zoom to feature on click.
        zoomToBoundsOnClick: PropTypes.bool,
        // If set, a popup will be created on the feature with this content.
        popupContent: PropTypes.string
    }),

    /**
     * Style to be applied across all features.
     */
    defaultStyle: PropTypes.object,

    /**
     * Interactivity to be applied per feature (an id must be assigned to target a feature).
     */
    featureOptions: PropTypes.shape({
        id: {
            // Style to apply on mouse hover.
            hoverStyle: PropTypes.object,
            // If true, map will zoom to feature on click.
            zoomToBoundsOnClick: PropTypes.bool,
            // If set, a popup will be created on the feature with this content.
            popupContent: PropTypes.string
        }
    }),

    /**
     * Style to be applied per feature (an id must be assigned to target a feature).
     */
    featureStyle: PropTypes.shape({
        id: PropTypes.object,
    }),

    /**
     * Which feature property to be used for matching as the feature id.
     */
    featureId: PropTypes.string,

    // Events
    setProps: PropTypes.func,

    /**
     * Dash callback property. Number of times the marker has been clicked
     */
    n_clicks: PropTypes.number,

    /**
     * Last feature clicked.
     */
    featureClick: PropTypes.object,

    /**
     * Last feature hover.
     */
    featureHover: PropTypes.object,

};

export default withLeaflet(SuperCluster);