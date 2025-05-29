// src/ts/components/StreetLabelProvider.tsx
import React from 'react';
import { StreetLabelProvider as Provider } from './StreetLabels/StreetLabelContext';
import { DashComponent, Modify } from '../props';

type Props = Modify<{
  /**
   * The child components of this element
   */
  children?: React.ReactNode;

  /**
   * Enable collision detection for labels to prevent overlapping
   */
  collisionDetection?: boolean;
}, DashComponent>;

/**
 * StreetLabelProvider enables street label functionality for Polyline and AntPath components.
 * Wrap your map components with this provider to enable label rendering along paths.
 */
const StreetLabelProvider = (props: Props) => {
  return (
    <Provider collisionDetection={props.collisionDetection}>
      {props.children}
    </Provider>
  );
};

export default StreetLabelProvider;