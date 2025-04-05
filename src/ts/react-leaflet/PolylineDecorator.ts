import { createElementObject, createPathComponent, extendContext } from "@react-leaflet/core";
import "leaflet-polylinedecorator";
import * as L from "leaflet";
import { ReactNode } from "react";

export type PolylineDecoratorProps = {
    /**
     * An array of geographical points (lat, lon)
     */
    positions?: number[][] | number[][][],

    /**
     * The children of this component. If positions are not specified, an attempt is made to read them from the
     * children property. In this case, the children must be a single PolyLine or a single Polygon.
     */
    children?: ReactNode

    /**
     * List of patterns to be added.
     */
    patterns: {
        // Options of the pattern itself.
        offset: string,
        endOffset: string,
        repeat: string,
        // What to draw; either dashes, arrow heads or (arbitrary) makers.
        dash: {
            pixelSize: number,
            pathOptions: object
        },
        arrowHead: {
            polygon: boolean,
            pixelSize: number,
            headAngle: number,
            pathOptions: object
        },
        marker: {
            markerOptions: object,
            rotate: boolean
        }
    }[]
}

function _parsePatterns(props) {
    const patterns = [];
    let pattern;
    for (pattern of props.patterns) {
        if ("dash" in pattern) {
            patterns.push({ symbol: (L as any).Symbol.dash(pattern.dash), ...pattern })
        }
        if ("arrowHead" in pattern) {
            patterns.push({ symbol: (L as any).Symbol.arrowHead(pattern.arrowHead), ...pattern })
        }
        if ("marker" in pattern) {
            patterns.push({ symbol: (L as any).Symbol.marker(pattern.marker), ...pattern })
            if ("markerOptions" in pattern.marker && "icon" in pattern.marker.markerOptions) {
                pattern.marker.markerOptions.icon = L.icon({ ...pattern.marker.markerOptions.icon })
            }
        }
    }
    return patterns
}

function _parsePositions(props) {
    let paths = props.positions;
    if (!paths) {
        const child = (window as any).dash_component_api.getLayout(props.children.props.componentPath)
        if (child.type === "Polygon") {
            paths = L.polygon(child.props.positions, { ...child.props })
        }
        if (child.type === "Polyline") {
            paths = L.polyline(child.props.positions, { ...child.props })
        }
    }
    return paths;
}

export const PolylineDecorator = createPathComponent<L.PolylineDecorator, PolylineDecoratorProps>(
    function createLeafletElement(props, context) {
        const patterns = _parsePatterns(props);
        const paths = _parsePositions(props);
        const polylineDecorator = L.polylineDecorator(paths, { patterns: patterns });
        return createElementObject(
            polylineDecorator,
            extendContext(context, { overlayContainer: polylineDecorator }),
        )
    },
    function updateLeafletElement(instance, props, prevProps) {
        if (props.patterns !== prevProps.patterns) {
            const patterns = _parsePatterns(props);
            instance.setPatterns(patterns);  // TODO: FIX THIS ONE
        }
        if (props.positions !== prevProps.positions || props.children !== prevProps.children) {
            const paths = _parsePositions(props);
            instance.setPaths(paths);  // TODO: FIX THIS ONE
        }
    }
)
