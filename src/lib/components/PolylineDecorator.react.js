import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletPolylineDecorator from '../LeafletPolylineDecorator';

/**
 * Polyline is a wrapper of Polyline in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class PolylineDecorator extends Component {
    render() {
        const nProps = Object.assign({}, this.props);
        // Try to extract positions from child.
        if(!this.props.positions){
            nProps.positions = this.props.children.props._dashprivate_layout.props.positions
        }
        // Render the leaflet component.
        return <LeafletPolylineDecorator {...nProps}/>
    }
}

PolylineDecorator.propTypes = {

    /**
     * The children of this component. Must be a PolyLine or a Polygon.
     */
    children: PropTypes.node,

    /**
     * An array of geographical points (lat, lon)
     */
    positions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),

    /**
     * List of patterns to be added.
     */
    patterns: PropTypes.arrayOf(PropTypes.shape({
        offset: PropTypes.string,
        endOffset: PropTypes.string,
        repeat: PropTypes.string,
        dash: PropTypes.object,
        arrowHead: PropTypes.object,
        marker: PropTypes.object,
    })),

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    // Events
    setProps: PropTypes.func,

}
