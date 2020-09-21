% Auto-generated: do not edit by hand
\name{dlPolyline}

\alias{dlPolyline}

\title{Polyline component}

\description{
Polyline is a wrapper of Polyline in react-leaflet. It takes similar properties to its react-leaflet counterpart.
}

\usage{
dlPolyline(children=NULL, positions=NULL, smoothFactor=NULL,
noClip=NULL, stroke=NULL, color=NULL, weight=NULL,
opacity=NULL, lineCap=NULL, lineJoin=NULL, dashArray=NULL,
dashOffset=NULL, fill=NULL, fillColor=NULL,
fillOpacity=NULL, fillRule=NULL, bubblingMouseEvents=NULL,
renderer=NULL, className=NULL, interactive=NULL, id=NULL,
pane=NULL, attribution=NULL, click_lat_lng=NULL,
dbl_click_lat_lng=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component}

\item{positions}{List of list of numericss. An array of geographical points (lat, lon)}

\item{smoothFactor}{Numeric. How much to simplify the polyline on each zoom level. More means better 
performance and smoother look, and less means more accurate representation.}

\item{noClip}{Logical. Disable polyline clipping.}

\item{stroke}{Logical. Whether to draw stroke along the path. Set it to false to disable borders 
on polygons or circles.}

\item{color}{Character. Stroke color}

\item{weight}{Numeric. Stroke width in pixels}

\item{opacity}{Numeric. Stroke opacity}

\item{lineCap}{Character. A string that defines shape to be used at the end of the stroke.}

\item{lineJoin}{Character. A string that defines shape to be used at the corners of the stroke.}

\item{dashArray}{Character. A string that defines the stroke dash pattern. Doesn't work on Canvas-powered 
layers in some old browsers.}

\item{dashOffset}{Character. A string that defines the distance into the dash pattern to start the dash. 
Doesn't work on Canvas-powered layers in some old browsers.}

\item{fill}{Logical. Whether to fill the path with color. Set it to false to disable filling on 
polygons or circles.}

\item{fillColor}{Character. Fill color. Defaults to the value of the color option}

\item{fillOpacity}{Numeric. Fill opacity}

\item{fillRule}{Character. A string that defines how the inside of a shape is determined.}

\item{bubblingMouseEvents}{Logical. When true, a mouse event on this path will trigger the same 
event on the map (unless L.DomEvent.stopPropagation is used).}

\item{renderer}{Named list. Use this specific instance of Renderer for this path. Takes 
precedence over the map's default renderer.}

\item{className}{Character. Custom class name set on an element. Only for SVG renderer.}

\item{interactive}{Logical. If false, the layer will not emit mouse events and will act
as a part of the underlying map.}

\item{id}{Character. The ID used to identify this component in Dash callbacks}

\item{pane}{Character. The leaflet pane of the component}

\item{attribution}{Character. The attribution string for the component}

\item{click_lat_lng}{List of numerics. Dash callback property. Receives [lat, lng] upon click.}

\item{dbl_click_lat_lng}{List of numerics. Dash callback property. Receives [lat, lng] upon double click.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

