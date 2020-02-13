import React, {Component} from 'react';
import PropTypes from 'prop-types';

import LeafletColorbar from '../LeafletColorbar';

/**
 * Colorbar is just a wrapper of LeafletColorbar.
 */
export default class Colorbar extends Component {
    render() {
        // We need to use the non-JSX syntax to avoid having to list all props
        const el = React.createElement(
            LeafletColorbar,
            this.props,
            this.props.children
        )

        return el
    }
}

Colorbar.propTypes = {
    /**
     * Position of the colorbar. One of 'topleft', 'topright', 'bottomleft', 'bottomright'
     */
    position: PropTypes.string,

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
    domainMin: PropTypes.number,

    /**
     * Domain maximum of the colorbar. Translates to the last color of the colorscale.
     */
    domainMax: PropTypes.number,

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
