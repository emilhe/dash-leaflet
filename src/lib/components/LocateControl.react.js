import React, {Component, Node} from 'react';
import PropTypes from 'prop-types';

import LeafletLocateControl from "../LocateControl";
require('leaflet.locatecontrol/dist/L.Control.Locate.min.css');

/**
 * LocateControl is a wrapper of LocateControl in react-leaflet. The component requires linking font-awesome, i.e.
 * app = dash.Dash(external_stylesheets=['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'])
 */
export default class LocateControl extends Component {
    render() {
        // We need to use the non-JSX syntax to avoid having to list all props
        const el = React.createElement(
            LeafletLocateControl,
            this.props,
            this.props.children
        )

        return el
    }
}

LocateControl.propTypes = {

    /**
     * The children of this component (dynamic)
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

};

