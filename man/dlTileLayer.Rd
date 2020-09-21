% Auto-generated: do not edit by hand
\name{dlTileLayer}

\alias{dlTileLayer}

\title{TileLayer component}

\description{
TileLayer is a wrapper of TileLayer in react-leaflet. It takes similar properties to its react-leaflet counterpart.
}

\usage{
dlTileLayer(children=NULL, url=NULL, opacity=NULL, zIndex=NULL,
minZoom=NULL, maxZoom=NULL, subdomains=NULL,
errorTileUrl=NULL, zoomOffset=NULL, tms=NULL,
zoomReverse=NULL, detectRetina=NULL, crossOrigin=NULL,
tileSize=NULL, updateWhenIdle=NULL, updateWhenZooming=NULL,
updateInterval=NULL, bounds=NULL, minNativeZoom=NULL,
maxNativeZoom=NULL, noWrap=NULL, className=NULL,
keepBuffer=NULL, id=NULL, pane=NULL, attribution=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component}

\item{url}{Character. A URL template for the tile layer, ie. a string of the following form:
'http://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'
where {s} means one of the available subdomains (used sequentially to 
help with browser parallel requests per domain limitation; subdomain 
values are specified in options; a, b or c by default, can be omitted), 
{z} zoom level, {x} and {y} tile coordinates. {r} can be used to
add "@2x" to the URL to load retina tiles.}

\item{opacity}{Numeric. Opacity of the tiles. Can be used in the createTile() function.}

\item{zIndex}{Numeric. The explicit zIndex of the tile layer.}

\item{minZoom}{Numeric. The minimum zoom level down to which this layer will be displayed (inclusive).}

\item{maxZoom}{Numeric. The maximum zoom level up to which this layer will be displayed (inclusive).}

\item{subdomains}{Character. Subdomains of the tile service. Can be passed in the form of one string 
(where each letter is a subdomain name) or an array of strings.}

\item{errorTileUrl}{Character. URL to the tile image to show in place of the tile that failed to load.}

\item{zoomOffset}{Numeric. The zoom number used in tile URLs will be offset with this value.}

\item{tms}{Logical. If true, inverses Y axis numbering for tiles (turn this on for TMS services).}

\item{zoomReverse}{Logical. If set to true, the zoom number used in tile URLs will be reversed 
(maxZoom - zoom instead of zoom)}

\item{detectRetina}{Logical. If true and user is on a retina display, it will request four tiles of half 
the specified size and a bigger zoom level in place of one to utilize the 
high resolution.}

\item{crossOrigin}{Logical. Whether the crossOrigin attribute will be added to the tiles. If 
a String is provided, all tiles will have its crossOrigin attribute 
set to the String provided. This is needed if you want to access tile 
pixel data. Refer to CORS Settings for valid String values.}

\item{tileSize}{Numeric. Width and height of tiles in the grid. Use a number if width and 
height are equal, or L.point(width, height) otherwise.}

\item{updateWhenIdle}{Logical. Load new tiles only when panning ends. true by default on mobile 
browsers, in order to avoid too many requests and keep smooth 
navigation. false otherwise in order to display new tiles during 
panning, since it is easy to pan outside the keepBuffer option 
in desktop browsers.}

\item{updateWhenZooming}{Logical. By default, a smooth zoom animation (during a touch zoom or a 
flyTo()) will update grid layers every integer zoom level. 
Setting this option to false will update the grid layer only 
when the smooth animation ends.}

\item{updateInterval}{Numeric. Tiles will not update more than once every updateInterval 
milliseconds when panning.}

\item{bounds}{List of numerics. If set, tiles will only be loaded inside the set LatLngBounds.}

\item{minNativeZoom}{Numeric. Minimum zoom number the tile source has available. If it 
is specified, the tiles on all zoom levels lower than 
minNativeZoom will be loaded from minNativeZoom level 
and auto-scaled.}

\item{maxNativeZoom}{Numeric. Maximum zoom number the tile source has available. If it
is specified, the tiles on all zoom levels higher than 
maxNativeZoom will be loaded from maxNativeZoom level 
and auto-scaled.}

\item{noWrap}{Logical. Whether the layer is wrapped around the antimeridian. If 
true, the GridLayer will only be displayed once at low zoom 
levels. Has no effect when the map CRS doesn't wrap around. 
Can be used in combination with bounds to prevent requesting 
tiles outside the CRS limits.}

\item{className}{Character. A custom class name to assign to the tile layer. Empty by default.}

\item{keepBuffer}{Numeric. When panning the map, keep this many rows and columns of tiles 
before unloading them.}

\item{id}{Character. The ID used to identify this component in Dash callbacks}

\item{pane}{Character. The leaflet pane of the component}

\item{attribution}{Character. The attribution string for the component}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

