import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LeafletMeasure from '../LeafletMeasure';

/**
 * Measure is based on https://github.com/ljagis/leaflet-measure
 */
export default class Measure extends Component {

    render() {
        const nProps = Object.assign({}, this.props);
        nProps.action = () => {
            this.props.setProps({n_clicks: this.props.n_clicks + 1});
        };
        return <LeafletMeasure {...nProps}/>
    }

}

Measure.defaultProps = {
    n_clicks: 0
};

Measure.propTypes = {

    /**
     * The icon to show, e.g. 'fa-globe' from "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
     */
    icon: PropTypes.string.isRequired,

    // Dash stuff

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

    /**
     * Dash callback property. Number of times the object has been clicked
     */
    n_clicks: PropTypes.number

};
