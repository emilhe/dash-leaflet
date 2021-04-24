import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletMeasure from '../LeafletMeasure';

/**
 * LoadingControl is based on https://github.com/ebrelsford/Leaflet.loading
 */
export default class LoadingControl extends Component {

    render() {
        return <LeafletMeasure {...this.props}/>
    }

}

LoadingControl.defaultProps = {
    separate: false,
    delayIndicator: null,
    spinjs: false,
    spin: {
        lines: 7,
        length: 3,
        width: 3,
        radius: 5,
        rotate: 13,
        top: "83%"
    }
};

LoadingControl.propTypes = {

    /**
     * The position of this component.
     */
    position: PropTypes.oneOf(["topleft", "topright", "bottomleft", "bottomright"]),

    /**
     * Whether the control should be separate from the zoom control or not, defaults to false.
     */
    separate: PropTypes.bool,

    /**
     * The number of milliseconds to wait before showing the loading indicator. Defaults to null (no delay).
     */
    delayIndicator: PropTypes.number,


    /**
     * Enable the use of spin.js (optional).
     */
    spinjs: PropTypes.bool,

    /**
     * A spin.js options object (optional).
     */
    spin: PropTypes.object,

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
