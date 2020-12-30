import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletLayersControl from '../LeafletLayersControl';
import { withLeaflet } from "react-leaflet";

class LayersControl extends Component {

    _init_layers() {
        console.log("INIT")
        return React.Children.map(this.props.children, (child) => {
            const props = child.props._dashprivate_layout.props;
            return {name: props.name, checked: props.checked}
        })
    }

    _update_layers(name, value) {
        const layers = this.props.layers? this.props.layers : this._init_layers();
        for (let i=0; i < layers.length; i++) {
            if (name === layers[i].name) {
                layers[i].checked = value
            }
        }
        return layers
    }

    componentDidMount() {
        const { map } = this.props.leaflet;
        // Monitor layer events.
        map.on('layeradd', (e) =>{
            if(!e.layer.name){
                return
            }
            const layers = this._update_layers(e.layer.name, true);
            console.log("ADD")
            console.log(layers)
            this.props.setProps({ layers: layers})
        })
        map.on('layerremove', (e) =>{
            if(!e.layer.name){
                return
            }
            const layers = this._update_layers(e.layer.name, false);
            console.log("REMOVE")
            console.log(layers)
            this.props.setProps({ layers: layers })
        })}

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
     * XXX
     */
    layers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            checked: PropTypes.bool,
        }))

};

export default withLeaflet(LayersControl);
