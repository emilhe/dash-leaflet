import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletColorbar from '../LeafletColorbar';

/**
 * Colorbar is just a wrapper of LeafletColorbar.
 */
export default class Colorbar extends Component {
    render() {
        return <LeafletColorbar {...this.props}/>
    }
}

Colorbar.propTypes = {
    /**
     * Position of the colorbar.
     */
    position: PropTypes.oneOf(['topleft', 'topright', 'bottomleft', 'bottomright']),

    /**
     * Chroma-js colorscale. Either a colorscale name, e.g. "Viridis", or a list of colors,
     * e.g. ["black", "#fdd49e", "rgba(255,0,0,0.35)"].
     * The predefined colorscales are listed here:
     * https://github.com/gka/chroma.js/blob/master/src/colors/colorbrewer.js
     */
    colorscale: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),

    /**
     * Width of the colorbar. If width > height then the colorbar will be in horizontal mode.
     */
    width: PropTypes.number,

    /**
     * Height of the colorbar. If height > width then the colorbar will be in vertical mode.
     */
    height: PropTypes.number,

    /**
     * Domain minimum of the colorbar. Translates to the first color of the colorscale.
     */
    min: PropTypes.number,

    /**
     * Domain maximum of the colorbar. Translates to the last color of the colorscale.
     */
    max: PropTypes.number,

    /**
     * The number or positions of discrete classes in the colorbar. If not set the 
     * colorbar will be continuous, which is the default.
     */
    classes: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
    ]),

    /**
     * Optional text to append to the colorbar ticks.
     */
    unit: PropTypes.string,

    /**
     * Number of ticks on the colorbar. 
     */
    nTicks: PropTypes.number,

    /**
     * If set, fixes the tick decimal points to the given number.
     */
    tickDecimals: PropTypes.number,

    /**
     * If set, these values are used for ticks (rather than the ones genrated based on nTicks).
     */
    tickValues: PropTypes.arrayOf(PropTypes.number),

   /**
     * If set, this text will be used instead of the data values.
     */
    tickText: PropTypes.arrayOf(PropTypes.string),

    /**
     * If true, the value will be shown as tooltip on hover.
     */
    tooltip: PropTypes.bool,

    /**
     * Opacity of the colorbar. Use it to match the perceived colors from an overlay 
     * with opacity.
     */
    opacity: PropTypes.number,

    /**
     * HTML style object to add to the colorbar entity, e.g. to set font color.
     */
    style: PropTypes.object,

    // Standard parameters

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * The children of this component
     */
    children: PropTypes.node,

    /**
     * The class of the component
     */
    className: PropTypes.string
};
