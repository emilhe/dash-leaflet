import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletLayersControl from '../LeafletLayersControl';
import { withLeaflet } from "react-leaflet";

class LayersControl extends Component {

    _init_layers() {
        return React.Children.map(this.props.children, (child) => {
            const props = child.props._dashprivate_layout.props;
            return {name: props.name, checked: props.checked}
        })
    }

    _update_layers(name, value) {
        const layers = this.props.layers.map(layer => {return {...layer}});
        for (let i=0; i < layers.length; i++) {
            if (name === layers[i].name) {
                layers[i].checked = value
            }
        }
        return layers
    }

    componentDidMount() {
        const { map } = this.props.leaflet;
        // Set initial value.
        this.props.setProps({ layers: this._init_layers()})
        // Monitor layer events.
        map.on('layeradd', (e) =>{
            if(e.layer.name){
                this.props.setProps({ layers: this._update_layers(e.layer.name, true)});
            }
        })
        map.on('layerremove', (e) =>{
            if(e.layer.name){
                this.props.setProps({ layers: this._update_layers(e.layer.name, false) });
            }
        })
    }

    render() {
        // Inject components into window.
        const dash_leaflet = Object.assign({}, window["dash_leaflet"]);
        dash_leaflet["BaseLayer"] = LeafletLayersControl.BaseLayer;
        dash_leaflet["Overlay"] = LeafletLayersControl.Overlay;
        window["dash_leaflet"] = dash_leaflet;
        // Render the component.
        return  <LeafletLayersControl {...this.props} />
    }

}

LayersControl.propTypes = {

    /**
     * Collapsed.
     */
    collapsed: PropTypes.bool,

    /**
     * Position.
     */
    position: PropTypes.oneOf(['topleft', 'topright', 'bottomleft', 'bottomright']),

    /**
     * Attribution
     */
    children: PropTypes.node,

    /**
     * A custom class name. Empty by default.
     */
    className: PropTypes.string,

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    // Events
    setProps: PropTypes.func,

    /**
     * List of layers indicating if they are currently checked or not.
     */
    layers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            checked: PropTypes.bool,
        }))

};

export default withLeaflet(LayersControl);
