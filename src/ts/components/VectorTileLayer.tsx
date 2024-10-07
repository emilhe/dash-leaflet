import React, { Suspense } from 'react';
import {LoadComponent} from "../props";
import { VectorTileLayerProps } from 'react-leaflet/VectorTileLayer';
import {omit} from '../utils';

// eslint-disable-next-line no-inline-comments
const LazyVectorTileLayer = React.lazy(() => import(/* webpackChunkName: "VectorTileLayer" */ '../fragments/VectorTileLayer'));

// TODO: Update with event handlers?
type Props = VectorTileLayerProps & LoadComponent;

/**
 * Used to load and display vector tile layers on the map. Note that most tile servers require attribution.
 */
const VectorTileLayer = ({...props}: Props) => {
    // TODO: Do we need any of this?
    // // Legacy injection of properties via options.
    // const nProps: Props = Object.assign(options, props)
    // // Add event handlers.
    // const defaultEventHandlers = props.disableDefaultEventHandlers ? {} : _getDefaultEventHandlers(props);
    // const customEventHandlers = (props.eventHandlers == undefined) ? {} : resolveAllProps(props.eventHandlers, props);
    // nProps.eventHandlers = mergeEventHandlers(defaultEventHandlers, customEventHandlers)
    // Render the component.
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyVectorTileLayer
                 {...props}></LazyVectorTileLayer>
        </Suspense>
    )
}

export default VectorTileLayer;
