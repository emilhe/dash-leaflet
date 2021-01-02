import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletLayersControl from '../LeafletLayersControl';
import { withLeaflet } from "react-leaflet";

class LayersControl extends Component {

    _getInitialValues() {
        let baseLayer = null;
        const overlays = [];
        React.Children.map(this.props.children, (child) => {
            const dpl = child.props._dashprivate_layout;
            const props = child.props._dashprivate_layout.props;
            if(dpl.type === "BaseLayer" && props.checked){
                baseLayer = props.name;
            }
            if(dpl.type === "Overlay" && props.checked){
                overlays.push(props.name);
            }
        })
        return {baseLayer: baseLayer, overlays: overlays};
    }

    componentDidMount() {
        const { map } = this.props.leaflet;
        // Set initial value.
        const initialValues = this._getInitialValues();
        this.props.setProps({ baseLayer: initialValues.baseLayer})
        this.props.setProps({ overlays: initialValues.overlays})
        // Monitor layer events.
        map.on('baselayerchange', (e) =>{
            this.props.setProps({ baseLayer: e.name});
        })
        map.on('overlayadd', (e) =>{
            this.props.setProps({ overlays: this.props.overlays.concat([e.name])})
        })
        map.on('overlayremove', (e) =>{
            this.props.setProps({ overlays: this.props.overlays.filter(item => item !== e.name)})
        })
    }

    render() {
        // Inject components into window.
        const dash_leaflet = Object.assign({}, window["dash_leaflet"]);
        dash_leaflet["BaseLayer"] = LeafletLayersControl.BaseLayer;
        dash_leaflet["Overlay"] = LeafletLayersControl.Overlay;
        window["dash_leaflet"] = dash_leaflet;
        // Render the component.
        return <LeafletLayersControl {...this.props} />
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
     * Name of the currently selected base layer.
     */
    baseLayer: PropTypes.string,

    /**
     * Names of the currently selected overlays.
     */
    overlays: PropTypes.arrayOf(PropTypes.string),

};

export default withLeaflet(LayersControl);
