import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { EditControl as LeafletEditControl } from "react-leaflet-draw"
import {resolveProps} from "dash-extensions";

require('../../../node_modules/leaflet-draw/dist/leaflet.draw.css');

/**
 * EditControl is based on https://github.com/alex3165/react-leaflet-draw/
 */
export default class EditControl extends Component {

    render() {
        // Convert layer to something that can be passed on to Dash.
        const propsToSelect = ["_bounds", "_latlngs", "_radius", "_latlng", "_mRadius"];
        const bindLayer = (feature, layer) => {
            for (let i = 0; i < propsToSelect.length; i++) {
                let propToSelect = propsToSelect[i];
                if (layer.hasOwnProperty(propToSelect)) {
                    feature[propToSelect] = JSON.stringify(layer[propToSelect]);
                }
            }
            return feature;
        }
        // Events that are exposed directly.
        const rawEvents = ['onEdited', 'onDeleted', 'onMounted',
              'onDrawVertex',
            'onEditMove', 'onEditResize', 'onEditVertex'];
        let nProps = resolveProps(this.props, rawEvents, this);
        // Bind feature create event.
        nProps.onCreated = (e) => {
            const feature = {type: e.type, layerType: e.layerType};
            bindLayer(feature, e.layer);
            this.props.setProps({create_feature: feature});
        }
        // Bind feature edit event.
        nProps.onEdited = (e) => {
            const feature_map = {};
            for(let key in e.layers._layers) {
                if (e.layers._layers.hasOwnProperty(key)) {
                    feature_map[key] = bindLayer({type: e.type}, e.layers._layers[key]);
                }
            }
            this.props.setProps({edit_features: feature_map});
        }
        // Bind action events.
        const actionEvents = ['onDrawStart', 'onDrawStop', 'onDeleteStart', 'onDeleteStop', 'onEditStart', 'onEditStop']
        for (let i = 0; i < actionEvents.length; i++) {
            nProps[actionEvents[i]] = (e) => {
                this.props.setProps({
                    action: {
                        layer_type: e.layerType, type: e.type,
                        n_actions: this.props.action.n_actions + 1
                    }
                });
            }
        }
        return <LeafletEditControl {...nProps}/>
    }

}

EditControl.defaultProps = {
    action: {n_actions: 0}
};

EditControl.propTypes = {

    /**
     * The position of this component.
     */
    position: PropTypes.oneOf(["topleft", "topright", "bottomleft", "bottomright"]),

    /**
     * Enable/disable draw controls. See example of usage here https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config
     */
    draw: PropTypes.object,

    /**
     * Enable/disable edit controls. See example of usage here https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config
     */
    edit: PropTypes.object,

    // Custom properties.

    /**
     * Fires on every action.
     */
    action: PropTypes.object,

    /**
     * Last created feature.
     */
    create_feature: PropTypes.object,

    /**
     * Last edited feature.
     */
    edit_features: PropTypes.object,

    /**
     * Last deleted feature.
     */
    delete_features: PropTypes.object,


    /**
     * Hook to leaflet-draw's draw:edited event.
     */
    onEdited: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:created event.
     */
    onCreated: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:deleted event.
     */
    onDeleted: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:mounted event.
     */
    onMounted: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:editstart event.
     */
    onEditStart: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:editstop event.
     */
    onEditStop: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:deletestart event.
     */
    onDeleteStart: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:deletestop event.
     */
    onDeleteStop: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:drawstart event.
     */
    onDrawStart: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:drawstop event.
     */
    onDrawStop: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:drawvertex event.
     */
    onDrawVertex: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:editmove event.
     */
    onEditMove: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:editresize event.
     */
    onEditResize: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:editvertex event.
     */
    onEditVertex: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

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
