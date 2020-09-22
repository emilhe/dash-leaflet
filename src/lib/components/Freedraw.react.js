import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CREATE, EDIT, DELETE, APPEND, ALL, NONE } from 'react-leaflet-freedraw';
import LeafletFreedraw from 'react-leaflet-freedraw';

const mode_map = {"CREATE": CREATE, "EDIT": EDIT, "DELETE": DELETE, "APPEND": APPEND, "ALL": ALL}
const parse_mode_array = (mode_array) => {
    if(mode_array.includes("ALL")){
        return ALL
    }
    let mode = NONE;
    if (mode_array && mode_array.length) {
        for (let i = 0; i < mode_array.length; i++) {
            mode = mode | mode_map[mode_array[i]];
        }
    }
    return mode
}

/**
 * Freedraw is a wrapper of react-leaflet-freedraw.
 */
export default class Freedraw extends Component {
    render() {
        const nProps = Object.assign({}, this.props.options);
        nProps.mode = parse_mode_array(this.props.modes);
        nProps.onMarkers = (e) => {
            this.props.setProps({markers: {action: e.eventType, positions: e.latLngs}})
        }
        nProps.onModeChange = (e) => {} // set to silence error
        return <LeafletFreedraw{...nProps}/>
    }
}

Freedraw.defaultProps = {
    options: {},
    modes: ["ALL"]
};

Freedraw.propTypes = {

    /**
     * Which modes to enable.
     */
    modes: PropTypes.arrayOf(PropTypes.oneOf(["CREATE", "EDIT", "DELETE", "APPEND", "ALL"])),

    /**
     * Markers return
     */
    markers: PropTypes.shape({
        "action": PropTypes.string,
        "positions": PropTypes.array,
    }),

    /**
     * Options to https://github.com/Wildhoney/Leaflet.FreeDraw
     */
    options: PropTypes.object,

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

    // Events
    setProps: PropTypes.func,

};

