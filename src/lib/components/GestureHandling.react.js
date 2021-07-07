import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withLeaflet } from "react-leaflet";
import { GestureHandling as LeafletGestureHandling } from "leaflet-gesture-handling";

require ("leaflet/dist/leaflet.css");
require ("leaflet-gesture-handling/dist/leaflet-gesture-handling.css");


/**
 * GestureHandling is a light wrapper of https://github.com/elmarquis/Leaflet.GestureHandling
 */
class GestureHandling extends Component {

  componentDidMount() {
    // Add component to map.
    const { options } = this.props;
    const { map } = this.props.leaflet;
    map.gestureHandlingOptions = options;
    map.gestureHandling.enable();
  }

  componentWillUnmount(){
    const { map } = this.props.leaflet;
    map.gestureHandling.disable();
  }

  render() {
    return null;
  }

}

GestureHandling.propTypes = {

    /**
     * The children of this component (dynamic).
     */
    children: PropTypes.node,

    /**
     * A custom class name to assign to the image. Empty by default.
     */
    className: PropTypes.string,

    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * Gesture handling options (a dict). See list of options here,
     * https://github.com/elmarquis/Leaflet.GestureHandling#other-options
     */
    options: PropTypes.object,

};

export default withLeaflet(GestureHandling);