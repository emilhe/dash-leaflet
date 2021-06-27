import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { EditControl as LeafletEditControl } from "react-leaflet-draw"

require('../../../node_modules/leaflet-draw/dist/leaflet.draw.css');

/**
 * EditControl is based on https://github.com/alex3165/react-leaflet-draw/
 */
export default class EditControl extends Component {

    render() {
        return <LeafletEditControl {...this.props}/>
    }

}

EditControl.propTypes = {

    /**
     * The position of this component.
     */
    position: PropTypes.oneOf(["topleft", "topright", "bottomleft", "bottomright"]),

    /**
     * Enable/disable draw controls. See example if usage here https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config
     */
    draw: PropTypes.object,

    /**
     * Enable/disable edit controls. See example if usage here https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config
     */
    edit: PropTypes.object,

    /** TODO: Map on handlers into meaningfull props.
     * onEdited	function	hook to leaflet-draw's draw:edited event
    onCreated	function	hook to leaflet-draw's draw:created event
    onDeleted	function	hook to leaflet-draw's draw:deleted event
    onMounted	function	hook to leaflet-draw's draw:mounted event
    onEditStart	function	hook to leaflet-draw's draw:editstart event
    onEditStop	function	hook to leaflet-draw's draw:editstop event
    onDeleteStart	function	hook to leaflet-draw's draw:deletestart event
    onDeleteStop	function	hook to leaflet-draw's draw:deletestop event
    onDrawStart	function	hook to leaflet-draw's draw:drawstart event
    onDrawStop	function	hook to leaflet-draw's draw:drawstop event
    onDrawVertex	function	hook to leaflet-draw's draw:drawvertex event
    onEditMove	function	hook to leaflet-draw's draw:editmove event
    onEditResize	function	hook to leaflet-draw's draw:editresize event
    onEditVertex	function	hook to leaflet-draw's draw:editvertex event
     */

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
