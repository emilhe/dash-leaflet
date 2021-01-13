import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletFullscreenControl from 'react-leaflet-fullscreen';

/**
 * Thin wrapper of https://github.com/krvital/react-leaflet-fullscreen. Requires linking font-awesome, i.e. app =
 * dash.Dash(external_stylesheets=['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'])
 * */
export default class FullscreenControl extends Component {

    render() {
        const nProps = Object.assign({}, this.props);
        nProps.content = "<i class='fa fa-expand'></i>"; // "<i class=\"fa fa-icon-fullscreen\"></i>"; // TODO: Make content customizable?
        return <LeafletFullscreenControl {...nProps}/>;
    }

}

FullscreenControl.propTypes = {

     /**
     * Position.
     */
    position: PropTypes.oneOf(['topleft', 'topright', 'bottomleft', 'bottomright']),

    /**
     * Title of the button, default Full Screen.
     */
    title: PropTypes.string,

    /**
     * Title of the button when fullscreen is on, default Exit Full Screen.
     */
    titleCancel: PropTypes.string,

    /**
     * Force separate button to detach from zoom buttons, default false.
     */
    forceSeparateButton: PropTypes.bool,

    /**
     * Force use of pseudo full screen even if full screen API is available, default false.
     */
    forcePseudoFullscreen: PropTypes.bool,

    /**
     * Dom element to render in full screen, false by default, fallback to map._container.
     */
    fullscreenElement: PropTypes.bool,

    //content: null | HTMLElement // content of the button, can be HTML, default null

};
