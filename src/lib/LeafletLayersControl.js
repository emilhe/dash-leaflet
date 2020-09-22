import { Control } from 'leaflet'
import React, {
  cloneElement,
  Component,
  Children,
  Fragment,
} from 'react'
import {LeafletProvider, MapControl, withLeaflet} from "react-leaflet";

// Abtract class for layer container, extended by BaseLayer and Overlay
export class ControlledLayer extends Component {

  componentDidUpdate({ checked }) {
    if (this.props.leaflet.map == null) {
      return
    }
    // Handle dynamically (un)checking the layer => adding/removing from the map
    if (this.props.checked === true && (checked == null || checked === false)) {
      this.props.leaflet.map.addLayer(this.layer)
    } else if (
      checked === true &&
      (this.props.checked == null || this.props.checked === false)
    ) {
      this.props.leaflet.map.removeLayer(this.layer)
    }
  }

  componentWillUnmount() {
    this.props.removeLayerControl(this.layer)
  }

  addLayer() {
    throw new Error('Must be implemented in extending class')
  }

  removeLayer(layer) {
    this.props.removeLayer(layer)
  }

  render() {
    const { children } = this.props
    return children ? (
      <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
    ) : null
  }
}

class BaseLayer extends ControlledLayer {
  constructor(props) {
    super(props)
    this.contextValue = {
      ...props.leaflet,
      layerContainer: {
        addLayer: this.addLayer.bind(this),
        removeLayer: this.removeLayer.bind(this),
      },
    }
  }

  addLayer = (layer) => {
    this.layer = layer // Keep layer reference to handle dynamic changes of props
    const { addBaseLayer, checked, name } = this.props
    addBaseLayer(layer, name, checked)
  }
}

class Overlay extends ControlledLayer {
  constructor(props) {
    super(props)
    this.contextValue = {
      ...props.leaflet,
      layerContainer: {
        addLayer: this.addLayer.bind(this),
        removeLayer: this.removeLayer.bind(this),
      },
    }
  }

  addLayer = (layer) => {
    this.layer = layer // Keep layer reference to handle dynamic changes of props
    const { addOverlay, checked, name } = this.props
    addOverlay(layer, name, checked)
  }
}

class LayersControl extends MapControl {

  constructor(props) {
    super(props)
    this.controlProps = {
      addBaseLayer: this.addBaseLayer.bind(this),
      addOverlay: this.addOverlay.bind(this),
      leaflet: props.leaflet,
      removeLayer: this.removeLayer.bind(this),
      removeLayerControl: this.removeLayerControl.bind(this),
    }
  }

  createLeafletElement(props) {
    const { children: _children, ...options } = props
    return new Control.Layers(undefined, undefined, options)
  }

  updateLeafletElement(fromProps, toProps) {
    super.updateLeafletElement(fromProps, toProps)
    if (toProps.collapsed !== fromProps.collapsed) {
      if (toProps.collapsed === true) {
        this.leafletElement.collapse()
      } else {
        this.leafletElement.expand()
      }
    }
  }

  componentWillUnmount() {
    setTimeout(() => {
      super.componentWillUnmount()
    }, 0)
  }

  addBaseLayer(layer, name, checked) {
    if (checked && this.props.leaflet.map != null) {
      this.props.leaflet.map.addLayer(layer)
    }
    this.leafletElement.addBaseLayer(layer, name)
  }

  addOverlay(layer, name, checked) {
    if (checked && this.props.leaflet.map != null) {
      this.props.leaflet.map.addLayer(layer)
    }
    this.leafletElement.addOverlay(layer, name)
  }

  removeLayer(layer) {
    if (this.props.leaflet.map != null) {
      this.props.leaflet.map.removeLayer(layer)
    }
  }

  removeLayerControl(layer) {
    this.leafletElement.removeLayer(layer)
  }

  render() {
    console.log("REAL CHILDREN")
    console.log(this.props.children)
    const children = Children.map(this.props.children, (child) => {
      // console.log(child);
      // console.log(~child);
      // if (~child) {
      //   return null;
      // }
      const clone = cloneElement(child, this.controlProps)
      const nProps = {...child.props._dashprivate_layout.props, ...this.controlProps};
      console.log(nProps)
      clone.props._dashprivate_layout.props = nProps;
      return clone
    })
    console.log("MAPPED CHILDREN")
    console.log(children)
    return <Fragment>{children}</Fragment>
  }
}

const LayersControlExport = withLeaflet(LayersControl)

LayersControlExport.BaseLayer = BaseLayer
LayersControlExport.Overlay = Overlay

export default LayersControlExport