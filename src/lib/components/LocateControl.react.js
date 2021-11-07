import React, {Suspense} from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-inline-comments
const LazyLocateControl = React.lazy(() => import(/* webpackChunkName: "locateControl" */ '../fragments/LocateControl.react'));

const LocateControl = (props) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyLocateControl {...props} />
      </Suspense>
    </div>
  );
}

LocateControl.propTypes = {

    /**
     * The children of this component (dynamic).
     */
    children: PropTypes.node,

    /**
     * A custom class name to assign to the image. Empty by default.
     */
    className: PropTypes.string,

    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

     /**
     * If true, the location control is activated on map load.
     */
    startDirectly: PropTypes.bool,

    /**
     * Location control options (a dict). See list of options in the code,
     * https://github.com/domoritz/leaflet-locatecontrol/blob/gh-pages/src/L.Control.Locate.js#L146
     */
    options: PropTypes.object,

};

export default LocateControl;
export const propTypes = LocateControl.propTypes;
