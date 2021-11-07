import React, {Component} from 'react';
// eslint-disable-next-line import/no-named-as-default
import LeafletMeasure from '../LeafletMeasure';
import {propTypes, defaultProps} from '../components/MeasureControl.react';

/**
 * Measure is based on https://github.com/ljagis/leaflet-measure
 */
export default class MeasureControl extends Component {

    render() {
        return <LeafletMeasure {...this.props}/>
    }

}

MeasureControl.defaultProps = defaultProps;
MeasureControl.propTypes = propTypes;