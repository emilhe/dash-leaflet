/* eslint no-magic-numbers: 0 */
import React, { Component } from 'react';

import { Map, TileLayer, SuperCluster, Marker } from '../lib';
//import LeafletMarkerClusterGroup from '../lib/LeafletMarkerClusterGroup';
import regeneratorRuntime from "regenerator-runtime";

var geojson = {"type": "FeatureCollection", "features": [
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10, 56]}, 
    "properties": {"cluster": false, "tooltip": "tooltip"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10, 57]}, 
    "properties": {"cluster": false, "popup": "popup"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10, 55]}, 
    "properties": {"cluster": false, "marker_options": {"opacity": 0.5}}}
    ]}

class App extends Component {

    constructor() {
        super();
        this.state = {
            value: ''
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        let positions = [[56,10], [56,10], [56,10], [56,10], [56,10], [56,11]];
        let features = positions.map((pos) => ({"type": "Feature", "geometry": {"type": "Point", "coordinates": [pos[1], pos[0]]}}));
        let geojson = {"type": "FeatureCollection", "features": features};
        let clusterOptions = {
            iconSize: 40,
            classNames: [
                {minCount: 0, className: "marker-cluster marker-cluster-small"},
                {minCount: 100, className: "marker-cluster marker-cluster-medium"},
                {minCount: 1000, className: "marker-cluster marker-cluster-large"},
            ]
        }
        return (
            <div>
                <Map
                    setProps={this.setProps} zoom={8} center={[56, 10]}
//                    setProps={this.setProps} zoom={8} center={[-37, 175]}
                    {...this.state}>
                        <TileLayer/>
                            <SuperCluster setProps={this.setProps} data={geojson} maxZoom={16} clusterOptions={clusterOptions}>
                            </SuperCluster>
                </Map>
            </div>
        )
    }
}

export default App;