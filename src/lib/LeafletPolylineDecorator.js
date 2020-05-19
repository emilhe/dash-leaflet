import { withLeaflet, MapLayer } from 'react-leaflet';

require("leaflet-polylinedecorator");

class LeafletPolylineDecorator extends MapLayer {

  createLeafletElement(props) {
    const patterns = this._parsePatterns(props);
    const paths = this._parsePositions(props);
    return new L.polylineDecorator(paths, {patterns: patterns});
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.patterns !== fromProps.patterns) {
      const patterns = this._parsePatterns(toProps);
      this.leafletElement.setPatterns(patterns);
    }
    if (toProps.positions !== fromProps.positions || toProps.children !== fromProps.children) {
      const paths = this._parsePositions(toProps);
      this.leafletElement.setPaths(paths);
    }
  }

  _parsePatterns(props) {
    const patterns = [];
    let pattern;
    for (pattern of props.patterns) {
      if ("dash" in pattern) {
        patterns.push({symbol: L.Symbol.dash(pattern.dash), ...pattern})
      }
      if ("arrowHead" in pattern) {
        patterns.push({symbol: L.Symbol.arrowHead(pattern.arrowHead), ...pattern})
      }
      if ("marker" in pattern) {
        patterns.push({symbol: L.Symbol.marker(pattern.marker), ...pattern})
        if ("markerOptions" in pattern.marker && "icon" in pattern.marker.markerOptions) {
          pattern.marker.markerOptions.icon = L.icon({...pattern.marker.markerOptions.icon})
        }
      }
    }
    return patterns
  }

  _parsePositions(props) {
    let paths = props.positions;
    if (!paths) {
      const child = this.props.children.props._dashprivate_layout;
      if (child.type === "Polygon") {
        paths = L.polygon(child.props.positions, {...child.props})
      }
      if (child.type === "Polyline") {
        paths = L.polyline(child.props.positions, {...child.props})
      }
    }
    return paths;
  }

}

export default withLeaflet(LeafletPolylineDecorator)
