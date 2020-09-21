% Auto-generated: do not edit by hand
\name{dlTooltip}

\alias{dlTooltip}

\title{Tooltip component}

\description{
Tooltip is a wrapper of Tooltip in react-leaflet. It takes similar properties to its react-leaflet counterpart.
}

\usage{
dlTooltip(children=NULL, offset=NULL, direction=NULL, permanent=NULL,
sticky=NULL, interactive=NULL, opacity=NULL, id=NULL,
className=NULL, pane=NULL, attribution=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component}

\item{offset}{Named list. Optional offset of the tooltip position.}

\item{direction}{Character. Direction where to open the tooltip. Possible values are: right, 
left, top, bottom, center, auto. auto will dynamically switch between 
right and left according to the tooltip position on the map.}

\item{permanent}{Logical. Whether to open the tooltip permanently or only on mouseover.}

\item{sticky}{Logical. If true, the tooltip will follow the mouse instead of being fixed at 
the feature center.}

\item{interactive}{Logical. If true, the tooltip will listen to the feature events.}

\item{opacity}{Numeric. Tooltip container opacity}

\item{id}{Character. The ID used to identify this component in Dash callbacks}

\item{className}{Character. The class of the component (dynamic)}

\item{pane}{Character. The leaflet pane of the component}

\item{attribution}{Character. The attribution string for the component (dynamic)}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

