import { withLeaflet, MapLayer } from 'react-leaflet';

import { SVGOverlay as LSVGOverlay, latLngBounds } from 'leaflet';

// NOTE: This component is not fully tested. Consider it beta.
class LeafletSVGOverlay extends MapLayer {

  createLeafletElement(props) {
    const el = new LSVGOverlay(
        props.svg,
        props.bounds,
        this.getOptions(props)
    )

    this.contextValue = Object.assign({}, props.leaflet);
    this.contextValue.popupContainer = this.leafletElement;

    return el
  }

  updateLeafletElement(fromProps, toProps) {
    // if (toProps.svg !== fromProps.svg) {
    //   this.leafletElement.setUrl(toProps.svg)
    // }
    if (toProps.bounds !== fromProps.bounds) {
      this.leafletElement.setBounds(latLngBounds(toProps.bounds))
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity)
    }
    if (toProps.zIndex !== fromProps.zIndex) {
      this.leafletElement.setZIndex(toProps.zIndex)
    }
  }

}

export default withLeaflet(LeafletSVGOverlay)
