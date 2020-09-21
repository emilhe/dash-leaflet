% Auto-generated: do not edit by hand
\name{dlSVGOverlay}

\alias{dlSVGOverlay}

\title{SVGOverlay component}

\description{
NOTE: This component is not fully tested. Consider it beta.
}

\usage{
dlSVGOverlay(children=NULL, svg=NULL, bounds=NULL, opacity=NULL,
zIndex=NULL, alt=NULL, interactive=NULL,
bubblingMouseEvents=NULL, crossOrigin=NULL,
errorOverlayUrl=NULL, className=NULL, id=NULL, pane=NULL,
attribution=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component}

\item{svg}{Character. The SVG as text}

\item{bounds}{List of list of numericss. The geographical bounds the image is tied to.}

\item{opacity}{Numeric. The opacity of the image overlay.}

\item{zIndex}{Numeric. The explicit zIndex of the overlay layer.}

\item{alt}{Character. Text for the alt attribute of the image (useful for accessibility).}

\item{interactive}{Logical. If true, the image overlay will emit mouse events when clicked or hovered.}

\item{bubblingMouseEvents}{Logical. When true, a mouse event on this path will trigger the same 
event on the map (unless L.DomEvent.stopPropagation is used).}

\item{crossOrigin}{Logical. Whether the crossOrigin attribute will be added to the image. If 
a String is provided, the image will have its crossOrigin attribute 
set to the String provided. This is needed if you want to access image 
pixel data. Refer to CORS Settings for valid String values.}

\item{errorOverlayUrl}{Character. URL to the overlay image to show in place of the overlay that failed to load.}

\item{className}{Character. A custom class name to assign to the image. Empty by default.}

\item{id}{Character. The ID used to identify this component in Dash callbacks}

\item{pane}{Character. The leaflet pane of the component}

\item{attribution}{Character. The attribution string for the component (dynamic)}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

