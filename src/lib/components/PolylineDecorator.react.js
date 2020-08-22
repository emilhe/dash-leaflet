import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletPolylineDecorator from '../LeafletPolylineDecorator';

/**
 * Polyline is a wrapper of Polyline in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class PolylineDecorator extends Component {
    render() {
        return <LeafletPolylineDecorator {...this.props}/>
    }
}

PolylineDecorator.propTypes = {

    /**
     * An array of geographical points (lat, lon)
     */
    positions: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)))
    ]),

    /**
     * The children of this component. If positions are not specified, an attempt is made to read them from the
     * children property. In this case, the children must be a single PolyLine or a single Polygon.
     */
    children: PropTypes.node,

    /**
     * List of patterns to be added.
     */
    patterns: PropTypes.arrayOf(PropTypes.shape({
        // Options of the pattern itself.
        offset: PropTypes.string,
        endOffset: PropTypes.string,
        repeat: PropTypes.string,
        // What to draw; either dashes, arrow heads or (arbitrary) makers.
        dash: PropTypes.shape({
            pixelSize: PropTypes.number,
            pathOptions: PropTypes.object
        }),
        arrowHead: PropTypes.shape({
            polygon: PropTypes.bool,
            pixelSize: PropTypes.number,
            headAngle: PropTypes.number,
            pathOptions: PropTypes.object
        }),
        marker: PropTypes.shape({
            markerOptions: PropTypes.object,
            rotate: PropTypes.bool
        })
    })),

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    // Events
    setProps: PropTypes.func,

};
