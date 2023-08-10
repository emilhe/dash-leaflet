import React, { Suspense } from 'react';
import {MeasureControlProps as Props} from '../dash-props';
import {unDashify} from "../utils";

// eslint-disable-next-line no-inline-comments
const LazyMeasureControl = React.lazy(() => import(/* webpackChunkName: "MeasureControl" */ '../fragments/MeasureControl'));

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
          <LazyMeasureControl primaryLengthUnit={primaryLengthUnit} primaryAreaUnit={primaryAreaUnit} {...unDashify(props)} />
        </Suspense>
      </div>
    );
  }

export default MeasureControl;