# AUTO GENERATED FILE - DO NOT EDIT

export dl_geotiffoverlay

"""
    dl_geotiffoverlay(;kwargs...)
    dl_geotiffoverlay(children::Any;kwargs...)
    dl_geotiffoverlay(children_maker::Function;kwargs...)


A GeoTIFFOverlay component.
GeoTIFFOverlay is just wrapper of LeafletGeoTIFFOverlay.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component
- `url` (String; optional): The URL of the GeoTIFF file. Only EPSG:4326 / WGS84 coordinates are supported at
this time, ie. the file will be mapped without reprojection.
- `band` (Real; optional): The band inside the GeoTIFF file. Defaults to 0.
- `image` (Real; optional): The image inside the GeoTIFF file. Defaults to 0.
- `colorscale` (String | Array of Strings; optional): Chroma-js colorscale. Either a colorscale name, e.g. "Viridis", or a list of colors,
e.g. ["black", "#fdd49e", "rgba(255,0,0,0.35)"]
The predefined colorscales are listed here:
https://github.com/gka/chroma.js/blob/master/src/colors/colorbrewer.js
- `domainMin` (Real; optional): Domain minimum of the colorscale. Translates to the first color of the colorscale.
- `domainMax` (Real; optional): Domain maximum of the colorscale. Translates to the last color of the colorscale.
- `clampHigh` (Bool; optional): Clamp values higher than domainMax to domainMax. Defaults to false, which precludes
those values from being drawn.
- `clampLow` (Bool; optional): Clamp values lower than domainMin to domainMin. Defaults to false, which precludes
those values from being drawn.
- `classes` (Real | Array of Reals; optional): The number or positions of discrete classes in the colorbar. If not set the
colorbar will be continuous, which is the default.
- `clip` (Array of Array of Array of Realsss; optional): List of clipping polygons. Each polygon is a list of [lat, lon] coordinates that surrounds the area to be
shown on the map.
- `style` (Dict; optional): HTML style object to add to the overlay entity, e.g. to set interpolation mode
with {'image-rendering': 'pixelated'}
- `tileSize` (Real; optional): Width and height of tiles in the grid. Use a number if width and
height are equal, or L.point(width, height) otherwise.
- `opacity` (Real; optional): Opacity of the tiles. Can be used in the createTile() function.
- `updateWhenIdle` (Bool; optional): Load new tiles only when panning ends. true by default on mobile
browsers, in order to avoid too many requests and keep smooth
navigation. false otherwise in order to display new tiles during
panning, since it is easy to pan outside the keepBuffer option
in desktop browsers.
- `updateWhenZooming` (Bool; optional): By default, a smooth zoom animation (during a touch zoom or a
flyTo()) will update grid layers every integer zoom level.
Setting this option to false will update the grid layer only
when the smooth animation ends.
- `updateInterval` (Real; optional): Tiles will not update more than once every updateInterval
milliseconds when panning.
- `zIndex` (Real; optional): The explicit zIndex of the tile layer.
- `bounds` (Array of Reals; optional): If set, tiles will only be loaded inside the set LatLngBounds.
- `minZoom` (Real; optional): The minimum zoom level down to which this layer will be
displayed (inclusive).
- `maxZoom` (Real; optional): The maximum zoom level up to which this layer will be
displayed (inclusive).
- `minNativeZoom` (Real; optional): Minimum zoom number the tile source has available. If it
is specified, the tiles on all zoom levels lower than
minNativeZoom will be loaded from minNativeZoom level
and auto-scaled.
- `maxNativeZoom` (Real; optional): Maximum zoom number the tile source has available. If it
is specified, the tiles on all zoom levels higher than
maxNativeZoom will be loaded from maxNativeZoom level
and auto-scaled.
- `noWrap` (Bool; optional): Whether the layer is wrapped around the antimeridian. If
true, the GridLayer will only be displayed once at low zoom
levels. Has no effect when the map CRS doesn't wrap around.
Can be used in combination with bounds to prevent requesting
tiles outside the CRS limits.
- `className` (String; optional): A custom class name to assign to the tile layer. Empty by default.
- `keepBuffer` (Real; optional): When panning the map, keep this many rows and columns of tiles
before unloading them.
- `interactive` (Bool; optional): If true, the image overlay will emit mouse events when clicked or hovered.
- `bubblingMouseEvents` (Bool; optional): When true, a mouse event on this path will trigger the same
event on the map (unless L.DomEvent.stopPropagation is used).
- `id` (String; optional): The ID used to identify this component in Dash callbacks
- `pane` (String; optional): The leaflet pane of the component
- `attribution` (String; optional): The attribution string for the component
- `click_lat_lng_val` (Array of Reals; optional): Dash callback property. Receives [lat, lng, val] upon click. Requires interactive=True.
- `click_lat_lng_idx` (Array of Reals; optional): Dash callback property. Receives [lat, lng, idx] upon click. Requires interactive=True.
- `dbl_click_lat_lng_val` (Array of Reals; optional): Dash callback property. Receives [lat, lng, val] upon double click. Requires interactive=True.
- `dbl_click_lat_lng_idx` (Array of Reals; optional): Dash callback property. Receives [lat, lng, idx] upon double click. Requires interactive=True.
"""
function dl_geotiffoverlay(; kwargs...)
        available_props = Symbol[:children, :url, :band, :image, :colorscale, :domainMin, :domainMax, :clampHigh, :clampLow, :classes, :clip, :style, :tileSize, :opacity, :updateWhenIdle, :updateWhenZooming, :updateInterval, :zIndex, :bounds, :minZoom, :maxZoom, :minNativeZoom, :maxNativeZoom, :noWrap, :className, :keepBuffer, :interactive, :bubblingMouseEvents, :id, :pane, :attribution, :click_lat_lng_val, :click_lat_lng_idx, :dbl_click_lat_lng_val, :dbl_click_lat_lng_idx]
        wild_props = Symbol[]
        return Component("dl_geotiffoverlay", "GeoTIFFOverlay", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_geotiffoverlay(children::Any; kwargs...) = dl_geotiffoverlay(;kwargs..., children = children)
dl_geotiffoverlay(children_maker::Function; kwargs...) = dl_geotiffoverlay(children_maker(); kwargs...)

