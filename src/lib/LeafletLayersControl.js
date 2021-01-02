import {Control} from 'leaflet'
import React, {Children, cloneElement, Fragment,} from 'react'
import {LayersControl, MapControl, withLeaflet} from "react-leaflet";

// Copied from https://github.com/PaulLeCam/react-leaflet/blob/master/src/LayersControl.js
class LeafletLayersControl extends MapControl {

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

  // ONLY MODIFICATION IS HERE
  render() {
    const children = Children.map(this.props.children, (child) => {
      const clone = cloneElement(child, this.controlProps)
      clone.props._dashprivate_layout.props = {...child.props._dashprivate_layout.props, ...this.controlProps};
      return clone
    })
    return <Fragment>{children}</Fragment>
  }
}

const LayersControlExport = withLeaflet(LeafletLayersControl)

LayersControlExport.BaseLayer = LayersControl.BaseLayer
LayersControlExport.Overlay = LayersControl.Overlay

export default LayersControlExport