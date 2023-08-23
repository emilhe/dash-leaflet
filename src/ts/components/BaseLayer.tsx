import {DashComponent, Modify} from "../dash-extensions-js";
import {BaseLayerProps} from "../dash-props"

type Props = Modify<BaseLayerProps, DashComponent>;

/**
 * BaseLayer is a wrapper of LayersControl.BaseLayer in react-leaflet. It takes similar properties to its react-leaflet counterpart.
 */
const BaseLayer = (props: Props) => {return null;}

export default BaseLayer;
