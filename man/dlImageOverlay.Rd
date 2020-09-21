% Auto-generated: do not edit by hand
\name{dlImageOverlay}

\alias{dlImageOverlay}

\title{ImageOverlay component}

\description{
ImageOverlay is a wrapper of ImageOverlay in react-leaflet. It takes similar properties to its react-leaflet counterpart.
}

\usage{
dlImageOverlay(children=NULL, url=NULL, bounds=NULL, opacity=NULL,
zIndex=NULL, alt=NULL, interactive=NULL,
bubblingMouseEvents=NULL, crossOrigin=NULL,
errorOverlayUrl=NULL, className=NULL, id=NULL, pane=NULL,
attribution=NULL, click_lat_lng=NULL, dbl_click_lat_lng=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. The children of this component}

\item{url}{Character. The URL of the image}

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

\item{click_lat_lng}{List of numerics. Dash callback property. Receives [lat, lng] upon click. Requires interactive=True.}

\item{dbl_click_lat_lng}{List of numerics. Dash callback property. Receives [lat, lng] upon double click. Requires interactive=True.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

