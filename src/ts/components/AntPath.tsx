import React, { useEffect, useRef, useContext, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet-ant-path';
import { useMap } from 'react-leaflet';
import { PolylineProps, assignClickEventHandlers, ClickComponent, Modify } from "../props";
import { StreetLabelContext } from './StreetLabels/StreetLabelContext';
import { LabelStyle } from './StreetLabels/TextPathRenderer';

// Extend window to include L with antPath
declare global {
    interface Window {
        L: typeof L & {
            Polyline: {
                AntPath: new (latlngs: L.LatLngExpression[] | L.LatLngExpression[][], options?: any) => any;
            };
        };
    }
}

// Generate unique ID for components without explicit IDs
let idCounter = 0;
const generateUniqueId = () => `antpath-${Date.now()}-${idCounter++}`;

type Props = Modify<PolylineProps, {
    /**
     * Whether the animation is paused. [MUTABLE]
     */
    paused?: boolean;

    /**
     * Whether to reverse the animation direction. [MUTABLE]
     */
    reverse?: boolean;

    /**
     * Whether to use hardware acceleration.
     */
    hardwareAccelerated?: boolean;

    /**
     * The color of the animated pulse. [MUTABLE]
     */
    pulseColor?: string;

    /**
     * Animation delay in milliseconds. [MUTABLE]
     */
    delay?: number;

    /**
     * The pattern of dashes and gaps [dashSize, gapSize]. [MUTABLE]
     */
    dashArray?: number[] | string;

    /**
     * Path options for styling. [MUTABLE]
     */
    pathOptions?: any;

    // Street label props
    /**
     * Text to display along the path
     */
    label?: string;

    /**
     * Styling options for the label
     */
    labelStyle?: LabelStyle;

    /**
     * Whether to show the label
     */
    showLabel?: boolean;

    /**
     * Enable collision detection for labels
     */
    collisionDetection?: boolean;
} & ClickComponent>;

/**
 * AntPath creates animated polylines with a marching-ants effect.
 * Based on leaflet-ant-path plugin with added street label support.
 */
const AntPath = ({
    positions,
    paused = false,
    reverse = false,
    hardwareAccelerated = true,
    pulseColor = '#FFFFFF',
    delay = 400,
    dashArray = [10, 20],
    color = '#3388ff',
    weight = 5,
    opacity = 0.5,
    pathOptions = {},
    label,
    labelStyle,
    showLabel = true,
    collisionDetection = true,
    ...props
}: Props) => {
    const map = useMap();
    const antPathRef = useRef<any>(null);
    const labelContext = useContext(StreetLabelContext);

    // Use stable ID
    const componentId = useMemo(() => props.id || generateUniqueId(), [props.id]);

    // Memoize positions to avoid unnecessary rerenders
    const positionsKey = useMemo(() => JSON.stringify(positions), [positions]);

    // Register label with context
    useEffect(() => {
        if (label && showLabel && labelContext && positions) {
            // Convert positions to the correct format
            let normalizedPositions: L.LatLngExpression[];

            if (Array.isArray(positions[0]) &&
                Array.isArray((positions[0] as any)[0])) {
                // MultiPolyline - take first polyline
                normalizedPositions = (positions as L.LatLngExpression[][])[0];
            } else {
                // Single polyline
                normalizedPositions = positions as L.LatLngExpression[];
            }

            labelContext.registerPolyline({
                id: componentId,
                positions: normalizedPositions,
                label: label,
                labelStyle: labelStyle
            });

            return () => {
                labelContext.unregisterPolyline(componentId);
            };
        }
    }, [label, labelStyle, showLabel, positionsKey, labelContext, componentId]);

    // Create the AntPath instance (only when map or positions change)
    useEffect(() => {
        if (!map || !window.L?.Polyline?.AntPath) {
            console.warn('AntPath: Map or L.Polyline.AntPath not available');
            return;
        }

        // Combine all options
        const options = {
            color,
            weight,
            opacity,
            paused,
            reverse,
            hardwareAccelerated,
            pulseColor,
            delay,
            dashArray,
            ...pathOptions
        };

        try {
            // Create new AntPath instance
            const antPath = new window.L.Polyline.AntPath(positions, options);

            // Add click handlers
            const handlers = assignClickEventHandlers(props);
            if (handlers.eventHandlers) {
                Object.entries(handlers.eventHandlers).forEach(([event, handler]) => {
                    antPath.on(event, handler as L.LeafletEventHandlerFn);
                });
            }

            // Add to map
            antPath.addTo(map);
            antPathRef.current = antPath;

        } catch (error) {
            console.error('Error creating AntPath:', error);
        }

        // Cleanup
        return () => {
            if (antPathRef.current && map.hasLayer(antPathRef.current)) {
                map.removeLayer(antPathRef.current);
            }
            antPathRef.current = null;
        };
    }, [map, positionsKey]); // Only recreate when map or positions change

    // Update animation properties
    useEffect(() => {
        if (!antPathRef.current) return;

        // Handle pause/resume
        if (paused && antPathRef.current.pause) {
            antPathRef.current.pause();
        } else if (!paused && antPathRef.current.resume) {
            antPathRef.current.resume();
        }
    }, [paused]);

    useEffect(() => {
        if (!antPathRef.current) return;

        // Handle reverse
        if (reverse && antPathRef.current.reverse) {
            antPathRef.current.reverse();
        }
    }, [reverse]);

    // Update style properties
    useEffect(() => {
        if (!antPathRef.current || !antPathRef.current.setStyle) return;

        const styleOptions: any = {};

        if (color !== undefined) styleOptions.color = color;
        if (weight !== undefined) styleOptions.weight = weight;
        if (opacity !== undefined) styleOptions.opacity = opacity;
        if (pulseColor !== undefined) styleOptions.pulseColor = pulseColor;
        if (delay !== undefined) styleOptions.delay = delay;
        if (dashArray !== undefined) styleOptions.dashArray = dashArray;

        // Apply pathOptions if provided
        if (pathOptions && Object.keys(pathOptions).length > 0) {
            Object.assign(styleOptions, pathOptions);
        }

        if (Object.keys(styleOptions).length > 0) {
            try {
                antPathRef.current.setStyle(styleOptions);
            } catch (error) {
                console.error('Error updating AntPath style:', error);
            }
        }
    }, [color, weight, opacity, pulseColor, delay, dashArray, pathOptions]);

    // Update event handlers when needed
    useEffect(() => {
        if (!antPathRef.current) return;

        // Create stable event handler reference
        const handlers = assignClickEventHandlers(props);

        // Clear all existing event listeners
        antPathRef.current.clearAllEventListeners?.();

        // Add new handlers
        if (handlers.eventHandlers) {
            Object.entries(handlers.eventHandlers).forEach(([event, handler]) => {
                antPathRef.current.on(event, handler as L.LeafletEventHandlerFn);
            });
        }
    }, [props.n_clicks, props.n_dblclicks, props.eventHandlers, props.disableDefaultEventHandlers]);

    // This component doesn't render anything itself - Leaflet handles the rendering
    return null;
};

export default AntPath;