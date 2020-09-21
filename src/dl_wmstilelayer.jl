# AUTO GENERATED FILE - DO NOT EDIT

export dl_wmstilelayer

"""
    dl_wmstilelayer(;kwargs...)
    dl_wmstilelayer(children::Any;kwargs...)
    dl_wmstilelayer(children_maker::Function;kwargs...)


A WMSTileLayer component.
WMSTileLayer is a wrapper of WMSTileLayer in react-leaflet.
It takes similar properties to its react-leaflet counterpart.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component
- `url` (String; required): Base URL of the WMS service
- `layers` (String; required): Comma-separated list of WMS layers to show.
- `styles` (String; optional): Comma-separated list of WMS styles.
- `format` (String; optional): WMS image format (use 'image/png' for layers with transparency).
- `transparent` (Bool; optional): If true, the WMS service will return images with transparency.
- `version` (String; optional): Version of the WMS service to use
- `crs` (Dict; optional): Coordinate Reference System to use for the WMS requests, defaults 
to map CRS. Don't change this if you're not sure what it means.
- `uppercase` (Bool; optional): If true, WMS request parameter keys will be uppercase.
- `minZoom` (Real; optional): The minimum zoom level down to which this layer will be displayed (inclusive).
- `maxZoom` (Real; optional): The maximum zoom level up to which this layer will be displayed (inclusive).
- `subdomains` (String; optional): Subdomains of the tile service. Can be passed in the form of one string 
(where each letter is a subdomain name) or an array of strings.
- `errorTileUrl` (String; optional): URL to the tile image to show in place of the tile that failed to load.
- `zoomOffset` (Real; optional): The zoom number used in tile URLs will be offset with this value.
- `tms` (Bool; optional): If true, inverses Y axis numbering for tiles (turn this on for TMS services).
- `zoomReverse` (Bool; optional): If set to true, the zoom number used in tile URLs will be reversed 
(maxZoom - zoom instead of zoom)
- `detectRetina` (Bool; optional): If true and user is on a retina display, it will request four tiles of half 
the specified size and a bigger zoom level in place of one to utilize the 
high resolution.
- `crossOrigin` (Bool; optional): Whether the crossOrigin attribute will be added to the tiles. If 
a String is provided, all tiles will have its crossOrigin attribute 
set to the String provided. This is needed if you want to access tile 
pixel data. Refer to CORS Settings for valid String values.
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
- `pane` (String; optional): The leaflet pane of the component
- `className` (String; optional): A custom class name to assign to the tile layer. Empty by default.
- `keepBuffer` (Real; optional): When panning the map, keep this many rows and columns of tiles 
before unloading them.
- `attribution` (String; optional): The attribution string for the component (dynamic)
- `id` (String; optional): The ID used to identify this component in Dash callbacks
"""
function dl_wmstilelayer(; kwargs...)
        available_props = Symbol[:children, :url, :layers, :styles, :format, :transparent, :version, :crs, :uppercase, :minZoom, :maxZoom, :subdomains, :errorTileUrl, :zoomOffset, :tms, :zoomReverse, :detectRetina, :crossOrigin, :tileSize, :opacity, :updateWhenIdle, :updateWhenZooming, :updateInterval, :zIndex, :bounds, :minNativeZoom, :maxNativeZoom, :noWrap, :pane, :className, :keepBuffer, :attribution, :id]
        wild_props = Symbol[]
        return Component("dl_wmstilelayer", "WMSTileLayer", "dash_leaflet", available_props, wild_props; kwargs...)
end

dl_wmstilelayer(children::Any; kwargs...) = dl_wmstilelayer(;kwargs..., children = children)
dl_wmstilelayer(children_maker::Function; kwargs...) = dl_wmstilelayer(children_maker(); kwargs...)

