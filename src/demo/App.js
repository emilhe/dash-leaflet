/* eslint no-magic-numbers: 0 */
import React, { Component } from 'react';

import {LayersControl, Map, TileLayer} from '../lib';
import BaseLayer from "../lib/components/BaseLayer.react";
//import LeafletMarkerClusterGroup from '../lib/LeafletMarkerClusterGroup';
// import regeneratorRuntime from "regenerator-runtime";
// import GeoJSON2 from "../lib/components/GeoJSON2.react";

// var geojson = {"type": "FeatureCollection", "features": [
//     {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10, 56]},
//     "properties": {"cluster": false, "tooltip": "tooltip"}},
//         {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10, 57]},
//     "properties": {"cluster": false, "popup": "popup"}},
//             {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10, 55]},
//     "properties": {"cluster": false, "marker_options": {"opacity": 0.5}}}
//     ]}
//
//
// window.dash_clientside = Object.assign({}, window.dash_clientside, {
//     clientside: {
//         hest(feature, latlng) {
//             return L.marker(latlng);
//         }
//     }
// });


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

        //    let pointToLayer = new Function(
        // "return function " + this.props.pointToLayer + "(){ alert('sweet!')}"
        //    )();
        //
        //    pointToLayer();

        // console.log(window.dash_clientside.clientside.hest);
        // let a = hest();

        // const pos = [37.8, 50]; // (-37.8, 175.3)
        // let positions = []; //[[56,10], [56,10], [56,10], [56,10], [56,10]];
        // for(let i =0; i < 100; i++){
        //     positions.push(pos)
        // }
        // let features = positions.map((pos) => ({"type": "Feature", "geometry": {"type": "Point", "coordinates": [pos[1], pos[0]]}}));
        // let geojson = {"type": "FeatureCollection", "features": features};
        // let clusterOptions = {
        //     iconSize: 40,
        //     classNames: [
        //         {minCount: 0, className: "marker-cluster marker-cluster-small"},
        //         {minCount: 100, className: "marker-cluster marker-cluster-medium"},
        //         {minCount: 1000, className: "marker-cluster marker-cluster-large"},
        //     ]
        // }
        return (
            <div>
                <Map setProps={this.setProps} zoom={8} center={[56, 10]}>
                    <LayersControl>
                        <BaseLayer name={"Tiles"} checked={true}>
                            <TileLayer/>
                        </BaseLayer>
                        <BaseLayer name={"Tiles2"} checked={false}>
                            <TileLayer/>
                        </BaseLayer>
                    </LayersControl>
                </Map>
            </div>
        )
    }
}

export default App;