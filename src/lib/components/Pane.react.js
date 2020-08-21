import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Pane as LeafletPane } from 'react-leaflet';

/**
 * Pane is a wrapper of Pane in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class Pane extends Component {
    render() {
        return <LeafletPane {...this.props} />
    }
}

Pane.propTypes = {

    /**
     * The children of this component
     */
    children: PropTypes.node,

    /**
     * The pane name
     */
    name: PropTypes.string,

    /**
     * The leaflet pane of the component
     */
    pane: PropTypes.string,

    /**
     * The CSS style of the component (dynamic)
     */
    style: PropTypes.object,

    /**
     * A custom class name to assign to the pane. Empty by default.
     */
    className: PropTypes.string,

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    // Events
    setProps: PropTypes.func,

};

