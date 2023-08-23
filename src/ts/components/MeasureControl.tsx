import React, { Suspense } from 'react';
import {MeasureControlOptions} from '../react-leaflet/MeasureControl';
import {DashComponent, Modify, unDashify} from "../dash-extensions-js";
import {EventComponent} from "../events";

// eslint-disable-next-line no-inline-comments
const LazyMeasureControl = React.lazy(() => import(/* webpackChunkName: "MeasureControl" */ '../fragments/MeasureControl'));

type Props = Modify<MeasureControlOptions, DashComponent>;

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