// import { VectorTileLayer } from '@mapbox/vector-tile'
import {
    createElementObject,
    createTileLayerComponent,
    updateGridLayer,
    withPane,
} from '@react-leaflet/core'
// import { TileLayer } from 'leaflet'
import { default as leafletVectorTileLayer } from 'leaflet-vector-tile-layer'
import { DashFunction, Modify, resolveProps, TileLayerProps } from "../props";
import { omit, pick } from "../utils";
import { GridLayer, TileLayer } from 'leaflet';

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
    style?: DashFunction; // default undefined

    /**
     * This works like the same option for `Leaflet.VectorGrid`.
     * Ignored if style is specified.
     */
    vectorTileLayerStyles?: object; // default undefined

    /**
     * Passing a Python dictionary, this dictionary will be turned into 
     * a URLSearchParams JavaScript object, which will be a part of url
     * https://xyz/collections/public.building/tiles/WebMercatorQuad/{z}/{x}/{y}?{query}
     */
    query?: object;
}

export type VectorTileLayerProps = Modify<TileLayerProps, {
    /**
     * The URL template in the form 'https://{s}.example.com/tiles/{z}/{x}/{y}.pbf'.
     */
    url?: string
}> & VectorTileLayerOptions

const _funcOptions = ["featureToLayer", "filter", "layerOrder", "style"]

const query_formatted = new URLSearchParams({});

export const VectorTileLayer = createTileLayerComponent<
    TileLayer,  // MAKE PROPER CLASS (might be equal though?)
    VectorTileLayerProps
>(
    
    function createTileLayer({ url, ...options }, context) {
        if (options.query != null) {
            for (const [key, value] of Object.entries(options.query)) {
                query_formatted.append(key,value);
            }
        }

        const resolvedOptions = resolveProps(options, _funcOptions, context);
        const layer = leafletVectorTileLayer(url, Object.assign({},withPane(resolvedOptions, context), {query_formatted}));
        return createElementObject(layer, context);
    },
    function updateTileLayer(layer, props, prevProps) {
        updateGridLayer(layer, props, prevProps);
        const { query } = props
        // TODO: Double check property stuff here
        if (query != null && JSON.stringify(query) != JSON.stringify(prevProps.query)) {
            console.log("Current query");
            console.log(query);
            console.log("Previous query");
            console.log(prevProps.query);

            const new_query_keys = Object.keys(query);
            
            // loop through the old query
            query_formatted.forEach((value, key) => {
                if (new_query_keys.includes(key)) {
                    if (query[key] !== value) {
                        query_formatted.set(key, query[key]);
                    }
                }
                else {
                    query_formatted.delete(key);
                }
            });

            // loop through new query
            for (const [key, value] of Object.entries(query)) {
                if (!query_formatted.has(key)) {
                    query_formatted.append(key,value);
                }
            }

            layer.redraw();
        }
    },
)
