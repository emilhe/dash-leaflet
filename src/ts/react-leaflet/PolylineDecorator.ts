import {createElementObject, createPathComponent, extendContext} from "@react-leaflet/core";
import "leaflet-polylinedecorator";
import * as L from "leaflet";

function createLeafletElement(props, context) {
  const patterns = _parsePatterns(props);
  const paths = _parsePositions(props);
  const polylineDecorator = L.polylineDecorator(paths, {patterns: patterns});
   return createElementObject(
     polylineDecorator,
     extendContext(context, {overlayContainer: polylineDecorator}),
 )
}

function updateLeafletElement(instance, props, prevProps) {
  if (props.patterns !== prevProps.patterns) {
      const patterns = _parsePatterns(props);
      instance.setPatterns(patterns);  // TODO: FIX THIS ONE
  }
  if (props.positions !== prevProps.positions || props.children !== prevProps.children) {
      const paths = _parsePositions(props);
      instance.setPaths(paths);  // TODO: FIX THIS ONE
  }
}

function _parsePatterns(props) {
  const patterns = [];
  let pattern;
  for (pattern of props.patterns) {
      if ("dash" in pattern) {
          patterns.push({symbol: (L as any).Symbol.dash(pattern.dash), ...pattern})
      }
      if ("arrowHead" in pattern) {
          patterns.push({symbol: (L as any).Symbol.arrowHead(pattern.arrowHead), ...pattern})
      }
      if ("marker" in pattern) {
          patterns.push({symbol: (L as any).Symbol.marker(pattern.marker), ...pattern})
          if ("markerOptions" in pattern.marker && "icon" in pattern.marker.markerOptions) {
              pattern.marker.markerOptions.icon = L.icon({...pattern.marker.markerOptions.icon})
          }
      }
  }
  return patterns
}

function _parsePositions(props) {
  let paths = props.positions;
  if (!paths) {
      const child = props.children.props._dashprivate_layout;
      if (child.type === "Polygon") {
          paths = L.polygon(child.props.positions, {...child.props})
      }
      if (child.type === "Polyline") {
          paths = L.polyline(child.props.positions, {...child.props})
      }
  }
  return paths;
}
export const PolylineDecorator = createPathComponent(createLeafletElement, updateLeafletElement)
