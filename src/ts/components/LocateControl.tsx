import React, { Suspense } from 'react';
import {DashComponent, Modify} from '../dash-extensions-js'
import {LocateControlProps} from "../react-leaflet/LocateControl";

// eslint-disable-next-line no-inline-comments
const LazyLocateControl = React.lazy(() => import(/* webpackChunkName: "LocateControl" */ '../fragments/LocateControl'));

type Props = Modify<LocateControlProps, DashComponent>;

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