import React, { Suspense } from 'react';
import {LoadComponent, resolveAllProps} from "../props";
import { VectorTileLayerProps } from 'react-leaflet/VectorTileLayer';
import {mergeEventHandlers} from '../utils';


// eslint-disable-next-line no-inline-comments
const LazyVectorTileLayer = React.lazy(() => import(/* webpackChunkName: "VectorTileLayer" */ '../fragments/VectorTileLayer'));

// TODO: Consider adding default event props (click, ...)?
type Props = VectorTileLayerProps & LoadComponent;

/**
 * Used to load and display vector tile layers on the map. Note that most tile servers require attribution.
 */
const VectorTileLayer = ({...props}: Props) => {
    const nProps: Props = Object.assign({}, props)
    // Add event handlers.
    const defaultEventHandlers = props.disableDefaultEventHandlers ? {} : _getDefaultEventHandlers(props);
    const customEventHandlers = (props.eventHandlers == undefined) ? {} : resolveAllProps(props.eventHandlers, props);
    nProps.eventHandlers = mergeEventHandlers(defaultEventHandlers, customEventHandlers)
    // Render the component.
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyVectorTileLayer
                 {...props}></LazyVectorTileLayer>
        </Suspense>
    )
}

function _getDefaultEventHandlers(props: Props) {
    // TODO: Consider adding default event handlers?
    return {}
}

export default VectorTileLayer;
