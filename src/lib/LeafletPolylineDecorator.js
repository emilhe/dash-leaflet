import { withLeaflet, MapLayer } from 'react-leaflet';

require("leaflet-polylinedecorator");

class LeafletPolylineDecorator extends MapLayer {

  createLeafletElement(props) {
    const patterns = [];
    let paths = props.positions;
    // Map children into appropriate leaflet objects.
    if(!paths){
      const child = this.props.children.props._dashprivate_layout;
      if(child.type === "Polygon"){
        paths = L.polygon(child.props.positions, {...child.props})
      }
      if(child.type === "Polyline"){
        paths = L.polyline(child.props.positions, {...child.props})
      }
    }
    // Setup patterns.
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
        if("markerOptions" in pattern.marker && "icon" in pattern.marker.markerOptions){
          pattern.marker.markerOptions.icon = L.icon({...pattern.marker.markerOptions.icon})
        }
      }
    }
    // Create the leaflet element.
    return new L.polylineDecorator(paths, {patterns: patterns});
  }

}

export default withLeaflet(LeafletPolylineDecorator)
