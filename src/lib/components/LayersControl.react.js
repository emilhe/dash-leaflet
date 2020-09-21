import React, {Component, Children} from 'react';
import PropTypes from 'prop-types';

import { LayersControl as LeafletLayersControl } from 'react-leaflet';
import {withLeaflet} from "react-leaflet/lib/context";



/**
 * LayersControl is a wrapper of LayersControl in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */


function createElement(layout, element=null) {
    console.log("HELLO")
    console.log(layout)
    // Figure out what component
    if (!element) {
        element = resolveComponent(layout);
    }
    let {children: _children, ..._props} = layout.props;
    // Resolve children.
    if (_children) {
        if (Array.isArray(_children)) {
            for (let i = 0; i < _children.length; i++) {
                _children[i] = createElement(_children[i])
            }
            return React.createElement(element, _props, ...children);
        } else {
            _children = createElement(_children)
            return React.createElement(element, _props, _children);
        }
    }
}

// TODO: Handle better
function resolveComponent(component){
    return window[component.namespace][component.type]
}

// function createElement(element, props, children) {
//     if (Array.isArray(children)) {
//         return React.createElement(element, props, ...children);
//     }
//     return React.createElement(element, props, children);
// }


class LayersControl extends Component {

    constructor(props) {
        // Inject components into window.
        // if(window["dash_leaflet"]["BaseLayer"] !== LeafletLayersControl.BaseLayer){
        //     const dash_leaflet = Object.assign({}, window["dash_leaflet"]);
        //     dash_leaflet["BaseLayer"] = LeafletLayersControl.BaseLayer;
        //     window["dash_leaflet"] = dash_leaflet;
        // }

        const dash_leaflet = Object.assign({}, window["dash_leaflet"]);
        dash_leaflet["HAT"] = LeafletLayersControl.BaseLayer;
        window["dash_leaflet"] = dash_leaflet;

        super(props);
        this.el = null;
        this.myRef = React.createRef();  // Create reference to be used for geojson object
    }

    render() {
        // const children = []
        // console.log(this.props)
        // for(let i = 0; i < this.props.children.length; i++){
        //     // let child = this.props.children[i]._dashprivate_layout;
        //     let layout = Object.assign({}, this.props.children[i]._dashprivate_layout)
        //     // let type = child.props._dashprivate_layout.type;
        //     // let props = child.props._dashprivate_layout.props;
        //     // let { children: _children, ...options } = props
        //     // let children2 = []
        //     // for(let j = 0; j < _children.length; j++) {
        //     //     let child2 = _children[j]
        //     //     let type2 = <child2 className="props _dashprivate_"></child2>layout.type;
        //     //     let props2 = child2.props._dashprivate_layout.props;
        //     //     children2.push(React.createElement())
        //     // }
        //     // console.log(props);
        //     // Map base layer.
        //     if(layout.type === "BaseLayer"){
        //         children.push(createElement(layout, LeafletLayersControl.BaseLayer)); //new LeafletLayersControl.BaseLayer(props))
        //     }
        //     // // Map overlays.
        //     // if(type === "Overlay"){
        //     //     children.push(new LeafletLayersControl.Overlay(props))
        //     // }
        // }
        //
        let nProps = Object.assign({}, this.props);
        // console.log(nProps.children.props._dashprivate_layout.type)
        nProps.children.props._dashprivate_layout.type = "HAT"
        // nProps["children"] = children
        this.el = <LeafletLayersControl {...this.props} ref={this.myRef}/>  // {...this.props}
        console.log(this.el)
        return this.el
    }

    componentDidMount() {
        // let nProps = Object.assign({}, this.props.children);
        // nProps.props._dashprivate_layout.type = "HAT"
        // console.log(this.el.ref.current)
        // // this.el.ref.current.children = this.props.children
        console.log(this.el.ref.current)
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

};

export default withLeaflet(LayersControl);
