import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-inline-comments
const LazyMinichart = React.lazy(() => import(/* webpackChunkName: "minichart" */ '../fragments/Minichart.react'));

const Minichart = (props) => {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyMinichart {...props} />
        </Suspense>
      </div>
    );
  }

Minichart.propTypes = {

    /**
     * Latitude of the minichart
     */
    lat: PropTypes.number.isRequired,
    /**
     * Latitude of the minichart
     */
    lon: PropTypes.number.isRequired,
    /**
     * Type of chart to create.
     * Possible values are "bar" for barcharts, "pie" for pie charts, "polar-radius" and "polar-area"
     * for polar area charts where values are represented either by the radius or the area of the slices.
     */
    type: PropTypes.string,
    /**
     * Data values the chart has to represent.
     */
    data: PropTypes.arrayOf(PropTypes.number),
    /**
     * Maximal absolute value the data could take.
     * It can be a single numeric value or an array of values with same length as data.
     * In the first case, all values will be represented with the same scale while in the second case,
     * each value will have its own scale. This is useful when one wants to represent multiple variables
     * that are not comparable. If it equals to "auto" (the default) then the maximum absolute value in data is used.
     */
    maxValues: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.oneOf(["auto"])
    ]),
    /**
     * Array of colors. If its length is less than the length of data, colors are recycled.
     */
    colors: PropTypes.arrayOf(PropTypes.string),
    /**
     * Width of the chart when `type` equals 'bar' or maximal diameter of the chart for all other types.
     */
    width: PropTypes.number,
    /**
     * Maximal height of barcharts.
     */
    height: PropTypes.number,
    /**
     * Labels to display on the chart. If it equals to "auto" then data values are displayed in a compact way.
     */
    labels: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.oneOf(["none", "auto"])
    ]),
    /**
     * Labels are automatically hidden if the label height is less than this number.
     */
    labelMinSize: PropTypes.number,
    /**
     * Maximal height of labels in pixels.
     */
    labelMaxSize: PropTypes.number,
    /**
     * Padding to apply to labels.
     */
    labelPadding: PropTypes.number,
    /**
     * CSS style to apply to labels
     */
    labelStyle: PropTypes.string,
    /**
     * Color to apply to labels. If "auto", text will be black or white depending on the background color.
     */
    labelColor: PropTypes.string,
    /**
     * Duration in millisecondq of transitions.
     */
    transitionTime: PropTypes.number,

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    // Events
    setProps: PropTypes.func,

};

export default Minichart;
export const propTypes = Minichart.propTypes;
