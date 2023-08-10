import React, { Suspense } from 'react';
import {EditControlProps as Props} from '../dash-props';

// eslint-disable-next-line no-inline-comments
const LazyEditControl = React.lazy(() => import(/* webpackChunkName: "EditControl" */ '../fragments/EditControl'));

/**
 * EditControl is based on https://github.com/alex3165/react-leaflet-draw/
 */
const EditControl = ({position='topright', draw={}, edit={}, ...props}: Props) => {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyEditControl position={position} draw={draw} edit={edit} {...props} />
        </Suspense>
      </div>
    );
  }

export default EditControl;