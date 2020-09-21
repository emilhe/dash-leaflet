% Auto-generated: do not edit by hand
\name{dlCircleMarker}

\alias{dlCircleMarker}

\title{CircleMarker component}

\description{
CircleMarker is a wrapper of CircleMarker in react-leaflet. It takes similar properties to its react-leaflet counterpart.
}

\usage{
dlCircleMarker(children=NULL, center=NULL, radius=NULL, stroke=NULL,
color=NULL, weight=NULL, opacity=NULL, lineCap=NULL,
lineJoin=NULL, dashArray=NULL, dashOffset=NULL, fill=NULL,
fillColor=NULL, fillOpacity=NULL, fillRule=NULL,
bubblingMouseEvents=NULL, renderer=NULL, className=NULL,
interactive=NULL, id=NULL, pane=NULL, attribution=NULL,
n_clicks=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component}

\item{center}{List of numerics. The center of the circle marker (lat, lon)}

\item{radius}{Numeric. Radius of the circle marker, in pixels}

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

\item{interactive}{Logical. If true, the image overlay will emit mouse events when clicked or hovered.}

\item{id}{Character. The ID used to identify this component in Dash callbacks}

\item{pane}{Character. The leaflet pane of the component}

\item{attribution}{Character. The attribution string for the component}

\item{n_clicks}{Numeric. Dash callback property. Number of times the object has been clicked}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

