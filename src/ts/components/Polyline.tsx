import React, { useEffect, useContext } from 'react';
import { Polyline as LeafletPolyline } from 'react-leaflet';
import { StreetLabelContext } from './StreetLabels/StreetLabelContext';
import { LabelStyle } from './StreetLabels/TextPathRenderer';
import { PolylineProps, assignClickEventHandlers, ClickComponent, Modify } from "../props";
import L from 'leaflet';

// Generate unique ID for components without explicit IDs
let idCounter = 0;
const generateUniqueId = () => `polyline-${Date.now()}-${idCounter++}`;

interface ExtendedPolylineProps extends Modify<PolylineProps, ClickComponent> {
  // Street label props
  /**
   * Text to display along the polyline
   */
  label?: string;

  /**
   * Styling options for the label
   */
  labelStyle?: LabelStyle;

  /**
   * Whether to show the label
   */
  showLabel?: boolean;

  /**
   * Enable collision detection for labels
   */
  collisionDetection?: boolean;
}

/**
 * A class for drawing polyline overlays on a map.
 */
const Polyline: React.FC<ExtendedPolylineProps> = ({
  label,
  labelStyle,
  showLabel = true,
  collisionDetection = true,
  ...polylineProps
}) => {
  const labelContext = useContext(StreetLabelContext);

  useEffect(() => {
    if (label && showLabel && labelContext && polylineProps.positions) {
      const id = polylineProps.id || generateUniqueId();

      // Convert positions to the correct format
      // If it's a MultiPolyline (array of arrays), just take the first line
      let normalizedPositions: L.LatLngExpression[];

      if (Array.isArray(polylineProps.positions[0]) &&
          Array.isArray((polylineProps.positions[0] as any)[0])) {
        // MultiPolyline - take first polyline
        normalizedPositions = (polylineProps.positions as L.LatLngExpression[][])[0];
      } else {
        // Single polyline
        normalizedPositions = polylineProps.positions as L.LatLngExpression[];
      }

      labelContext.registerPolyline({
        id,
        positions: normalizedPositions,
        label,
        labelStyle
      });

      return () => {
        labelContext.unregisterPolyline(id);
      };
    }
  }, [label, labelStyle, showLabel, polylineProps.positions, polylineProps.id, labelContext]);

  return <LeafletPolyline {...assignClickEventHandlers(polylineProps)} />;
};

export default Polyline;

// Previous implementation without street labels
// export default Polyline;
//
// import React, { useEffect, useRef } from 'react';
// import { Polyline as ReactLeafletPolyline } from 'react-leaflet';
// import { PolylineProps, assignClickEventHandlers, ClickComponent, Modify } from "../props";
//
// type Props = Modify<PolylineProps, ClickComponent>;
//
// /**
//  * A class for drawing polyline overlays on a map.
//  * Enhanced to properly handle prop updates.
//  */
// const Polyline = (props: Props) => {
//     const { positions, color, weight, opacity, dashArray, ...otherProps } = props;
//     const polylineRef = useRef<L.Polyline | null>(null);
//
//     // Force update when style properties change
//     const styleKey = `${color}-${weight}-${opacity}-${dashArray}`;
//
//     return (
//         <ReactLeafletPolyline
//             ref={polylineRef}
//             positions={positions}
//             pathOptions={{
//                 color: color,
//                 weight: weight,
//                 opacity: opacity,
//                 dashArray: dashArray
//             }}
//             {...assignClickEventHandlers(otherProps)}
//         />
//     );
// }
//
// export default Polyline;
