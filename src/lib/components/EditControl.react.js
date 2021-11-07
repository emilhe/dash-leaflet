import React, { Suspense } from 'react';
import PropTypes from "prop-types";

// eslint-disable-next-line no-inline-comments
const LazyEditControl = React.lazy(() => import(/* webpackChunkName: "editControl" */ '../fragments/EditControl.react'));

const EditControl = (props) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyEditControl {...props} />
      </Suspense>
    </div>
  );
}

EditControl.defaultProps = {
    action: {n_actions: 0},
    geojson: {type: "FeatureCollection", features: []}
};

EditControl.propTypes = {

    /**
     * The position of this component.
     */
    position: PropTypes.oneOf(["topleft", "topright", "bottomleft", "bottomright"]),

    /**
     * Enable/disable draw controls. See example of usage here https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config
     */
    draw: PropTypes.object,

    /**
     * Enable/disable edit controls. See example of usage here https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config
     */
    edit: PropTypes.object,

    // Custom properties.

    /**
     * Fires on every action.
     */
    action: PropTypes.object,

    /**
     * Change this prop to manipulate the drawing toolbar, i.e. to change modes and/or invoke actions.
    */
    drawToolbar: PropTypes.shape({
        mode: PropTypes.oneOf(["marker", "polygon", "polyline", "rectangle", "circle", "circlemarker"]),
        action: PropTypes.oneOf(["cancel", "finish", "delete last point"]),  // Optionally, invoke an action
        n_clicks: PropTypes.number,
    }),

    /**
     * Change this prop to manipulate the edit toolbar, i.e. to change modes and/or invoke actions.
     */
    editToolbar: PropTypes.shape({
        mode: PropTypes.oneOf(["edit", "remove"]),
        action: PropTypes.oneOf(["save", "cancel", "clear all"]),  // Optionally, invoke an action
        n_clicks: PropTypes.number,
    }),

    /**
     * Geojson representing the current features.
     */
    geojson: PropTypes.object,

    // Raw events.

    /**
     * Hook to leaflet-draw's draw:mounted event.
     */
    onMounted: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:drawvertex event.
     */
    onDrawVertex: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:editmove event.
     */
    onEditMove: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:editresize event.
     */
    onEditResize: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Hook to leaflet-draw's draw:editvertex event.
     */
    onEditVertex: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    // Dash stuff.

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

    // Events
    setProps: PropTypes.func,

};

export default EditControl;
export const propTypes = EditControl.propTypes;
export const defaultProps = EditControl.defaultProps;
