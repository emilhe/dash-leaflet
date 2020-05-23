import React from 'react';
import ReactDOM from 'react-dom';
import { DivIcon, marker } from 'leaflet';
import { MapLayer, withLeaflet, LeafletProvider } from 'react-leaflet';
import PropTypes from 'prop-types';

export class LeafletDivMarker extends MapLayer {
  // static propTypes = {
  //   opacity: PropTypes.number,
  //   zIndexOffset: PropTypes.number,
  // }

  constructor(props){
    super(props)
    super.componentDidMount();
  }

  // See https://github.com/PaulLeCam/react-leaflet/issues/275
  createLeafletElement(newProps) {
    const { map: _map, layerContainer: _lc, position, ...props } = newProps;
    this.icon = new DivIcon(newProps.iconOptions);
    const m = marker(position, { icon: this.icon, ...props });
    this.contextValue = { ...props.leaflet, popupContainer: m }
    return m
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position);
    }
    if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity);
    }
    if (toProps.draggable !== fromProps.draggable) {
      if (toProps.draggable) {
        this.leafletElement.dragging.enable();
      }
      else {
        this.leafletElement.dragging.disable();
      }
    }
  }

  componentDidUpdate(fromProps) {
    this.updateLeafletElement(fromProps, this.props);
  }

  render() {
    const container = this.leafletElement._icon;
    if (container) {
      return ReactDOM.createPortal(<LeafletProvider value={this.contextValue}>
        {this.props.children}
      </LeafletProvider>, container)
    }
    else {
      return null
    }
  }
}

export default withLeaflet(LeafletDivMarker)