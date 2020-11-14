import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletMeasure from '../LeafletMeasure';

/**
 * Measure is based on https://github.com/ljagis/leaflet-measure
 */
export default class Measure extends Component {

    render() {
        const nProps = Object.assign({}, this.props);
        return <LeafletMeasure {...nProps}/>
    }

}

Measure.defaultProps = {
    secondaryLengthUnit: undefined
};

Measure.propTypes = {

    /**
     * The position of this component.
     */
    position: PropTypes.oneOf(["topleft", "topright", "bottomleft", "bottomright"]),

    /**
     * The units used to display length results. secondaryLengthUnit is optional.
     */
    primaryLengthUnit: PropTypes.oneOf(["feet", "meters", "miles", "kilometers"]),
    secondaryLengthUnit: PropTypes.oneOf(["feet", "meters", "miles", "kilometers", undefined]),

    /**
     * The units used to display area results. secondaryAreaUnit is optional.
     */
    primaryAreaUnit: PropTypes.oneOf(["acres", "hectares", "sqfeet", "sqmeters", "sqmiles"]),
    secondaryAreaUnit: PropTypes.oneOf(["acres", "hectares", "sqfeet", "sqmeters", "sqmiles", undefined]),

    /**
     * The color to use for map features rendered while actively perfoming a measurement.
     */
    activeColor: PropTypes.string,

    /**
     * The color to use for features generated from a completed measurement.
     */
    completedColor: PropTypes.string,

    /**
     * The options applied to the popup of the resulting measure feature.
     */
    popupOptions: PropTypes.object,

    /**
     * The Z-index of the marker used to capture measure clicks.
     */
    captureZIndex: PropTypes.number,

    /**
     * The decimal point and thousands separator used when displaying measurements.
     */
    decPoint: PropTypes.string,
    thousandsSep: PropTypes.string,

    // Dash stuff

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

    // Events
    setProps: PropTypes.func,


};
