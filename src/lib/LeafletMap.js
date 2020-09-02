import { withLeaflet, Map } from 'react-leaflet';


class LeafletMap extends Map {

  createLeafletElement(props) {
      // console.log(this);
      // console.log(this.leafletElement);
      // // this.leafletElement.invalidateSize()
      // console.log(this.props.leaflet.map);
      return super.createLeafletElement(props)
  }

  updateLeafletElement(fromProps, toProps){
      super.updateLeafletElement(fromProps, toProps)

      console.log("UPDATING")
      console.log(this);
      // this.leafletElement.invalidateSize()
      console.log(this.leafletElement);
      console.log(this.props.leaflet.map);
  }


  //
  //   this.contextValue = Object.assign({}, props.leaflet);
  //   this.contextValue.popupContainer = this.leafletElement;
  //
  //   return el
  // }
  //
  // updateLeafletElement(fromProps, toProps) {
  //   // if (toProps.svg !== fromProps.svg) {
  //   //   this.leafletElement.setUrl(toProps.svg)
  //   // }
  //   if (toProps.bounds !== fromProps.bounds) {
  //     this.leafletElement.setBounds(latLngBounds(toProps.bounds))
  //   }
  //   if (toProps.opacity !== fromProps.opacity) {
  //     this.leafletElement.setOpacity(toProps.opacity)
  //   }
  //   if (toProps.zIndex !== fromProps.zIndex) {
  //     this.leafletElement.setZIndex(toProps.zIndex)
  //   }
  // }

}

export default withLeaflet(LeafletMap)
