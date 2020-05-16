import { withLeaflet, MapLayer } from 'react-leaflet';

require("leaflet-polylinedecorator");

class LeafletPolylineDecorator extends MapLayer {

  createLeafletElement(props) {
    // Setup arguments to match polylineDecorated constructor.
    const patterns = [];
    let pattern;
    for(pattern of props.patterns){
      if("dash" in pattern){
        patterns.push({symbol: L.Symbol.dash(pattern.dash), ...pattern})
      }
      if("arrowHead" in pattern){
        patterns.push({symbol: L.Symbol.arrowHead(pattern.arrowHead),  ...pattern})
      }
      if("marker" in pattern){
        patterns.push({symbol: L.Symbol.marker(pattern.marker), ...pattern})
      }
    }
    // Create the leaflet element.
    const el = new L.polylineDecorator(props.positions, {patterns: patterns});
    // TODO: Is the necessary?
    this.contextValue = Object.assign({}, props.leaflet);
    this.contextValue.popupContainer = this.leafletElement;

    return el
  }

}

export default withLeaflet(LeafletPolylineDecorator)
