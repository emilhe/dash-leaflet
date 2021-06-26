import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { FeatureGroup as LeafletFeatureGroup } from 'react-leaflet';

/**
 * FeatureGroup is a wrapper of FeatureGroup in react-leaflet.
 * It takes similar properties to its react-leaflet counterpart.
 */
export default class FeatureGroup extends Component {
    render() {
        return <LeafletFeatureGroup {...this.props} />
    }
}

FeatureGroup.propTypes = {

    /**
     * Attribution
     */
    attribution: PropTypes.string,

    /**
     * Children
     */
    children: PropTypes.node,

    /**
     * A custom class name. Empty by default.
     */
    className: PropTypes.string,

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    // Events
    setProps: PropTypes.func,

};
