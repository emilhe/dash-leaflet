% Auto-generated: do not edit by hand
\name{dlMarker}

\alias{dlMarker}

\title{Marker component}

\description{
Marker is a wrapper of Marker in react-leaflet. It takes similar properties to its react-leaflet counterpart.
}

\usage{
dlMarker(children=NULL, position=NULL, icon=NULL, draggable=NULL,
opacity=NULL, zIndexOffset=NULL, keyboard=NULL, title=NULL,
alt=NULL, riseOnHover=NULL, riseOffset=NULL,
bubblingMouseEvents=NULL, autoPan=NULL, autoPanPadding=NULL,
autoPanSpeed=NULL, interactive=NULL, id=NULL, pane=NULL,
attribution=NULL, n_clicks=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component}

\item{position}{List of numerics. A geographical point (lat, lon)}

\item{icon}{Named list. Options passed to Icon constructor.}

\item{draggable}{Logical. Whether the marker is draggable with mouse/touch or not.}

\item{opacity}{Numeric. The opacity of the marker.}

\item{zIndexOffset}{Numeric. By default, marker images zIndex is set automatically based
on its latitude. Use this option if you want to put the
marker on top of all others (or below), specifying a high
value like 1000 (or high negative value, respectively).}

\item{keyboard}{Logical. Whether the marker can be tabbed to with a keyboard and clicked by
pressing enter.}

\item{title}{Character. Text for the browser tooltip that appear on marker hover (no tooltip
by default).}

\item{alt}{Character. Text for the alt attribute of the icon image (useful for accessibility).}

\item{riseOnHover}{Logical. If true, the marker will get on top of others when you hover the mouse
over it.}

\item{riseOffset}{Numeric. The z-index offset used for the riseOnHover feature.}

\item{bubblingMouseEvents}{Logical. When true, a mouse event on this marker will trigger the same event
on the map (unless L.DomEvent.stopPropagation is used).}

\item{autoPan}{Logical. Whether to pan the map when dragging this marker near its edge or not.}

\item{autoPanPadding}{Named list. Distance (in pixels to the left/right and to the top/bottom) of the map
edge to start panning the map.}

\item{autoPanSpeed}{Numeric. Number of pixels the map should pan by.}

\item{interactive}{Logical. If false, the layer will not emit mouse events and will act as a part of
the underlying map.}

\item{id}{Character. The ID used to identify this component in Dash callbacks}

\item{pane}{Character. The leaflet pane of the component}

\item{attribution}{Character. The attribution string for the component}

\item{n_clicks}{Numeric. Dash callback property. Number of times the marker has been clicked}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

