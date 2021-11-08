import React, { Component } from "react"
import { propTypes } from '../components/Minichart.react';

import LeafletMinichart from "../LeafletMinichart"


/**
 * Minichart is a wrapper of leaflet.minichart.
 */
export default class Minichart extends Component {
    render() {
        return <LeafletMinichart {...this.props}/>
    }
}

Minichart.propTypes = propTypes;
