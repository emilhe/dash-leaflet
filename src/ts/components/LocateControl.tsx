import React, { Suspense } from 'react';
import {LocateControlProps as Props} from '../dash-props';

// eslint-disable-next-line no-inline-comments
const LazyLocateControl = React.lazy(() => import(/* webpackChunkName: "LocateControl" */ '../fragments/LocateControl'));

/**
 * A useful control to geolocate the user with many options. Official Leaflet and MapBox plugin.
 */
const LocateControl = (props: Props) => {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyLocateControl {...props} />
        </Suspense>
      </div>
    );
  }

export default LocateControl;