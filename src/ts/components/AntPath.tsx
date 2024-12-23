import React from 'react';
import { createLayerComponent } from '@react-leaflet/core';
import { assignEventHandlers, unDashify } from "../props";
import { LayerProps } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet-ant-path';

// Extend PathOptions to include AntPath specific options
declare module 'leaflet' {
    interface PathOptions {
        pulseColor?: string;
        delay?: number;
        hardwareAccelerated?: boolean;
        paused?: boolean;
        reverse?: boolean;
    }

    namespace Polyline {
        class AntPath extends L.Polyline {
            constructor(path: L.LatLngExpression[] | L.LatLngExpression[][], options?: PathOptions);
            pause(): boolean;
            resume(): boolean;
            reverse(): this;
            map(callback: (latlng: L.LatLng) => L.LatLng): AntPath;
            setStyle(options: PathOptions): this;
        }
    }
    namespace polyline {
        function antPath(path: L.LatLngExpression[] | L.LatLngExpression[][], options?: PathOptions): L.Polyline.AntPath;
    }
}

type Props = {
    /**
     * The ID used to identify this component.
     */
    id?: string;

    /**
     * Array of [lat,lng] points defining the path.
     */
    positions: L.LatLngExpression[] | L.LatLngExpression[][];

    /**
     * Animation delay in milliseconds.
     */
    delay?: number;

    /**
     * Size of the animated dashes [dash_size, gap_size].
     */
    dashArray?: [number, number] | string;

    /**
     * Color of the animated dash flow.
     */
    pulseColor?: string;

    /**
     * Base color of the path.
     */
    color?: string;

    /**
     * Width of the path in pixels.
     */
    weight?: number;

    /**
     * Whether the animation starts paused.
     */
    paused?: boolean;

    /**
     * Whether to reverse animation direction.
     */
    reverse?: boolean;

    /**
     * Whether to use hardware acceleration.
     */
    hardwareAccelerated?: boolean;

    /**
     * Whether the path should respond to mouse/touch events.
     */
    interactive?: boolean;

    /**
     * Optional child components like popups or tooltips.
     */
    children?: React.ReactNode;

    /**
     * Number of times the path has been clicked.
     */
    n_clicks?: number;

    /**
     * Data from the latest click event.
     */
    clickData?: object;

    /**
     * Dash callback to update props.
     */
    setProps?: (props: Record<string, any>) => void;
} & LayerProps;

/**
 * AntPath is a component that creates animated polylines with a marching-ants effect.
 * Perfect for visualizing routes or paths with a dynamic flow animation.
 */
const AntPath = createLayerComponent<L.Polyline.AntPath, Props>(
    function createAntPath({ positions, ...options }, ctx) {
        const defaultOptions = {
            delay: 400,
            dashArray: [10, 20] as [number, number],
            weight: 5,
            color: "#0000FF",
            pulseColor: "#FFFFFF",
            paused: false,
            reverse: false,
            hardwareAccelerated: true
        };

        const antPathOptions = {
            ...defaultOptions,
            ...unDashify(options)
        };

        const instance = new L.Polyline.AntPath(positions, {
            ...antPathOptions,
            interactive: options.interactive !== false
        });

        return {
            instance,
            context: { ...ctx, overlayContainer: instance }
        };
    },

    function updateAntPath(layer, props, prevProps) {
        if (props.positions !== prevProps.positions) {
            layer.setLatLngs(props.positions);
        }

        // Create a single style update object
        const styleUpdates: L.PathOptions = {};

        if (props.color !== prevProps.color) {
            styleUpdates.color = props.color;
        }
        if (props.pulseColor !== prevProps.pulseColor) {
            styleUpdates.pulseColor = props.pulseColor;
        }
        if (props.weight !== prevProps.weight) {
            styleUpdates.weight = props.weight;
        }
        if (props.dashArray !== prevProps.dashArray) {
            styleUpdates.dashArray = props.dashArray;
        }
        if (props.delay !== prevProps.delay) {
            styleUpdates.delay = props.delay;
        }

        // Apply style updates if there are any
        if (Object.keys(styleUpdates).length > 0) {
            layer.setStyle(styleUpdates);
        }

        // Handle pause/resume
        if (props.paused !== prevProps.paused) {
            if (props.paused) {
                layer.pause();
            } else {
                layer.resume();
            }
        }

        // Handle reverse
        if (props.reverse !== prevProps.reverse) {
            layer.reverse();
        }
    }
);

export default AntPath;