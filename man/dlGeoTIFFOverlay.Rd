% Auto-generated: do not edit by hand
\name{dlGeoTIFFOverlay}

\alias{dlGeoTIFFOverlay}

\title{GeoTIFFOverlay component}

\description{
GeoTIFFOverlay is just wrapper of LeafletGeoTIFFOverlay.
}

\usage{
dlGeoTIFFOverlay(children=NULL, url=NULL, band=NULL, image=NULL,
colorscale=NULL, domainMin=NULL, domainMax=NULL,
clampHigh=NULL, clampLow=NULL, classes=NULL, clip=NULL,
style=NULL, tileSize=NULL, opacity=NULL,
updateWhenIdle=NULL, updateWhenZooming=NULL,
updateInterval=NULL, zIndex=NULL, bounds=NULL, minZoom=NULL,
maxZoom=NULL, minNativeZoom=NULL, maxNativeZoom=NULL,
noWrap=NULL, className=NULL, keepBuffer=NULL,
interactive=NULL, bubblingMouseEvents=NULL, id=NULL,
pane=NULL, attribution=NULL, click_lat_lng_val=NULL,
click_lat_lng_idx=NULL, dbl_click_lat_lng_val=NULL,
dbl_click_lat_lng_idx=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component}

\item{url}{Character. The URL of the GeoTIFF file. Only EPSG:4326 / WGS84 coordinates are supported at
this time, ie. the file will be mapped without reprojection.}

\item{band}{Numeric. The band inside the GeoTIFF file. Defaults to 0.}

\item{image}{Numeric. The image inside the GeoTIFF file. Defaults to 0.}

\item{colorscale}{Character | list of characters. Chroma-js colorscale. Either a colorscale name, e.g. "Viridis", or a list of colors,
e.g. ["black", "#fdd49e", "rgba(255,0,0,0.35)"]
The predefined colorscales are listed here:
https://github.com/gka/chroma.js/blob/master/src/colors/colorbrewer.js}

\item{domainMin}{Numeric. Domain minimum of the colorscale. Translates to the first color of the colorscale.}

\item{domainMax}{Numeric. Domain maximum of the colorscale. Translates to the last color of the colorscale.}

\item{clampHigh}{Logical. Clamp values higher than domainMax to domainMax. Defaults to false, which precludes
those values from being drawn.}

\item{clampLow}{Logical. Clamp values lower than domainMin to domainMin. Defaults to false, which precludes
those values from being drawn.}

\item{classes}{Numeric | list of numerics. The number or positions of discrete classes in the colorbar. If not set the
colorbar will be continuous, which is the default.}

\item{clip}{List of list of list of numericsss. List of clipping polygons. Each polygon is a list of [lat, lon] coordinates that surrounds the area to be
shown on the map.}

\item{style}{Named list. HTML style object to add to the overlay entity, e.g. to set interpolation mode
with {'image-rendering': 'pixelated'}}

\item{tileSize}{Numeric. Width and height of tiles in the grid. Use a number if width and
height are equal, or L.point(width, height) otherwise.}

\item{opacity}{Numeric. Opacity of the tiles. Can be used in the createTile() function.}

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

\item{zIndex}{Numeric. The explicit zIndex of the tile layer.}

\item{bounds}{List of numerics. If set, tiles will only be loaded inside the set LatLngBounds.}

\item{minZoom}{Numeric. The minimum zoom level down to which this layer will be
displayed (inclusive).}

\item{maxZoom}{Numeric. The maximum zoom level up to which this layer will be
displayed (inclusive).}

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

\item{interactive}{Logical. If true, the image overlay will emit mouse events when clicked or hovered.}

\item{bubblingMouseEvents}{Logical. When true, a mouse event on this path will trigger the same
event on the map (unless L.DomEvent.stopPropagation is used).}

\item{id}{Character. The ID used to identify this component in Dash callbacks}

\item{pane}{Character. The leaflet pane of the component}

\item{attribution}{Character. The attribution string for the component}

\item{click_lat_lng_val}{List of numerics. Dash callback property. Receives [lat, lng, val] upon click. Requires interactive=True.}

\item{click_lat_lng_idx}{List of numerics. Dash callback property. Receives [lat, lng, idx] upon click. Requires interactive=True.}

\item{dbl_click_lat_lng_val}{List of numerics. Dash callback property. Receives [lat, lng, val] upon double click. Requires interactive=True.}

\item{dbl_click_lat_lng_idx}{List of numerics. Dash callback property. Receives [lat, lng, idx] upon double click. Requires interactive=True.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

