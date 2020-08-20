import React, {Component, Node} from 'react';
import PropTypes from 'prop-types';
import LeafletGeoJSON from '../LeafletGeoJSON';
import {resolveFunctionalProps} from '../utils'
import {withLeaflet} from "react-leaflet";


/**
 * LayerGroup is a wrapper of LayerGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
class GeoJSON2 extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();  // Create reference to be used for geojson object
    }

    render() {
        let nProps = resolveFunctionalProps(this.props, ["pointToLayer"]);
        return <LeafletGeoJSON {...nProps} ref={this.myRef}/>
    }

}

GeoJSON2.defaultProps = {
};

GeoJSON2.propTypes = {
    data: PropTypes.object,
    pointToLayer: PropTypes.string,
};

export default withLeaflet(GeoJSON2);

