import React, { Suspense } from 'react';
import PropTypes from "prop-types";

// eslint-disable-next-line no-inline-comments
const LazyMarkerClusterGroup = React.lazy(() => import(/* webpackChunkName: "markerClusterGroup" */ '../fragments/MarkerClusterGroup.react'));

const MarkerClusterGroup = (props) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyMarkerClusterGroup {...props} />
      </Suspense>
    </div>
  );
}

MarkerClusterGroup.propTypes = {

    /**
     * The children of this component (dynamic)
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
     * Marker cluster group options (a dict). See list of options here
     * https://github.com/Leaflet/Leaflet.markercluster#all-options
     */
    options: PropTypes.object,


    // Events
    setProps: PropTypes.func,

};

export default MarkerClusterGroup;
export const propTypes = MarkerClusterGroup.propTypes;
