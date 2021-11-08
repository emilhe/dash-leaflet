import { withLeaflet, MapLayer } from 'react-leaflet';

require("leaflet.minichart");


class LeafletMinichart extends MapLayer {

  createLeafletElement(props) {
    const center = this._parseCenter(props);
    const options = this._parseOptions(props);
    return new L.minichart(center, options);
  }

  updateLeafletElement(fromProps, toProps) {
    const fromOptions = this._parseOptions(fromProps);
    const toOptions = this._parseOptions(toProps);
    if (fromOptions !== toOptions) {
      this.leafletElement.setOptions(toOptions);
    }
  }

  _parseCenter(props) {
    return [props.lat, props.lon]
  }

  _parseOptions(props) {
    return {
      type: props.type,
      data: props.data,
      maxValues: props.maxValues,
      colors: props.colors,
      width: props.width,
      height: props.height,
      labels: props.labels,
      labelMinSize: props.labelMinSize,
      labelMaxSize: props.labelMaxSize,
      labelPadding: props.labelPadding,
      labelStyle: props.labelStyle,
      labelColor: props.labelColor,
      transitionTime: props.transitionTime,
    }
  }

}

export default withLeaflet(LeafletMinichart)
