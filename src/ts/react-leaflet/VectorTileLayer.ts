import {
    createElementObject,
    createTileLayerComponent,
    updateGridLayer,
    withPane,
} from '@react-leaflet/core'
import { default as leafletVectorTileLayer } from 'leaflet-vector-tile-layer'
import { DashFunction, Modify, resolveProps, TileLayerProps } from "../props";
import { TileLayer } from 'leaflet';

export type VectorTileLayerOptions = {
    /**
     * A function that will be passed a vector-tile feature, the layer
     * name, the number of SVG coordinate units per vector-tile unit
     * and the feature's style object to create each feature layer.
     * This gives full control over the SVG DOM created for vector tile features.
     * [MUTABLE, DL]
     */
    featureToLayer?: DashFunction;

    /**
     * Options passed to the `fetch` function when fetching a tile.
     * Useful for adding headers or other fetch configurations.
     * [MUTABLE, DL]
     */
    fetchOptions?: object;

    /**
     * A function that will be used to decide whether to include a
     * feature or not. If specified, it will be passed the vector-tile
     * feature, the layer name and the zoom level. The default is to
     * include all features.
     * [MUTABLE, DL]
     */
    filter?: DashFunction;

    /**
     * A function that receives a list of vector-tile layer names and
     * the zoom level and returns the names in the order in which they
     * should be rendered, from bottom to top. The default is to render
     * all layers as they appear in the tile.
     * [MUTABLE, DL]
     */
    layerOrder?: DashFunction;

    /**
     * An array of vector-tile layer names from bottom to top. Layers
     * that are missing from this list will not be rendered. The
     * default is to render all layers as they appear in the tile.
     * [MUTABLE, DL]
     */
    layers?: string[];

    /**
     * Minimum zoom level for loading tiles. Tiles will be rendered
     * from the same data for zoom levels below this. Unlike minNativeZoom,
     * this maintains consistent stroke weight across all zoom levels.
     * [MUTABLE, DL]
     */
    minDetailZoom?: number;

    /**
     * Maximum zoom level for loading tiles. Tiles will be rendered
     * from the same data for zoom levels above this. Unlike maxNativeZoom,
     * this maintains consistent stroke weight across all zoom levels.
     * [MUTABLE, DL]
     */
    maxDetailZoom?: number;

    /**
     * Either a single style object for all features on all layers or a
     * function that receives the vector-tile feature, the layer name
     * and the zoom level and returns the appropriate style options.
     * This provides maximum styling flexibility.
     * [MUTABLE, DL]
     */
    style?: DashFunction;

    /**
     * Style object organized by layer name, similar to Leaflet.VectorGrid.
     * This provides a simpler styling API when you know the layer names.
     * Example: {layerName: {fillColor: 'blue', weight: 2}}
     * Ignored if style option is specified.
     * [MUTABLE, DL]
     */
    vectorTileLayerStyles?: object;

}

export type VectorTileLayerProps = Modify<TileLayerProps, {
    /**
     * The URL template for vector tiles in the form
     * 'https://{s}.example.com/tiles/{z}/{x}/{y}.pbf'.
     * Most vector tile servers use the .pbf (Protobuf) format.
     * [MUTABLE, DL]
     */
    url?: string
}> & VectorTileLayerOptions

const _funcOptions = ["featureToLayer", "filter", "layerOrder", "style"]

export const VectorTileLayer = createTileLayerComponent<
    TileLayer,
    VectorTileLayerProps
>(
    function createTileLayer({ url, ...options }, context) {
        const resolvedOptions = resolveProps(options, _funcOptions, context);
        const layer = leafletVectorTileLayer(url, withPane(resolvedOptions, context))
        return createElementObject(layer, context)
    },
    function updateTileLayer(layer, props, prevProps) {
        updateGridLayer(layer, props, prevProps)
        const { url } = props
        if (url != null && url !== prevProps.url) {
            layer.setUrl(url)
        }
    },
)
