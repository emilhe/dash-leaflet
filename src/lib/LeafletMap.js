import { withLeaflet, Map } from 'react-leaflet';


class LeafletMap extends Map {

  updateLeafletElement(fromProps, toProps) {
      if (toProps.invalidateSize && toProps.invalidateSize.revision) {
          if (!fromProps.invalidateSize || fromProps.invalidateSize.revision !== toProps.invalidateSize.revision) {
              this.leafletElement.invalidateSize(toProps.options)
          }
      }
      super.updateLeafletElement(fromProps, toProps)
  }

}

export default withLeaflet(LeafletMap)
