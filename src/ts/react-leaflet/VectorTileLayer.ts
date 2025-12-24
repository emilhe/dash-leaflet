import {
    createElementObject,
    createLayerComponent,
    updateGridLayer,
    withPane,
    LeafletContextInterface,
} from '@react-leaflet/core'
import { default as leafletVectorTileLayer } from 'leaflet-vector-tile-layer'
import { DashFunction, Modify, resolveProps, TileLayerProps } from "../props";
import { GridLayer } from 'leaflet';

export type VectorTileLayerOptions = {
    /**
     * A function that will be passed a vector-tile feature, the layer
     * name, the number of SVG coordinate units per vector-tile unit
     * and the feature's style object to create each feature layer.
     */
    featureToLayer?: DashFunction; // default undefined

    /**
     * Options passed to the `fetch` function when fetching a tile.
     */
    fetchOptions?: object; // default undefined

    /**
     * A function that will be used to decide whether to include a
     * feature or not. If specified, it will be passed the vector-tile
     * feature, the layer name and the zoom level. The default is to
     * include all features.
     */
    filter?: DashFunction; // default undefined

    /**
     * A function that receives a list of vector-tile layer names and
     * the zoom level and returns the names in the order in which they
     * should be rendered, from bottom to top. The default is to render
     * all layers as they appear in the tile.
     */
    layerOrder?: DashFunction; // default undefined

    /**
     * An array of vector-tile layer names from bottom to top. Layers
     * that are missing from this list will not be rendered. The
     * default is to render all layers as they appear in the tile.
     */
    layers?: string[]; // default undefined

    /**
     * Specify zoom range in which tiles are loaded. Tiles will be
     * rendered from the same data for Zoom levels outside the range.
     */
    minDetailZoom?: number; // default undefined

    /**
     * Specify zoom range in which tiles are loaded. Tiles will be
     * rendered from the same data for Zoom levels outside the range.
     */
    maxDetailZoom?: number; // default undefined

    /**
     * Either a single style object for all features on all layers or a
     * function that receives the vector-tile feature, the layer name
     * and the zoom level and returns the appropriate style options.
     */
    style?: DashFunction | object; // default undefined

    /**
     * This works like the same option for `Leaflet.VectorGrid`.
     * Ignored if style is specified.
     */
    vectorTileLayerStyles?: object; // default undefined

    /**
     * Style function applied on hover. [MUTABLE, DL]
     */
    hoverStyle?: DashFunction | object; // default undefined

    /**
     * If true, the component will be interactive (clickable). [MUTABLE, DL]
     */
    interactive?: boolean; // default true
}

export type VectorTileLayerProps = Modify<TileLayerProps, {
    /**
     * The URL template in the form 'https://{s}.example.com/tiles/{z}/{x}/{y}.pbf'.
     */
    url?: string
}> & VectorTileLayerOptions

const _funcOptions = ["featureToLayer", "filter", "layerOrder", "style", "hoverStyle"]

function createVectorTileLayer(
    { url, ...options }: VectorTileLayerProps,
    context: LeafletContextInterface
) {
    const resolvedOptions = resolveProps({...options}, _funcOptions, context);
    // Set interactive to true by default for click events
    if (resolvedOptions.interactive === undefined) {
        resolvedOptions.interactive = true;
    }
    const layer = leafletVectorTileLayer(url, withPane(resolvedOptions, context))
    return createElementObject(layer, context)
}

function updateVectorTileLayer(
    layer: GridLayer,
    props: VectorTileLayerProps,
    prevProps: VectorTileLayerProps
) {
    updateGridLayer(layer, props, prevProps)
    const { url, style } = props

    // Update URL if changed
    if (url != null && url !== prevProps.url) {
        (layer as any).setUrl(url)
    }

    // Update style if changed (leaflet-vector-tile-layer supports setStyle)
    if (style !== prevProps.style && (layer as any).setStyle) {
        (layer as any).setStyle(style)
    }
}

// Use createLayerComponent which is more appropriate for layers with events
export const VectorTileLayer = createLayerComponent<
    GridLayer,
    VectorTileLayerProps
>(createVectorTileLayer, updateVectorTileLayer)
