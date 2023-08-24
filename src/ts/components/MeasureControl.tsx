import React, { Suspense } from 'react';
import {MeasureControlProps} from '../react-leaflet/MeasureControl';
import {DashComponent, Modify} from "../props";

// eslint-disable-next-line no-inline-comments
const LazyMeasureControl = React.lazy(() => import(/* webpackChunkName: "MeasureControl" */ '../fragments/MeasureControl'));

type Props = Modify<MeasureControlProps, DashComponent>;

/**
 * Coordinate, linear, and area measure control for Leaflet maps.
 */
const MeasureControl = ({
    // Set default to OSM
    primaryLengthUnit = "meters",
    primaryAreaUnit = "sqmeters",
    ...props
}: Props) => {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyMeasureControl primaryLengthUnit={primaryLengthUnit} primaryAreaUnit={primaryAreaUnit} {...props} />
        </Suspense>
      </div>
    );
  }

export default MeasureControl;